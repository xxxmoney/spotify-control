import * as memoryStore from '../helpers/memoryStore'
import constants from '../../shared/constants'
import { SpotifyTokenResponse } from '../../shared/types'
import { DateTime } from 'luxon'

export async function handleSpotifyAuthCallback(params: { [p: string]: string }): Promise<void> {
  console.log('Received Spotify auth callback')

  const code = params['code']

  if (code) {
    memoryStore.set(constants.SPOTIFY_CODE_KEY, code)
    console.log('Spotify code received')

    await acquireToken(code)
  }
}

export function isCodeValid(): boolean {
  const code = memoryStore.get<string>(constants.SPOTIFY_CODE_KEY)
  return !!code
}

export function isTokenValid(): boolean {
  const tokenResponse = memoryStore.get<SpotifyTokenResponse>(constants.SPOTIFY_TOKEN_RESPONSE_KEY)

  return tokenResponse ? DateTime.now() < tokenResponse.expiresAt : false
}

export async function reacquireToken(): Promise<void> {
  const code = memoryStore.get<string>(constants.SPOTIFY_CODE_KEY)

  if (!code) {
    throw new Error('No valid Spotify code found in memory store')
  }

  console.log('Reacquiring Spotify token...')
  await acquireToken(code)
}

async function acquireToken(code: string): Promise<void> {
  const tokenResponse = await fetchToken(code)
  memoryStore.set(constants.SPOTIFY_TOKEN_RESPONSE_KEY, tokenResponse)
  console.log('Spotify token stored successfully')
}

async function fetchToken(code: string): Promise<SpotifyTokenResponse> {
  const body = new URLSearchParams({
    grant_type: constants.SPOTIFY_GRANT_TYPE,
    code: code,
    redirect_uri: constants.SPOTIFY_REDIRECT_URL
  })

  const authorizationBase64 = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64')

  console.log('Fetching Spotify token...')

  const response = await fetch(constants.SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authorizationBase64}`
    },
    body: body
  })

  if (!response.ok) {
    const responseText = await response.text()
    throw new Error(
      `Failed to fetch token: ${response.status} ${response.statusText} ${responseText}`
    )
  }

  console.log('Spotify token fetched successfully')

  const data = await response.json()
  return {
    accessToken: data['access_token'],
    expiresAt: DateTime.now().plus({ seconds: data['expires_in'] as number })
  }
}

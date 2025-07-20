//import * as memoryStore from '../helpers/memory.store'
import * as persistentStore from '../helpers/persistent.store'
import * as urlHandler from './url.handler'
import constants from '../../shared/constants'
import {
  ElectronUserAPI,
  ElectronUserAPI_Spotify,
  SpotifyAuthParams,
  SpotifyTokenResponse
} from '../../shared/types'
import { DateTime } from 'luxon'
import { ipcMain } from 'electron'
import { nameof, toSnakeCase } from '../../shared/helpers'
import { prefixHandlerName } from '../../shared/helpers'

export function register(): void {
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('spotify'),
      nameof<ElectronUserAPI_Spotify>('isCodeValid')
    ),
    () => isCodeValid()
  )
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('spotify'),
      nameof<ElectronUserAPI_Spotify>('isTokenValid')
    ),
    () => isTokenValid()
  )
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('spotify'),
      nameof<ElectronUserAPI_Spotify>('reacquireToken')
    ),
    () => reacquireToken()
  )
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('spotify'),
      nameof<ElectronUserAPI_Spotify>('authorise')
    ),
    () => authorise()
  )
}

export async function authorise(): Promise<void> {
  console.log('Starting Spotify authorisation process...')

  const params: SpotifyAuthParams = {
    clientId: process.env.SPOTIFY_CLIENT_ID || '',
    redirectUri: constants.SPOTIFY_REDIRECT_URL,
    scope: constants.SPOTIFY_SCOPES.join(' '),
    responseType: constants.SPOTIFY_RESPONSE_TYPE,
    showDialog: constants.SPOTIFY_SHOW_DIALOG
  }

  const queryString = new URLSearchParams(toSnakeCase(params)).toString()
  const url = `${constants.SPOTIFY_AUTHORISE_URL}?${queryString}`

  await urlHandler.openUrl(url)

  console.log('Spotify authorisation url opened')
}

export async function handleSpotifyAuthCallback(params: { [p: string]: string }): Promise<void> {
  console.log('Received Spotify auth callback')

  const code = params['code']

  if (code) {
    persistentStore.set(constants.SPOTIFY_CODE_KEY, code)
    console.log('Spotify code received')

    await acquireToken(code)
  }
}

export function isCodeValid(): boolean {
  const code = persistentStore.get<string>(constants.SPOTIFY_CODE_KEY)
  return !!code
}

export function getStoredToken(): SpotifyTokenResponse | undefined {
  return persistentStore.get<SpotifyTokenResponse>(constants.SPOTIFY_TOKEN_RESPONSE_KEY)
}

export function isTokenValid(): boolean {
  const tokenResponse = getStoredToken()

  return tokenResponse ? DateTime.now() < tokenResponse.expiresAt : false
}

export async function reacquireToken(): Promise<void> {
  const token = getStoredToken()

  if (!token?.refreshToken) {
    throw new Error('No valid Spotify refresh token found in memory store')
  }

  console.log('Reacquiring Spotify token...')
  await refreshToken(token.refreshToken)
}

async function acquireToken(code: string): Promise<void> {
  const tokenResponse = await fetchToken(code)
  persistentStore.set(constants.SPOTIFY_TOKEN_RESPONSE_KEY, tokenResponse)
  console.log('Spotify token stored successfully')
}

async function refreshToken(refreshToken: string): Promise<void> {
  const tokenResponse = await refetchToken(refreshToken)
  persistentStore.set(constants.SPOTIFY_TOKEN_RESPONSE_KEY, tokenResponse)
  console.log('Spotify token refreshed successfully')
}

async function fetchToken(code: string): Promise<SpotifyTokenResponse> {
  const params = {
    grantType: 'authorization_code',
    code: code,
    redirectUri: constants.SPOTIFY_REDIRECT_URL
  }
  const body = new URLSearchParams(toSnakeCase(params))

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
    refreshToken: data['refresh_token'],
    expiresAt: DateTime.now().plus({ seconds: data['expires_in'] as number })
  }
}

async function refetchToken(refreshToken: string): Promise<SpotifyTokenResponse> {
  const params = {
    grantType: 'refresh_token',
    refreshToken: refreshToken
  }
  const body = new URLSearchParams(toSnakeCase(params))

  const authorizationBase64 = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64')

  console.log('Fetching refreshed Spotify token...')

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
      `Failed to fetch refreshed token: ${response.status} ${response.statusText} ${responseText}`
    )
  }

  console.log('Spotify refreshed token fetched successfully')

  const data = await response.json()
  return {
    accessToken: data['access_token'],
    refreshToken: data['refresh_token'] ?? refreshToken,
    expiresAt: DateTime.now().plus({ seconds: data['expires_in'] as number })
  }
}

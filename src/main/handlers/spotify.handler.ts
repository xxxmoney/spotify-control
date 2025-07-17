import * as memoryStore from '../helpers/memoryStore'
import constants from '../../shared/constants'
import Constants from '../../shared/constants'

export async function handleSpotifyAuthCallback(params: { [p: string]: string }): Promise<void> {
  const code = params['code']

  if (code) {
    memoryStore.set(Constants.SPOTIFY_CODE_KEY, code)

    // TODO: figure out token refresh logic
    const token = await fetchToken(code)
    memoryStore.set(Constants.SPOTIFY_TOKEN_KEY, token)

    // TODO: somehow make renderer aware that app is authed
  }
}

async function fetchToken(code: string): Promise<string> {
  const body = new URLSearchParams({
    grant_type: constants.SPOTIFY_GRANT_TYPE,
    code: code,
    redirect_uri: constants.SPOTIFY_REDIRECT_URL
  })

  const authorizationBase64 = Buffer.from(
    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
  ).toString('base64')

  console.log('Fetching Spotify token with...')

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
  return data['access_token']
}

import constants from '../../shared/constants'

export async function handleSpotifyAuthCallback(params: { [p: string]: string }): Promise<void> {
  const code = params['code']

  if (code) {
    console.log('Spotify auth code:', code)

    const token = await fetchToken(code)
    console.log('Spotify token:', token)
  }
}

async function fetchToken(code: string): Promise<string> {
  const body = {
    grant_type: constants.SPOTIFY_GRANT_TYPE,
    code: code,
    redirect_uri: constants.SPOTIFY_REDIRECT_URL
  }

  const response = await fetch(constants.SPOTIFY_TOKEN_URL, {
    method: 'POST',
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch token: ${response.statusText}`)
  }

  const data = await response.json()

  return data['access_token']
}

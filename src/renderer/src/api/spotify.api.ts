import { SpotifyAuthParams } from '@/shared/types'
import { SPOTIFY_AUTHORISE_URL } from '@/shared/constants'

export async function authorise(params: SpotifyAuthParams): Promise<void> {
  const queryString = new URLSearchParams({ ...params }).toString()
  const url = `${SPOTIFY_AUTHORISE_URL}?${queryString}`

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`Spotify authorisation failed: ${response.statusText}`)
  }
}

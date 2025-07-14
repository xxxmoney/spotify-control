import { SpotifyAuthParams } from '@/shared/types'
import { useConstants } from '@renderer/composables/constants.comp'

export async function authorise(params: SpotifyAuthParams): Promise<void> {
  const constants = useConstants()

  const queryString = new URLSearchParams({ ...params }).toString()
  const url = `${constants.SPOTIFY_AUTHORISE_URL}?${queryString}`

  // TODO: probably use through ipc rather then fetch
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

import { SpotifyAuthParams } from '@/shared/types'
import { useConstants } from '@renderer/composables/constants.comp'
import { useElectronAPI } from '@renderer/composables/api.comp'

export async function authorise(params: SpotifyAuthParams): Promise<void> {
  const api = useElectronAPI()
  const constants = useConstants()

  const queryString = new URLSearchParams({ ...params }).toString()
  const url = `${constants.SPOTIFY_AUTHORISE_URL}?${queryString}`

  await api.openUrl(url)
}

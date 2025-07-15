import { SpotifyAuthParams } from '@/shared/types'
import { useConstants } from '@renderer/composables/constants.comp'
import { useElectronAPI } from '@renderer/composables/api.comp'
import { toSnakeCase } from '@renderer/helpers/object.helper'

export async function authorise(params: SpotifyAuthParams): Promise<void> {
  const api = useElectronAPI()
  const constants = useConstants()

  const queryString = new URLSearchParams(toSnakeCase(params)).toString()
  const url = `${constants.SPOTIFY_AUTHORISE_URL}?${queryString}`

  await api.openUrl(url)
}

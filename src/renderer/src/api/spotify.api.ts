import { SpotifyAuthParams } from '@/shared/types'
import { useConstants } from '@renderer/composables/constants.comp'
import { useElectronAPI } from '@renderer/composables/api.comp'
import { toSnakeCase } from '@renderer/helpers/object.helper'

export async function authorise(params: SpotifyAuthParams): Promise<void> {
  const api = useElectronAPI()
  const constants = useConstants()

  const queryString = new URLSearchParams(toSnakeCase(params)).toString()
  const url = `${constants.SPOTIFY_AUTHORISE_URL}?${queryString}`

  await api.url.openUrl(url)
}

export async function isCodeValid(): Promise<boolean> {
  const api = useElectronAPI()
  return await api.spotify.isCodeValid()
}

export async function isTokenValid(): Promise<boolean> {
  const api = useElectronAPI()
  return await api.spotify.isTokenValid()
}

export async function reacquireToken(): Promise<void> {
  const api = useElectronAPI()
  await api.spotify.reacquireToken()
}

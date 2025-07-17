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

export async function isCodeValid(): Promise<boolean> {
  const api = useElectronAPI()
  return await api.isSpotifyCodeValid()
}

export async function isTokenValid(): Promise<boolean> {
  const api = useElectronAPI()
  return await api.isSpotifyTokenValid()
}

export async function reacquireToken(): Promise<void> {
  const api = useElectronAPI()
  await api.reacquireSpotifyToken()
}

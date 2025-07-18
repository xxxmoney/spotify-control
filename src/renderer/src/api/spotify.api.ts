import { useElectronAPI } from '@renderer/composables/api.comp'

export async function authorise(): Promise<void> {
  const api = useElectronAPI()
  return await api.spotify.authorise()
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

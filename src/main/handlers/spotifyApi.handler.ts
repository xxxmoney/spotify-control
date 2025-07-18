import SpotifyWebApi from 'spotify-web-api-js'
import { ipcMain } from 'electron'
import { nameof, prefixHandlerName } from '../../shared/helpers'
import { ElectronUserAPI, ElectronUserAPI_SpotifyApi } from '../../shared/types'

const controlApi = new SpotifyWebApi()

export function register(): void {
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('spotifyApi'),
      nameof<ElectronUserAPI_SpotifyApi>('setVolume')
    ),
    (_, percent: number) => setVolume(percent)
  )
}

export async function setVolume(percent: number): Promise<void> {
  await controlApi.setVolume(percent)
}

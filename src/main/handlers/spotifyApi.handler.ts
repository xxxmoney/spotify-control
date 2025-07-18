import SpotifyWebApi from 'spotify-web-api-node'
import { ipcMain } from 'electron'
import { nameof, prefixHandlerName } from '../../shared/helpers'
import { ElectronUserAPI, ElectronUserAPI_SpotifyApi } from '../../shared/types'
import * as spotifyHandler from './spotify.handler'

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
  initialize()

  await controlApi.setVolume(percent)
}

function initialize(): void {
  const token = spotifyHandler.getStoredToken()

  if (!token) {
    throw new Error('Spotify token is not set')
  }

  controlApi.setAccessToken(token.accessToken)
}

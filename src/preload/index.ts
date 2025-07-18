import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { nameof } from '../shared/helpers'
import {
  Device,
  DeviceState,
  ElectronUserAPI,
  ElectronUserAPI_Device,
  ElectronUserAPI_Spotify,
  ElectronUserAPI_Test,
  ElectronUserAPI_Url,
  Env
} from '../shared/types'
import constants from '../shared/constants'
import { prefixHandlerName } from '../shared/helpers'

// Custom APIs for renderer
const api: ElectronUserAPI = {
  test: {
    ping: (): Promise<string> =>
      ipcRenderer.invoke(
        prefixHandlerName(nameof<ElectronUserAPI>('test'), nameof<ElectronUserAPI_Test>('ping'))
      )
  },

  device: {
    getDevices: (): Promise<Device[]> =>
      ipcRenderer.invoke(
        prefixHandlerName(
          nameof<ElectronUserAPI>('device'),
          nameof<ElectronUserAPI_Device>('getDevices')
        )
      ),
    getDeviceState: (deviceIndex: number): Promise<DeviceState> =>
      ipcRenderer.invoke(
        prefixHandlerName(
          nameof<ElectronUserAPI>('device'),
          nameof<ElectronUserAPI_Device>('getDeviceState')
        ),
        deviceIndex
      )
  },

  url: {
    openUrl: (url: string): Promise<void> =>
      ipcRenderer.invoke(
        prefixHandlerName(nameof<ElectronUserAPI>('url'), nameof<ElectronUserAPI_Url>('openUrl')),
        url
      )
  },

  spotify: {
    isSpotifyCodeValid: (): Promise<boolean> =>
      ipcRenderer.invoke(
        prefixHandlerName(
          nameof<ElectronUserAPI>('device'),
          nameof<ElectronUserAPI_Spotify>('isSpotifyCodeValid')
        )
      ),
    isSpotifyTokenValid: (): Promise<boolean> =>
      ipcRenderer.invoke(
        prefixHandlerName(
          nameof<ElectronUserAPI>('device'),
          nameof<ElectronUserAPI_Spotify>('isSpotifyTokenValid')
        )
      ),
    reacquireSpotifyToken: (): Promise<void> =>
      ipcRenderer.invoke(
        prefixHandlerName(
          nameof<ElectronUserAPI>('device'),
          nameof<ElectronUserAPI_Spotify>('reacquireSpotifyToken')
        )
      )
  }
}
const env: Env = {
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID as string
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld(constants.BRIDGE_EXPOSE.ELECTRON, electronAPI)

    // Expose main application API
    contextBridge.exposeInMainWorld(constants.BRIDGE_EXPOSE.API, api)

    // Expose environment variables
    contextBridge.exposeInMainWorld(constants.BRIDGE_EXPOSE.ENV, env)

    // Expose constants
    contextBridge.exposeInMainWorld(constants.BRIDGE_EXPOSE.CONSTANTS, constants)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.env = env
  // @ts-ignore (define in dts)
  window.constants = constants
}

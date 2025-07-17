import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { nameof } from '../shared/helpers'
import { Device, DeviceState, ElectronUserAPI, Env } from '../shared/types'
import constants from '../shared/constants'

// Custom APIs for renderer
const api: ElectronUserAPI = {
  ping: (): Promise<string> => ipcRenderer.invoke(nameof<ElectronUserAPI>('ping')),

  getDevices: (): Promise<Device[]> => ipcRenderer.invoke(nameof<ElectronUserAPI>('getDevices')),
  getDeviceState: (deviceIndex: number): Promise<DeviceState> =>
    ipcRenderer.invoke(nameof<ElectronUserAPI>('getDeviceState'), deviceIndex),

  openUrl: (url: string): Promise<void> =>
    ipcRenderer.invoke(nameof<ElectronUserAPI>('openUrl'), url),

  isCodeValid: (): Promise<boolean> => ipcRenderer.invoke(nameof<ElectronUserAPI>('isCodeValid')),
  isTokenValid: (): Promise<boolean> => ipcRenderer.invoke(nameof<ElectronUserAPI>('isTokenValid')),
  reacquireToken: (): Promise<void> => ipcRenderer.invoke(nameof<ElectronUserAPI>('reacquireToken'))
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

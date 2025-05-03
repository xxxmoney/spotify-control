import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {nameof} from "../shared/helpers";
import {Device, ElectronUserAPI} from "../shared/types";

// Custom APIs for renderer
const api: ElectronUserAPI = {
  ping: (): Promise<string> => ipcRenderer.invoke(nameof<ElectronUserAPI>('ping')),
  getDevices: (): Promise<Device[]> => ipcRenderer.invoke(nameof<ElectronUserAPI>('getDevices')),

  // Add more APIs here
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

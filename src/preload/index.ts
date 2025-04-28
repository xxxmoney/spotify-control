import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {nameof} from "../shared/helpers";
import {IElectronAPI} from "../shared/types";
import * as HID from 'node-hid';

// Custom APIs for renderer
const api: IElectronAPI = {
  ping: (): Promise<string> => ipcRenderer.invoke(nameof<IElectronAPI>('ping')),
  getDevices: (): Promise<HID.Device[]> => ipcRenderer.invoke(nameof<IElectronAPI>('getDevices')),

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

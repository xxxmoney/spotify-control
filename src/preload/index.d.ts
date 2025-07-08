import { ElectronAPI } from '@electron-toolkit/preload'
import { ElectronUserAPI } from '../shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: ElectronUserAPI
  }
}

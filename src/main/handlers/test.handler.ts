import { prefixHandlerName } from '../../shared/helpers'
import { nameof } from '../../shared/helpers'
import { ElectronUserAPI, ElectronUserAPI_Test } from '../../shared/types'
import { ipcMain } from 'electron'

export function register(): void {
  ipcMain.handle(
    prefixHandlerName(nameof<ElectronUserAPI>('test'), nameof<ElectronUserAPI_Test>('ping')),
    () => ping()
  )
}

export function ping(): string {
  return 'pong'
}

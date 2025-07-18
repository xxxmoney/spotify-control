import { ipcMain, shell } from 'electron'
import { nameof } from '../../shared/helpers'
import { ElectronUserAPI, ElectronUserAPI_Url } from '../../shared/types'
import { prefixHandlerName } from '../../shared/helpers'

export function register(): void {
  ipcMain.handle(
    prefixHandlerName(nameof<ElectronUserAPI>('url'), nameof<ElectronUserAPI_Url>('openUrl')),
    (_, url: string) => openUrl(url)
  )
}

export async function openUrl(url: string): Promise<void> {
  await shell.openExternal(url)
}

import { shell } from 'electron'

export async function openUrl(url: string): Promise<void> {
  await shell.openExternal(url)
}

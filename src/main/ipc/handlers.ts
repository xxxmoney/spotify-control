import * as XInput from 'xinput-ffi'
import { Device, DeviceState } from '@/shared/types'
import { shell } from 'electron'

export function ping(): string {
  return 'pong'
}

export async function getDevices(): Promise<Device[]> {
  return await XInput.identify({ XInputOnly: true })
}

export async function getDeviceState(deviceIndex): Promise<DeviceState> {
  return await XInput.getButtonsDown({ gamepad: deviceIndex })
}

export async function openUrl(url: string): Promise<void> {
  await shell.openExternal(url)
}

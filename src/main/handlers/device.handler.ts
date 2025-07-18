import { Device, DeviceState, ElectronUserAPI, ElectronUserAPI_Device } from '../../shared/types'
import * as XInput from 'xinput-ffi'
import { ipcMain } from 'electron'
import { nameof } from '../../shared/helpers'
import { prefixHandlerName } from '../../shared/helpers'

export function register(): void {
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('device'),
      nameof<ElectronUserAPI_Device>('getDevices')
    ),
    () => getDevices
  )
  ipcMain.handle(
    prefixHandlerName(
      nameof<ElectronUserAPI>('device'),
      nameof<ElectronUserAPI_Device>('getDeviceState')
    ),
    (_, deviceIndex: number) => getDeviceState(deviceIndex)
  )
}

export async function getDevices(): Promise<Device[]> {
  return await XInput.identify({ XInputOnly: true })
}

export async function getDeviceState(deviceIndex: number): Promise<DeviceState> {
  return await XInput.getButtonsDown({ gamepad: deviceIndex })
}

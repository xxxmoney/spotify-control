import { Device, DeviceState } from '@/shared/types'
import * as XInput from 'xinput-ffi'

export async function getDevices(): Promise<Device[]> {
  return await XInput.identify({ XInputOnly: true })
}

export async function getDeviceState(deviceIndex: number): Promise<DeviceState> {
  return await XInput.getButtonsDown({ gamepad: deviceIndex })
}

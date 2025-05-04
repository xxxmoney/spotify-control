import * as XInput from "xinput-ffi";
import {Device, DeviceState} from "@/shared/types";

export function ping (): string {
  return 'pong';
}

export async function getDevices(): Promise<Device[]> {
  return await XInput.identify({XInputOnly: true})
}

export async function getDeviceState(deviceIndex): Promise<DeviceState> {
  const state = await XInput.getButtonsDown({gamepad: deviceIndex});

  console.log(state)

  return state;
}

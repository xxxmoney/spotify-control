import * as XInput from "xinput-ffi";
import {Device} from "@/shared/types";

export function ping (): string {
  return 'pong';
}

export async function getDevices(): Promise<Device[]> {
  return await XInput.identify({XInputOnly: false});
}


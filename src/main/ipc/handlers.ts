import * as HID from 'node-hid';

export function ping (): string {
  return 'pong';
}

export async function getDevices(): Promise<HID.Device[]> {
  const devices = await HID.devicesAsync();

  return devices;
}


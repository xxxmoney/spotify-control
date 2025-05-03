import * as HID from "node-hid";

export function getDeviceId(device: HID.Device): string {
  if (!device) {
    throw new Error('Invalid device or deviceId')
  }

  return `${device.vendorId}_${device.productId}`
}

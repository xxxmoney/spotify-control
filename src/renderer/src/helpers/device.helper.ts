import {Device} from "src/shared/types";

export function getDeviceId(device: Device): string {
  if (!device) {
    throw new Error('Invalid device or deviceId')
  }

  return `${device.vendorID}_${device.productID}`
}

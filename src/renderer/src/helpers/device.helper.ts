import { Device } from '@/shared/types'

export function getDeviceId(device: Device): any {
  if (!device) {
    throw new Error('Invalid device or deviceId')
  }

  return `${device.vendorID}_${device.productID}`
}

export interface ElectronUserAPI {
  ping: () => Promise<string>
  getDevices: () => Promise<Device[]>
  getDeviceState: (deviceIndex: number) => Promise<DeviceState>
}

export interface Device {
  name: string
  manufacturer: string
  vendorID: number
  productID: number
  xinput: boolean
  interfaces: string[]
  guid: string[]
}

export interface DeviceState {
  packetNumber: number
  buttons: string[] | number
  trigger: {
    left: {
      active: boolean
      force: number
    }
    right: {
      active: boolean
      force: number
    }
  }
  thumb: {
    left: {
      x: number
      y: number
      magnitude: number
      direction: string[]
    }
    right: {
      x: number
      y: number
      magnitude: number
      direction: string[]
    }
  }
}

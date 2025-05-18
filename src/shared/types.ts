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

export interface Settings {
  bindings: BindingByDevice
}

export interface BindingByDevice {
  [deviceId: string]: DeviceBindings
}
export interface DeviceBindings {
  buttons: ActionByButton
  axes: ActionByAxis
}

export interface ActionByButton {
  [button: string]: ButtonAction[]
}
export interface ActionByAxis {
  [axis: string]: AxisAction[]
}

export interface ButtonAction {
  name: string
  settings: SettingsButtonAction
}
export interface AxisAction {
  name: string
  settings: SettingsAxisAction
}

export interface SettingsButtonAction {
  // TODO
}
export interface SettingsAxisAction {
  // TODO
}

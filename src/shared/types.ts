import { AxisActionTypeEnum, ButtonActionTypeEnum } from '@/renderer/src/enums/device.enums'

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

export interface DeviceTrigger {
  active: boolean
  force: number
}
export interface DeviceTriggers {
  left: DeviceTrigger
  right: DeviceTrigger
}
export interface DeviceThumb {
  x: number
  y: number
  magnitude: number
  direction: string[]
}
export interface DeviceThumbs {
  left: DeviceThumb
  right: DeviceThumb
}

export interface DeviceState {
  packetNumber: number
  buttons: string[] | number
  trigger: DeviceTriggers
  thumb: DeviceThumbs
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
  type: ButtonActionTypeEnum
  settings: SettingsButtonAction
}
export interface AxisAction {
  type: AxisActionTypeEnum
  settings: SettingsAxisAction
}

export interface SettingsButtonAction {}
export interface SettingsAxisAction {}

export interface SpotifyAuthParams {
  clientId: string
  redirectUri: string
  scope: string
}

export interface Env {
  spotifyClientId: string
}

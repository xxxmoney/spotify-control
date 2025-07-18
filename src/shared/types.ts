import { AxisActionTypeEnum, ButtonActionTypeEnum } from '@/renderer/src/enums/device.enums'
import { ExtensionReference } from 'electron-devtools-installer'
import { DateTime } from 'luxon'

export interface ElectronUserAPI {
  test: ElectronUserAPI_Test

  device: ElectronUserAPI_Device

  url: ElectronUserAPI_Url

  spotify: ElectronUserAPI_Spotify
}
export interface ElectronUserAPI_Test {
  ping: () => Promise<string>
}
export interface ElectronUserAPI_Device {
  getDevices: () => Promise<Device[]>
  getDeviceState: (deviceIndex: number) => Promise<DeviceState>
}
export interface ElectronUserAPI_Url {
  openUrl: (url: string) => Promise<void>
}
export interface ElectronUserAPI_Spotify {
  isCodeValid: () => Promise<boolean>
  isTokenValid: () => Promise<boolean>
  reacquireToken: () => Promise<void>
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
  responseType: string
}

export interface SpotifyTokenResponse {
  accessToken: string
  expiresAt: DateTime
}

export interface Env {
  spotifyClientId: string
}

export interface Constants {
  DEFAULT_WIDTH: number
  DEFAULT_HEIGHT: number
  MIN_WIDTH: number
  MIN_HEIGHT: number

  EXTENSIONS: ExtensionReference[]

  APP_PROTOCOL: string

  PROTOCOL_HANDLERS: {
    SPOTIFY_AUTH: string
  }

  SPOTIFY_BASE_URL: string
  SPOTIFY_AUTHORISE_URL: string
  SPOTIFY_TOKEN_URL: string
  SPOTIFY_SCOPES: string[]
  SPOTIFY_REDIRECT_URL: string
  SPOTIFY_RESPONSE_TYPE: string
  SPOTIFY_GRANT_TYPE: string
  SPOTIFY_TOKEN_RESPONSE_KEY: string
  SPOTIFY_CODE_KEY: string
  SPOTIFY_TOKEN_CHECK_INTERVAL: number

  BRIDGE_EXPOSE: {
    ELECTRON: string
    API: string
    ENV: string
    CONSTANTS: string
  }
}

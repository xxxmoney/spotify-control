import * as HID from "node-hid";

export interface ElectronUserAPI {
  ping: () => Promise<string>;
  getDevices: () => Promise<HID.Device[]>;
}

import * as HID from "node-hid";

export interface IElectronAPI {
  ping: () => Promise<string>;
  getDevices: () => Promise<HID.Device[]>;
}

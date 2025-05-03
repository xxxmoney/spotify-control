
export interface ElectronUserAPI {
  ping: () => Promise<string>;
  getDevices: () => Promise<Device[]>;
}

export interface Device {
  name: string;
  manufacturer: string;
  vendorID: number;
  productID: number;
  xinput: boolean;
  interfaces: string[];
  guid: string[];
}

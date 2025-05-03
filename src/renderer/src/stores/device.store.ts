import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import { useElectronAPI } from '@renderer/composables/api.comp'
import * as HID from 'node-hid'
import {getDeviceId} from "@renderer/helpers/device.helper";

export const useDeviceStore = defineStore('device', () => {
  const devices = ref([] as HID.Device[])
  const currentDeviceId = ref(null as null | string)
  const currentDevice = computed(() => devices.value.find(device => getDeviceId(device) === currentDeviceId.value))

  async function getDevices(): Promise<void> {
    const api = useElectronAPI()

    devices.value = []
    try {
      devices.value = await api.getDevices()
    } finally {
      devices.value = []
    }
  }

  function setCurrentDevice(device: HID.Device): void {
    currentDeviceId.value = getDeviceId(device)
  }
  function resetCurrentDevice(): void {
    currentDeviceId.value = null
  }

  return {
    devices,
    currentDevice,
    getDevices,
    setCurrentDevice,
    resetCurrentDevice
  }
})

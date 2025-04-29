import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronAPI } from '@renderer/composables/api.comp'
import * as HID from 'node-hid'

export const useDeviceStore = defineStore('device', () => {
  const devices = ref([] as HID.Device[])

  async function getDevices(): Promise<void> {
    const api = useElectronAPI()

    devices.value = []
    try {
      devices.value = await api.getDevices()
    } finally {
      devices.value = []
    }
  }

  return { devices, getDevices }
})

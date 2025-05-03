import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import { useElectronAPI } from '@renderer/composables/api.comp'
import {getDeviceId} from "@renderer/helpers/device.helper";
import {Device} from "src/shared/types";

export const useDeviceStore = defineStore('device', () => {
  const isLoading = ref(false)
  const devices = ref([] as Device[])
  const currentDeviceId = ref(null as null | string)
  const currentDevice = computed(() => devices.value.find(device => getDeviceId(device) === currentDeviceId.value))

  async function getDevices(): Promise<void> {
    const api = useElectronAPI()

    devices.value = []
    try {
      isLoading.value = true
      devices.value = await api.getDevices()
    } finally {
      isLoading.value = false
    }
  }

  function setCurrentDevice(device: Device): void {
    currentDeviceId.value = getDeviceId(device)
  }
  function resetCurrentDevice(): void {
    currentDeviceId.value = null
  }

  return {
    isLoading,
    devices,
    currentDevice,
    getDevices,
    setCurrentDevice,
    resetCurrentDevice
  }
})

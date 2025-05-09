import {computed, ref} from 'vue'
import { defineStore } from 'pinia'
import { useElectronAPI } from '@renderer/composables/api.comp'
import {getDeviceId} from "@renderer/helpers/device.helper";
import {Device, DeviceState} from "@/shared/types";
import {getObjectChanges, cloneDeep} from "@renderer/helpers/object.helper";

export const useDeviceStore = defineStore('device', () => {
  const api = useElectronAPI()

  const isLoading = ref(false)
  const devices = ref([] as Device[])
  const currentDeviceId = ref(null as null | string)
  const deviceStateLast = ref(null as null | DeviceState)
  const deviceStateCurrent = ref(null as null | DeviceState)

  const currentDeviceIndex = computed(() => devices.value.findIndex(device => getDeviceId(device) === currentDeviceId.value))
  const currentDevice = computed(() => currentDeviceIndex.value === -1 ? null : devices.value[currentDeviceIndex.value])
  const deviceStateDifference = computed(() => {
    if (!deviceStateCurrent.value) {
      return {}
    }

    return getObjectChanges(deviceStateCurrent.value, deviceStateLast.value)
  })

  function setCurrentDevice(device: Device): void {
    currentDeviceId.value = getDeviceId(device)
  }
  function resetCurrentDevice(): void {
    currentDeviceId.value = null
  }

  async function getDevices(): Promise<void> {
    devices.value = []
    try {
      isLoading.value = true
      devices.value = await api.getDevices()
    } finally {
      isLoading.value = false
    }
  }

  async function refreshDeviceState(): Promise<void> {
    if (currentDevice.value) {
      try {
        isLoading.value = true
        deviceStateLast.value = cloneDeep(deviceStateCurrent.value)
        deviceStateCurrent.value = await api.getDeviceState(currentDeviceIndex.value)
      } finally {
        isLoading.value = false
      }
    }
  }

  return {
    isLoading,
    devices,
    currentDevice,
    deviceStateLast,
    deviceStateCurrent,
    deviceStateDifference,

    setCurrentDevice,
    resetCurrentDevice,

    getDevices,
    refreshDeviceState,
  }
})

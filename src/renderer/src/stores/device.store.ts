import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronAPI } from '@renderer/composables/api.comp'
import { getDeviceId } from '@renderer/helpers/device.helper'
import { Device, DeviceState, Settings } from '@/shared/types'
import { getObjectChanges, cloneDeep } from '@renderer/helpers/object.helper'
import * as constants from '@renderer/constants/constants'
import { useStorage } from '@vueuse/core'
import { SETTINGS_KEY } from '@renderer/constants/constants'

export const useDeviceStore = defineStore('device', () => {
  const api = useElectronAPI()

  const isLoading = ref(false)
  const interval = ref(null as null | NodeJS.Timeout)
  const devices = ref([] as Device[])
  const currentDeviceId = ref(null as null | string)
  const deviceStateLast = ref(null as null | DeviceState)
  const deviceStateCurrent = ref(null as null | DeviceState)
  const settings = useStorage<Settings>(SETTINGS_KEY, { bindings: {} } as Settings)
  const currentBindings = computed({
    get: () => settings.value.bindings[currentDeviceId.value ?? ''],
    set: (value) => {
      settings.value.bindings[currentDeviceId.value ?? ''] = value
    }
  })

  // Whether state checking is running or not
  const isRunning = computed(() => !!interval.value)
  const currentDeviceIndex = computed(() =>
    devices.value.findIndex((device) => getDeviceId(device) === currentDeviceId.value)
  )
  const currentDevice = computed(() =>
    currentDeviceIndex.value === -1 ? null : devices.value[currentDeviceIndex.value]
  )
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

  function initializeCurrentBindings(): void {
    if (!currentDeviceId.value) {
      throw new Error('Current device Id is not set')
    }

    if (!currentBindings.value) {
      currentBindings.value = { buttons: {}, axes: {} }
    }
  }

  function startDeviceStateChecking(): void {
    if (interval.value) {
      stopDeviceStateChecking()
    }

    interval.value = setInterval(async () => {
      await refreshDeviceState()
    }, constants.INTERVAL_TIMEOUT)
  }
  function stopDeviceStateChecking(): void {
    if (interval.value) {
      clearInterval(interval.value)
      interval.value = null
    }
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
    try {
      isLoading.value = true
      deviceStateLast.value = cloneDeep(deviceStateCurrent.value)
      deviceStateCurrent.value = await api.getDeviceState(currentDeviceIndex.value)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    isRunning,
    devices,
    currentDevice,
    deviceStateLast,
    deviceStateCurrent,
    deviceStateDifference,
    currentBindings,

    setCurrentDevice,
    resetCurrentDevice,
    startDeviceStateChecking,
    stopDeviceStateChecking,
    initializeCurrentBindings,

    getDevices,
    refreshDeviceState
  }
})

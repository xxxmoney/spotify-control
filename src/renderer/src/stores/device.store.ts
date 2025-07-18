import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useElectronAPI } from '@renderer/composables/api.comp'
import { AxisAction, ButtonAction, Device, Settings } from '@/shared/types'
import { useStorage } from '@vueuse/core'
import { SETTINGS_KEY } from '@renderer/constants/constants'
import { getDeviceId } from '@renderer/helpers/device.helper'

export const useDeviceStore = defineStore('device', () => {
  const api = useElectronAPI()

  const isLoading = ref(false)
  const devices = ref([] as Device[])
  const currentDeviceId = ref(null as null | string)
  const settings = useStorage<Settings>(SETTINGS_KEY, { bindings: {} } as Settings)
  const currentBindings = computed({
    get: () => settings.value.bindings[currentDeviceId.value ?? ''],
    set: (value) => {
      settings.value.bindings[currentDeviceId.value ?? ''] = value
    }
  })

  const currentDeviceIndex = computed(() =>
    devices.value.findIndex((device) => getDeviceId(device) === currentDeviceId.value)
  )
  const currentDevice = computed(() =>
    currentDeviceIndex.value === -1 ? null : devices.value[currentDeviceIndex.value]
  )

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

  function addButtonBinding(button: string): void {
    currentBindings.value.buttons[button] = []
  }
  function removeButtonBinding(button: string): void {
    if (!currentBindings.value.buttons[button]) {
      throw new Error(`Button ${button} is not bound`)
    }

    delete currentBindings.value.buttons[button]
  }
  function updateActionsByButton(button: string, actions: ButtonAction[]): void {
    currentBindings.value.buttons[button] = actions
  }
  function addActionByButton(button: string, action: ButtonAction): void {
    if (!currentBindings.value.buttons[button]) {
      throw new Error(`Button ${button} is not bound`)
    }

    currentBindings.value.buttons[button].push(action)
  }
  function removeActionByButton(button: string, action: ButtonAction): void {
    if (!currentBindings.value.buttons[button]) {
      throw new Error(`Button ${button} is not bound`)
    }

    const index = currentBindings.value.buttons[button].indexOf(action)

    if (index === -1) {
      throw new Error(`Action ${action} is not bound to button ${button}`)
    }

    currentBindings.value.buttons[button].splice(index, 1)
  }

  function addAxisBinding(axis: string): void {
    currentBindings.value.axes[axis] = []
  }
  function removeAxisBinding(axis: string): void {
    if (!currentBindings.value.axes[axis]) {
      throw new Error(`Axis ${axis} is not bound`)
    }

    delete currentBindings.value.axes[axis]
  }
  function updateActionsByAxis(axis: string, actions: AxisAction[]): void {
    currentBindings.value.axes[axis] = actions
  }
  function addActionByAxis(axis: string, action: AxisAction): void {
    if (!currentBindings.value.axes[axis]) {
      throw new Error(`Axis ${axis} is not bound`)
    }

    currentBindings.value.axes[axis].push(action)
  }
  function removeActionByAxis(axis: string, action: AxisAction): void {
    if (!currentBindings.value.axes[axis]) {
      throw new Error(`Axis ${axis} is not bound`)
    }

    const index = currentBindings.value.axes[axis].indexOf(action)

    if (index === -1) {
      throw new Error(`Action ${action} is not bound to axis ${axis}`)
    }

    currentBindings.value.axes[axis].splice(index, 1)
  }

  async function fetchDevices(): Promise<void> {
    devices.value = []
    try {
      isLoading.value = true
      devices.value = await api.device.getDevices()
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    devices,
    currentDeviceId,
    currentDeviceIndex,
    currentDevice,
    currentBindings,

    setCurrentDevice,
    resetCurrentDevice,
    initializeCurrentBindings,

    addButtonBinding,
    removeButtonBinding,
    updateActionsByButton,
    addActionByButton,
    removeActionByButton,

    addAxisBinding,
    removeAxisBinding,
    updateActionsByAxis,
    addActionByAxis,
    removeActionByAxis,

    getDevices: fetchDevices
  }
})

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { DeviceState } from '@/shared/types'
import { cloneDeep, getObjectChanges } from '@renderer/helpers/object.helper'
import { useElectronAPI } from '@renderer/composables/api.comp'
import * as constants from '@renderer/constants/constants'
import { handleButtons, handleThumbs, handleTriggers } from '@renderer/helpers/handler.helper'
import { useDeviceStore } from '@renderer/stores/device.store'

export const useCheckingStore = defineStore('checking', () => {
  const api = useElectronAPI()
  const deviceStore = useDeviceStore()

  const interval = ref(null as null | NodeJS.Timeout)
  const isChecking = ref(false)
  const deviceStateLast = ref(null as null | DeviceState)
  const deviceStateCurrent = ref(null as null | DeviceState)

  // Whether state checking is running or not
  const deviceStateDifference = computed(() => {
    if (!deviceStateCurrent.value) {
      return {}
    }

    return getObjectChanges(deviceStateCurrent.value, deviceStateLast.value)
  })
  const currentDeviceId = computed(() => deviceStore.currentDeviceId)
  const currentDeviceIndex = computed(() => deviceStore.currentDeviceIndex)
  const currentBindings = computed(() => deviceStore.currentBindings)

  function startDeviceStateChecking(): void {
    isChecking.value = true

    setDeviceStateCheckingTimeout()
  }

  function setDeviceStateCheckingTimeout(): void {
    interval.value = setTimeout(async () => {
      if (!isChecking.value) {
        return
      }

      await refetchDeviceState()

      // TODO: handle too frequent checking (thus too frequent actions - maybe queue for actions?)
      await handleDeviceStateChange()

      if (isChecking.value) {
        // Restart the interval
        setDeviceStateCheckingTimeout()
      }
    }, constants.INTERVAL_TIMEOUT)
  }

  function stopDeviceStateChecking(): void {
    isChecking.value = false

    if (interval.value) {
      clearTimeout(interval.value)
      interval.value = null
    }
  }

  async function refetchDeviceState(): Promise<void> {
    deviceStateLast.value = cloneDeep(deviceStateCurrent.value)
    deviceStateCurrent.value = await api.getDeviceState(currentDeviceIndex.value)
  }

  async function handleDeviceStateChange(): Promise<void> {
    if (!currentDeviceId.value) {
      return
    }

    const promises: Promise<void>[] = []

    // Handle buttons
    if (deviceStateDifference.value.buttons) {
      promises.push(
        handleButtons(deviceStateDifference.value.buttons.current, currentBindings.value)
      )
    }

    // Handle triggers
    if (deviceStateDifference.value.trigger) {
      promises.push(
        handleTriggers(deviceStateDifference.value.trigger.current, currentBindings.value)
      )
    }

    // Handle thumbs
    if (deviceStateDifference.value.thumb) {
      promises.push(handleThumbs(deviceStateDifference.value.thumb.current, currentBindings.value))
    }

    await Promise.all(promises)
  }

  return {
    isChecking,
    deviceStateLast,
    deviceStateCurrent,
    deviceStateDifference,

    startDeviceStateChecking,
    stopDeviceStateChecking,
    refreshDeviceState: refetchDeviceState
  }
})

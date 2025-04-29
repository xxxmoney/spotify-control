<script setup lang="ts">
import { onMounted } from 'vue'
import * as HID from 'node-hid'
import { useDeviceStore } from '@renderer/stores/device.store'

const store = useDeviceStore()

const showDevice = async (device: HID.Device) => {
  // TODO
}

onMounted(async () => {
  await store.getDevices()
})
</script>

<template>
  <RouterView />
</template>

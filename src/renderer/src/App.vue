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
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Created by <code>xxxmoney</code></div>
  <div class="text">Spotify Control</div>
  <p class="tip">Select device:</p>

  <button class="action" @click="getDevices">Refresh</button>

  <div class="devices">
    <div v-for="device in devices" :key="device.productId" class="device">
      <button class="action" @click="showDevice(device)">
        {{ device.manufacturer }} {{ device.product }}
      </button>
    </div>
  </div>
</template>

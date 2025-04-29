<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'

const store = useDeviceStore()

const getDevices = async (): Promise<void> => {
  await store.getDevices()
}

const devices = computed(() => store.devices)
</script>

<template>
  <div class="devices-container">
    <p class="tip">Select device:</p>

    <button class="action" @click="getDevices">Refresh</button>

    <div class="devices">
      <div v-for="device in devices" :key="device.productId" class="device">
        <button class="action" @click="showDevice(device)">
          {{ device.manufacturer }} {{ device.product }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

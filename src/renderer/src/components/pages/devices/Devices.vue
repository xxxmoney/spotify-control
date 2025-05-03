<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useDeviceStore()

const getDevices = async (): Promise<void> => {
  await store.getDevices()
}

const devices = computed(() => store.devices)

async function goToDevice(device: any): Promise<void> {
  store.setCurrentDevice(device)

  await router.push({
    name: 'device',
    // params: {
    //   deviceId: getDeviceId(device),
    // },
  })
}
</script>

<template>
  <div class="devices-container">
    <p class="tip">Select device:</p>

    <button class="action" @click="getDevices">Refresh</button>

    <div class="devices">
      <div v-for="device in devices" :key="device.productId" class="device">
        <button class="action" @click="goToDevice(device)">
          {{ device.manufacturer }} {{ device.product }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

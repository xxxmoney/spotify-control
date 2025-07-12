<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RefreshIcon from '@renderer/components/reusable/RefreshIcon.vue'
import { Device } from '@/shared/types'

const router = useRouter()
const deviceStore = useDeviceStore()

const isLoading = computed(() => deviceStore.isLoading)
const devices = computed(() => deviceStore.devices)

async function getDevices(): Promise<void> {
  await deviceStore.getDevices()
}

async function goToDevice(device: Device): Promise<void> {
  deviceStore.setCurrentDevice(device)

  await router.push({
    name: 'device'
  })
}

onMounted(async () => {
  await getDevices()
})
</script>

<template>
  <div class="devices-container">
    <div>
      <button :disabled="isLoading" class="action" @click="getDevices">
        <RefreshIcon />
      </button>
    </div>

    <div class="devices">
      <div v-for="device in devices" :key="device.productID" class="device">
        <button class="action" @click="goToDevice(device)">
          {{ device.manufacturer }} {{ device.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

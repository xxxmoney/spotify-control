<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed, onMounted } from 'vue'

const deviceStore = useDeviceStore()

const isRunning = computed(() => deviceStore.isRunning)

function switchDeviceStateChecking(): void {
  if (deviceStore.isRunning) {
    deviceStore.stopDeviceStateChecking()
  } else {
    deviceStore.startDeviceStateChecking()
  }
}

onMounted(async () => {
  await deviceStore.refreshDeviceState()
})
</script>

<template>
  <div class="device-run-container">
    <button class="action rounded" :class="{ pulse: isRunning }" @click="switchDeviceStateChecking">
      <span class="uppercase">{{ isRunning ? 'stop' : 'start' }}</span>
    </button>
  </div>
</template>

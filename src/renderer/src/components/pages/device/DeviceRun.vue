<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed, onMounted } from 'vue'

const store = useDeviceStore()

const isRunning = computed(() => store.isRunning)

function switchDeviceStateChecking(): void {
  if (store.isRunning) {
    store.stopDeviceStateChecking()
  } else {
    store.startDeviceStateChecking()
  }
}

onMounted(async () => {
  await store.refreshDeviceState()
})
</script>

<template>
  <div class="device-run-container">
    <button class="action rounded" :class="{ pulse: isRunning }" @click="switchDeviceStateChecking">
      <span class="uppercase">{{ isRunning ? 'stop' : 'start' }}</span>
    </button>
  </div>
</template>

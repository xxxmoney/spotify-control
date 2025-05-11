<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { onMounted } from 'vue'

const store = useDeviceStore()

// Add logic cor continoously getting current state and using the difference

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
    <!-- TODO: add buttons to start and stop, maybe current key presses   -->

    <button class="action" @click="switchDeviceStateChecking">START</button>
  </div>
</template>

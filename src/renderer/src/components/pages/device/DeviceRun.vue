<script setup lang="ts">
import { useCheckingStore } from '@renderer/stores/checking.store'
import { computed, onMounted } from 'vue'

const checkingStore = useCheckingStore()

const isRunning = computed(() => checkingStore.isRunning)

function switchDeviceStateChecking(): void {
  if (checkingStore.isRunning) {
    checkingStore.stopDeviceStateChecking()
  } else {
    checkingStore.startDeviceStateChecking()
  }
}

onMounted(async () => {
  await checkingStore.refreshDeviceState()
})
</script>

<template>
  <div class="device-run-container">
    <button class="action rounded" :class="{ pulse: isRunning }" @click="switchDeviceStateChecking">
      <span class="uppercase">{{ isRunning ? 'stop' : 'start' }}</span>
    </button>
  </div>
</template>

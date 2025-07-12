<script setup lang="ts">
import { useCheckingStore } from '@renderer/stores/checking.store'
import { computed, onMounted } from 'vue'

const checkingStore = useCheckingStore()

const isChecking = computed(() => checkingStore.isChecking)

function switchDeviceStateChecking(): void {
  if (checkingStore.isChecking) {
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
    <button
      class="action rounded"
      :class="{ pulse: isChecking }"
      @click="switchDeviceStateChecking"
    >
      <span class="uppercase">{{ isChecking ? 'stop' : 'start' }}</span>
    </button>
  </div>
</template>

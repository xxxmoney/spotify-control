<script setup lang="ts">
import DeviceSetup from '@renderer/components/pages/device/DeviceSetup.vue'
import DeviceRun from '@renderer/components/pages/device/DeviceRun.vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed, onUnmounted } from 'vue'

const store = useDeviceStore()

const isRunning = computed(() => store.isRunning)
const deviceName = computed(() => store.currentDevice!.name)

onUnmounted(() => {
  store.resetCurrentDevice()
})
</script>

<template>
  <div class="device-page">
    <h1 class="title" :class="{ pulse: isRunning }">{{ deviceName }}</h1>

    <DeviceRun />
    <DeviceSetup v-if="!isRunning" />
    <div v-else>
      <h2 class="subtitle pulse">Running...</h2>
    </div>
  </div>
</template>

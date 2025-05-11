<script setup lang="ts">
import DeviceSetup from '@renderer/components/pages/device/DeviceSetup.vue'
import DeviceRun from '@renderer/components/pages/device/DeviceRun.vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'

const store = useDeviceStore()

const deviceName = computed(() => store.currentDevice!.name)
</script>

<template>
  <div class="device-page">
    <h1 class="title">{{ deviceName }}</h1>

    <DeviceRun />
    <DeviceSetup />
  </div>
</template>

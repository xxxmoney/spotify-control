<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'

const store = useDeviceStore()

const device = computed(() => store.currentDevice!)

// TODO: Implement device control
</script>

<template>
  <div class="device-setup-container">
    <!-- TODO: add binding here   -->

    {{ device.name }}
  </div>
</template>

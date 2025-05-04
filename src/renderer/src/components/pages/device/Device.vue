<script setup lang="ts">
  import {useDeviceStore} from "@renderer/stores/device.store";
  import {computed, onMounted, onUnmounted} from "vue";

  const store = useDeviceStore()

  const device = computed(() => store.currentDevice)
  const state = computed(() => store.currentDeviceState)

  onMounted(async () => {
    await store.getCurrentDeviceState()
  })
  onUnmounted(() => {
    store.resetCurrentDevice()
  })

  // TODO: Implement device control

</script>

<template>
  <div class="device-container">

  </div>
</template>

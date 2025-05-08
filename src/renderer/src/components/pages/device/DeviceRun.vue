<script setup lang="ts">
  import {useDeviceStore} from "@renderer/stores/device.store";
  import {onMounted} from "vue";

  const store = useDeviceStore()

// Add logic cor continoously getting current state and using the difference

  onMounted(async () => {
    await store.getCurrentDeviceState()

    console.log(store.deviceStateDifference)
  })
</script>

<template>
  <div class="device-run-container">
    <!-- TODO: add buttons to start and stop, maybe current key presses   -->
  </div>
</template>

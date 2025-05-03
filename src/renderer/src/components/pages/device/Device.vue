<script setup lang="ts">
  import {useDeviceStore} from "@renderer/stores/device.store";
  import {computed} from "vue";

  const store = useDeviceStore()

  const device = computed(() => store.currentDevice)

  // TODO: Implement device control

</script>

<template>
  <div class="device-container">

  </div>
</template>

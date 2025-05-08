<script setup lang="ts">

import DeviceSetup from "@renderer/components/pages/device/DeviceSetup.vue";
import DeviceRun from "@renderer/components/pages/device/DeviceRun.vue";
</script>

<template>
  <div class="device-page">
    <h1 class="title">Device</h1>

    <DeviceRun />
    <DeviceSetup />
  </div>
</template>

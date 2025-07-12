<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { onBeforeMount } from 'vue'
import ButtonSelector from '@renderer/components/pages/device/button/ButtonSelector.vue'
import Buttons from '@renderer/components/pages/device/button/Buttons.vue'
import AxisSelector from '@renderer/components/pages/device/axis/AxisSelector.vue'
import Axes from '@renderer/components/pages/device/axis/Axes.vue'

const deviceStore = useDeviceStore()

onBeforeMount(() => {
  deviceStore.initializeCurrentBindings()
})
</script>

<template>
  <div class="device-setup-container">
    <div class="device-setup-actions-container">
      <div>
        <span class="subtitle center">Buttons</span>
        <ButtonSelector />
      </div>
      <Buttons />
    </div>

    <hr class="delimiter-xl" />

    <div class="device-setup-actions-container">
      <div>
        <span class="subtitle center">Axes</span>
        <AxisSelector />
      </div>
      <Axes />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { onBeforeMount } from 'vue'
import ButtonSelector from '@renderer/components/pages/device/ButtonSelector.vue'
import Buttons from '@renderer/components/pages/device/Buttons.vue'

const store = useDeviceStore()

onBeforeMount(() => {
  store.initializeCurrentBindings()
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

    <div class="device-setup-actions-container">
      <!--     TODO-->
    </div>
  </div>
</template>

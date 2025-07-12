<script setup lang="ts">
import AxisActions from '@renderer/components/pages/device/axis/AxisActions.vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'

const deviceStore = useDeviceStore()

const bindings = computed(() => deviceStore.currentBindings)

function removeAxis(axis: string): void {
  deviceStore.removeAxisBinding(axis)
}
</script>

<template>
  <div class="device-setup-actions">
    <template v-for="(_, axis) in bindings.axes" :key="axis">
      <hr />

      <AxisActions :axis="axis as string" @remove="removeAxis(axis as string)" />
    </template>
  </div>
</template>

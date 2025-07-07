<script setup lang="ts">
import ButtonActions from '@renderer/components/pages/device/button/ButtonActions.vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed } from 'vue'

const store = useDeviceStore()

const bindings = computed(() => store.currentBindings)

function removeButton(button: string): void {
  store.removeButtonBinding(button)
}
</script>

<template>
  <div class="device-setup-actions">
    <template v-for="(_, button) in bindings.buttons" :key="button">
      <hr />

      <ButtonActions :button="button as string" @remove="removeButton(button as string)" />
    </template>
  </div>
</template>

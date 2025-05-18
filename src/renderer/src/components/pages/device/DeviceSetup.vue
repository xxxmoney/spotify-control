<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed, onBeforeMount } from 'vue'

const store = useDeviceStore()

const bindings = computed(() => store.currentBindings)

function addButtonBinding(): void {
  // TODO
}
function addAxisBinding(): void {
  // TODO
}

onBeforeMount(() => {
  store.initializeCurrentBindings()
})
</script>

<template>
  <div class="device-setup-container">
    <div>
      <span>BUTTONS</span>

      <div class="device-setup-actions">
        <template v-for="actions in bindings.buttons">
          {{ actions.length }}
        </template>
      </div>

      <button class="action" @click="addButtonBinding">ADD</button>
    </div>

    <div>
      <span>AXIS</span>

      <div class="device-setup-actions">
        <template v-for="actions in bindings.buttons">
          {{ actions.length }}
        </template>
      </div>

      <button class="action" @click="addAxisBinding">ADD</button>
    </div>
  </div>
</template>

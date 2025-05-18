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
          <template v-for="action in actions">
            <!--          TODO-->
          </template>
        </template>
      </div>

      <button class="action" @click="addButtonBinding">ADD</button>
    </div>

    <div>
      <span>AXES</span>

      <div class="device-setup-actions">
        <template v-for="actions in bindings.buttons">
          <template v-for="action in actions">
            <!--          TODO-->
          </template>
        </template>
      </div>

      <button class="action" @click="addAxisBinding">ADD</button>
    </div>
  </div>
</template>

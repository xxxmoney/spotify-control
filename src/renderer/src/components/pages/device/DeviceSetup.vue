<script setup lang="ts">
import { useDeviceStore } from '@renderer/stores/device.store'
import { computed, onBeforeMount } from 'vue'
import ButtonActions from '@renderer/components/pages/device/ButtonActions.vue'
import AxesActions from '@renderer/components/pages/device/AxesActions.vue'

const store = useDeviceStore()

const bindings = computed(() => store.currentBindings)

// TODO: for add button and add axis binding- maybe take button as parameter

function addButtonBinding(): void {
  store.addButtonBinding()
}
function addAxisBinding(): void {
  store.addAxisBinding()
}

onBeforeMount(() => {
  store.initializeCurrentBindings()
})
</script>

<template>
  <div class="device-setup-container">
    <div>
      <span class="subtitle">Buttons</span>

      <div class="device-setup-actions">
        <template v-for="(_, index) in bindings.buttons" :key="index">
          <ButtonActions v-model="bindings.buttons[index]" />
        </template>
      </div>

      <button class="action rounded" @click="addButtonBinding">+</button>
    </div>

    <div>
      <span class="subtitle">Axes</span>

      <div class="device-setup-actions">
        <template v-for="(_, index) in bindings.axes" :key="index">
          <AxesActions v-model="bindings.axes[index]" />
        </template>
      </div>

      <button class="action rounded" @click="addAxisBinding">+</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AXES } from '@renderer/constants/device.constants'
import { computed, ref } from 'vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import * as _ from 'lodash'

const store = useDeviceStore()

const selectedAxis = ref('')

const allAxes = Object.values(AXES)
const usedAxes = computed(() => {
  return Object.keys(store.currentBindings.axes)
})

const availableAxes = computed(() => _.difference(allAxes, usedAxes.value))

function resetSelectedAxis(): void {
  selectedAxis.value = ''
}

function addAxisBinding(): void {
  store.addAxisBinding(selectedAxis.value)

  resetSelectedAxis()
}
</script>

<template>
  <div class="axis-selector-container">
    <select v-model="selectedAxis">
      <option disabled value="">Please select an axis</option>

      <template v-for="value in availableAxes" :key="value">
        <option :value="value">{{ value }}</option>
      </template>
    </select>

    <button class="action rounded center" :disabled="selectedAxis === ''" @click="addAxisBinding">
      +
    </button>
  </div>
</template>

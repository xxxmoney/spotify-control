<script setup lang="ts">
import { BUTTONS } from '@renderer/constants/device.constants'
import { computed, ref } from 'vue'
import { useDeviceStore } from '@renderer/stores/device.store'
import * as _ from 'lodash'

const store = useDeviceStore()

const selectedButton = ref('')

const allButtons = Object.values(BUTTONS)
const usedButtons = computed(() => {
  return Object.keys(store.currentBindings.buttons)
})

const availableButtons = computed(() => _.difference(allButtons, usedButtons.value))

function resetSelectedButton(): void {
  selectedButton.value = ''
}

function addButtonBinding(): void {
  store.addButtonBinding(selectedButton.value)

  resetSelectedButton()
}
</script>

<template>
  <div class="button-selector-container">
    <select v-model="selectedButton">
      <option disabled value="">Please select a button</option>

      <template v-for="value in availableButtons" :key="value">
        <option :value="value">{{ value }}</option>
      </template>
    </select>

    <button class="action rounded" :disabled="selectedButton === ''" @click="addButtonBinding">
      +
    </button>
  </div>
</template>

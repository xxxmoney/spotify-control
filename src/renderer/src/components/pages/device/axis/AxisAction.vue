<script setup lang="ts">
import { AxisAction } from '@/shared/types'
import { computed } from 'vue'
import { AxisActionTypeEnum } from '@renderer/enums/device.enums'

const props = defineProps<{
  modelValue: AxisAction
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: AxisAction): void
  (e: 'remove'): void
}>()

const action = computed({
  get: () => props.modelValue,
  set: (value: AxisAction) => {
    emit('update:modelValue', value)
  }
})

function remove(): void {
  emit('remove')
}
</script>

<template>
  <div class="axis-action-container">
    <select v-model="action.type">
      <option disabled :value="AxisActionTypeEnum.None">Please select an option</option>

      <option :value="AxisActionTypeEnum.Volume">Volume Up</option>
    </select>

    <button class="action rounded danger" @click="remove">-</button>
  </div>
</template>

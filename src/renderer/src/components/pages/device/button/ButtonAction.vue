<script setup lang="ts">
import { ButtonAction } from '@/shared/types'
import { computed } from 'vue'
import { ButtonActionTypeEnum } from '@renderer/enums/device.enums'

const props = defineProps<{
  modelValue: ButtonAction
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: ButtonAction): void
  (e: 'remove'): void
}>()

const action = computed({
  get: () => props.modelValue,
  set: (value: ButtonAction) => {
    emit('update:modelValue', value)
  }
})

function remove(): void {
  emit('remove')
}
</script>

<template>
  <div class="button-action-container">
    <select v-model="action.type">
      <option disabled :value="ButtonActionTypeEnum.None">Please select an option</option>

      <option :value="ButtonActionTypeEnum.VolumeUp">Volume Up</option>
      <option :value="ButtonActionTypeEnum.VolumeDown">Volume Down</option>
    </select>

    <button class="action rounded danger" @click="remove">-</button>
  </div>
</template>

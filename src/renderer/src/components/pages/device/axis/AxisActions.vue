<script setup lang="ts">
import { AxisAction as AxisActionType } from '@/shared/types'
import { computed } from 'vue'
import AxisAction from '@renderer/components/pages/device/axis/AxisAction.vue'

const props = defineProps<{
  modelValue: AxisActionType[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: AxisActionType[]): void
}>()

const actions = computed({
  get: () => props.modelValue,
  set: (value: AxisActionType[]) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
    <template v-for="(_, index) in actions" :key="index">
      <AxisAction v-model="actions[index]" />
    </template>

    <!--    TODO-->
  </div>
</template>

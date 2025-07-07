<script setup lang="ts">
import { AxesAction as AxesActionType } from '@/shared/types'
import { computed } from 'vue'
import AxisAction from '@renderer/components/pages/device/axis/AxisAction.vue'

const props = defineProps<{
  modelValue: AxesActionType[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: AxesActionType[]): void
}>()

const actions = computed({
  get: () => props.modelValue,
  set: (value: AxesActionType[]) => {
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

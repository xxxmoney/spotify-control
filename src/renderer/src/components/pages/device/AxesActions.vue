<script setup lang="ts">
import { AxesAction as AxesActionType } from '@/shared/types'
import { computed } from 'vue'
import AxesAction from '@renderer/components/pages/device/AxesAction.vue'

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
      <AxesAction v-model="actions[index]" />
    </template>

    <!--    TODO-->
  </div>
</template>

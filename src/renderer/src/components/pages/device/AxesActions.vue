<script setup lang="ts">
import { AxesAction, ButtonAction } from '@/shared/types'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: AxesAction[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: AxesAction[]): void
}>()

const actions = computed({
  get: () => props.modelValue,
  set: (value: AxesAction[]) => {
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

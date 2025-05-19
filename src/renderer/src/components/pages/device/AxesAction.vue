<script setup lang="ts">
import { AxesAction } from '@/shared/types'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: AxesAction
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: AxesAction): void
}>()

const action = computed({
  get: () => props.modelValue,
  set: (value: AxesAction) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
    <!--    TODO-->
  </div>
</template>

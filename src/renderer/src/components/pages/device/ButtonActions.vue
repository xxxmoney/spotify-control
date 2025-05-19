<script setup lang="ts">
import { ButtonAction } from '@/shared/types'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: ButtonAction[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: ButtonAction[]): void
}>()

const actions = computed({
  get: () => props.modelValue,
  set: (value: ButtonAction[]) => {
    emit('update:modelValue', value)
  }
})
</script>

<template>
  <div>
    <template v-for="(_, index) in actions" :key="index">
      <ButtonAction v-model="actions[index]" />
    </template>

    <!--    TODO-->
  </div>
</template>

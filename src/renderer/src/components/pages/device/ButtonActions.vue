<script setup lang="ts">
import { ButtonAction as ButtonActionType } from '@/shared/types'
import { computed } from 'vue'
import ButtonAction from '@renderer/components/pages/device/ButtonAction.vue'

const props = defineProps<{
  modelValue: ButtonActionType[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: ButtonActionType[]): void
}>()

const actions = computed({
  get: () => props.modelValue,
  set: (value: ButtonActionType[]) => {
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

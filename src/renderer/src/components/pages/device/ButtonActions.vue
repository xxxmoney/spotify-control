<script setup lang="ts">
import { computed } from 'vue'
import ButtonAction from '@renderer/components/pages/device/ButtonAction.vue'
import { ButtonActionTypeEnum } from '@renderer/enums/device.enums'
import { useDeviceStore } from '@renderer/stores/device.store'
import { ButtonAction as ButtonActionType } from '@/shared/types'

const props = defineProps<{
  button: string
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const store = useDeviceStore()

const button = computed(() => props.button)
const actions = computed(() => store.currentBindings.buttons[button.value])

function addAction(): void {
  store.addActionByButton(button.value, {
    type: ButtonActionTypeEnum.None,
    settings: {}
  })
}
function removeAction(buttonAction: ButtonActionType): void {
  store.removeActionByButton(button.value, buttonAction)
}
function removeButton(): void {
  emit('remove')
}
</script>

<template>
  <div class="button-actions-container">
    <div class="button-actions-header">
      <span class="text">{{ button }}</span>
      <button class="action rounded danger" @click="removeButton">-</button>
    </div>

    <template v-for="(buttonAction, index) in actions" :key="index">
      <ButtonAction v-model="actions[index]" @remove="removeAction(buttonAction)" />
    </template>

    <button class="action center" @click="addAction">New Action</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AxisAction from '@renderer/components/pages/device/axis/AxisAction.vue'
import { AxisActionTypeEnum } from '@renderer/enums/device.enums'
import { useDeviceStore } from '@renderer/stores/device.store'
import { AxisAction as AxisActionType } from '@/shared/types'

const props = defineProps<{
  axis: string
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const store = useDeviceStore()

const axis = computed(() => props.axis)
const actions = computed(() => store.currentBindings.axes[axis.value])

function addAction(): void {
  store.addActionByAxis(axis.value, {
    type: AxisActionTypeEnum.None,
    settings: {}
  })
}
function removeAction(axisAction: AxisActionType): void {
  store.removeActionByAxis(axis.value, axisAction)
}
function removeAxis(): void {
  emit('remove')
}
</script>

<template>
  <div class="axis-actions-container">
    <div class="axis-actions-header">
      <span class="text">{{ axis }}</span>
      <button class="action rounded danger" @click="removeAxis">-</button>
    </div>

    <template v-for="(axisAction, index) in actions" :key="index">
      <AxisAction v-model="actions[index]" @remove="removeAction(axisAction)" />
    </template>

    <button class="action center" @click="addAction">New Action</button>
  </div>
</template>

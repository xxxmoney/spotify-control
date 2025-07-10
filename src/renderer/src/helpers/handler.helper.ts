import {
  AxisAction,
  ButtonAction,
  DeviceBindings,
  DeviceThumbs,
  DeviceTriggers
} from '@/shared/types'
import { AxisActionTypeEnum, ButtonActionTypeEnum } from '@renderer/enums/device.enums'
import { AXES, AXES_VALUE_RANGES } from '@renderer/constants/device.constants'

export async function handleButtons(buttons: string[], binding: DeviceBindings): Promise<void> {
  const promises: Promise<void>[] = []

  for (const button of buttons) {
    const buttonActions = binding.buttons[button]

    if (buttonActions) {
      promises.push(handleButtonActions(buttonActions, button))
    }
  }

  await Promise.all(promises)
}

export async function handleTriggers(
  triggers: DeviceTriggers,
  binding: DeviceBindings
): Promise<void> {
  const promises: Promise<void>[] = []

  if (triggers.left && triggers.left.active) {
    const axis = AXES.LEFT_TRIGGER
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(
        handleAxisActions(
          actions,
          axis,
          triggers.left.force,
          AXES_VALUE_RANGES.TRIGGER.MIN,
          AXES_VALUE_RANGES.TRIGGER.MAX
        )
      )
    }
  }
  if (triggers.right && triggers.right.active) {
    const axis = AXES.RIGHT_TRIGGER
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(
        handleAxisActions(
          actions,
          axis,
          triggers.right.force,
          AXES_VALUE_RANGES.TRIGGER.MIN,
          AXES_VALUE_RANGES.TRIGGER.MAX
        )
      )
    }
  }

  await Promise.all(promises)
}

export async function handleThumbs(thumbs: DeviceThumbs, binding: DeviceBindings): Promise<void> {
  const promises: Promise<void>[] = []

  if (thumbs.left) {
    const axis = AXES.LEFT_X
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(
        handleAxisActions(
          actions,
          axis,
          thumbs.left.magnitude,
          AXES_VALUE_RANGES.THUMB.MIN,
          AXES_VALUE_RANGES.THUMB.MAX
        )
      )
    }
  }
  if (thumbs.right) {
    const axis = AXES.RIGHT_X
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(
        handleAxisActions(
          actions,
          axis,
          thumbs.right.magnitude,
          AXES_VALUE_RANGES.THUMB.MIN,
          AXES_VALUE_RANGES.THUMB.MAX
        )
      )
    }
  }

  await Promise.all(promises)
}

async function handleButtonActions(buttonActions: ButtonAction[], button: string): Promise<void> {
  if (buttonActions) {
    for (const action of buttonActions) {
      console.log(`Action '${action.type}' triggered for button ${button}`)

      switch (action.type) {
        case ButtonActionTypeEnum.VolumeUp:
          // TODO: handle volume up action
          break
        case ButtonActionTypeEnum.VolumeDown:
          // TODO: handle volume down action
          break
        default:
          console.warn(`Unknown action type: '${action.type}' for button ${button}`)
          break
      }
    }
  }
}

async function handleAxisActions(
  axisActions: AxisAction[],
  axis: string,
  value: number,
  minimumValue: number,
  maximumValue: number
): Promise<void> {
  for (const action of axisActions) {
    console.log(
      `Action '${action.type}' triggered for axis ${axis} with value ${value} (${minimumValue} - ${maximumValue})`
    )

    switch (action.type) {
      case AxisActionTypeEnum.Volume:
        // TODO: handle volume action
        break
      default:
        console.warn(`Unknown action type: '${action.type}' for trigger ${axis}`)
        break
    }
  }
}

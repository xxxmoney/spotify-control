import {
  AxisAction,
  ButtonAction,
  DeviceBindings,
  DeviceThumbs,
  DeviceTriggers
} from '@/shared/types'
import { AxisActionTypeEnum, ButtonActionTypeEnum } from '@renderer/enums/device.enums'
import { AXES } from '@renderer/constants/device.constants'

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

  if (triggers.left) {
    const axis = AXES.LEFT_TRIGGER
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(handleAxisActions(actions, axis))
    }
  }
  if (triggers.right) {
    const axis = AXES.RIGHT_TRIGGER
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(handleAxisActions(actions, axis))
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
      promises.push(handleAxisActions(actions, axis))
    }
  }
  if (thumbs.right) {
    const axis = AXES.RIGHT_X
    const actions = binding.axes[axis]
    if (actions) {
      promises.push(handleAxisActions(actions, axis))
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

async function handleAxisActions(axisActions: AxisAction[], axis: string): Promise<void> {
  for (const action of axisActions) {
    switch (action.type) {
      case AxisActionTypeEnum.Volume:
        console.log(`Action '${action.type}' triggered for left trigger`)
        // TODO: handle volume action
        break
      default:
        console.warn(`Unknown action type: '${action.type}' for trigger ${axis}`)
        break
    }
  }
}

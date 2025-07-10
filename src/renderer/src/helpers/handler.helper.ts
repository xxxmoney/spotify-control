import { DeviceBindings, DeviceThumbs, DeviceTriggers } from '@/shared/types'
import { AxisActionTypeEnum, ButtonActionTypeEnum } from '@renderer/enums/device.enums'
import { AXES } from '@renderer/constants/device.constants'

export async function handleButtons(buttons: string[], binding: DeviceBindings): Promise<void> {
  for (const button of buttons) {
    const buttonActions = binding.buttons[button]

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
}

export async function handleTriggers(
  triggers: DeviceTriggers,
  binding: DeviceBindings
): Promise<void> {
  let trigger: string | null = null
  if (triggers.left) {
    trigger = AXES.LEFT_TRIGGER
  }
  if (triggers.right) {
    trigger = AXES.RIGHT_TRIGGER
  }

  return await handleAxis(trigger, binding)
}

export async function handleThumbs(thumbs: DeviceThumbs, binding: DeviceBindings): Promise<void> {
  let thumb: string | null = null
  if (thumbs.left) {
    thumb = AXES.LEFT_X
  }
  if (thumbs.right) {
    thumb = AXES.RIGHT_X
  }

  return await handleAxis(thumb, binding)
}

async function handleAxis(axis: string | null, binding: DeviceBindings): Promise<void> {
  if (axis) {
    const triggerActions = binding.axes['XINPUT_GAMEPAD_LEFT_TRIGGER']
    if (triggerActions) {
      for (const action of triggerActions) {
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
  }
}

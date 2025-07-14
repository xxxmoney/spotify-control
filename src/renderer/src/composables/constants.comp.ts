import type { Constants } from '@/shared/types'

export function useConstants(): Constants {
  // @ts-ignore (define in dts)
  const constants = window.constants as Constants

  return {
    ...constants
  }
}

import type { Constants } from '@/shared/types'

export function useConstants(): Constants {
  // @ts-ignore (define in dts)
  const constants = window.env as Constants

  return {
    ...constants
  }
}

import type { Env } from '@/shared/types'

export function useEnv(): Env {
  // @ts-ignore (define in dts)
  const env = window.env as Env

  return {
    ...env
  }
}

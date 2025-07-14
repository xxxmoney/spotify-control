import type { Env } from '@/shared/types'

export function useEnv(): Env {
  const env = window.env as Env

  return {
    ...env
  }
}

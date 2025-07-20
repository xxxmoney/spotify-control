import Store from 'electron-store'

const store = new Store()

export function get<T>(key: string): T | undefined {
  const value = store.get(key)
  if (typeof value !== 'string') {
    return value as T | undefined
  }

  try {
    return JSON.parse(value) as T
  } catch {
    return value as unknown as T
  }
}

export function set<T>(key: string, value: T): void {
  if (typeof value === 'object' && value !== null) {
    store.set(key, JSON.stringify(value))
  } else {
    store.set(key, value)
  }
}

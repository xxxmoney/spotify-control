const store = new Map()

export function get<T>(key: string): T | undefined {
  return store.get(key) as T | undefined
}

export function set<T>(key: string, value: T): void {
  store.set(key, value)
}

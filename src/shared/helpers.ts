export function nameof<T>(name: keyof T): keyof T {
  return name
}

export function prefixHandlerName(mainApiName: string, specificApiName: string): string {
  return `${mainApiName}:${specificApiName}`
}

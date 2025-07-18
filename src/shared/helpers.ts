import * as _ from 'lodash'

export function nameof<T>(name: keyof T): keyof T {
  return name
}

export function prefixHandlerName(mainApiName: string, specificApiName: string): string {
  return `${mainApiName}:${specificApiName}`
}

export function toSnakeCase<T>(value: T): Record<string, any> {
  if (!value) {
    return {}
  }

  return _.mapKeys(value, (__, key) => _.snakeCase(key))
}

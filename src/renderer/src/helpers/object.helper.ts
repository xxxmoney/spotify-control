import * as _ from 'lodash'

export function getObjectChanges<T>(currentObj: T, lastObj: T): any {
  currentObj = currentObj || ({} as T)
  lastObj = lastObj || ({} as T)

  // Union of keys from both objects
  const allKeys = _.union(_.keys(lastObj), _.keys(currentObj))

  // Like reduce but mutates the accumulator
  return _.transform(
    allKeys,
    (result, key) => {
      const currentValue = currentObj[key]
      const lastValue = lastObj[key]

      // Deep comparison is equal
      if (!_.isEqual(currentValue, lastValue)) {
        result[key] = {
          last: lastValue,
          current: currentValue
        }
      }
    },
    {}
  )
}

export function cloneDeep<T>(obj: T): T | null {
  if (!obj) {
    return null
  }

  return _.cloneDeep(obj)
}

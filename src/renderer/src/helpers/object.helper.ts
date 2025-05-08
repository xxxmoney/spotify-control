import * as _ from "lodash";

export function getObjectChanges(currentObj, lastObj) {
  currentObj = currentObj || {};
  lastObj = lastObj || {};

  // Union of keys from both objects
  const allKeys = _.union(_.keys(lastObj), _.keys(currentObj));

  // Like reduce but mutates the accumulator
  return _.transform(allKeys, (result, key) => {
    const currentValue = currentObj[key];
    const lastValue = lastObj[key];

    // Deep comparison is equal
    if (!_.isEqual(currentValue, lastValue)) {
      result[key] = {
        last: lastValue,
        current: currentValue
      };
    }
  }, {});
}

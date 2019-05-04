import { isNullable } from '../validate';

import { returnNullableValue } from './shared';

const mockObj = (opts = {}) => {
  const isNull = isNullable(opts);
  const {
    properties, additionalProperties, minProperties, maxProperties,
  } = opts;

  const obj = {};

  if (isNull) {
    return returnNullableValue(obj);
  }
  return obj;
};

export default mockObj;

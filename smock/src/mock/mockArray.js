import { includes, isEmpty, random } from 'lodash';

import { isNullable } from '../validate';

import getFunc from './func';
import { getRandomType, returnNullableValue } from './shared';

const mockArray = (opts = {}) => {
  const isNull = isNullable(opts);
  const {
    minItems, maxItems, items = {}, uniqueItems,
  } = opts;
  const min = minItems || 0;
  const max = maxItems || 100;
  const size = random(min, max);
  const arr = [];

  // TODO: solve circular dependency problem.
  // TODO: solve recursion problem

  const { type, oneOf } = items;

  while (arr.length < size) {
    let item;
    if (type && !isEmpty(type)) {
      const func = getFunc(type);
      item = func(items);
    }
    if (oneOf) {
      const oneOfTypes = oneOf.map(({ type: childType }) => childType);
      const randType = getRandomType(oneOfTypes);
      const func = getFunc(randType);
      item = func();
    }

    if (!uniqueItems || !includes(arr, item)) {
      arr.push(item);
    }
  }

  if (isNull) {
    return returnNullableValue(arr);
  }
  return arr;
};

export default mockArray;

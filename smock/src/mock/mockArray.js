import {
  includes, isEmpty, random, times,
} from 'lodash';

import { isNullable } from '../type';

import getFunc from './func';
import { getRandomType, returnNullableValue, getCustomOrDefault } from './shared';

const getDefaultMock = ({
  type, oneOf = [], anyOf = [], uniqueItems, items,
} = {}, size) => {
  const arr = [];

  times(size, () => {
    let item;
    if (type && !isEmpty(type)) {
      const func = getFunc(type);
      item = func(items);
    }
    if (oneOf.length || anyOf.length) {
      const oneOfTypes = [...oneOf, ...anyOf].map(({ type: childType }) => childType);
      const randType = getRandomType(oneOfTypes);
      const func = getFunc(randType);
      item = func();
    }

    if (!uniqueItems || !includes(arr, item)) {
      arr.push(item);
    }
  });
  return arr;
};

const mockArray = (opts = {}) => {
  const isNull = isNullable(opts);
  const { minItems, maxItems } = opts;
  const min = minItems || 0;
  const max = maxItems || 100;

  return (mockFunc) => {
    const size = random(min, max);
    const arr = getCustomOrDefault(opts, getDefaultMock, mockFunc, size);

    if (isNull) {
      return returnNullableValue(arr);
    }
    return arr;
  };
};

export default mockArray;

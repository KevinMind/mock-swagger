import { isNullable } from '../type';

import { returnNullableValue } from './shared';
import getFunc from './func';

const generateMockObj = ({ properties } = {}, mockFunc = {}) => Object.keys(properties).reduce((acm, name) => {
  const tmp = { ...acm };
  const def = properties[name];
  // TODO: currently incompatible with ref data types
  const func = getFunc(def.type)(def);
  const cutsomFunc = mockFunc[name];
  tmp[name] = func(cutsomFunc);
  return tmp;
}, {});

const mockObj = (opts = {}) => {
  const isNull = isNullable(opts);

  return (mockFunc) => {
    const mockValue = generateMockObj(opts, mockFunc);

    if (isNull) {
      return returnNullableValue(mockValue);
    }
    return mockValue;
  };
};

export default mockObj;

import mockArray from './mockArray';
import mockBoolean from './mockBoolean';
import mockIntNum from './mockIntNum';
import mockObject from './mockObject';
import mockString from './mockString';

import { DATA_TYPES } from '../constants';

const getFactoryFunc = (type) => {
  switch (type) {
    case DATA_TYPES.string:
      return mockString;
    case DATA_TYPES.integer:
    case DATA_TYPES.number:
      return mockIntNum;
    case DATA_TYPES.array:
      return mockArray;
    case DATA_TYPES.object:
      return mockObject;
    case DATA_TYPES.boolean:
      return mockBoolean;
    default:
      throw new Error(`invalid type: ${type} given. expected one of ${Object.values(DATA_TYPES).split(', ')}`);
  }
};

export default getFactoryFunc;

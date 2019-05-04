import faker from 'faker';
import {DATA_TYPES} from '../constants';
import {random} from 'lodash';

export const returnNullableValue = value => (faker.random.boolean() ? value : null);

export const getRandomType = (options = Object.values(DATA_TYPES)) => {
  const idx = random(0, options.length - 1);
  return options[idx];
};

export const getFactoryFunc = ({
  mockArray,
  mockBoolean,
  mockIntNum,
  mockObject,
  mockString,
}) => (type) => {
  switch (type) {
    case DATA_TYPES.string:
      return mockString;
    case DATA_TYPES.integer:
    case DATA_TYPES.number:
      return mockIntNum();
    case DATA_TYPES.array:
      return mockArray;
    case DATA_TYPES.object:
      return mockObject;
    case DATA_TYPES.boolean:
      return mockBoolean;
    default:
      return () => {};
  }
};

import faker from 'faker';
import {DATA_TYPES} from '../constants';
import {random} from 'lodash';

export const returnNullableValue = value => (faker.random.boolean() ? value : null);

export const getRandomType = (options = Object.values(DATA_TYPES)) => {
  const idx = random(0, options.length - 1);
  return options[idx];
};

export const getCustomOrDefault = (definition, defaultFunc, mockFunc, ...args) => {
  if (mockFunc) {
    if (typeof mockFunc === 'function') {
      return mockFunc(definition);
    }
    throw new Error('invalid mockFunc provided: expected function');
  }
  return defaultFunc(definition, ...args);
};

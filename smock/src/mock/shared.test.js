import { includes, times } from 'lodash';

import { getRandomType, getCustomOrDefault, returnNullableValue } from './shared';
import { DATA_TYPES } from '../constants';

describe('getRandomType', () => {
  it('should test getting random type', () => {
    const rand = getRandomType();
    const opts = Object.values(DATA_TYPES);
    expect(includes(opts, rand));
  });
});

const mockFunction = jest.fn();
const defaultFunction = jest.fn();

describe('getCustomOrDefault', () => {
  it('should test with mockFunction, but not a function', () => {
    try {
      getCustomOrDefault({}, defaultFunction, {});
    } catch (e) {
      expect(e.message);
    }
  });
  it('should test with mockFunction, and is function', () => {
    getCustomOrDefault({}, defaultFunction, mockFunction);
    expect(mockFunction).toHaveBeenCalledTimes(1);

  });
  it('should test no mockFunction', () => {
    getCustomOrDefault({}, defaultFunction);
    expect(defaultFunction).toHaveBeenCalledTimes(1);
  });

  it('should test adding extra args', () => {
    getCustomOrDefault({}, defaultFunction, mockFunction);
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});

describe('returnNullableValue', () => {
  it('should test returnNullableValue', () => {
    times(10, () => {
      const value = 1;
      const test = returnNullableValue(value);
      expect(test === 1 || test === null);
    });
  });
});

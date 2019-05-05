import { random } from 'lodash';

import { INTEGER_FORMATS, NUMBER_FORMATS } from '../constants';
import { isNullable } from '../type';

import { returnNullableValue, getCustomOrDefault} from './shared';

// TODO: not sure if this is even valid distinction to make in javascript
const mockNumFormat = {
  [INTEGER_FORMATS.int32]: mockValue => mockValue,
  [INTEGER_FORMATS.int64]: mockValue => mockValue,
  [NUMBER_FORMATS.double]: mockValue => mockValue,
  [NUMBER_FORMATS.float]: mockValue => mockValue,
};

const getDefaultMock = (opts, actualMin, actualMax) => random(actualMin, actualMax);

const mockIntNum = (opts = {}) => {
  const isNull = isNullable(opts);
  const {
    exclusiveMinimum, minimum, exclusiveMaximum, maximum, format,
  } = opts;

  const actualMin = minimum && exclusiveMinimum ? minimum + 1 : minimum || Number.MIN_SAFE_INTEGER;
  const actualMax = maximum && exclusiveMaximum ? maximum - 1 : maximum || Number.MAX_SAFE_INTEGER;

  return (mockFunc) => {
    let mockValue = getCustomOrDefault(opts, getDefaultMock, mockFunc, actualMin, actualMax);

    if (typeof mockValue !== 'number') {
      throw new Error(`
      invalid value for mockIntNum:${mockValue} of type: ${typeof mockValue}
      expected: ${opts.type}
      `);
    }

    if (format) {
      mockValue = mockNumFormat[format](mockValue);
    }

    const isTooLow = actualMin && mockValue < actualMin;
    const isTooHigh = actualMax && mockValue > actualMax;

    if (isTooHigh || isTooLow) {
      mockValue = random(actualMin, actualMax);
    }

    if (isNull) {
      return returnNullableValue(mockValue);
    }

    return mockValue;
  };
};

export default mockIntNum;

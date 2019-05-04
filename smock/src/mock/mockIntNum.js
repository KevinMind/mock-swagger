import { random } from 'lodash';

import { INTEGER_FORMATS, NUMBER_FORMATS } from '../constants';
import { isNullable } from '../validate';

import { returnNullableValue } from './shared';

const mockNumFormat = {
  [INTEGER_FORMATS.int32]: num => num,
  [INTEGER_FORMATS.int64]: num => num,
  [NUMBER_FORMATS.double]: num => num,
  [NUMBER_FORMATS.float]: num => num,
};

const mockIntNum = (opts = {}) => {
  const isNull = isNullable(opts);
  const {
    exclusiveMinimum, minimum, exclusiveMaximum, maximum, format,
  } = opts;

  const actualMin = minimum && exclusiveMinimum ? minimum + 1 : minimum || Number.MIN_SAFE_INTEGER;
  const actualMax = maximum && exclusiveMaximum ? maximum - 1 : maximum || Number.MAX_SAFE_INTEGER;

  let num = random(actualMin, actualMax);

  if (format) {
    num = mockNumFormat[format](num);
  }

  if (isNull) {
    return returnNullableValue(num);
  }

  return num;
};

export default mockIntNum;

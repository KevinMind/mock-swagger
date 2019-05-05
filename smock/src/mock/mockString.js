import formatDate from 'date-fns/format';
import { pad, random } from 'lodash';
import faker from 'faker';
import RandExp from 'randexp';

import { STRING_FORMATS } from '../constants';
import { isNullable } from '../type';

import { returnNullableValue, getCustomOrDefault } from './shared';

const mockFormattedStr = {
  [STRING_FORMATS.date]: () => formatDate(new Date(), 'YYYY-MM-DD'),
  [STRING_FORMATS.dateTime]: () => formatDate(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
  [STRING_FORMATS.password]: () => faker.internet.password(0),
  [STRING_FORMATS.byte]: (mockValue = faker.lorem.word()) => mockValue,
  [STRING_FORMATS.binary]: (mockValue = faker.lorem.word()) => mockValue,
  [STRING_FORMATS.email]: () => faker.internet.email(),
  [STRING_FORMATS.uuid]: () => faker.random.uuid(),
  [STRING_FORMATS.hostname]: () => faker.internet.domainName(),
  [STRING_FORMATS.ipv4]: () => faker.internet.ip(),
  [STRING_FORMATS.ipv6]: () => faker.internet.ipv6(),
};

const getDefaultMock = ({ pattern, format, enum: enumValues } = {}) => {
  if (pattern) {
    return new RandExp(pattern).gen();
  }

  if (format) {
    return mockFormattedStr[format]();
  }

  if (enumValues) {
    const idx = random(0, enumValues.length - 1);
    return enumValues[idx];
  }
  return faker.lorem.word();
};

const mockStr = (opts = {}) => {
  const isNull = isNullable(opts);
  const { minLength, maxLength } = opts;

  return (mockFunc) => {
    let mockValue = getCustomOrDefault(opts, getDefaultMock, mockFunc);

    if (typeof mockValue !== 'string') {
      throw new Error(`
      invalid value for mockStr: ${mockValue} of type: ${typeof mockValue}
      expected: ${opts.type}
      `);
    }

    if (maxLength && mockValue.length > maxLength) {
      mockValue = mockValue.slice(0, maxLength - 1);
    }

    if (minLength && mockValue.length < minLength) {
      mockValue = pad(mockValue, minLength, '_-');
    }

    if (isNull) {
      return returnNullableValue(mockValue);
    }

    return mockValue;
  };
};

export default mockStr;

import formatDate from 'date-fns/format';
import { pad } from 'lodash';
import faker from 'faker';
import RandExp from 'randexp';

import { STRING_FORMATS } from '../constants';
import { isNullable } from '../validate';

import { returnNullableValue } from './shared';

const mockFormattedStr = {
  [STRING_FORMATS.date]: () => formatDate(new Date(), 'YYYY-MM-DD'),
  [STRING_FORMATS.dateTime]: () => formatDate(new Date(), 'YYYY-MM-DDTHH:mm:ss.SSSZ'),
  [STRING_FORMATS.password]: () => faker.internet.password(0),
  [STRING_FORMATS.byte]: (str = faker.lorem.word()) => str,
  [STRING_FORMATS.binary]: (str = faker.lorem.word()) => str,
  [STRING_FORMATS.email]: () => faker.internet.email(),
  [STRING_FORMATS.uuid]: () => faker.random.uuid(),
  [STRING_FORMATS.hostname]: () => faker.internet.domainName(),
  [STRING_FORMATS.ipv4]: () => faker.internet.ip(),
  [STRING_FORMATS.ipv6]: () => faker.internet.ipv6(),
};

const mockStr = (opts = {}) => {
  const isNull = isNullable(opts);
  const {
    format, minLength, maxLength, pattern,
  } = opts;

  // console.log('mockStr', { pattern, format, isNull });

  if (pattern) {
    return new RandExp(pattern).gen();
  }

  if (format) {
    return mockFormattedStr[format]();
  }

  let str = faker.lorem.text();

  if (maxLength && str.length > maxLength) {
    str = str.slice(0, maxLength - 1);
  }

  if (minLength && str.length < minLength) {
    str = pad(str, minLength, '_-');
  }

  if (isNull) {
    return returnNullableValue(str);
  }

  return str;
};

export default mockStr;

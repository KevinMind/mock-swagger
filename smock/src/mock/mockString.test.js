import isValid from 'date-fns/is_valid';
import mockString from './mockString';
import { STRING_FORMATS } from '../constants';

describe('mock string', () => {
  it('should mock date', () => {
    const str = mockString({ format: STRING_FORMATS.date })();
    const date = new Date(str);
    const invalid = new Date('invalid date');
    expect(isValid(date)).toEqual(true);
    expect(isValid(invalid)).toEqual(false);
  });
  it('should mock dateTime', () => {
    const str = mockString({ format: STRING_FORMATS.dateTime })();
    const date = new Date(str);
    const invalid = new Date('invalid date');
    expect(isValid(date)).toEqual(true);
    expect(isValid(invalid)).toEqual(false);
  });

  it('should mock pattern', () => {
    const reg = /\d+/;
    const str = mockString({ pattern: reg })();
    const valid = '0123456789';
    const invalid = 'abc';
    expect(reg.test(str)).toEqual(true);
    expect(reg.test(valid)).toEqual(true);
    expect(reg.test(invalid)).toEqual(false);
  });

  it('should mock min/max', () => {
    const min = mockString({ minLength: 2 })();
    const max = mockString({ maxLength: 5 })();
    const minMax = mockString({ minLength: 5, maxLength: 5 })();
    expect(min.length >= 2).toEqual(true);
    expect(max.length <= 5).toEqual(true);
    expect(minMax.length === 5).toEqual(true);
  });
});

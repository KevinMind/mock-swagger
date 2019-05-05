import { uniq } from 'lodash';

import mockArray from './mockArray';
import { DATA_TYPES } from '../constants';

describe('mockArray', () => {
  it('should mock simple arr', () => {
    const arr = mockArray({ items: { type: DATA_TYPES.string } })();
    expect(Array.isArray(arr)).toEqual(true);
  });
  it('should mock nested arr', () => {
    const arr = mockArray({ items: { type: DATA_TYPES.array, items: { type: DATA_TYPES.integer } } })();
    expect(Array.isArray(arr)).toEqual(true);
    arr.forEach(i => expect(Array.isArray(i)));
  });
  it('should mock type strict arr', () => {
    const arr = mockArray({ items: { type: DATA_TYPES.string } })();
    expect(Array.isArray(arr)).toEqual(true);
    arr.forEach(i => expect(typeof i === 'string'));
  });
  it('should mock mixed type arr', () => {
    const arr = mockArray({
      items: {
        oneOf: [
          {
            type: DATA_TYPES.string,
          },
          {
            type: DATA_TYPES.integer,
          },
        ],
      },
    })();
    arr.forEach((i) => {
      const isString = typeof i === 'string';
      const isNum = typeof i === 'number';
      expect(isString || isNum);
    });
  });
  it('should mock min/max arr', () => {
    const minArr = mockArray({ items: { type: DATA_TYPES.string }, minItems: 2 })();
    const maxArr = mockArray({ items: { type: DATA_TYPES.string }, maxItems: 5 })();
    const minMaxArr = mockArray({ items: { type: DATA_TYPES.string }, minItems: 5, maxItems: 5 })();
    expect(minArr.length >= 2);
    expect(maxArr.length <= 5);
    expect(minMaxArr.length === 5);
  });
  it('should mock unique arr', () => {
    const arr = mockArray({ items: { type: DATA_TYPES.integer }, uniqueItems: true, maxItems: 10 })();
    const unique = uniq(arr);
    expect(arr === unique);
  });
});

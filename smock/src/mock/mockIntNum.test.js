import { times } from 'lodash';

import mockIntNum from './mockIntNum';
import { INTEGER_FORMATS, NUMBER_FORMATS } from '../constants';

describe('mock int/num', () => {
  it('should mock format', () => {
    const int32 = mockIntNum({ format: INTEGER_FORMATS.int32 })();
    const int64 = mockIntNum({ format: INTEGER_FORMATS.int64 })();
    const float = mockIntNum({ format: NUMBER_FORMATS.float })();
    const double = mockIntNum({ format: NUMBER_FORMATS.double })();
    expect(typeof int32).toEqual('number');
    expect(typeof int64).toEqual('number');
    expect(typeof float).toEqual('number');
    expect(typeof double).toEqual('number');
  });

  it('should mock min/max', () => {
    const min = mockIntNum({ minimum: 5 })();
    const max = mockIntNum({ maximum: 5 })();
    const minMax = mockIntNum({ minimum: 5, maximum: 5 })();
    expect(min >= 5).toEqual(true);
    expect(max <= 5).toEqual(true);
    expect(minMax === 5).toEqual(true);
    const minExclude = mockIntNum({ minimum: 5, exclusiveMinimum: true })();
    const maxExclude = mockIntNum({ maximum: 5, exclusiveMaximum: true })();
    const minMaxExclude = mockIntNum({
      minimum: 4, maximum: 6, exclusiveMaximum: true, exclusiveMinimum: true,
    })();
    expect(minExclude > 5).toEqual(true);
    expect(maxExclude < 5).toEqual(true);
    expect(minMaxExclude === 5).toEqual(true);
  });

  it('should test custom mock', () => {
    const failMock = () => 'string';
    const mock = mockIntNum();
    try {
      mock(failMock);
    } catch (e) {
      expect(e.message);
    }
  });

  it('should test custom mock failing', () => {
    const passMock = () => 234;
    const mock = mockIntNum();
    const pass = mock(passMock);
    expect(pass).toEqual(passMock());
  });

  it('should test custom mock too high/low', () => {
    const mock = mockIntNum({ maximum: 5, minimum: 5 });

    const highMock = () => 6;
    const lowMock = () => 4;

    try {
      mock(highMock);
    } catch (e) {
      expect(e.message);
    }

    try {
      mock(lowMock);
    } catch (e) {
      expect(e.message);
    }
  });

  it('should test nullable', () => {
    times(10, () => {
      const val = mockIntNum({ nullable: true })(() => 5);
      expect(val === null || val === 5);
    });
  });
});

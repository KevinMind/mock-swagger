import getFunc from './func';
import { DATA_TYPES } from '../constants';

describe('getFunc', () => {
  it('should test with valid type', () => {
    const valid = getFunc(DATA_TYPES.string);
    expect(typeof valid === 'function');
  });
  it('should test invalid type', () => {
    try {
      getFunc('invalid_type');
    } catch (e) {
      expect(e.message);
    }
  });
});

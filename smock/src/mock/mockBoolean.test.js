import mockBoolean from './mockBoolean';

describe('mock bool', () => {
  it('should mock boolean', () => {
    const bool = mockBoolean();
    expect(typeof bool).toEqual('boolean');
  });
});

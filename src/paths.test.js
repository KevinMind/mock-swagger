import paths from './paths';

describe('paths', () => {
  it('should render home path', () => {
    expect(paths.home.regex).toEqual('/');
  });
});

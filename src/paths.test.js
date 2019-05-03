import paths from './paths';

describe('paths', () => {
  it('should render HomePage path', () => {
    expect(paths.home.regex).toEqual('/');
  });
});

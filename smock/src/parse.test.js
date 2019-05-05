import faker from 'faker';
import { getDefinitions, parse } from './parse';
import { externalMockSource } from './constants';

const mockUser = {
  id: () => 123,
  username: () => 'username',
  firstName: () => 'firstName',
  lastName: () => 'lastName',
  email: () => 'email',
  password: () => 'password',
  phone: () => '281-316-1142',
  userStatus: () => 123,
};

describe('getDefinitions', () => {
  it('should test', async () => {
    const swagger = await parse(externalMockSource);
    const { User } = await getDefinitions(externalMockSource);
    expect(User);
    expect(User.definition).toEqual(swagger.definitions.User);
    expect(User.validate);
    expect(User.mock);
    expect(User.type);
    const mock = User.mock(mockUser);
    Object.keys(mockUser).forEach(property => expect(mock[property]).toEqual(mockUser[property]()));
  });
});

import faker from 'faker';
import { getDefinitions, parse } from './parse';
import { externalMockSource } from './constants';

const mockUser = {
  id: faker.random.number,
  username: faker.internet.userName,
  firstName: faker.name.firstName,
  lastName: faker.name.lastName,
  email: faker.internet.email,
  password: faker.lorem.word,
  phone: () => faker.phone.phoneNumberFormat(),
  userStatus: faker.random.number,
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
  });
});

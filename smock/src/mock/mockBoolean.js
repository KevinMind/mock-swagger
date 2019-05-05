import faker from 'faker';

// TODO: is it possible to have definition config for boolean data type
const mockBoolean = () => () => faker.random.boolean();

export default mockBoolean;

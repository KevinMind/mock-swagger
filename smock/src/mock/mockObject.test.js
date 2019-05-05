import faker from 'faker';

import mockObject from './mockObject';

import { simpleObj } from '../mockData';

const validateMockObject = (obj) => {
  expect(typeof obj).toEqual('object');
  expect(typeof obj.id).toEqual('number');
  expect(typeof obj.isTrue).toEqual('boolean');
  expect(typeof obj.nested).toEqual('object');
  expect(typeof obj.nested.category).toEqual('string');
  expect(Array.isArray(obj.list));
};

describe('mockObject', () => {
  it('simpleObject', () => {
    const obj = mockObject(simpleObj)();
    validateMockObject(obj);
  });
  it('should mock with custom mock func', () => {
    const mockFunc = {
      id: faker.random.number,
      name: faker.name.firstName,
      isTrue: faker.random.boolean,
      nested: {
        category: faker.lorem.word,
      },
      list: faker.phone.phoneNumberFormat,
    };
    const getObjectMock = mockObject(simpleObj);
    validateMockObject(getObjectMock(mockFunc));
    // validateMockObject(getObjectMock(mockFunc));
    // validateMockObject(getObjectMock(mockFunc));
  });
});

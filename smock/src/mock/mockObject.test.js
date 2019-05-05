import faker from 'faker';
import {times} from 'lodash';

import mockObject from './mockObject';

import { simpleObj } from '../mockData';
import { DATA_TYPES } from '../constants';

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
  });

  it('should test nullable', () => {
    times(10, () => {
      const mockObj = { id: 5 };
      const val = mockObject({ nullable: true, properties: { id: { type: DATA_TYPES.number } } })(() => mockObj);
      expect(val === null || val === mockObj);
    });
  });
});

import SwaggerParser from 'swagger-parser';
import { transform } from 'lodash';
import { getType } from './type';
import getFunc from './mock';

export const parse = url => SwaggerParser.parse(url);

export const getDefinitions = async (url) => {
  const source = await parse(url);
  return transform(source.definitions, (acm, definition, name) => {
    const type = getType(definition);
    const mock = getFunc(type)(definition);
    // eslint-disable-next-line no-param-reassign
    acm[name] = {
      definition,
      type,
      mock,
      validate: (data) => {
        // TODO: add swagger validation of data against definition
      },
    };
  }, {});
};

import SwaggerParser from 'swagger-parser';

import { validPrimitives, DATA_TYPES, PRIMITIVE_TYPES } from './constants';

const hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export const parse = url => SwaggerParser.parse(url);

export const isNullable = (obj = {}) => obj.nullable === true;

export const isMixedType = (obj = {}) => {
  const isOneOf = hasOwnProperty(obj, 'oneOf');
  const isAnyOf = hasOwnProperty(obj, 'anyOf');
  return isOneOf || isAnyOf;
};

export const isValidPrimitive = (obj = {}) => validPrimitives.includes(obj.type);

export const isValidRefType = (obj = {}) => hasOwnProperty(obj, '$ref') && !hasOwnProperty(obj, 'type');

export const isValidFileType = (obj = {}) => {
  if (obj.type !== PRIMITIVE_TYPES.string) {
    return false;
  }
  return obj.format === 'binary' || obj.format === 'byte';
};

export const getType = (obj = {}) => {
  if (isValidPrimitive(obj)) {
    switch (true) {
      case isValidFileType(obj):
        return DATA_TYPES.file;
      default:
        return obj.type;
    }
  }

  if (isValidRefType(obj)) {
    return DATA_TYPES.reference;
  }
  return DATA_TYPES.invalid;
};

export const PRIMITIVE_TYPES = {
  integer: 'integer',
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  array: 'array',
  object: 'object',
};

export const validPrimitives = Object.values(PRIMITIVE_TYPES);

export const STRING_FORMATS = {
  date: 'date',
  dateTime: 'date-time',
  password: 'password',
  byte: 'byte',
  binary: 'binary',
  email: 'email',
  uuid: 'uuid',
  hostname: 'hostname',
  ipv4: 'ipv4',
  ipv6: 'ipv6',
};

export const INTEGER_FORMATS = {
  int32: 'int32',
  int64: 'int64',
};

export const NUMBER_FORMATS = {
  float: 'float',
  double: 'double',
};

export const DATA_TYPES = {
  ...PRIMITIVE_TYPES,
  reference: '$ref',
  file: 'file',
  invalid: 'invalid',
};

export const externalMockSource = 'https://petstore.swagger.io/v2/swagger.json';

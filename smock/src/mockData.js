import { STRING_FORMATS, INTEGER_FORMATS, DATA_TYPES } from './constants';

// NULL

export const setNullable = obj => ({ ...obj, nullable: true });

// BOOLEAN

export const simpleBool = {
  type: DATA_TYPES.boolean,
};

// STRINGS

export const simpleStr = {
  type: DATA_TYPES.string,
};

export const lengthedStr = {
  ...simpleStr,
  minLength: 2,
  maxLength: 20,
};

export const formattedStrings = Object.values(STRING_FORMATS).reduce((acm, format) => {
  const obj = { ...acm };
  obj[format] = { ...simpleStr, format };
  return obj;
}, {});

export const patternStr = {
  ...simpleStr,
  pattern: '^\d{3}-\d{2}-\d{4}$', // eslint-disable-line no-useless-escape
};

// INTEGER

export const simpleInteger = {
  type: DATA_TYPES.integer,
};

export const formattedIntegers = Object.values(INTEGER_FORMATS).reduce((acm, format) => {
  const obj = { ...acm };
  obj[format] = { ...simpleInteger, format };
  return obj;
}, {});

export const minMaxInteger = {
  ...simpleInteger,
  minimum: 0,
  maximum: 10,
};

export const simpleArr = {
  type: DATA_TYPES.array,
  items: {
    type: DATA_TYPES.string,
  },
};

export const mixedTypeArr = {
  type: DATA_TYPES.array,
  items: {
    oneOf: [
      {
        type: DATA_TYPES.string,
      },
      {
        type: DATA_TYPES.integer,
      },
    ],
  },
};

export const uniqueArr = {
  ...simpleArr,
  uniqueItems: true,
};

export const lengthedArr = {
  ...simpleArr,
  minItems: 2,
  maxItems: 2,
};

// OBJECT

export const freeObject1 = {
  type: DATA_TYPES.object,
};

export const freeObject2 = {
  type: DATA_TYPES.object,
  additionalProperties: true,
};

export const freeObject3 = {
  type: DATA_TYPES.object,
  additionalProperties: {},
};

export const simpleObj = {
  type: DATA_TYPES.object,
  properties: {
    id: {
      type: DATA_TYPES.string,
    },
    name: {
      type: DATA_TYPES.string,
    },
  },
};

export const requiredObj = {
  ...simpleObj,
  required: [
    'id',
  ],
};

export const complexObj = {
  ...simpleObj,
  properties: {
    ...simpleObj.properties,
    class: {
      type: DATA_TYPES.object,
      properties: {
        ...simpleObj.properties,
      },
    },
  },
};

export const numberedPropObj = {
  ...simpleObj,
  minProperties: 2,
  maxProperties: 2,
};

export const simpleFile1 = {
  type: DATA_TYPES.string,
  format: STRING_FORMATS.byte,
};

export const simpleFile2 = {
  type: DATA_TYPES.string,
  format: STRING_FORMATS.binary,
};

// REF

export const simpleRef = {
  $ref: '#/components/path/to/pets',
};

// MIXED

export const simpleMixedOneOf = {
  oneOf: [
    {
      type: DATA_TYPES.string,
    },
    {
      type: DATA_TYPES.boolean,
    },
  ],
};

export const simpleMixedAnyOf = {
  anyOf: [
    {
      type: DATA_TYPES.string,
    },
    {
      type: DATA_TYPES.boolean,
    },
  ],
};

export const externalMockSource = 'https://petstore.swagger.io/v2/swagger.json';

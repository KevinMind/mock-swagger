import {
  getType, isMixedType, isNullable, isValidRefType, isValidFileType, isValidPrimitive,
} from './type';

import { DATA_TYPES, STRING_FORMATS } from './constants';
import * as mockData from './mockData';

describe('getType', () => {
  it('should test invalid type', () => {
    expect(getType({})).toEqual(DATA_TYPES.invalid);
  });
  it('should validate string objects', () => {
    expect(getType(mockData.simpleStr)).toEqual(DATA_TYPES.string);
    expect(getType(mockData.lengthedStr)).toEqual(DATA_TYPES.string);
    Object.values(mockData.formattedStrings).forEach((str) => {
      if (!str.format === STRING_FORMATS.binary && !str.format === STRING_FORMATS.byte) {
        expect(getType(str)).toEqual(DATA_TYPES.string);
      }
    });
    expect(getType(mockData.patternStr)).toEqual(DATA_TYPES.string);
  });
  it('should validate file objects', () => {
    expect(isValidFileType(mockData.simpleFile1)).toEqual(true);
    expect(isValidFileType(mockData.simpleStr)).toEqual(false);
    expect(getType(mockData.formattedStrings.binary)).toEqual(DATA_TYPES.file);
    expect(getType(mockData.formattedStrings.byte)).toEqual(DATA_TYPES.file);
    expect(getType(mockData.simpleFile1)).toEqual(DATA_TYPES.file);
    expect(getType(mockData.simpleFile2)).toEqual(DATA_TYPES.file);
  });
  it('should validate integer objects', () => {
    expect(getType(mockData.simpleInteger)).toEqual(DATA_TYPES.integer);
    Object.values(mockData.formattedIntegers).forEach((int) => {
      expect(getType(int)).toEqual(DATA_TYPES.integer);
    });
    expect(getType(mockData.minMaxInteger)).toEqual(DATA_TYPES.integer);
  });
  it('should validate array objects', () => {
    expect(getType(mockData.simpleArr)).toEqual(DATA_TYPES.array);
    expect(getType(mockData.mixedTypeArr)).toEqual(DATA_TYPES.array);
    expect(getType(mockData.uniqueArr)).toEqual(DATA_TYPES.array);
    expect(getType(mockData.lengthedArr)).toEqual(DATA_TYPES.array);
    expect(getType(mockData.simpleArr)).toEqual(DATA_TYPES.array);
  });
  it('should validate object objects', () => {
    expect(getType(mockData.simpleObj)).toEqual(DATA_TYPES.object);
    expect(getType(mockData.freeObject1)).toEqual(DATA_TYPES.object);
    expect(getType(mockData.freeObject2)).toEqual(DATA_TYPES.object);
    expect(getType(mockData.freeObject3)).toEqual(DATA_TYPES.object);
    expect(getType(mockData.requiredObj)).toEqual(DATA_TYPES.object);
    expect(getType(mockData.numberedPropObj)).toEqual(DATA_TYPES.object);
  });
  it('should validate nullable objects', () => {
    const mock = mockData.setNullable(mockData.simpleObj);
    expect(mock.nullable).toEqual(true);
    expect(isNullable(mock));
  });
  it('should validate ref objects', () => {
    expect(isValidRefType(mockData.simpleRef)).toEqual(true);
    expect(isValidRefType(mockData.simpleStr)).toEqual(false);
    expect(getType(mockData.simpleRef)).toEqual(DATA_TYPES.reference);
  });
  it('should validate mixed type objects', () => {
    expect(isMixedType(mockData.simpleMixedOneOf)).toEqual(true);
    expect(isMixedType(mockData.simpleStr)).toEqual(false);
  });
});

describe('isNullable', () => {
  it('should pass', () => {
    const isNull = isNullable({ nullable: true });
    const notNull1 = isNullable({ nullable: false });
    const notNull2 = isNullable({ nullable: null });
    const notNull3 = isNullable({ nullable: 3 });
    const notNull4 = isNullable({ nullable: undefined });
    expect(isNull);
    expect(notNull1).toEqual(false);
    expect(notNull2).toEqual(false);
    expect(notNull3).toEqual(false);
    expect(notNull4).toEqual(false);
  });
});

describe('isMixedType', () => {
  it('should pass', () => {
    const isOneMixed = isMixedType({ oneOf: [] });
    const isAnyMixed = isMixedType({ anyOf: [] });
    const isNotMixed = isMixedType({});
    expect(isOneMixed).toEqual(true);
    expect(isAnyMixed).toEqual(true);
    expect(isNotMixed).toEqual(false);
  });
});

describe('isValidPrimitive', () => {
  it('should pass', () => {
    const isValid = isValidPrimitive({ type: DATA_TYPES.string });
    const isNotValid = isValidPrimitive({ type: 'invalid' });
    expect(isValid).toEqual(true);
    expect(isNotValid).toEqual(false);
  });
});

describe('isValidRefType', () => {
  it('should pass', () => {
    const isValid = isValidRefType({ $ref: '#/definitions/Something' });
    const isNotValid1 = isValidRefType({ type: 'invalid' });
    const isNotValid2 = isValidRefType({ type: 'invalid', $ref: '#/definitions/Something' });
    expect(isValid).toEqual(true);
    expect(isNotValid1).toEqual(false);
    expect(isNotValid2).toEqual(false);
  });
});

describe('isValidFileType', () => {
  it('should pass', () => {
    const isValid1 = isValidFileType({ type: DATA_TYPES.string, format: STRING_FORMATS.binary });
    const isValid2 = isValidFileType({ type: DATA_TYPES.string, format: STRING_FORMATS.byte });
    const isNotValid1 = isValidFileType({ type: DATA_TYPES.string });
    const isNotValid2 = isValidFileType({ type: DATA_TYPES.object });
    expect(isValid1).toEqual(true);
    expect(isValid2).toEqual(true);
    expect(isNotValid1).toEqual(false);
    expect(isNotValid2).toEqual(false);
  });
});

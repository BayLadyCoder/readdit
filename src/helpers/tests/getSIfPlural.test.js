import { expect, test } from 'vitest';
import { getSIfPlural, getSIfPluralErrorMessage } from '../getSIfPlural';

test('input between 0 or 1 (inclusive), should return empty string', () => {
  expect(getSIfPlural(0)).toBe('');
  expect(getSIfPlural(0.5)).toBe('');
  expect(getSIfPlural(1)).toBe('');
});

test('input more than 1, should return "s"', () => {
  expect(getSIfPlural(1.5)).toBe('s');
  expect(getSIfPlural(2)).toBe('s');
  expect(getSIfPlural(3)).toBe('s');
  expect(getSIfPlural(8.5)).toBe('s');
  expect(getSIfPlural(10)).toBe('s');
  expect(getSIfPlural(100)).toBe('s');
});

test('input not a number, should throw an error', () => {
  expect(() => getSIfPlural('0')).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural('100')).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural('abc')).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural([])).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural([1])).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural({})).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural(true)).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural(false)).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural(undefined)).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural(null)).toThrow(getSIfPluralErrorMessage);
});

test('input negative number, should throw an error', () => {
  expect(() => getSIfPlural(-1)).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural(-0.5)).toThrow(getSIfPluralErrorMessage);
  expect(() => getSIfPlural(-100)).toThrow(getSIfPluralErrorMessage);
});

import { expect, test, beforeEach, afterEach, vi } from 'vitest';
import {
  timeAgo,
  invalidDateErrorMessage,
  futureDateErrorMessage,
} from '../timeAgo';

const year = 2024;
const monthIndex = 0;
const day = 1;
const hours = 0;
const minutes = 0;
const seconds = 0;

beforeEach(() => {
  // tell vitest we use mocked time
  vi.useFakeTimers();
  // set system date time
  const date = new Date(year, monthIndex, day, hours, minutes, seconds);
  vi.setSystemTime(date);
});

afterEach(() => {
  // restoring date after each test run
  vi.useRealTimers();
});

test('invalid input, should throw error', () => {
  expect(() => timeAgo()).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo(null)).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo(undefined)).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo('')).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo(false)).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo('sadfsd')).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo('2345453')).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo([])).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo([1, 2, 3])).toThrow(invalidDateErrorMessage);
  expect(() => timeAgo({})).toThrow(invalidDateErrorMessage);
});

test('input future date, should throw error', () => {
  expect(() => timeAgo('2038-11-30')).toThrow(futureDateErrorMessage);
});

test('valid input, should return ... ago', () => {
  expect(timeAgo('2023-12-31T23:59:56')).toBe('a few seconds ago');
  expect(timeAgo('2023-12-31T23:59:55')).toBe('5 seconds ago');

  expect(timeAgo('2023-12-31T23:59:00')).toBe('1 minute ago');
  expect(timeAgo('2023-12-31T23:55:00')).toBe('5 minutes ago');
  expect(timeAgo('2023-12-31T23:30:00')).toBe('30 minutes ago');

  expect(timeAgo('2023-12-31T23:00:00')).toBe('1 hour ago');
  expect(timeAgo('2023-12-31T22:00:00')).toBe('2 hours ago');

  expect(timeAgo('2023-12-31')).toBe('1 day ago');
  expect(timeAgo('2023-12-27')).toBe('5 days ago');

  expect(timeAgo('2023-12-25')).toBe('1 week ago');
  expect(timeAgo('2023-12-15')).toBe('2 weeks ago');

  expect(timeAgo('2023-11-30')).toBe('1 month ago');
  expect(timeAgo('2023-10-30')).toBe('2 months ago');
  expect(timeAgo('2023-03-30')).toBe('9 months ago');

  expect(timeAgo('2023-01-01')).toBe('1 year ago');
  expect(timeAgo('2022-01-01')).toBe('2 years ago');
  expect(timeAgo('2015-01-01')).toBe('9 years ago');

  expect(timeAgo('2010-01-01')).toBe('14 years ago');
  expect(timeAgo('01-01-10')).toContain('14 years ago');
  expect(timeAgo('January 01, 2010 00:00:00')).toContain('14 years ago');
});

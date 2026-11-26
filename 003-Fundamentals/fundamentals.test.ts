import assert from 'node:assert/strict';
import { test } from 'node:test';

import { course, isPublished, level, sales } from './01.annotations.js';
import { describe, numbers, type User } from './02.arraysAndTuples.js';
import { Size, label } from './03.enums.js';
import { calculateTax } from './04.functions.js';
import { employee } from './05.objects.js';

test('01 annotations', () => {
  assert.deepEqual([sales, course, isPublished, level], [123_456_789, 'TypeScript', true, 1]);
});

test('02 arrays and tuples', () => {
  assert.equal(numbers.length, 3);
  assert.equal(describe([1, 'Mosh']), '1: Mosh');
  // @ts-expect-error a tuple has a fixed shape
  const bad: User = [1, 'Mosh', 0];
  assert.ok(bad);
});

test('03 enums', () => {
  assert.equal(label(Size.Medium), 'M');
  assert.equal(Size.Large, 3);
});

test('04 optional parameters with defaults', () => {
  assert.equal(calculateTax(10_000), 13_000);
  assert.equal(calculateTax(10_000, 2021), 12_000);
});

test('05 objects with readonly members', () => {
  assert.equal(employee.retire(new Date('2050-01-01')), 'Retires on 2050-01-01');
  // @ts-expect-error id is readonly (compile-time check only, never called)
  void (() => (employee.id = 2));
});

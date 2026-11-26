import assert from 'node:assert/strict';
import { test } from 'node:test';

import _ from 'lodash'; // lesson: Definitely Typed declarations (@types/lodash)
import { calculateTax } from './tax.js';
import { shippingCost } from './vendor/shipping.js';

test('JS with JSDoc types', () => {
  assert.equal(calculateTax(10_000), 7000);
  // @ts-expect-error JSDoc says income is a number (compile-time check only, never called)
  void (() => calculateTax('10000'));
});

test('JS described by a declaration file', () => {
  assert.equal(shippingCost(3), 9);
  // @ts-expect-error the .d.ts says weight is a number (compile-time check only, never called)
  void (() => shippingCost('3'));
});

test('a library typed by @types', () => {
  assert.deepEqual(_.chunk([1, 2, 3, 4], 2), [
    [1, 2],
    [3, 4],
  ]);
});

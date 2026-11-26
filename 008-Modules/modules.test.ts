import assert from 'node:assert/strict';
import { test } from 'node:test';

import * as Shapes from './shapes/index.js'; // wildcard import
import { Circle, Square } from './shapes/index.js'; // named imports through the re-export
import Store, { Format } from './storage.js'; // default + named import

test('named and wildcard imports reach the same exports', () => {
  assert.equal(new Square(3).area, 9);
  assert.equal(Shapes.Circle, Circle);
  assert.equal(new Shapes.Circle(1).area, Math.PI);
});

test('default export', () => {
  const store = new Store();
  assert.equal(store.save('a b c', Format.Compressed), 'abc');
  assert.equal(store.count, 1);
});

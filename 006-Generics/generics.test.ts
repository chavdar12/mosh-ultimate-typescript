import assert from 'node:assert/strict';
import { mock, test } from 'node:test';

import { echo } from './01.echo.js';
import { printName } from './02.printName.js';
import { Entity } from './03.entity.js';
import { prop, type KeysOfProduct } from './04.keysOfProduct.js';

test('01 echo keeps the argument type', () => {
  const n: number = echo(1);
  const s: string = echo('a');
  assert.deepEqual([n, s], [1, 'a']);
});

test('02 printName accepts anything with a name', () => {
  const log = mock.method(console, 'log', () => undefined);
  printName({ name: 'Mosh', age: 40 });
  assert.deepEqual(log.mock.calls[0]?.arguments, ['Mosh']);
  log.mock.restore();
  // @ts-expect-error no name property (compile-time check only, never called)
  void (() => printName({ age: 1 }));
});

test('03 entity ids of any type', () => {
  assert.equal(new Entity(1).id, 1);
  assert.equal(new Entity('a1b2').id, 'a1b2');
});

test('04 keyof Product', () => {
  const keys: KeysOfProduct[] = ['name', 'price'];
  const product = { name: 'Pen', price: 2 };
  const price: number = prop(product, 'price');
  assert.deepEqual(
    keys.map((k) => prop(product, k)),
    ['Pen', price],
  );
  // @ts-expect-error not a key of Product
  const bad: KeysOfProduct = 'color';
  assert.ok(bad);
});

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Pizza, Sauce } from './01.sauce.js';

test('01 the decorator adds a sauce', () => {
  assert.equal(new Pizza().sauce, 'pesto');

  @Sauce('tomato')
  class Margherita {
    declare sauce: string;
  }
  assert.equal(new Margherita().sauce, 'tomato');
});

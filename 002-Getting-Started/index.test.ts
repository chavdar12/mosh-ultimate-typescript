import assert from 'node:assert/strict';
import { test } from 'node:test';

import { greeting } from './index.js';

test('first program', () => {
  assert.equal(greeting(), "Hello World, I'm 20");
});

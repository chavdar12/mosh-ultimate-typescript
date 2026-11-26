import assert from 'node:assert/strict';
import { test } from 'node:test';

import { user, users, type User } from './01.userType.js';
import { move, type Pet } from './02.birdOrFish.js';
import { isWeekend, type DayOfWeek } from './03.dayOfWeek.js';
import { streetOf, valueOr } from './04.simplify.js';
import { upper } from './05.unknownValue.js';

test('01 user type', () => {
  assert.equal(users[0], user);
  // @ts-expect-error a User needs every field
  const partial: User = { name: 'x' };
  assert.ok(partial);
});

test('02 pet moves the way its type allows', () => {
  const bird: Pet = { fly: () => 'flying' };
  const fish: Pet = { swim: () => 'swimming' };
  assert.equal(move(bird), 'flying');
  assert.equal(move(fish), 'swimming');
});

test('03 day of week', () => {
  assert.equal(isWeekend('Sunday'), true);
  assert.equal(isWeekend('Monday'), false);
  // @ts-expect-error not a day
  const bad: DayOfWeek = 'Funday';
  assert.ok(bad);
});

test('04 optional chaining and nullish coalescing', () => {
  assert.equal(streetOf({ address: { street: 'Flinders St' } }), 'Flinders St');
  assert.equal(streetOf({ address: null }), undefined);
  assert.equal(streetOf(null), undefined);
  assert.equal(
    valueOr(0, () => 5),
    0,
  ); // 0 is kept, unlike with ||
  assert.equal(
    valueOr<number>(null, () => 5),
    5,
  );
});

test('05 unknown must be narrowed', () => {
  assert.equal(upper('a'), 'A');
  assert.equal(upper(1), undefined);
});

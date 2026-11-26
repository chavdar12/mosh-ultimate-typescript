import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

import { Vault } from '../index.js';

// Node has no Web Storage or window events, so install small in-memory stand-ins
class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length() {
    return this.data.size;
  }
  key(i: number) {
    return [...this.data.keys()][i] ?? null;
  }
  getItem(k: string) {
    return this.data.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.data.set(k, String(v));
  }
  removeItem(k: string) {
    this.data.delete(k);
  }
  clear() {
    this.data.clear();
  }
  [name: string]: unknown;
}

const events = new EventTarget();
const g = globalThis as Record<string, unknown>;
g['addEventListener'] = events.addEventListener.bind(events);
g['removeEventListener'] = events.removeEventListener.bind(events);

function storageEvent(key: string, storageArea: Storage) {
  return Object.assign(new Event('storage'), { key, storageArea });
}

beforeEach(() => {
  g['localStorage'] = new MemoryStorage();
  g['sessionStorage'] = new MemoryStorage();
});

interface User {
  name: string;
}

test('set and get round-trip typed values as JSON', () => {
  const vault = new Vault();
  vault.set<User>('user', { name: 'Todd Motto' });
  assert.deepEqual(vault.get<User>('user'), { name: 'Todd Motto' });
  assert.equal(localStorage.getItem('user'), '{"name":"Todd Motto"}');
  assert.equal(vault.get('missing'), undefined);
});

test('session type uses sessionStorage', () => {
  new Vault({ type: 'session' }).set('n', 1);
  assert.equal(sessionStorage.getItem('n'), '1');
  assert.equal(localStorage.length, 0);
});

test('prefix namespaces every operation', () => {
  const a = new Vault({ prefix: 'x9ea45' });
  const plain = new Vault();
  a.set('user', 'Ann');
  plain.set('other', 'kept');
  assert.equal(localStorage.getItem('x9ea45-user'), '"Ann"');
  assert.equal(a.get('user'), 'Ann');
  assert.equal(a.length, 1);
  assert.deepEqual(a.value, { user: '"Ann"' });

  a.removeAll();
  assert.equal(a.length, 0);
  assert.equal(plain.get('other'), 'kept');
});

test('remove, removeAll, length and value without a prefix', () => {
  const vault = new Vault();
  vault.set('a', 1);
  vault.set('b', 'two');
  assert.equal(vault.length, 2);
  assert.deepEqual(vault.value, { a: '1', b: '"two"' });
  vault.remove('a');
  assert.equal(vault.get('a'), undefined);
  vault.removeAll();
  assert.equal(vault.length, 0);
});

test('onChange fires only for its key and storage, until unsubscribed', () => {
  const vault = new Vault({ prefix: 'p' });
  const seen: string[] = [];
  const unsubscribe = vault.onChange('user', (e) => seen.push(e.key!));

  events.dispatchEvent(storageEvent('p-user', localStorage));
  events.dispatchEvent(storageEvent('p-other', localStorage));
  events.dispatchEvent(storageEvent('p-user', sessionStorage));
  unsubscribe();
  events.dispatchEvent(storageEvent('p-user', localStorage));

  assert.deepEqual(seen, ['p-user']);
});

test('isSupported is false when storage throws', () => {
  assert.equal(new Vault().isSupported, true);
  g['localStorage'] = Object.assign(new MemoryStorage(), {
    setItem() {
      throw new Error('QuotaExceededError');
    },
  });
  assert.equal(new Vault().isSupported, false);
});

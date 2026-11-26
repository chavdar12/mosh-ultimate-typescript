import assert from 'node:assert/strict';
import type { AddressInfo } from 'node:net';
import { after, before, test } from 'node:test';
import type { Server } from 'node:http';

import { createApp } from './app.js';

let server: Server;
let base: string;

before(async () => {
  server = createApp().listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://localhost:${(server.address() as AddressInfo).port}`;
});

after(() => server.close());

test('GET / says hello', async () => {
  assert.equal(await (await fetch(base)).text(), 'Hello World');
});

test('POST /reminders creates a reminder that GET lists', async () => {
  const res = await fetch(`${base}/reminders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Buy milk' }),
  });
  assert.equal(res.status, 201);
  const created = await res.json();
  assert.equal(created.title, 'Buy milk');
  assert.equal(created.isComplete, false);

  const list = await (await fetch(`${base}/reminders`)).json();
  assert.deepEqual(list, [created]);
});

test('POST /reminders rejects a missing title', async () => {
  const res = await fetch(`${base}/reminders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  assert.equal(res.status, 400);
});

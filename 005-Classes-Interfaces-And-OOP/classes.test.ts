import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { Logger } from './01.logger.js';
import { Person } from './02.person.js';
import { Employee } from './03.employee.js';
import { Account, SavingsAccount } from './04.privateVsProtected.js';
import { employee } from './05.employeeInterface.js';

test('01 logger appends messages to its file', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'logger-')), 'app.log');
  const logger = new Logger(file);
  logger.write('started');
  logger.write('stopped');
  assert.equal(readFileSync(file, 'utf8'), 'started\nstopped\n');
});

test('02 full name getter', () => {
  assert.equal(new Person('John', 'Smith').fullName, 'John Smith');
});

test('03 employee is a person with a salary', () => {
  const e = new Employee('Ann', 'Lee', 60_000);
  assert.ok(e instanceof Person);
  assert.equal(e.fullName, 'Ann Lee');
  assert.equal(e.salary, 60_000);
});

test('04 protected is usable in subclasses, private only inside', () => {
  const account = new SavingsAccount();
  assert.equal(account.addInterest(), 105);
  assert.equal(account.checkPin(1234), true);
  // @ts-expect-error protected is hidden from outside code
  void new Account().balance;
});

test('05 employee interface', () => {
  assert.equal(employee.address.city, 'Melbourne');
});

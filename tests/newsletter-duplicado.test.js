import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('el alta duplicada no revela que el correo ya estaba suscrito', () => {
  const fuente = readFileSync(join(root, 'app/api/newsletter/route.js'), 'utf8');
  assert.doesNotMatch(fuente, /status: 409/);
  assert.doesNotMatch(fuente, /Already subscribed/);
  assert.match(fuente, /err\.code === 11000[\s\S]{0,160}status: 201/);
});

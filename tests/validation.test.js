import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateContact, validateEmail } from '../lib/validation.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('email válido pasa', () => {
  assert.deepEqual(validateEmail('persona@example.com'), { ok: true, error: null });
});

test('email inválido no pasa', () => {
  assert.equal(validateEmail('no-es-email').ok, false);
  assert.equal(validateEmail('sin@punto').ok, false);
  assert.equal(validateEmail('').ok, false);
});

test('contacto válido pasa', () => {
  assert.deepEqual(
    validateContact({ name: 'Ana', email: 'ana@example.com', message: 'Hola' }),
    { ok: true, error: null },
  );
});

test('mensaje vacío no pasa', () => {
  const result = validateContact({ name: 'Ana', email: 'ana@example.com', message: '   ' });
  assert.equal(result.ok, false);
  assert.equal(result.error, 'Message is required');
});

test('nombre vacío no pasa', () => {
  const result = validateContact({ name: '', email: 'ana@example.com', message: 'Hola' });
  assert.equal(result.ok, false);
  assert.equal(result.error, 'Name is required');
});

test('ruta de artista espera params con await', () => {
  const route = readFileSync(join(root, 'app/api/artists/[id]/route.js'), 'utf8');
  assert.match(route, /const \{ id \} = await params/);
  assert.doesNotMatch(route, /params\.id/);
});

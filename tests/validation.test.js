import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, validateEmail } from '../lib/validation.js';

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

test('tipo desconocido no pasa', () => {
  const result = validateContact({ name: 'Ana', email: 'ana@example.com', message: 'Hola', kind: 'spam' });
  assert.equal(result.ok, false);
});

test('comentario sobre un experimento que existe pasa', () => {
  const body = { name: 'Ana', email: 'ana@example.com', message: 'Hola', kind: 'comment', about: 'campo-dither' };
  assert.equal(validateContact(body, ['campo-dither']).ok, true);
});

test('comentario sobre un experimento que no existe no pasa', () => {
  const body = { name: 'Ana', email: 'ana@example.com', message: 'Hola', kind: 'comment', about: 'inventado' };
  assert.equal(validateContact(body, ['campo-dither']).ok, false);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (ruta) => readFileSync(join(root, ruta), 'utf8');

test('el POST de contacto no avisa al dueno antes de confirmar', () => {
  const fuente = leer('app/api/contact/route.js');
  assert.doesNotMatch(fuente, /contactNotificationEmail/);
  assert.match(fuente, /contactVerifyEmail/);
  assert.match(fuente, /token/);
});

test('el mensaje se guarda sin confirmar y con token', () => {
  const fuente = leer('app/api/contact/route.js');
  assert.match(fuente, /ContactMessage\.create\(\{[^}]*token[^}]*\}\)/s);
  const modelo = leer('lib/models/ContactMessage.js');
  assert.match(modelo, /token:\s*\{[^}]*required:\s*true/);
  assert.match(modelo, /confirmado:\s*\{[^}]*default:\s*false/);
});

test('la confirmacion consume el token una sola vez', () => {
  const fuente = leer('app/api/contact/confirm/route.js');
  assert.match(fuente, /findOneAndUpdate/);
  assert.match(fuente, /token,\s*confirmado:\s*false/);
  assert.match(fuente, /confirmado:\s*true/);
});

test('solo la confirmacion entrega el mensaje al dueno', () => {
  const fuente = leer('app/api/contact/confirm/route.js');
  assert.match(fuente, /contactNotificationEmail/);
  assert.match(fuente, /NOTIFY_EMAIL/);
});

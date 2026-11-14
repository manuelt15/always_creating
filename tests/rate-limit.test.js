import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { claveCliente, comprobarLimite, reiniciarLimites } from '../lib/rate-limit.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('la primera peticion pasa y la sexta se corta', () => {
  reiniciarLimites();
  for (let i = 0; i < 5; i += 1) {
    assert.equal(comprobarLimite('prueba').ok, true);
  }
  const bloqueada = comprobarLimite('prueba');
  assert.equal(bloqueada.ok, false);
  assert.ok(bloqueada.reintentarEn > 0);
});

test('el limite es por clave, no global', () => {
  reiniciarLimites();
  for (let i = 0; i < 5; i += 1) comprobarLimite('a');
  assert.equal(comprobarLimite('a').ok, false);
  assert.equal(comprobarLimite('b').ok, true);
});

test('la ventana se reinicia al expirar', async () => {
  reiniciarLimites();
  assert.equal(comprobarLimite('ventana', { limite: 1, ventanaMs: 1 }).ok, true);
  assert.equal(comprobarLimite('ventana', { limite: 1, ventanaMs: 1 }).ok, false);
  await new Promise((r) => setTimeout(r, 5));
  assert.equal(comprobarLimite('ventana', { limite: 1, ventanaMs: 1 }).ok, true);
});

test('la clave sale de x-forwarded-for', () => {
  const request = { headers: new Headers({ 'x-forwarded-for': '9.9.9.9, 10.0.0.1' }) };
  assert.equal(claveCliente(request, 'contacto'), 'contacto:9.9.9.9');
});

test('sin cabecera de IP la clave no revienta', () => {
  const request = { headers: new Headers() };
  assert.equal(claveCliente(request, 'contacto'), 'contacto:desconocida');
});

test('las rutas publicas aplican el limite', () => {
  for (const ruta of ['app/api/contact/route.js', 'app/api/newsletter/route.js']) {
    const fuente = readFileSync(join(root, ruta), 'utf8');
    assert.match(fuente, /comprobarLimite\(claveCliente\(request/);
    assert.match(fuente, /status: 429/);
    assert.match(fuente, /LIMITE_BYTES/);
  }
});

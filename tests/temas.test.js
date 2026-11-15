import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { THEMES, DEFAULT_THEME, themeBootScript } from '../lib/theme.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'app/globals.css'), 'utf8');
const TOKENS = ['--ink', '--paper', '--accent', '--fill', '--on-fill', '--ash', '--line', '--line-strong', '--surface', '--surface-raised', '--dither'];

const bloque = (selector) => {
  const i = css.indexOf(selector);
  assert.ok(i > -1, `falta ${selector}`);
  return css.slice(i, css.indexOf('}', i));
};

test('el tema por defecto define todos los tokens en :root', () => {
  const raiz = bloque(':root {');
  for (const token of TOKENS) assert.match(raiz, new RegExp(`${token}:`), token);
});

test('cada tema alternativo redefine todos los tokens', () => {
  for (const { id } of THEMES.filter((t) => t.id !== DEFAULT_THEME)) {
    const tema = bloque(`:root[data-theme='${id}'] {`);
    for (const token of TOKENS) assert.match(tema, new RegExp(`${token}:`), `${id} ${token}`);
  }
});

test('el script de arranque solo acepta temas conocidos', () => {
  for (const { id } of THEMES.filter((t) => t.id !== DEFAULT_THEME)) {
    assert.match(themeBootScript, new RegExp(`"${id}"`));
  }
  assert.doesNotMatch(themeBootScript, new RegExp(`"${DEFAULT_THEME}"`));
});

test('no quedan colores fijos del tema azul fuera de los tokens', () => {
  const sinTokens = css.replace(/:root[^{]*\{[^}]*\}/g, '');
  assert.doesNotMatch(sinTokens, /rgba\(4, 10, 30|#1F4FEF|#A8C4FF/i);
});

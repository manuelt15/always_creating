import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('no hay desplegables nativos en la interfaz', () => {
  for (const dir of ['components', 'app', 'experiments']) {
    const walk = (d) =>
      readdirSync(d, { withFileTypes: true }).flatMap((e) =>
        e.isDirectory() ? walk(join(d, e.name)) : /\.(jsx?|tsx?)$/.test(e.name) ? [join(d, e.name)] : [],
      );
    for (const file of walk(join(root, dir))) {
      assert.doesNotMatch(readFileSync(file, 'utf8'), /<select[\s>]/, file);
    }
  }
});

test('el selector "Nada en concreto" se envía como vacío', () => {
  const fuente = readFileSync(join(root, 'components/ContactForm.jsx'), 'utf8');
  assert.match(fuente, /about: form\.about === GENERAL \? '' : form\.about/);
});

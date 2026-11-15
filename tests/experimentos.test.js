import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EXPERIMENTS, STATUS, KINDS } from '../lib/experiments.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('slugs y números no se repiten', () => {
  assert.equal(new Set(EXPERIMENTS.map((e) => e.slug)).size, EXPERIMENTS.length);
  assert.equal(new Set(EXPERIMENTS.map((e) => e.number)).size, EXPERIMENTS.length);
});

test('cada entrada tiene tipo, estado y fecha válidos', () => {
  for (const e of EXPERIMENTS) {
    assert.ok(KINDS[e.kind], `${e.slug}: tipo`);
    assert.ok(STATUS[e.status], `${e.slug}: estado`);
    assert.match(e.date, /^\d{4}-\d{2}-\d{2}$/, `${e.slug}: fecha`);
  }
});

test('las ideas escritas traen texto', () => {
  for (const e of EXPERIMENTS.filter((x) => x.kind === 'idea')) {
    assert.ok(Array.isArray(e.body) && e.body.length > 0, e.slug);
  }
});

test('cada diseño trae imágenes con alt y los archivos existen', () => {
  for (const e of EXPERIMENTS.filter((x) => x.kind === 'design')) {
    assert.ok(Array.isArray(e.images) && e.images.length > 0, `${e.slug}: imágenes`);
    for (const img of e.images) {
      assert.ok(typeof img.alt === 'string' && img.alt.trim(), `${img.src}: alt`);
      assert.match(img.src, new RegExp(`^/lab/${e.slug}/`), `${img.src}: carpeta`);
      assert.ok(existsSync(join(root, 'public', img.src)), `${img.src}: archivo`);
    }
  }
});

test('cada experimento de código tiene su componente registrado', () => {
  const registro = readFileSync(join(root, 'lib/experiment-components.js'), 'utf8');
  for (const e of EXPERIMENTS.filter((x) => x.kind === 'code')) {
    assert.ok(existsSync(join(root, 'experiments', e.slug, 'index.jsx')), `${e.slug}: carpeta`);
    assert.match(registro, new RegExp(`'${e.slug}':`), `${e.slug}: registro`);
  }
});

test('ya no queda rastro de artistas ni newsletter', () => {
  for (const ruta of ['app/artists', 'app/api/artists', 'app/api/newsletter', 'lib/models/Artist.js', 'lib/models/NewsletterSubscriber.js']) {
    assert.equal(existsSync(join(root, ruta)), false, ruta);
  }
});

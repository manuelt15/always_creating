import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contactVerifyEmail, contactConfirmationEmail, contactNotificationEmail } from '../lib/emails.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (ruta) => readFileSync(join(root, ruta), 'utf8');
const ejemplo = { name: 'Ana <b>', email: 'ana@example.com', kind: 'comment', about: 'Campo dither', message: 'Hola & <script>', siteUrl: 'https://example.com' };

test('los correos de después de confirmar escapan lo que escribe la persona', () => {
  for (const html of [contactConfirmationEmail(ejemplo), contactNotificationEmail(ejemplo)]) {
    assert.doesNotMatch(html, /<script>|Ana <b>/);
    assert.match(html, /Hola &amp; &lt;script&gt;/);
    assert.match(html, /https:\/\/example\.com\/email-band\.png/);
  }
});

test('el correo previo a confirmar no lleva nada escrito por quien envía', () => {
  const html = contactVerifyEmail({ ...ejemplo, url: 'https://example.com/api/contact/confirm?token=abc' });
  assert.match(html, /token=abc/);
  assert.match(html, /Campo dither/);
  assert.doesNotMatch(html, /Ana|Hola|script/);
  const ruta = readFileSync(join(root, 'app/api/contact/route.js'), 'utf8');
  const llamada = ruta.slice(ruta.indexOf('contactVerifyEmail({'), ruta.indexOf('}),', ruta.indexOf('contactVerifyEmail({')));
  assert.doesNotMatch(llamada, /\bname\b|\bmessage\b/);
});

test('los fallos de Resend no pasan en silencio', () => {
  const fuente = leer('lib/resend.js');
  assert.match(fuente, /const \{ data, error \} = await resend\.emails\.send/);
  assert.match(fuente, /if \(error\)/);
  for (const ruta of ['app/api/contact/route.js', 'app/api/contact/confirm/route.js']) {
    assert.doesNotMatch(leer(ruta), /resend\.emails\.send/, `${ruta} debe usar sendEmail`);
  }
});

test('el aviso al dueño responde directamente a quien escribió', () => {
  assert.match(leer('app/api/contact/confirm/route.js'), /replyTo: doc\.email/);
});

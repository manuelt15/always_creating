// Correos del formulario, con el estilo de la web (tema azul).
//
// Los clientes de correo no entienden CSS moderno ni fuentes web: todo va en tablas y estilos
// en línea, con fuentes del sistema que se parecen a las de la web (serif para titulares, mono
// para etiquetas). La trama dither llega como imagen (public/email-band.png), así que necesita
// una URL pública: `siteUrl` es el origen de la petición (el dominio en producción).

const C = {
  ink: '#040A1E',
  surface: '#081030',
  raised: '#0D1840',
  line: '#172458',
  paper: '#E6EEFF',
  accent: '#A8C4FF',
  fill: '#1F4FEF',
  ash: '#8A9DC8',
}

const SERIF = "Georgia, 'Times New Roman', serif"
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace"

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const KIND = { idea: 'Idea', comment: 'Comentario' }
const kindLabel = (kind) => KIND[kind] || KIND.idea

const label = (text, color = C.ash) => `
  <p style="margin:0 0 10px;font-family:${MONO};font-size:11px;line-height:1;letter-spacing:2px;text-transform:uppercase;color:${color};">${text}</p>`

const button = (href, text) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr><td bgcolor="${C.fill}" style="background:${C.fill};">
      <a href="${escapeHtml(href)}" style="display:inline-block;padding:16px 28px;font-family:${MONO};font-size:12px;line-height:1;letter-spacing:2px;text-transform:uppercase;color:${C.paper};text-decoration:none;">${text}</a>
    </td></tr>
  </table>`

// Ficha del mensaje: tipo, sobre qué y el texto. La ven las dos partes.
const resumen = ({ kind, about, message, extra = [] }) => {
  const filas = [
    ['Tipo', escapeHtml(kindLabel(kind))],
    ['Sobre', escapeHtml(about || 'Nada en concreto')],
    ...extra,
  ]
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.line};background:${C.ink};">
    ${filas
      .map(
        ([k, v]) => `
    <tr><td style="padding:14px 18px;border-bottom:1px solid ${C.line};">
      ${label(k)}
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.5;color:${C.paper};">${v}</p>
    </td></tr>`,
      )
      .join('')}
    <tr><td style="padding:14px 18px;">
      ${label('Mensaje')}
      <p style="margin:0;font-family:${SANS};font-size:15px;line-height:1.7;color:${C.paper};white-space:pre-wrap;">${escapeHtml(message)}</p>
    </td></tr>
  </table>`
}

const base = ({ preheader, siteUrl, content, footerNote }) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>always creating</title>
</head>
<body style="margin:0;padding:0;background:${C.ink};" bgcolor="${C.ink}">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.ink};">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.ink}" style="background:${C.ink};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

        <tr><td style="padding:0 0 18px;">
          <a href="${escapeHtml(siteUrl)}" style="font-family:${SERIF};font-size:24px;line-height:1;color:${C.paper};text-decoration:none;">always creating<span style="color:${C.accent};">.</span></a>
        </td></tr>

        <tr><td bgcolor="${C.surface}" style="background:${C.surface};border:1px solid ${C.line};">
          <img src="${escapeHtml(siteUrl)}/email-band.png" width="600" height="60" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:32px 32px 36px;">
              ${content}
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:22px 0 0;">
          <p style="margin:0 0 6px;font-family:${MONO};font-size:11px;line-height:1.6;letter-spacing:2px;text-transform:uppercase;color:${C.ash};">Para quien nunca deja de crear.</p>
          <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.ash};">${footerNote}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

const titular = (texto) =>
  `<h1 style="margin:0 0 18px;font-family:${SERIF};font-size:32px;font-weight:400;line-height:1.08;color:${C.paper};">${texto}</h1>`

const parrafo = (texto, color = C.ash) =>
  `<p style="margin:0 0 24px;font-family:${SANS};font-size:15px;line-height:1.7;color:${color};">${texto}</p>`

// 1. A quien escribe, nada más enviar: confirmar que el correo es suyo (doble opt-in).
export function contactVerifyEmail({ name, url, kind, about, message, siteUrl }) {
  return base({
    siteUrl,
    preheader: 'Un clic para que tu mensaje llegue.',
    footerNote: 'Si no has escrito tú en always creating, ignora este correo: sin confirmar, el mensaje no se entrega y se queda ahí.',
    content: `
      ${label('Un paso más', C.accent)}
      ${titular(`Confirma tu mensaje, <em style="color:${C.accent};">${escapeHtml(name)}</em>.`)}
      ${parrafo('Solo falta comprobar que este correo es tuyo. Hasta que no lo confirmes, el mensaje no me llega.')}
      ${button(url, 'Confirmar mi mensaje')}
      <div style="height:32px;line-height:32px;">&nbsp;</div>
      ${label('Lo que has enviado')}
      ${resumen({ kind, about, message })}`,
  })
}

// 2. A quien escribe, después de confirmar: acuse de recibo con copia de lo que mandó.
export function contactConfirmationEmail({ name, kind, about, message, siteUrl }) {
  const cosa = kind === 'comment' ? 'Tu comentario' : 'Tu idea'
  return base({
    siteUrl,
    preheader: `${cosa} ya está conmigo.`,
    footerNote: 'Recibes este correo porque confirmaste un mensaje en always creating. No te escribiré para nada más.',
    content: `
      ${label('Recibido', C.accent)}
      ${titular(`${cosa} ha llegado, <em style="color:${C.accent};">${escapeHtml(name)}</em>.`)}
      ${parrafo('Gracias por pasar. Lo leo todo, y si hay algo que contestar te escribo a este correo.')}
      ${label('Copia de tu mensaje')}
      ${resumen({ kind, about, message })}
      <div style="height:28px;line-height:28px;">&nbsp;</div>
      ${button(siteUrl, 'Volver al laboratorio')}`,
  })
}

// 3. A mí (NOTIFY_EMAIL): el mensaje ya confirmado. "Responder" contesta directamente a quien escribió.
export function contactNotificationEmail({ name, email, message, kind, about, siteUrl }) {
  const nuevo = kind === 'comment' ? 'Nuevo comentario' : 'Nueva idea'
  return base({
    siteUrl,
    preheader: `${nuevo} de ${name}${about ? `, sobre ${about}` : ''}.`,
    footerNote: 'Mensaje confirmado desde el formulario de always creating. Al responder a este correo le contestas directamente a quien lo escribió.',
    content: `
      ${label(nuevo, C.accent)}
      ${titular(`${escapeHtml(name)} ${kind === 'comment' ? 'ha comentado lo que ha visto' : 'te ha dejado una idea'}.`)}
      ${resumen({
        kind,
        about,
        message,
        extra: [
          ['Nombre', escapeHtml(name)],
          ['Correo', `<a href="mailto:${escapeHtml(email)}" style="color:${C.accent};text-decoration:underline;">${escapeHtml(email)}</a>`],
        ],
      })}
      <div style="height:28px;line-height:28px;">&nbsp;</div>
      ${button(`mailto:${email}`, `Responder a ${escapeHtml(name)}`)}`,
  })
}

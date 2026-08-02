// ─── Design tokens (mirror the web's light theme) ─────────────────────────
// page bg #f5f4f0 · card #ffffff · border #e0ded8 · text #111111
// secondary #444444 · muted #888888 · brand #1777e5
// heading: sans-serif (CyGrotesk fallback) · body: Courier Prime fallback (mono)

const SANS = "'Helvetica Neue', Arial, sans-serif"
const MONO = "'Courier New', Courier, monospace"

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const base = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>alwayscreating</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f4f0;font-family:${MONO};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f4f0;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e0ded8;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:28px 40px;border-bottom:1px solid #e0ded8;text-align:center;">
            <span style="font-family:${SANS};font-size:16px;font-weight:700;color:#111111;letter-spacing:1px;text-transform:uppercase;">alwayscreating</span>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e0ded8;">
            <p style="margin:0;font-family:${MONO};font-size:11px;color:#888888;line-height:1.6;">
              Dedicated to the ones who never stop creating.<br/>
              © ${new Date().getFullYear()} alwayscreating. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`

const eyebrow = (text) => `
  <p style="margin:0 0 12px;font-family:${MONO};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#888888;">
    <span style="color:#1777e5;">✦</span> ${text}
  </p>`

export function contactConfirmationEmail({ name }) {
  return base(`
    ${eyebrow('Message received')}
    <h1 style="margin:0 0 24px;font-family:${SANS};font-size:28px;font-weight:700;color:#111111;line-height:1.1;text-transform:uppercase;letter-spacing:-0.5px;">
      Hey ${escapeHtml(name)},<br/>we got your message.
    </h1>
    <p style="margin:0 0 24px;font-family:${MONO};font-size:13px;color:#444444;line-height:1.8;">
      Thanks for reaching out. We'll review your message and get back to you as soon as possible.
    </p>
    <p style="margin:0;font-family:${MONO};font-size:13px;color:#444444;line-height:1.8;">
      — alwayscreating
    </p>
  `)
}

export function contactNotificationEmail({ name, email, message }) {
  return base(`
    ${eyebrow('New contact message')}
    <h1 style="margin:0 0 32px;font-family:${SANS};font-size:24px;font-weight:700;color:#111111;line-height:1.1;text-transform:uppercase;letter-spacing:-0.5px;">
      Someone wants to work together.
    </h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ded8;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e0ded8;background-color:#f5f4f0;">
          <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#888888;">Name</p>
          <p style="margin:4px 0 0;font-family:${MONO};font-size:14px;color:#111111;">${escapeHtml(name)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #e0ded8;background-color:#f5f4f0;">
          <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#888888;">Email</p>
          <p style="margin:4px 0 0;font-family:${MONO};font-size:14px;color:#1777e5;">${escapeHtml(email)}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;background-color:#f5f4f0;">
          <p style="margin:0;font-family:${MONO};font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#888888;">Message</p>
          <p style="margin:4px 0 0;font-family:${MONO};font-size:14px;color:#444444;line-height:1.8;white-space:pre-wrap;">${escapeHtml(message)}</p>
        </td>
      </tr>
    </table>

    <a href="mailto:${escapeHtml(email)}" style="display:inline-block;font-family:${MONO};font-size:13px;font-weight:700;background-color:#1777e5;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;">
      Reply to ${escapeHtml(name)} →
    </a>
  `)
}

export function newsletterConfirmationEmail() {
  return base(`
    ${eyebrow("You're in")}
    <h1 style="margin:0 0 24px;font-family:${SANS};font-size:32px;font-weight:700;color:#111111;line-height:1.0;text-transform:uppercase;letter-spacing:-0.5px;">
      Stay in the loop.
    </h1>
    <p style="margin:0 0 24px;font-family:${MONO};font-size:13px;color:#444444;line-height:1.8;">
      You're now subscribed to alwayscreating. New artists, curated drops, and creative updates — straight to your inbox.
    </p>
    <p style="margin:0;font-family:${MONO};font-size:13px;color:#444444;line-height:1.8;">
      — alwayscreating
    </p>
  `)
}
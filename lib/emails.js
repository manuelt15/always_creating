const base = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
</head>
<body style="margin:0;padding:0;background-color:#111111;font-family:'Courier New',Courier,monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#1a1a1a;border:1px solid #222222;border-radius:8px;overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="padding:32px 40px;border-bottom:1px solid #222222;">
            <span style="font-family:'Courier New',Courier,monospace;font-size:16px;font-weight:700;color:#f5f4f0;letter-spacing:2px;text-transform:uppercase;">alwayscreating</span>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #222222;">
            <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:11px;color:#666666;">
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

export function contactConfirmationEmail({ name }) {
  return base(`
    <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#666666;">✦ Message received</p>
    <h1 style="margin:0 0 24px;font-family:'Courier New',Courier,monospace;font-size:28px;font-weight:700;color:#f5f4f0;line-height:1.1;">
      Hey ${name},<br/>we got your message.
    </h1>
    <p style="margin:0 0 24px;font-family:'Courier New',Courier,monospace;font-size:13px;color:#aaaaaa;line-height:1.8;">
      Thanks for reaching out. We'll review your message and get back to you as soon as possible.
    </p>
    <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:13px;color:#aaaaaa;line-height:1.8;">
      — alwayscreating
    </p>
  `)
}

export function contactNotificationEmail({ name, email, message }) {
  return base(`
    <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#666666;">✦ New contact message</p>
    <h1 style="margin:0 0 32px;font-family:'Courier New',Courier,monospace;font-size:24px;font-weight:700;color:#f5f4f0;line-height:1.1;">
      Someone wants to work together.
    </h1>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #222222;border-radius:6px;overflow:hidden;margin-bottom:24px;">
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #222222;background-color:#111111;">
          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#666666;">Name</p>
          <p style="margin:4px 0 0;font-family:'Courier New',Courier,monospace;font-size:14px;color:#f5f4f0;">${name}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;border-bottom:1px solid #222222;background-color:#111111;">
          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#666666;">Email</p>
          <p style="margin:4px 0 0;font-family:'Courier New',Courier,monospace;font-size:14px;color:#1777e5;">${email}</p>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 20px;background-color:#111111;">
          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#666666;">Message</p>
          <p style="margin:4px 0 0;font-family:'Courier New',Courier,monospace;font-size:14px;color:#aaaaaa;line-height:1.8;white-space:pre-wrap;">${message}</p>
        </td>
      </tr>
    </table>

    <a href="mailto:${email}" style="display:inline-block;font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:700;background-color:#1777e5;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;">
      Reply to ${name} →
    </a>
  `)
}

export function newsletterConfirmationEmail() {
  return base(`
    <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#666666;">✦ You're in</p>
    <h1 style="margin:0 0 24px;font-family:'Courier New',Courier,monospace;font-size:32px;font-weight:700;color:#f5f4f0;line-height:1.0;">
      Stay in the loop.
    </h1>
    <p style="margin:0 0 24px;font-family:'Courier New',Courier,monospace;font-size:13px;color:#aaaaaa;line-height:1.8;">
      You're now subscribed to alwayscreating. New artists, curated drops, and creative updates — straight to your inbox.
    </p>
    <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:13px;color:#aaaaaa;line-height:1.8;">
      — alwayscreating
    </p>
  `)
}

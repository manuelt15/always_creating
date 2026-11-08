# alwayscreating

A curated platform for discovering creatives — built for artists who exist beyond a single discipline.

## Stack

- **Framework** — Next.js 16.2.6 (App Router)
- **React** — 19
- **Database** — MongoDB Atlas via Mongoose
- **Styling** — Tailwind CSS, shadcn sobre Radix
- **Email** — Resend
- **Hosting** — Vercel

## Features

- Artist directory with profile cards and overlay previews
- Contact form saved to MongoDB
- Newsletter subscription list
- Dark / light mode
- Fully responsive

## Datos y correo

- El formulario de contacto (`POST /api/contact`) escribe el mensaje en MongoDB (colección de mensajes de contacto) y envía dos correos con Resend: confirmación a la persona que escribe y notificación a `NOTIFY_EMAIL`.
- La newsletter (`POST /api/newsletter`) guarda el email en MongoDB y envía un correo de confirmación con Resend.
- Si Resend falla, el error de correo se registra en log pero la respuesta HTTP sigue siendo de éxito (201). El registro en Mongo ya se hizo. Este es el comportamiento actual: no cambia la respuesta al cliente.

## Variables de entorno

Crea un `.env.local` en la raíz del proyecto con estas cinco variables:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=you@your-domain.example
NOTIFY_EMAIL=you@example.com
```

- `MONGODB_URI` — Conexión a MongoDB Atlas. Sin ella la app no puede leer artistas ni guardar mensajes/suscripciones; `lib/mongodb.js` lanza error si falta.
- `NEXT_PUBLIC_SITE_URL` — URL pública del sitio (solo para desarrollo local; en Vercel se define en el panel). Ya no se usa para que el perfil de artista se pida a sí mismo por red.
- `RESEND_API_KEY` — Clave de Resend. Se pasa a `lib/resend.js` para construir el cliente de correo.
- `FROM_EMAIL` — Remitente de los correos. Si no se define, se usa `onboarding@resend.dev`.
- `NOTIFY_EMAIL` — Destino de la notificación cuando alguien envía el formulario de contacto. Si no se define, se usa `contact.manueltorres@gmail.com` (valor por defecto en `lib/resend.js`).

## Arranque en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000 (o el puerto que indique Next si 3000 está ocupado). Comprueba:

```bash
npm test
```

## Deploy

Hosted on Vercel. Add `MONGODB_URI`, `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `FROM_EMAIL` and `NOTIFY_EMAIL` as environment variables in the Vercel dashboard before deploying.

Make sure your MongoDB Atlas cluster has `0.0.0.0/0` under Network Access so Vercel can connect.

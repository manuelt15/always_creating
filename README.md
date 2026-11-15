# always creating

Sitio de una sola página para un colectivo abierto de artistas: hero, manifiesto, roster, colaboración y contacto. La identidad visual es dither / 1-bit, con cuatro colores fijos y tipografía editorial.

## Stack

- **Framework**: Next.js 16 (App Router, JavaScript)
- **React**: 19
- **Base de datos**: MongoDB Atlas vía Mongoose
- **Estilos**: Tailwind CSS 3 con clases propias. La paleta y el dither viven en `app/globals.css`
- **Comportamiento de interfaz**: `@ui-sdk/core` y `@ui-sdk/react` (diálogos, foco y campos). ui-sdk no aporta estilos: la capa visual sigue siendo nuestra
- **Correo**: Resend
- **Hosting**: Vercel

## Arranque en local

Requiere Node 22 o superior y una base MongoDB accesible.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Si el puerto está ocupado, Next muestra el que use.

Comprobaciones:

```bash
npm test
npm run build
```

`npm run build` necesita las variables de entorno cargadas. Para una compilación local sin servicios reales:

```bash
RESEND_API_KEY=re_dummy MONGODB_URI=mongodb://127.0.0.1:27017/alwayscreating npm run build
```

El repositorio no tiene linter: `next lint` desapareció en Next 16 y no hay ESLint instalado. La verificación es `npm run build` más `npm test`. Ver `AGENTS.md`.

## Variables de entorno

Crea un `.env.local` en la raíz con estas cinco variables:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=you@your-domain.example
NOTIFY_EMAIL=you@example.com
```

- `MONGODB_URI`: conexión a MongoDB Atlas. Sin ella la app no puede leer artistas ni guardar mensajes o suscripciones; `lib/mongodb.js` lanza error si falta.
- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio. En Vercel se define en el panel.
- `RESEND_API_KEY`: clave de Resend. La usa `lib/resend.js` para construir el cliente de correo.
- `FROM_EMAIL`: remitente de los correos. Si no se define, se usa `onboarding@resend.dev`.
- `NOTIFY_EMAIL`: destino de la notificación del formulario de contacto. Si no se define, se usa `contact.manueltorres@gmail.com` (valor por defecto en `lib/resend.js`).

## Datos y correo

- `POST /api/contact` guarda el mensaje en MongoDB y envía dos correos con Resend: confirmación a quien escribe y aviso a `NOTIFY_EMAIL`. El mensaje no llega a la bandeja hasta que la persona confirma el enlace (doble opt-in).
- `POST /api/newsletter` guarda el email y envía un correo de confirmación. La suscripción se activa al confirmar.
- Si Resend falla, el error se registra en log pero la respuesta HTTP sigue siendo de éxito (201): el registro en Mongo ya se hizo. No cambia la respuesta al cliente.

## Assets dither

Los PNG de `public/dither/` se generan con un script del repo, no a mano y no en el navegador:

```bash
python3 tools/generate-dither.py
```

- Script: `tools/generate-dither.py`. Necesita Pillow (`python3 -m pip install pillow`).
- Entradas: `public/artists/manuel-torres.jpg` y `public/moya.jpg`.
- Salidas en `public/dither/`: `manuel-900.png`, `manuel-480.png`, `moya-900.png`, `moya-480.png`, `degradado-lima.png` y `grano.png`.
- Técnica: dither ordenado con matriz Bayer 8x8 y dos tintas (`ink` y `paper`), recorte 4:5 para los retratos. El resultado es determinista: el mismo original produce el mismo PNG.
- Los PNG se commitean. Solo se regeneran si cambian las fotos originales o la matriz.

El campo dither animado del hero no es un PNG: es un canvas en `components/DitherField.jsx` que pinta la misma matriz de Bayer en lima y reacciona al puntero. El PNG `degradado-lima.png` se usa como respaldo estático y en la sección de colaboración.

## Diseño e interfaz

- `components/ArtistOverlay.jsx` usa `Dialog` de `@ui-sdk/react` para el perfil de artista: cierre con Escape, foco atrapado, scroll de fondo bloqueado y retorno del foco al botón que abrió el perfil. El marcado y las clases siguen siendo los del sitio.
- `components/ContactForm.jsx` y `components/NewsletterForm.jsx` usan `Field`, `FieldLabel` y `FieldError` de `@ui-sdk/react` para conectar etiqueta, mensaje de error y control (`aria-describedby`, `aria-invalid`). Los textos y el flujo de envío no cambian.
- La cabecera se apoya sobre el campo dither del hero: sin borde inferior, sin fondo sólido y sin línea en el menú móvil. El velo superior del hero mantiene el contraste de las etiquetas.
- Antes de tocar diálogos o formularios, lee `node_modules/@ui-sdk/react/docs/llms.txt`.

## Deploy

El sitio vive en Vercel. Antes de desplegar, define `MONGODB_URI`, `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `FROM_EMAIL` y `NOTIFY_EMAIL` en el panel del proyecto.

La red de MongoDB Atlas debe permitir `0.0.0.0/0` en Network Access para que Vercel pueda conectar.

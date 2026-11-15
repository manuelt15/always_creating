# Handover 2026-11-15: de sala de artistas a laboratorio personal

La web deja de ser un directorio de artistas y pasa a ser el laboratorio de Manuel: ideas escritas,
código y diseños sin terminar, con un formulario para dejar ideas o comentarios. En producción en
`alwayscreating.es` desde hoy.

## Qué se hizo

Commits en `main` (fast-forward desde `feat/cuaderno-experimentos`, que sigue existiendo):

- `ea32ca8` feat(web): convierte la sala de artistas en laboratorio personal
- `f5254fd` fix(correo): el correo previo a confirmar no lleva texto de quien escribe
- `9222790` feat(web): iconos propios en dither en vez del favicon de Vercel

Contenido:

- **Registro de experimentos** en `lib/experiments.js` con tres tipos: idea escrita (`body`),
  experimento con código (`experiments/<slug>/index.jsx` + `lib/experiment-components.js`) y diseño
  (imágenes en `public/lab/<slug>/`). Cada entrada es una card en la portada y una página `/lab/<slug>`
  con la ficha en chips y "Comentar" en overlay (`CommentDialog`). Dos entradas de ejemplo: E/001 Campo
  dither (código) y E/002 Retratos de un bit (idea; el texto lo escribió Claude, Manuel lo cambiará).
- **Portada**: hero con el campo dither, el porqué del sitio, selector de tema y card "Trabajo
  profesional" que enlaza a manueltorres.pro; 001 Experimentos; franja dither interactiva; 002 Ideas y
  comentarios (ancla `#puerta`). Pie: solo wordmark y franja con © y lema.
- **Tres temas** (azul, naranja, mono) con tokens semánticos (`--accent`, `--fill`, `--on-fill`,
  `--dither`…), guardados en `localStorage` (`ac-theme`) y aplicados por un script en `<head>` antes de
  pintar (`lib/theme.js`). Paleta y contrastes en `DESIGN.md`.
- **Formulario**: `Select` y `SegmentedControl` de ui-sdk (sin `<select>` nativo), botón "Enviar",
  `kind` (idea o comentario) y `about` (slug) en `ContactMessage`. Doble opt-in intacto.
- **Correos** (`lib/emails.js`) con el estilo de la web y franja `public/email-band.png`. El aviso al
  dueño lleva `reply-to`. La confirmación redirige a `/confirmacion`, página del sitio.
- **Seguridad**: el correo previo a confirmar ya no incluye nombre ni mensaje (lo detectó la revisión
  automática: permitía mandar texto propio a un correo ajeno desde el dominio). `sendEmail` en
  `lib/resend.js` comprueba el `{ error }` de Resend.
- **Base de datos** (la misma que producción): borradas `artists` (copia en
  `~/Developer/_env-backups/always_creating-artists-2026-11-15.json`) y `newslettersubscribers`;
  `contactmessages` con `kind`/`about`; creado el índice de `token` que faltaba. Script:
  `tools/migrar-cuaderno.mjs`.
- **Responsive y móvil**: footer siempre al final (`body` flex, `100dvh`), `overflow-x: clip`, velo
  difuminado bajo el texto del hero por debajo de 1024 px, 404 propia.
- **Metas**: Open Graph, Twitter y canonical; imagen `public/og-image.png` (captura del hero en dither,
  `tools/generate-og.mjs`). Iconos en dither (`tools/generate-icons.mjs`).
- Fuera: rutas, API, modelos, componentes e imágenes de artistas y newsletter.

Fuera de este repo, el mismo día: card de always creating actualizada en el portafolio y entrada nueva
en el README de `manuelt15/manuelt15` (ver la memoria del portafolio).

## Cómo se verificó

- `npm test`: 34 pasan, 0 fallan (registro de experimentos, temas, correos, validación, rate limit,
  formulario sin `<select>`).
- `RESEND_API_KEY=re_dummy MONGODB_URI=mongodb://127.0.0.1:27017/alwayscreating npx next build`: exit 0.
- Navegador: 320, 375, 768, 1024, 1440 y 1920 px sin desborde horizontal; footer en 1600/1600 px en
  una página corta; los tres temas; overlay con errores, fallo de servidor y éxito con la API simulada.
- Producción: `https://alwayscreating.es/` sirve el hero nuevo, `og:image` apunta a
  `https://alwayscreating.es/og-image.png` (así que `NEXT_PUBLIC_SITE_URL` está bien en Vercel),
  `/artists` da 404, `favicon.ico` sirve el nuevo (410 bytes).
- Manuel probó el formulario en la preview de Vercel: "llega todo bien".

## Pendiente

En `pending.md`: revisión RGPD del texto de privacidad (incluye los 9 mensajes antiguos que se quedan)
y `FROM_EMAIL` local, que sigue siendo `onboarding@resend.dev`.

## Trampas

- `onboarding@resend.dev` solo entrega al dueño de la cuenta de Resend, y el SDK no lanza al rechazar.
- Next 16 no aplica `opengraph-image.alt.txt`: la imagen se declara a mano en `app/layout.js`.
- Un `.ico` con PNG dentro tiene que ser RGBA o el build de Next falla.
- `dynamicParams = false` hacía que en desarrollo un slug nuevo diera 404 hasta reiniciar: quitado.
- El script del tema en `<head>` genera un aviso de React solo en desarrollo; `next/script` con
  `beforeInteractive` lo ejecuta tarde y el tema parpadea.
- `.claude/launch.json` y `public/_preview-correos/` están en `.git/info/exclude`, solo en local.

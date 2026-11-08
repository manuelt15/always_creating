# alwayscreating — Memoria del proyecto

Fuente de verdad del proyecto. Leer al iniciar cada sesión.

## Índice

- [Cierre 2026-11-08 — README, DESIGN y validación](handovers/HANDOVER-2026-11-08-readme-design-validacion.md) — documentación al día, sistema de diseño escrito y perfil de artista arreglado.
- [Lecciones](lessons.md) — errores encontrados y su porqué.
- `DESIGN.md` en la raíz — sistema real de tipografías, escala, colores y reglas de uso, leído del código.
- `README.md` — qué es, cómo arrancar, las cinco variables de entorno.

## Estado — 2026-11-08

- **Next 16.2.6** (el README decía 15: corregido), React 19, JavaScript, Tailwind 3, shadcn/Radix, Mongoose contra Atlas, Resend.
- Web pública de artistas: `/` (manifiesto), `/artists` (directorio), `/artists/[id]` (perfil por slug).
- Contacto y newsletter **escriben en Mongo** y mandan correo por Resend. Si Resend falla, la respuesta HTTP
  sigue siendo de éxito: comportamiento conocido, documentado, sin arreglar.
- Validación en servidor con `lib/validation.js` y `400` cuando no pasa.
- Pruebas: `npm test` con `node:test`, 6 casos, sin dependencias nuevas.
- **Sin autenticación ni panel de administración**: no hay forma de cargar artistas salvo por base de datos.
- Sin seed y sin `memory/`... hasta hoy.

## Cómo arrancar en local

Necesita `MONGODB_URI`, y para compilar también `RESEND_API_KEY` (el constructor de Resend se evalúa al
recoger datos de página). Sin base de datos, el directorio y la portada muestran los estados vacíos.

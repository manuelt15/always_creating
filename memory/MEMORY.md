# alwayscreating — Memoria del proyecto

Fuente de verdad del proyecto. Leer al iniciar cada sesión.

Baseline enlaces rotos: 0 (2026-11-15)

## Índice

- [Pendiente](pending.md) — lo que queda abierto. **Leer primero.**
- [Cierre 2026-11-24: el controlador de hogar](handovers/HANDOVER-2026-11-24-controlador-de-hogar.md) — E/004 enseña el prototipo del repo tal cual (sin port) y el hero pasa a ir a sangre con el punto cuadrado; en producción.
- [Cierre 2026-11-16: animaciones y DESIGNERS](handovers/HANDOVER-2026-11-16-animaciones-y-designers.md) - movimiento con criterio de Emil y E/003 con los carteles que venían del portafolio; en producción.
- [Cierre 2026-11-15 — laboratorio personal](handovers/HANDOVER-2026-11-15-laboratorio-personal.md) — la web pasa a laboratorio de Manuel: experimentos, tres temas, formulario nuevo y correos; en producción.
- [Cierre 2026-11-08 — README, DESIGN y validación](handovers/HANDOVER-2026-11-08-readme-design-validacion.md) — documentación al día, sistema de diseño escrito y perfil de artista arreglado.
- [Lecciones](lessons.md) — errores encontrados y su porqué.
- `DESIGN.md` en la raíz — sistema real de tipografías, escala, colores y reglas de uso, leído del código.
- `README.md` — qué es, cómo arrancar, las cinco variables de entorno.

## Estado — 2026-11-15

- **Laboratorio personal de Manuel** en `alwayscreating.es`, en español salvo el nombre. Next 16.2.6,
  React 19, JavaScript, Tailwind 3, ui-sdk (comportamiento), Mongoose contra Atlas, Resend.
- Rutas: `/` (hero, experimentos, ideas y comentarios), `/lab/[slug]` (cada experimento),
  `/confirmacion` (resultado del doble opt-in), 404 propia. Sin artistas ni newsletter.
- Experimentos en código: `lib/experiments.js`. Cómo añadir uno, en el README.
- Tres temas de color con tokens semánticos; todo en `DESIGN.md`.
- Formulario con doble opt-in; `kind` y `about` en `ContactMessage`. Envíos por `sendEmail`.
- Pruebas: `npm test` con `node:test`, 34 casos.
- Sin panel de administración: los experimentos se publican con un deploy.

## Cómo arrancar en local

Necesita `MONGODB_URI`, y para compilar también `RESEND_API_KEY` (el constructor de Resend se evalúa al
recoger datos de página). Sin base de datos, el directorio y la portada muestran los estados vacíos.

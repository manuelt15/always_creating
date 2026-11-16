# Handover 2026-11-16: animaciones con criterio y E/003 DESIGNERS

## Qué se hizo

En `main`, desplegado en alwayscreating.es:

- `b2ff1fe` feat(ui): animaciones con criterio (skill `emil-design-eng`). Detalle en la sección
  "Movimiento" de `DESIGN.md`. Resumen:
  - Curvas comunes `--ease-out`, `--ease-in-out` y `--ease-drawer` en `:root` de `app/globals.css`;
    fuera las `cubic-bezier(0.2, 0, 0, 1)` sueltas.
  - Al pulsar: `.btn-primary`, `.btn-line` y `.press` a `scale(0.97)`; `.card-press` y el
    desplegable a `0.99`.
  - Hero con entrada escalonada (`.enter` + `--i`, 50 ms entre piezas, 450 ms, `backwards`).
  - Cards de 001 reveladas una vez al entrar en pantalla con `components/RevealList.jsx`
    (60 ms de escalón). Solo oculta las que están por debajo del borde al montarse.
  - Cambio de tema con View Transitions (200 ms) y `flushSync` en `ThemeSwitcher`.
  - Aviso de enviado (`.notice-enter`) y errores de campo con `@starting-style`.
  - Diálogo de comentar: entra desde `scale(0.97)` centrado.
  - `future.hoverOnlyWhenSupported` en `tailwind.config.js`.
- `ba443b9` feat(lab): E/003 DESIGNERS. Los dos carteles que estaban en "Fuera del código" del
  portafolio pasan aquí como entrada de diseño (`public/lab/designers/`, 1400 px, ~400 KB cada uno,
  generados con `sharp` desde los originales de 2480x3508). La portada de las cards de diseño se
  ancla arriba (`object-top`).

Fuera de este repo, el mismo día: el portafolio quita los carteles y su card de "Fuera del código"
pasa a enlazar aquí (ver su memoria).

## Cómo se verificó

- `npm test`: 34 pasan. Build con las variables ficticias: exit 0, prerenderiza `/lab/designers`.
- CSS compilado: `@starting-style`, `::view-transition-*`, `.enter` y hover dentro de
  `@media (hover:hover) and (pointer:fine)`.
- Chrome sin ventana por DevTools: hero a 120 ms con opacidades 0.93/0.84/0.65/0.30; cards ocultas
  y luego `shown` con retrasos 0 y 60 ms; diálogo arranca en `scale 0.97`; errores a 0.44 de
  opacidad a 40 ms; el tema pasa a naranja con View Transition; sin errores en consola.
- Capturas a 1280 px de la portada y de `/lab/designers`.
- Producción: `/lab/designers` 200, `manifiesto.jpg` 200 (401 KB), la portada sirve `.enter`.

## Pendiente

En `pending.md`: el "qué aprendí" de E/003 lo redactó Claude; la errata "leguaje" del cartel claro
(la corrige Manuel reexportando de Figma). Siguen la revisión RGPD y `FROM_EMAIL`.

## Trampas

- El panel del navegador integrado oculto tiene el renderizado parado: `requestAnimationFrame` no
  llega, `innerHeight` es 0 y las transiciones no avanzan. Ver `lessons.md`.
- `git push` rechazado: había en remoto un commit de memoria (`1b1296a`) hecho desde otra sesión.
  Se rebasó encima porque solo tocaba `memory/lessons.md`.

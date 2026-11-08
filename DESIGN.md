# DESIGN.md — alwayscreating

Sistema real, leído de `tailwind.config.js`, `app/layout.js` y `app/globals.css`. No inventa tokens: si no está aquí, no existe.

## Fuentes (en `app/layout.js`)

- **CyGrotesk** — OTF local `app/fonts/CyGroteskStd-GrandDemi.otf`, variable `--font-cy`. Aliada en Tailwind como `heading` (`font-heading`).
- **Courier Prime** — `next/font/google` (400, 700), variable `--font-courier`. Aliada como `display` y `body` (`font-display`, `font-body`).
- **Inter** — `next/font/google`, variable `--font-inter`. Aliada como `ui` (`font-ui`).

En `body` se usa `font-body` por defecto.

## Escala tipográfica (`fontSize` en `tailwind.config.js`)

| Token | Tamaño | Line-height | Letter-spacing |
| --- | --- | --- | --- |
| `hero` | 50px | 63px | -1px |
| `section` | 44px | 52px | — |
| `hxl` | 36px | 1.2 | — |
| `hlg` | 32px | 1.2 | — |
| `hmd` | 22px | 1.3 | — |
| `hsm` | 19px | 1.3 | -0.3px |
| `stat` | 30px | 1 | — |

## Colores

Tokens CSS en `app/globals.css` (`:root` / `.dark`), expuestos por Tailwind.

Tokens de marca (fijos, no cambian con modo):

- `brand.DEFAULT` `#1777e5`
- `brand.dark` `#0F51AB`
- `brand.xdark` `#0A3272`
- `brand.light` `#61A7F9`

Tokens "originales" (cambian claro/oscuro):

- Modo claro: `primary`/`card`/`footer` `#f5f4f0` / `#ffffff`, `border` `#c8c6be`, `border-subtle` `#e0ded8`, `text-primary` `#111111`, `text-secondary` `#444444`, `text-muted` `#888888`.
- Modo oscuro: `primary` `#111111`, `secondary`/`card` `#1a1a1a`, `footer` `#0d0d0d`, `border` `#333333`, `border-subtle` `#222222`, `text-primary` `#f5f4f0`, `text-secondary` `#aaaaaa`, `text-muted` `#666666`.

Tokens semánticos shadcn (`background`, `foreground`, `shadcn-primary`, `shadcn-card`, `shadcn-popover`, `shadcn-secondary`, `shadcn-muted`, `shadcn-accent`, `shadcn-destructive` y `shadcn-border`/`shadcn-input`/`shadcn-ring`) definidos en `:root` / `.dark` de `globals.css`. No inventes hex fuera de estos tokens.

## Radios, contenido y spacing

- `--radius` (en `globals.css`) = `0.5rem`. `borderRadius.lg` = `var(--radius)`, `md` = `calc(var(--radius) - 2px)`, `sm` = `calc(var(--radius) - 4px)`.
- `maxWidth.content` = `1280px`, `maxWidth.page` = `1440px` (`max-w-content`, `max-w-page`).
- `spacing.page` = `80px` (`px-page` / `lg:px-page`).
- Container centrado con padding `2rem`, breakpoint `2xl` 1400px.

## Reglas de uso

- **CyGrotesk (`font-heading`)** — títulos, portada y titulares. No cuerpo.
- **Courier Prime (`font-body` / `font-display`)** — cuerpo, apuntes, pies y texto corrido.
- **Inter (`font-ui`)** — interfaz: etiquetas, formularios y controles.
- **Portada:** `hero` para el titular principal, `section` para encabezados de sección, `hxl`/`hlg` para titulares secundarios, `hmd`/`hsm` para subtítulos y `stat` para cifras.
- **Tono:** revista editorial, no portfolio genérico. Las disciplinas van por encima de las obras.
- **Nunca usar:** gradientes morados, tarjetas todas iguales, otra tipografía (nada de Fraunces ni Google Fonts extra), colores fuera del sistema o tamaños inventados. Si necesitas un tamaño nuevo, defínelo en `tailwind.config.js` antes.

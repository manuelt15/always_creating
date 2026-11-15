# DESIGN.md: always creating

Sistema visual del sitio, leído del código real: `app/globals.css`, `tailwind.config.js`, `app/layout.js` y los componentes de `components/`. Si algo no está aquí, no existe.

La identidad es dither / 1-bit / CRT: papel y tinta, tramas de puntos, un acento lima y superficies de grano. Nada de degradados suaves, cristales ni tarjetas redondeadas. Esquinas rectas, tipografía editorial y una sola página que se lee de arriba abajo.

## Paleta

Solo estos cuatro colores. No hay modo claro ni tokens alternativos.

| Token | Hex | Uso | Contraste |
| --- | --- | --- | --- |
| `--ink` | `#0B0B0C` | Fondo del sitio, texto sobre lima | 16.11:1 con papel |
| `--paper` | `#ECE8E1` | Texto principal, retratos 1-bit, botones hover | 16.11:1 sobre ink |
| `--lime` | `#D4FF4F` | Acento: titular, CTA, foco, detalles | 17.07:1 sobre ink |
| `--ash` | `#8C8A84` | Etiquetas, copy secundario, bordes de texto | 5.70:1 sobre ink |
| `--line` | `#262628` | Bordes de 1 px, separadores | Decorativo, no texto |
| `--line-strong` | `#3A3A3D` | Bordes en hover y marcos | Decorativo |
| `--surface` | `#121214` | Paneles, tarjetas, formularios | 15.32:1 con papel |
| `--surface-raised` | `#18181B` | Superficie elevada | 14.51:1 con papel |

Contrastes medidos con la fórmula WCAG:

| Combinación | Ratio | Veredicto |
| --- | --- | --- |
| `paper` sobre `ink` | 16.11:1 | AAA |
| `lime` sobre `ink` | 17.07:1 | AAA |
| `ash` sobre `ink` | 5.70:1 | AA texto normal |
| `ash` sobre `surface` | 5.42:1 | AA texto normal |
| `ash` sobre `surface-raised` | 5.13:1 | AA texto normal |
| `ink` sobre `lime` (botón) | 17.07:1 | AAA |
| `lime` sobre `paper` | 1.06:1 | Prohibido |

Reglas de color:

- El lima nunca va como texto sobre papel ni sobre una superficie clara. Solo funciona contra `ink` o como fondo con texto `ink`.
- El gris de etiquetas es `ash`, nunca papel al 60 %. La opacidad no se usa para texto pequeño.
- El rojo no existe en la paleta. Los estados de error se escriben en `paper` con un borde de 1 px.
- No se inventan hex intermedios. Si hace falta un tono, se resuelve con la textura, no con un color nuevo.

## Tipografía

Tres familias, todas en `app/layout.js`:

- **Instrument Serif** (`next/font/google`, 400 normal e italic): titulares, nombres de artista y citas. Variable `--font-instrument`, alias Tailwind `font-serif` / `font-heading` / `font-display`.
- **Geist** (`app/fonts/GeistVF.woff`, local): cuerpo, UI, formularios. Variable `--font-geist`, alias `font-sans` / `font-body` / `font-ui`.
- **Geist Mono** (`app/fonts/GeistMonoVF.woff`, local): etiquetas numeradas, metadatos, botones y navegación. Variable `--font-geist-mono`, alias `font-mono`.

Se retiraron CyGrotesk, Courier Prime e Inter de la web. No hay otra fuente en la interfaz. Los correos de `lib/emails.js` mantienen sus fallbacks del sistema y quedan fuera de este sistema visual.

| Rol | Tamaño | Interlínea | Tracking | Familia |
| --- | --- | --- | --- | --- |
| `display` (hero) | `clamp(68px, 13.5vw, 184px)` | 0.8 | -0.035em | Instrument Serif 400 |
| `title` (h2 de sección) | `clamp(44px, 6vw, 96px)` | 0.95 | -0.02em | Instrument Serif 400 |
| `heading` (h3) | `clamp(28px, 3vw, 40px)` | 1.05 | -0.015em | Instrument Serif 400 |
| Cuerpo | 16px (15px en móvil) | 1.7 | 0 | Geist 400 |
| Cuerpo pequeño | 13px | 1.55 | 0 | Geist 400 |
| Etiqueta mono | 10px móvil, 11px escritorio | 1 | 0.18em | Geist Mono, mayúsculas |
| Botón | 10px móvil, 11px escritorio | 1 | 0.16em | Geist Mono, mayúsculas |

Reglas:

- Instrument Serif se usa en tamaños grandes, nunca en cuerpo ni en etiquetas. La cursiva marca una idea, no decora una frase entera.
- El cuerpo nunca baja de 15px. Las etiquetas nunca bajan de 10px.
- Los números de sección (`001`, `002`...) y los índices de artista van en Geist Mono.
- No se usa `letter-spacing` negativo en textos menores de 24px.

## Dither: dónde y cómo

Assets en `public/dither/`, generados fuera del repo. No se regeneran ni se sustituyen desde el código:

| Archivo | Tamaño | Uso |
| --- | --- | --- |
| `manuel-900.png` / `manuel-480.png` | 900x1125 / 480x600 | Retrato hero y ficha de Manuel, 4:5 |
| `moya-900.png` / `moya-480.png` | 900x1125 / 480x600 | Retrato hero y ficha de Moya, 4:5 |
| `degradado-lima.png` | 1000x420 | Fondo dither de la sección de colaboración |
| `grano.png` | 256x256 | Grano repetible en superficies |

Mapa por sección de la home:

1. **Hero (001)**: los dos retratos en `picture` con `srcset` 480/900 y `sizes` por breakpoint. Trama de puntos CSS (`.dither-field`) en la mitad derecha del fondo y scanlines CRT sobre cada retrato. Ningún texto encima de la imagen.
2. **Manifiesto (002)**: sin retratos. La cita grande "Keep the process visible." va sobre una banda de grano (`.grain`, 9 %) que ocupa todo el ancho. El texto es de 32 a 64 px, nunca copy pequeño.
3. **Roster (003)**: retratos 1-bit con `srcset`, scanlines y regla de puntos (`.dither-rule`) bajo cada ficha. Las etiquetas y biografías están fuera de la imagen, sobre `ink`.
4. **Colaboración (004)**: `degradado-lima.png` a sangre, 160 px en móvil y 240 px en escritorio, tintado a lima con `background-blend-mode: multiply` y desvanecido inferior con `.dither-fade`. El contenido va en una tarjeta `ink` opaca: el dither es fondo, no fondo de texto.
5. **Contacto (005)**: banda de puntos doble (`.dither-rule-strong`) en el borde superior del panel y regla simple en la columna de newsletter. Formularios y avisos sobre `surface` o `ink` liso.
6. **Pie**: grano (`.grain`) solo en la banda del wordmark gigante. Los metadatos pequeños van en una franja `ink` sin textura.

Reglas del dither:

- Nunca se aplica dither al texto: prohibido `background-clip: text`, `mask` sobre tipografía o grano dentro de inputs, labels o párrafos.
- El grano vive en superficies decorativas, por debajo del contenido y a un máximo del 9 % de opacidad. Si una superficie lleva texto pequeño, se parte en dos: fondo texturizado y bloque sólido para el texto.
- Las scanlines solo van sobre imágenes.
- Las tramas CSS usan el mismo paso de 4 px o 5 px que los PNG para que el sistema se lea como uno solo.
- El dither no sustituye un borde funcional. Los bordes de 1 px siguen ahí.

## Layout y responsive

- Contenedor `.shell`: máximo 1440 px, padding 20 px en móvil y 32 px desde 640 px.
- Rejilla editorial de 12 columnas desde 1024 px. Por debajo, todo se apila.
- Hero: titular a ancho completo, dos retratos en dos columnas incluso a 360 px. La segunda figura baja 32 px en móvil y 56 px en escritorio.
- Navegación: barra superior fija. Los enlaces pasan a una fila desplazable por debajo de 1024 px.
- Roster: una columna en móvil, dos desde 768 px.
- Contacto: formulario y newsletter comparten un solo marco; se apilan por debajo de 1024 px.
- Ancho mínimo verificado: 360 px. Sin scroll horizontal.

## Componentes

- `Navbar`: server component, sin toggle de tema. Enlaces a anclas y al índice existente.
- `SectionMeta`: número, título y nota al margen. La numeración es la columna vertebral de la página.
- `ArtistCardGrid`: cliente, gestiona el artista seleccionado y la View Transition.
- `ArtistCard`: retrato, índice, nombre, disciplina y acción. Variante `roster` para la home y `grid` para `/artists`.
- `ArtistOverlay`: diálogo modal con retrato, biografía, disciplinas y enlaces. Cierra con Escape, bloquea el scroll y devuelve el foco al botón de cierre.
- `ContactForm` y `NewsletterForm`: misma lógica de red y doble opt-in que antes. Solo cambió la capa visual.
- `Footer`: cierre editorial con wordmark a sangre.

## Accesibilidad

- `lang="en"` en el documento. El contenido visible está en inglés.
- Skip link al inicio, foco visible en lima de 1 px.
- Diálogo con `role="dialog"`, `aria-modal`, título asociado y cierre por Escape.
- Retratos con alt descriptivo. Etiquetas de formulario asociadas con `htmlFor`.
- `prefers-reduced-motion` desactiva animaciones, scroll suave y transiciones.
- Ningún texto pequeño sobre dither. El contraste mínimo usado es 5.13:1.

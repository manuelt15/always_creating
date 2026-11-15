# DESIGN.md: always creating

Sistema visual del sitio, leído del código real: `app/globals.css`, `tailwind.config.js`, `app/layout.js` y los componentes de `components/`. Si algo no está aquí, no existe.

La identidad es dither / 1-bit / CRT: fondo oscuro, tramas de puntos, un acento de texto y superficies de grano, en tres temas de color (azul, naranja y mono). Nada de degradados suaves, cristales ni tarjetas redondeadas. Esquinas rectas, tipografía editorial y una sola página que se lee de arriba abajo.

El comportamiento de los diálogos y de los campos viene de `@ui-sdk/react`; los estilos son nuestros. ui-sdk resuelve foco, Escape, scroll bloqueado y relaciones ARIA, no la capa visual.

## Paleta y temas

Tres temas: **Azul** (por defecto, sacado de una referencia de cartel), **Naranja** y **Mono**. Se eligen con el selector del hero (`components/ThemeSwitcher.jsx`, `SegmentedControl` de ui-sdk). La elección se guarda en `localStorage` (`ac-theme`) y un script en `<head>` (`lib/theme.js`) pone `data-theme` en `<html>` antes de pintar, para que no parpadee. El azul vive en `:root`; los otros dos, en `:root[data-theme='…']` de `app/globals.css`, con los mismos tokens. Nada en los componentes usa un color fijo: todo pasa por tokens, y los velos y sombras usan `color-mix` sobre ellos.

Tokens semánticos:

- `--ink` fondo, `--surface` y `--surface-raised` paneles, `--line` y `--line-strong` bordes.
- `--paper` texto principal, `--ash` texto secundario.
- `--accent` acento de texto ("creating.", índices, errores, foco, check del selector).
- `--fill` relleno (botones, indicador del selector de tipo, selección, tinte del degradado) y `--on-fill` el texto encima.
- `--dither` color del punto del campo animado, en `r, g, b`. `components/DitherField.jsx` lo lee y repinta al cambiar de tema.

| Token | Azul | Naranja | Mono |
| --- | --- | --- | --- |
| `--ink` | `#040A1E` | `#120A06` | `#0A0A0A` |
| `--paper` | `#E6EEFF` | `#FFF1E8` | `#EDEDED` |
| `--accent` | `#A8C4FF` | `#FFA673` | `#FFFFFF` |
| `--fill` | `#1F4FEF` | `#FF5C1F` | `#EDEDED` |
| `--on-fill` | `#E6EEFF` | `#120A06` | `#0A0A0A` |
| `--ash` | `#8A9DC8` | `#C29A84` | `#9B9B9B` |
| `--line` | `#172458` | `#3A2416` | `#262626` |
| `--line-strong` | `#263A86` | `#5C3920` | `#3D3D3D` |
| `--surface` | `#081030` | `#1C110B` | `#121212` |
| `--surface-raised` | `#0D1840` | `#26170E` | `#1A1A1A` |
| `--dither` | `80, 128, 255` | `255, 104, 40` | `225, 225, 225` |

Contrastes medidos con la fórmula WCAG:

| Combinación | Azul | Naranja | Mono |
| --- | --- | --- | --- |
| `paper` sobre `ink` | 16.90:1 | 17.73:1 | 16.91:1 |
| `accent` sobre `ink` | 11.25:1 | 10.22:1 | 19.80:1 |
| `accent` sobre `surface` | 10.65:1 | 9.66:1 | 18.73:1 |
| `ash` sobre `ink` | 7.25:1 | 7.70:1 | 7.12:1 |
| `ash` sobre `surface-raised` | 6.33:1 | 6.81:1 | 6.26:1 |
| `on-fill` sobre `fill` (botón) | 5.27:1 | 6.35:1 | 16.91:1 |

En azul, `fill` sobre `ink` da 3.21:1: el relleno nunca se usa como texto.

Reglas de color:

- `fill` es relleno, nunca texto. Lo que va encima de `fill` es siempre `on-fill`.
- El acento de texto es `accent`. Funciona sobre `ink` y `surface` en los tres temas.
- Un tema nuevo se añade en `lib/theme.js` y con un bloque `:root[data-theme='…']` que redefina todos los tokens. El test `tests/temas.test.js` lo comprueba.
- El gris de etiquetas es `ash`, nunca papel al 60 %. La opacidad no se usa para texto pequeño.
- El rojo no existe en la paleta. Los errores de campo se escriben en `accent` y el campo lleva el borde `accent`; el error de servidor, en `paper` con un borde izquierdo de 1 px.
- No se inventan hex fuera de los tokens. El punto del campo dither tiene su propio token (`--dither`) porque el relleno puro se pierde sobre el fondo.

## Tipografía

Tres familias, todas en `app/layout.js`:

- **Instrument Serif** (`next/font/google`, 400 normal e italic): titulares, títulos de experimento y citas. Variable `--font-instrument`, alias Tailwind `font-serif` / `font-heading` / `font-display`.
- **Geist** (`app/fonts/GeistVF.woff`, local): cuerpo, UI, formularios. Variable `--font-geist`, alias `font-sans` / `font-body` / `font-ui`.
- **Geist Mono** (`app/fonts/GeistMonoVF.woff`, local): etiquetas numeradas, metadatos, botones y navegación. Variable `--font-geist-mono`, alias `font-mono`.

Se retiraron CyGrotesk, Courier Prime e Inter de la web. No hay otra fuente en la interfaz. Los correos de `lib/emails.js` siguen el tema azul con fuentes del sistema parecidas (Georgia para titulares, mono del sistema para etiquetas): los clientes de correo no cargan fuentes web ni CSS moderno.

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
- Los números de sección (`001`, `002`...) y los índices de experimento (`E/001`) van en Geist Mono.
- No se usa `letter-spacing` negativo en textos menores de 24px.

## Dither: dónde y cómo

Assets en `public/dither/`, generados con `tools/generate-dither.py` (Pillow, matriz Bayer 8x8, dos tintas). El script es determinista y se ejecuta desde la raíz del repo:

```bash
python3 tools/generate-dither.py
```

| Archivo | Tamaño | Uso |
| --- | --- | --- |
| `degradado-lima.png` | 1000x420 | Respaldo estático del hero, cabecera de las cards de código y franja bajo el índice |
| `grano.png` | 256x256 | Grano repetible en superficies |

Mapa por sección de la home:

1. **Hero**: campo dither interactivo en canvas (`components/DitherField.jsx`) sobre el titular. Usa la misma matriz Bayer 8x8, se pinta en el color de `--dither` y responde al puntero con una luz que sigue el cursor. Debajo hay una capa estática (`degradado-lima.png` al 28 %) para que la textura exista antes de que arranque el canvas, y un velo (`.dither-veil`) que oscurece la parte superior y los laterales. La cabecera se apoya encima del campo, sin línea ni fondo propio. Por abajo, el campo se alarga bajo el contenido y se desvanece con una máscara (`.hero-field`, últimos 240 px) hasta casi el título de Experimentos: no hay borde entre el hero y la sección siguiente. Ningún texto pequeño cae sobre dither crudo: el velo superior mantiene el contraste.
   Sin etiquetas numeradas. Bajo el titular, en dos columnas desde 1024 px: a la izquierda el porqué del sitio y el selector de tema; a la derecha, la card "Trabajo profesional" con el enlace al portafolio, en un bloque `ink` sólido con borde izquierdo `accent`: nunca texto pequeño sobre la trama.
2. **Experimentos (001)**: título sin nota al margen, sin borde superior. Cards cuadradas sobre `surface`. La cabecera de la card es `degradado-lima.png` si es código, la primera imagen con scanlines si es diseño y grano si es idea escrita, con `.dither-rule` debajo. Todo el texto va fuera de la textura. Debajo del índice, una franja a sangre con el mismo campo interactivo del hero (`DitherField` sobre `degradado-lima.png` al 28 %), sin bordes y fundida arriba y abajo con `.band-field`, para que pase de Experimentos a Ideas y comentarios sin corte. Cada canvas se pausa cuando sale de pantalla.
3. **Ideas y comentarios (002)**: título sin nota al margen ni borde superior (el ancla sigue siendo `#puerta`). Banda de puntos doble (`.dither-rule-strong`) en el borde superior del panel. Formulario sobre `surface`, columna de "Cómo funciona" sobre `ink` liso.
4. **Pie**: sin enlaces. Arriba, el wordmark gigante sobre grano (`.grain`), lo único con textura. Abajo, una franja `ink` con el © a la izquierda y "Para quien nunca deja de crear." a la derecha. Sin portafolio ni año suelto.

Reglas del dither:

- Nunca se aplica dither al texto: prohibido `background-clip: text`, `mask` sobre tipografía o grano dentro de inputs, labels o párrafos.
- El grano vive en superficies decorativas, por debajo del contenido y a un máximo del 9 % de opacidad. Si una superficie lleva texto pequeño, se parte en dos: fondo texturizado y bloque sólido para el texto.
- Las scanlines solo van sobre imágenes.
- Las tramas CSS usan el mismo paso de 4 px o 5 px que los PNG para que el sistema se lea como uno solo.
- El dither no sustituye un borde funcional. Los bordes de 1 px siguen ahí, salvo la separación cabecera/hero, que se elimina a propósito.

Contraste sobre el campo del hero:

- La nav solo se apoya en la franja superior que cubre `.dither-veil`: de `ink` al 94 % arriba a `ink` al 82 % a 96 px. Ahí `ash` se mantiene por encima de 5.6:1 y `paper` por encima de 15.8:1.
- El botón lleva `fill` con texto `on-fill`. `fill` nunca se usa como texto sobre el campo.
- Fuera de esa franja no hay texto de interfaz sobre el dither. El titular y el copy del hero van sobre el velo lateral e inferior, que mantiene el fondo cerca de `ink`.

## Layout y responsive

- El pie queda siempre al final: `body` es una columna flex con `min-height: 100dvh` (y `100vh` de respaldo) y `main` crece para empujar el footer, aunque la página sea corta.
- `overflow-x: clip` en `html` y `body`, no `hidden`: `hidden` crea un contenedor de scroll que en Safari móvil rompe el desplazamiento. `text-size-adjust: 100%` evita que iOS agrande el texto al girar.
- Overlays y alturas usan `dvh`, que sigue a las barras del navegador móvil.
- Por debajo de 1024 px el texto del hero cae sobre la trama: lleva detrás un velo del color del fondo con los bordes difuminados (`.hero-copy::before`), sin borde ni corte. En escritorio lo protege `.dither-veil`.
- Revisado sin desbordes a 320, 375, 768, 1024, 1440 y 1920 px.

- Contenedor `.shell`: máximo 1440 px, padding 20 px en móvil y 32 px desde 640 px.
- Rejilla editorial de 12 columnas desde 1024 px. Por debajo, todo se apila.
- Hero: titular a ancho completo sobre el campo dither. La cabecera ocupa la franja superior con el velo de tinta detrás. Sin retratos en el hero.
- Cabecera: integrada en el hero sobre el campo dither, sin borde inferior ni fondo sólido. No es fija: se desplaza con el hero. En móvil, la fila de secciones queda debajo del wordmark sin línea divisoria y se desplaza en horizontal. En el resto de rutas la cabecera sigue en el flujo, sobre `ink`.
- Experimentos: una columna en móvil, dos desde 640 px, tres desde 1024 px.
- La puerta: formulario y "Cómo funciona" comparten un solo marco; se apilan por debajo de 1024 px.
- Página de experimento (`/lab/<slug>`): título, resumen y la ficha como chips (`.chip`: tipo, estado con su punto, fecha y un chip por medio, este en `ash`). Debajo, una sola sección: un marco `surface` con barra superior (índice y tipo a la izquierda, botón "Comentar" a la derecha), el contenido (experimento, galería del diseño o texto de la idea) y, si los hay, "Qué quería probar" y "Qué he aprendido" en dos columnas dentro del mismo marco. En un diseño, las imágenes van una debajo de otra sobre `ink` con borde de 1 px, a un máximo de 80vh de alto y con el pie en etiqueta mono.
- Ancho mínimo verificado: 360 px. Sin scroll horizontal.

## Componentes

- `Navbar`: server component, sin toggle de tema. En la home se superpone al hero, absoluta y transparente; en el resto de rutas queda en el flujo sobre `ink`. Solo lleva el enlace a Experimentos, el indicador "Laboratorio" y el botón "Dejar una idea". El portafolio se enlaza desde la card del hero y el pie. El menú móvil es una fila de anclas con scroll horizontal, sin línea de separación.
- `SectionMeta`: número, título y nota al margen. La numeración es la columna vertebral de la página.
- `ExperimentCard`: portada (solo en diseños), número, tipo, título, resumen, estado, fecha y medio. Toda la card es un enlace a `/lab/<slug>`. El estado "En marcha" lleva el punto `accent` que late; el resto, un cuadrado `ash`.
- `CommentDialog`: botón "Comentar" y overlay con `Dialog` de ui-sdk (Escape, clic fuera, foco atrapado y devuelto al botón). Fondo `ink` al 82 %, panel `surface` de hasta 600 px con banda de puntos arriba, entrada con fundido y 12 px de subida, sin animación con `prefers-reduced-motion`. Dentro va `ContactForm` con el experimento fijado y el selector "Sobre" oculto. Cada apertura monta un formulario limpio; tras enviar, el foco pasa al aviso y "Volver al experimento" cierra.
- `ContactForm` (la puerta): `SegmentedControl` de ui-sdk para idea o comentario (indicador `fill` con texto `on-fill`), `Select` de ui-sdk para el experimento (sin `<select>` nativo: disparador `.select-trigger` como un campo más, lista `.select-content` sobre `surface-raised`, opción resaltada en `ink` y la elegida en `accent` con su check) y los campos dentro de `Field`. Los campos con error llevan el borde `accent`. El mensaje tiene contador hasta 2000 caracteres. El botón dice "Enviar". Tras enviar, aviso con "Escribir otro" (o la acción que pase el overlay). Mismo doble opt-in que antes.
- `Footer`: wordmark a sangre y franja final con © y lema.
- `app/not-found.js`: 404 propia con cabecera, mensaje y botón a los experimentos.

## ui-sdk

La librería aporta comportamiento, no aspecto. Los estilos siguen saliendo de `app/globals.css` y de las clases Tailwind del sitio.

- **Selector**: `SegmentedControl` funciona como un grupo de radio con una sola parada de tabulación y flechas para cambiar. Estilos en `.door-kind`, `.door-kind-indicator` y `.door-kind-item` de `app/globals.css`.
- **Campos**: `Field` conecta `FieldLabel`, el control (`Input` o `Textarea`) y `FieldError`. El estado `invalid` se enciende con los errores que ya calculaba el formulario, y `Field` escribe `aria-invalid` y `aria-describedby`. Los mensajes y el flujo de envío no cambian.

Antes de tocar el formulario, lee `node_modules/@ui-sdk/react/docs/llms.txt`. Este repo no tiene linter: se verifica con `npm run build` y `npm test`.

## Accesibilidad

- `lang="es"` en el documento. El contenido visible está en español; solo el nombre, always creating, va en inglés.
- Skip link al inicio, foco visible en `accent` de 1 px.
- Enlaces externos con aviso para lectores de pantalla ("se abre en una pestaña nueva").
- Campos con etiqueta, control y error conectados por `Field` (`aria-describedby`, `aria-invalid`).
- `prefers-reduced-motion` desactiva animaciones, scroll suave y transiciones. El campo dither del hero pinta un fotograma estático.
- Ningún texto pequeño sobre dither crudo. El contraste mínimo usado es 5.13:1; en la franja de la cabecera, `ash` se mantiene por encima de 5.6:1.

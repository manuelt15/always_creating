# DESIGN.md: always creating

Sistema visual del sitio, leído del código real: `app/globals.css`, `tailwind.config.js`, `app/layout.js` y los componentes de `components/`. Si algo no está aquí, no existe.

La identidad es dither / 1-bit / CRT: papel y tinta, tramas de puntos, un acento lima y superficies de grano. Nada de degradados suaves, cristales ni tarjetas redondeadas. Esquinas rectas, tipografía editorial y una sola página que se lee de arriba abajo.

El comportamiento de los diálogos y de los campos viene de `@ui-sdk/react`; los estilos son nuestros. ui-sdk resuelve foco, Escape, scroll bloqueado y relaciones ARIA, no la capa visual.

## Paleta

Cuatro colores base y sus tokens de línea y superficie. No hay modo claro ni tokens alternativos.

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
- El rojo no existe en la paleta. Los errores de campo se escriben en `lime`; el error de servidor, en `paper` con un borde izquierdo de 1 px.
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

Assets en `public/dither/`, generados con `tools/generate-dither.py` (Pillow, matriz Bayer 8x8, dos tintas). El script es determinista y se ejecuta desde la raíz del repo:

```bash
python3 tools/generate-dither.py
```

| Archivo | Tamaño | Uso |
| --- | --- | --- |
| `manuel-900.png` / `manuel-480.png` | 900x1125 / 480x600 | Ficha de Manuel en roster y perfil, 4:5 |
| `moya-900.png` / `moya-480.png` | 900x1125 / 480x600 | Ficha de Moya en roster y perfil, 4:5 |
| `degradado-lima.png` | 1000x420 | Respaldo estático del hero y fondo dither de la sección de colaboración |
| `grano.png` | 256x256 | Grano repetible en superficies |

Mapa por sección de la home:

1. **Hero (001)**: campo dither interactivo en canvas (`components/DitherField.jsx`) sobre el titular. Usa la misma matriz Bayer 8x8, se pinta en lima y responde al puntero con una luz que sigue el cursor. Debajo hay una capa estática (`degradado-lima.png` al 28 %) para que la textura exista antes de que arranque el canvas, y un velo (`.dither-veil`) que oscurece la parte superior y los laterales. La cabecera se apoya encima del campo, sin línea ni fondo propio. Ningún texto pequeño cae sobre dither crudo: el velo superior mantiene el contraste.
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
- El dither no sustituye un borde funcional. Los bordes de 1 px siguen ahí, salvo la separación cabecera/hero, que se elimina a propósito.

Contraste sobre el campo del hero:

- La nav solo se apoya en la franja superior que cubre `.dither-veil`: de `ink` al 94 % arriba a `ink` al 82 % a 96 px. Ahí `ash` se mantiene por encima de 5.6:1 y `paper` por encima de 15.8:1.
- El botón lima lleva texto `ink` (17.07:1). Nunca se invierte a texto lima sobre el campo.
- Fuera de esa franja no hay texto de interfaz sobre el dither. El titular y el copy del hero van sobre el velo lateral e inferior, que mantiene el fondo cerca de `ink`.

## Layout y responsive

- Contenedor `.shell`: máximo 1440 px, padding 20 px en móvil y 32 px desde 640 px.
- Rejilla editorial de 12 columnas desde 1024 px. Por debajo, todo se apila.
- Hero: titular a ancho completo sobre el campo dither. La cabecera ocupa la franja superior con el velo de tinta detrás. Sin retratos en el hero.
- Cabecera: integrada en el hero sobre el campo dither, sin borde inferior ni fondo sólido. No es fija: se desplaza con el hero. En móvil, la fila de secciones queda debajo del wordmark sin línea divisoria y se desplaza en horizontal. En el resto de rutas la cabecera sigue en el flujo, sobre `ink`.
- Roster: una columna en móvil, dos desde 768 px.
- Contacto: formulario y newsletter comparten un solo marco; se apilan por debajo de 1024 px.
- Ancho mínimo verificado: 360 px. Sin scroll horizontal.

## Componentes

- `Navbar`: server component, sin toggle de tema. En la home se superpone al hero, absoluta y transparente; en el resto de rutas queda en el flujo sobre `ink`. Enlaces a anclas y al índice existente. El menú móvil es una fila de anclas con scroll horizontal, sin línea de separación.
- `SectionMeta`: número, título y nota al margen. La numeración es la columna vertebral de la página.
- `ArtistCardGrid`: cliente, gestiona el artista seleccionado y la View Transition. Guarda también el botón que abrió el perfil para devolverle el foco.
- `ArtistCard`: retrato, índice, nombre, disciplina y acción. Variante `roster` para la home y `grid` para `/artists`.
- `ArtistOverlay`: usa `Dialog`, `DialogBackdrop`, `DialogContent`, `DialogTitle` y `DialogClose` de `@ui-sdk/react/dialog`, con las mismas clases y el mismo layout que antes. ui-sdk aporta cierre con Escape, foco atrapado, bloqueo del scroll de fondo y retorno del foco al botón que abrió el perfil.
- `ContactForm` y `NewsletterForm`: misma lógica de red y doble opt-in que antes. Etiqueta, control y error van dentro de `Field` de `@ui-sdk/react`, que conecta `aria-describedby` y `aria-invalid`. Los textos y el orden visual no cambian.
- `Footer`: cierre editorial con wordmark a sangre.

## ui-sdk

La librería aporta comportamiento, no aspecto. Los estilos siguen saliendo de `app/globals.css` y de las clases Tailwind del sitio.

- **Diálogo**: `ArtistOverlay` monta `Dialog` en modo controlado y cierra llamando a `onClose`. `DialogContent` conserva el marco, el ancho y el scroll del panel anterior. `DialogClose` sustituye a los botones manuales.
- **Foco**: `Dialog` atrapa el foco, lo mueve al primer elemento enfocable y lo devuelve al disparador. `ArtistCardGrid` pasa el botón que abrió el perfil como `finalFocus`, para que el retorno sea exacto aunque el diálogo se monte ya abierto.
- **Campos**: `Field` conecta `FieldLabel`, el control (`Input` o `Textarea`) y `FieldError`. El estado `invalid` se enciende con los errores que ya calculaba el formulario, y `Field` escribe `aria-invalid` y `aria-describedby`. Los mensajes y el flujo de envío no cambian.
- **Scroll**: el diálogo modal bloquea el scroll del documento y lo restaura al cerrar. No hay `overflow: hidden` manual en el componente.

Antes de tocar `ArtistOverlay` o los formularios, lee `node_modules/@ui-sdk/react/docs/llms.txt`. Este repo no tiene linter: se verifica con `npm run build` y `npm test`.

## Accesibilidad

- `lang="en"` en el documento. El contenido visible está en inglés.
- Skip link al inicio, foco visible en lima de 1 px.
- Diálogo construido con `Dialog` de ui-sdk: `role="dialog"`, `aria-modal`, título asociado, cierre con Escape, foco atrapado y retorno al botón que abrió el perfil.
- Retratos con alt descriptivo. Campos con etiqueta, control y error conectados por `Field` (`aria-describedby`, `aria-invalid`).
- `prefers-reduced-motion` desactiva animaciones, scroll suave y transiciones. El campo dither del hero pinta un fotograma estático.
- Ningún texto pequeño sobre dither crudo. El contraste mínimo usado es 5.13:1; en la franja de la cabecera, `ash` se mantiene por encima de 5.6:1.

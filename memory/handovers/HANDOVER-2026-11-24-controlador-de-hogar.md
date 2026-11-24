# Cierre 2026-11-24 — el controlador de hogar llega al laboratorio

Sesión larga con dos frentes: publicar el prototipo de controlador de hogar y arreglar cómo se
veía en la web. Además se ordenaron los proyectos del perfil de GitHub y se borraron dos
repositorios que ya no se usan.

## Commits

**always_creating** (público, `main`, desplegado por integración de Git):

| SHA | Qué |
|---|---|
| `1e48042` | E/004 «Controlador de hogar»: port a React con `@ui-sdk/react` + `dial.js` propio |
| `1a19fac` | Se sustituye el port por **el build del repo tal cual** dentro de un iframe, y la ficha toma el texto del README |
| `2902614` | Hero a sangre, punto cuadrado en pantallas anchas y fuera los filetes de 001 y 002 |

**hermes-controller** (repo nuevo, público): `be6fdb1`.

**manuelt15/manuelt15** (perfil): `03ecd3c` reordena proyectos, `31c664e` quita 04009c,
`c577129` separa el bloque HTML de `## Stack`.

## El experimento E/004

El primer intento fue un **port a React** con las primitivas que ya tiene el repo (`Toggle`,
`Slider`, `Button`) y un dial propio con `definePrimitive` + `createParts`, porque el catálogo
no trae dial rotatorio. Manuel lo rechazó: no se parecía al prototipo del repo.

La versión que queda es el **build del repo `hermes-controller` servido tal cual**:

```
public/prototipos/hermes-controller/index.html
                               /assets/index-*.{js,css}
experiments/hermes-controller/index.jsx   -> iframe h-[620px] + pie de «simulado»
```

Sin port ni traducción intermedia: el mismo HTML, el mismo `main.js`, los mismos web components.
Se actualiza recompilando con `--base=/prototipos/hermes-controller/` en el repo y copiando
`dist/*`. Está escrito en la cabecera del componente. Fuera `dial.js` y las 226 líneas del port.

Los textos de la ficha son los del README del repo, no una versión propia: resumen, idea de
fondo, qué se ve, por qué está hecho así y qué sería lo siguiente.

## El hero

Dos causas, ninguna era el tamaño de pantalla:

1. El campo dither vivía **dentro del `.shell`**, así que la trama se cortaba en seco contra el
   fondo y en 1920 aparecía una arista vertical a la derecha. Ahora el `hero-field` es hijo de la
   sección y va a sangre.
2. En pantallas anchas se recortaban **columnas a 220 y filas a 130**, así que cada punto salía
   más ancho que alto: óvalos. Ahora la celda crece con la pantalla (`cellSize`) en vez de
   recortar, y el tope sube a 260×150.

Fuera el `border-b` de `SectionMeta`: el filete salía bajo 001 y 002.

## Cómo se verificó

- `npm test`: 34 pass, 0 fail. `next build`: exit 0, `/lab/hermes-controller` prerenderizado.
- Despliegues `1a19fac` y `2902614`: **success** en Vercel.
- En producción, a 1920: `canvas 1905x943, de 0 a 1905`, `backing 780x384`, `pintado: true`,
  `filetes: 0px, 0px`.
- El prototipo responde dentro del iframe: al pulsar el aparato del techo, `aria-pressed="true"`
  y el mensaje del panel cambia a «› salón · techo».
- `/prototipos/hermes-controller/index.html` → 200 en `alwayscreating.es`.

## El repo hermes-controller

Publicado en `manuelt15/hermes-controller`, con README que **avisa en la primera línea de que es
un prototipo y el estado es simulado**, `.gitignore` (fuera `node_modules`, `dist`, `.agents/`,
`.claude/` y `PENDING.md`) y `gitleaks` limpio sobre el diff. Firma con el `noreply`.

## Limpieza

- **conciliador-lab** borrado (repo de GitHub y carpeta, 835 MB). Tenía trabajo sin mergear en
  `feat/radix-diseno-v2`; Manuel decidió no conservarlo. Se le avisó antes de borrar.
- **04009c** ya lo había borrado Manuel. Se quitaron sus referencias de la configuración de
  delegación, de las siete cartas de cargos y de la memoria.
- `hermes-controller-ref/` (andamio de referencia de ui-sdk, 188 KB) borrado.
- Los perfiles del equipo pasan a nombrar `hermes-controller` en la lista de repos clonados.
- Gateway reiniciado (PID 19956 → 95118) para que la app lea las descripciones nuevas.

## Pendiente

- **Firma de `always_creating`.** Ahora commitea con el `noreply`, que es lo correcto en un repo
  público, pero el historial viene mezclado (13 commits con el Gmail, 7 con el `noreply`). Manuel
  dijo «luego lo vemos».
- **E/004:** el siguiente paso es poner un aparato de verdad detrás de un control y ver si el
  modelo de estado aguanta cuando la red falla.
- Lo de siempre: revisión RGPD del texto de privacidad, `FROM_EMAIL` en local, el texto de E/002
  y la errata del cartel de E/003.

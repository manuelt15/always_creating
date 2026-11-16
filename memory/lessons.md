# Lecciones — alwayscreating

## El README puede mentir sobre la versión

Decía Next 15 con `package-lock.json` en 16.2.6. **La verdad está en el lock, no en la prosa.** Antes de
tocar nada, `grep '"next"' package-lock.json`.

## Un server component no se pide a sí mismo por HTTP

`app/artists/[id]/page.js` hacía `fetch(NEXT_PUBLIC_SITE_URL + /api/...)`. Funciona en local y se rompe en
Vercel por configuración de dominio. **En un server component se lee de la base de datos directamente.**

## Con Next 16, `params` es una promesa

`route.js` leía `params.id` sin `await`. La ruta no encontraba al artista y devolvía 404. Hay una prueba
que lo vigila.

## El build necesita las variables que se evalúan al importar

`RESEND_API_KEY` y `MONGODB_URI` se leen al cargar el módulo, y el build recolecta datos de página: sin
ellas, falla. Para verificar compilación: `MONGODB_URI=... RESEND_API_KEY=re_dummy npx next build`.

## Un tubo se come el código de salida

`cmd | tail` devuelve el código de `tail`, no el de `cmd`. Un build roto pasó por verde así. **El exit
code se lee sin tubería.**

## El autor del commit importa más de lo que parece

`git config user.email` venía vacío en el clon. Un commit de autor desconocido hace que Vercel **bloquee
el despliegue**. Y la identidad depende de la visibilidad: **este repo es público**, así que va
`manuelt15 <195821676+manuelt15@users.noreply.github.com>`, nunca el Gmail. Si se commitea con el Gmail,
se reescribe antes de subir y se comprueba con `git log --format='%an <%ae>' origin/main..HEAD`.

## Resend no lanza cuando rechaza un correo

`resend.emails.send()` devuelve `{ data, error }`: un rechazo (remitente sin verificar, destinatario no
permitido) no lanza. El `try/catch` que había nunca registraba nada y la respuesta seguía siendo 201.
**Se comprueba `error` siempre** (`sendEmail` en `lib/resend.js`).

## `onboarding@resend.dev` solo entrega al dueño de la cuenta

Es el remitente de pruebas de Resend. Con él, quien rellena el formulario no recibe el enlace de
confirmación y su mensaje nunca llega. **`FROM_EMAIL` tiene que ser del dominio verificado**
(`alwayscreating.es`).

## El correo previo a confirmar no puede llevar texto del formulario

Corrección: la revisión automática de seguridad marcó el correo "Confirma tu mensaje" porque incluía
nombre y mensaje. Causa: sale antes de verificar que la dirección es de quien escribe, así que servía
para mandar texto propio a un correo ajeno desde nuestro dominio. Fix: solo valores cerrados (tipo y
título del experimento). **Regla: en un doble opt-in, lo que el usuario escribe solo viaja después de
confirmar.** Hay un test que lo vigila.

## Las convenciones de archivos de Next 16 no siempre hacen lo que dice la documentación

`opengraph-image.alt.txt` no se aplica (la imagen se declara a mano en `app/layout.js`), un `.ico` con
PNG dentro tiene que ser RGBA o el build falla, y los archivos de convención nuevos no aparecen en
`next dev` sin reiniciar. **Se verifica en el HTML del build, no en el servidor de desarrollo.**

## Una textura en canvas necesita una capa estática debajo

El `<canvas>` del campo dither arrancaba en el segundo tick del bucle de animación, así que la primera
carga salía negra. Debajo va una capa CSS con el dither ya generado y el canvas encima. **La textura no
puede depender del JavaScript.**

## Este repo no tiene linter

`next lint` no existe en Next 16 y el proyecto nunca instaló ESLint: el script sigue en `package.json`
pero no valida nada. La verificación real es `npm run build` y `npm test`.

## Los assets dither se regeneran

`tools/generate-dither.py` reproduce los PNG. Comprobar con `sha256sum -c` en vez de fiarse del ojo.

## Para probar movimiento hace falta un navegador que pinte

El panel del navegador integrado estaba oculto: `requestAnimationFrame` no llegaba, `innerHeight` era 0
y las transiciones se quedaban congeladas, así que parecía que el revelado de cards no funcionaba.
Fix: Chrome sin ventana por DevTools (`--headless=new --remote-debugging-port`, script de Node con el
`WebSocket` nativo) y muestrear valores a mitad de animación. **Regla: antes de depurar una animación,
comprobar que `requestAnimationFrame` se ejecuta; si no, cambiar de navegador, no de código.**

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
el despliegue**. Antes de commitear: `git config user.email` tiene que devolver `manueltorres1512@gmail.com`.

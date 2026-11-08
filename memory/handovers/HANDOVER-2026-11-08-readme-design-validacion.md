# Cierre alwayscreating — 2026-11-08

## Resultado

Cuatro bloques cerrados en local sobre `bf65279`, todos verificados con salida real: README al día,
sistema de diseño escrito, perfil de artista arreglado y validación en servidor con pruebas.

Cuatro commits, autor `manueltorres1512@gmail.com`, árbol limpio:

| Commit | Qué |
|---|---|
| `35d7939` | README al día: Next 16.2.6 y las cinco variables documentadas |
| `a45634a` | `DESIGN.md` con el sistema real de tipografías y colores |
| `9d8af2a` | Perfil de artista: `await params` y lectura directa de Mongo |
| `6065850` | Validación en servidor para contacto y newsletter con pruebas `node:test` |

## Verificación

```
npm test                                     EXIT 0   6/6 pruebas
npx next build (MONGODB_URI + RESEND dummy)  compilado, BUILD_ID 20:09:48
rutas                                        8, /artists/[id] y /api/artists/[id] dinámicas
npm run build sin RESEND_API_KEY             falla al recoger datos de página (preexistente)
procesos-abiertos.py                         limpio
```

Sin revisión visual: la hace Manuel, es su regla en todos los proyectos.

## Qué se arregló y por qué importaba

- **`params.id` sin `await`** en `app/api/artists/[id]/route.js`: con Next 16 `params` es promesa, la ruta
  no encontraba al artista y el perfil daba 404/500. Era la única pieza rota del recorrido principal.
- **La página del perfil se pedía a sí misma** por `NEXT_PUBLIC_SITE_URL`. Un `fetch` al propio dominio
  desde un server component es un salto de red que en Vercel se rompe por configuración. Ahora lee de
  Mongo, como la home y el directorio.
- **Cero validación en servidor**: lo que llegara a `/api/contact` o `/api/newsletter` se guardaba tal cual.
  Ahora pasan por funciones puras y devuelven `400`.
- **El README mentía**: decía Next 15 con el lock en 16.2.6, y de las cinco variables que el código lee
  solo documentaba dos. Quien desplegara sin `RESEND_API_KEY` se comía un fallo al compilar.

## Pendiente

- Revisión visual de Manuel.
- La auditoría de seguridad entra el **domingo** en la rotación diaria; este repo es público.
- Sigue sin seed ni panel: no hay forma de cargar artistas sin tocar la base de datos.
- Decidir qué hacer con el silencio del correo: hoy se responde éxito aunque Resend falle.

# Pendiente

## Cuaderno de experimentos (rama `feat/cuaderno-experimentos`, 2026-11-15)

La web deja de ser una sala de artistas y pasa a ser el laboratorio personal de Manuel. Web en español,
solo "always creating" en inglés.

- [x] Registro `lib/experiments.js`: cada entrada es código (`experiments/<slug>/`) o una idea escrita.
- [x] Página `/lab/[slug]` con ficha, experimento en vivo o texto, y enlace a la puerta.
- [x] Portada `/`: hero dither, nota corta, cards de experimentos, la puerta.
- [x] Aviso de "laboratorio aparte" y enlace al portafolio (cabecera y pie).
- [x] La puerta: `ContactMessage` con `kind` (idea o comentario) y `about` (slug o vacío). Doble opt-in intacto.
- [x] Quitar artistas (rutas, API, modelo, componentes, imágenes) y newsletter (API, modelo, formulario, correo).
- [x] Base de datos: borrar `newslettersubscribers` y `artists` (copia de artistas en `_env-backups`),
      migrar `contactmessages` con los campos nuevos.
- [x] Tests, build y revisión visual en local.
- [x] Tipos de entrada: idea escrita, experimento con código y diseño (imágenes en `public/lab/<slug>/`).
- [x] Ficha en chips, sección única y formulario de comentario en overlay (`CommentDialog`).
- [x] Formulario sin desplegables nativos (`Select` de ui-sdk), botón "Enviar".
- [x] Tres temas de color (azul, naranja, mono) con tokens semánticos; se recuerdan en el navegador.
- [x] Hero y franja dither sin líneas de corte; footer siempre al final; revisión de 320 a 1920 px.
- [x] Metas (Open Graph, Twitter, canonical) e imagen `public/og-image.png` en dither.
- [ ] **Abierto:** texto de privacidad revisado con `seguridad-rgpd` antes de publicar.
- [ ] **Abierto:** en producción, `NEXT_PUBLIC_SITE_URL` con el dominio real (las metas lo usan).
- [ ] **Abierto:** `FROM_EMAIL` con una dirección de `alwayscreating.es` (local y Vercel). Con
      `onboarding@resend.dev` solo llega al dueño de la cuenta de Resend.
- [ ] **Abierto:** probar un envío real del formulario (solo se probó con la API simulada).
- [x] Correos con el estilo de la web, `reply-to` en el aviso y página `/confirmacion` del sitio.

Notas:
- La base de datos es la misma que usa producción. Hasta desplegar, la web publicada sigue siendo la
  vieja: sus artistas salen del código y no de Mongo, pero un alta en su newsletter volvería a crear
  `newslettersubscribers`. Revisar tras el deploy.
- `contactmessages` guarda 9 mensajes antiguos (2026-05-10 a 2026-10-04) de la web de artistas, sin
  `token` ni `confirmado` y con `kind: 'idea'` puesto por la migración. Se quedan por decisión de
  Manuel (2026-11-15). Tenerlos en cuenta en la revisión RGPD.
- Copia de los 3 artistas en `~/Developer/_env-backups/always_creating-artists-2026-11-15.json`.
- Los seeds de `scripts/` (ignorados por git) son de artistas y ya no sirven.
- `public/asterisk.png`, `public/globe-rings.png`, `CustomCursor`, `ParallaxImage`, `LadderLine`,
  `StatCounter` y varios `components/ui/*` ya no se usaban antes de este cambio: código muerto previo.

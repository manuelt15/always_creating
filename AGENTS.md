# AGENTS.md

## ui-sdk

Antes de tocar `components/ContactForm.jsx`, lee `node_modules/@ui-sdk/react/docs/llms.txt` y la página del componente que vayas a usar. ui-sdk aporta comportamiento (foco, Escape, ARIA, scroll), no estilos: las clases y la paleta son las del sitio.

## Verificación

Este repo no tiene linter. `next lint` desapareció en Next 16 y no hay ESLint instalado. Verifica con:

```bash
npm test
RESEND_API_KEY=re_dummy MONGODB_URI=mongodb://127.0.0.1:27017/alwayscreating npm run build
```

No toques las APIs, los modelos, el doble opt-in, la copia del sitio ni el registro de experimentos para cambios puramente visuales o de comportamiento de interfaz.

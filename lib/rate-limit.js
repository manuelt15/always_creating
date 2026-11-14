// Límite de tasa en memoria para las rutas públicas.
// Cada instancia del servidor lleva su propia cuenta: frena el abuso trivial
// (ráfagas desde una misma IP) sin añadir dependencias ni estado compartido.
const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 5;
const MAX_CLAVES = 5000;

const cubos = new Map();

function purgar(ahora) {
  if (cubos.size <= MAX_CLAVES) return;
  for (const [clave, cubo] of cubos) {
    if (ahora - cubo.inicio >= VENTANA_MS) cubos.delete(clave);
  }
}

export function claveCliente(request, ambito = 'anon') {
  const reenviada = request.headers.get('x-forwarded-for') || '';
  const ip = reenviada.split(',')[0].trim() || request.headers.get('x-real-ip') || 'desconocida';
  return `${ambito}:${ip}`;
}

export function comprobarLimite(clave, { limite = MAX_POR_VENTANA, ventanaMs = VENTANA_MS } = {}) {
  const ahora = Date.now();
  purgar(ahora);

  const cubo = cubos.get(clave);
  if (!cubo || ahora - cubo.inicio >= ventanaMs) {
    cubos.set(clave, { inicio: ahora, cuenta: 1 });
    return { ok: true, restantes: limite - 1, reintentarEn: 0 };
  }

  cubo.cuenta += 1;
  if (cubo.cuenta > limite) {
    return { ok: false, restantes: 0, reintentarEn: Math.ceil((cubo.inicio + ventanaMs - ahora) / 1000) };
  }
  return { ok: true, restantes: limite - cubo.cuenta, reintentarEn: 0 };
}

export function reiniciarLimites() {
  cubos.clear();
}

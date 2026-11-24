// Registro del laboratorio. Cada entrada es una card en la portada y una página en /lab/<slug>.
//
// Tres tipos:
//   kind: 'code'   -> hay un componente en experiments/<slug>/index.jsx (registrarlo en
//                     lib/experiment-components.js).
//   kind: 'design' -> imágenes en public/lab/<slug>/, listadas en `images` como
//                     { src: '/lab/<slug>/archivo.png', alt: '...', caption: '...' (opcional) }.
//                     La primera es la portada de la card. `body` es opcional.
//   kind: 'idea'   -> solo texto: los párrafos de `body`.
//
// Estados: seed (idea sin construir), running (en marcha), paused (aparcado), kept (se queda).

export const STATUS = {
  seed: 'Semilla',
  running: 'En marcha',
  paused: 'Aparcado',
  kept: 'Se queda',
}

export const KINDS = {
  code: 'Experimento',
  design: 'Diseño',
  idea: 'Idea escrita',
}

export const EXPERIMENTS = [
  {
    slug: 'designers',
    number: '003',
    kind: 'design',
    title: 'DESIGNERS',
    date: '2026-11-16',
    status: 'kept',
    medium: ['Cartel', 'Figma'],
    summary:
      'Dos carteles para un colectivo ficticio que pone la estructura por delante del gusto. Uno oscuro, como manifiesto; otro claro, como ficha de artista.',
    question:
      'Si se puede construir la identidad de algo que no existe solo con tipografía, retícula y fotos en blanco y negro.',
    learned:
      'Que una retícula estricta da más carácter que cualquier adorno. Las etiquetas en mono y las líneas finas hacen casi todo el trabajo.',
    images: [
      {
        src: '/lab/designers/manifiesto.jpg',
        alt: 'Cartel oscuro de DESIGNERS: el nombre en tipografía condensada sobre un busto clásico, un manifiesto en mono, globos de alambre y una retícula de etiquetas.',
        caption: 'Manifiesto. La mitad oscura del díptico.',
      },
      {
        src: '/lab/designers/sora-k.jpg',
        alt: 'Cartel claro de DESIGNERS: retrato de la artista Sora K, un edificio brutalista, el nombre apilado sobre su contorno y una mano que sostiene un globo de alambre.',
        caption: 'Sora K. La mitad clara, planteada como ficha de artista.',
      },
    ],
  },
  {
    slug: 'campo-dither',
    number: '001',
    kind: 'code',
    title: 'Campo dither',
    date: '2026-11-08',
    status: 'running',
    medium: ['Código', 'Canvas'],
    summary:
      'Una trama Bayer de 8x8 que respira sola y se aparta del cursor. La misma textura de la portada, aislada para jugar con ella.',
    question: 'Hasta dónde se puede mover una imagen de un bit sin que deje de parecer de un bit.',
    learned:
      'A 30 fotogramas por segundo y con puntos de 2x2 se siente vivo sin cansar. Por debajo, parece un error.',
  },
  {
    slug: 'hermes-controller',
    number: '004',
    kind: 'code',
    title: 'Controlador de hogar',
    date: '2026-11-24',
    status: 'running',
    medium: ['ui-sdk', 'Prototipo'],
    summary:
      'Prototipo de interfaz para controlar aparatos de casa desde Hermes, montado con ui-sdk para probar hasta dónde llega el SDK sin escribir componentes desde cero. El estado es simulado: no hay dispositivos conectados, ni backend, ni nada que se guarde.',
    question: 'Si la interfaz de controlar una casa puede ser un objeto que se toca y no un panel de interruptores.',
    learned:
      'El SDK da el comportamiento y el estado, no la identidad: los controles funcionan solos, pero el carácter lo ponen el color, la tipografía y el espacio. Y un dial grande comunica más que cinco botones pequeños.',
    body: [
      'La idea de fondo: que algún día Hermes controle de verdad la luz, las cortinas o el clima de una casa, y que la interfaz de eso no sea un panel de interruptores sino algo que se pueda tocar sin pensar. Esto es el primer intento de esa idea.',
      'Una habitación, el salón, con sus aparatos: lámpara, techo, cortinas y tira LED, un dial de brillo y una fila de escenas. Cada control enseña su estado y el punto verde de actividad.',
      'Todo el dibujo sale de los componentes del SDK: no hay imágenes ni iconos sueltos. El estado vive en memoria, sin backend, sin base de datos y sin dependencias más allá de Vite y el SDK. Al recargar, la casa vuelve a como estaba.',
      'Lo siguiente sería poner un aparato de verdad detrás de un control, para ver si el modelo de estado aguanta cuando la red falla o el aparato no responde.',
    ],
  },
  {
    slug: 'retratos-un-bit',
    number: '002',
    kind: 'idea',
    title: 'Retratos de un bit',
    date: '2026-11-15',
    status: 'seed',
    medium: ['Fotografía', 'Texto'],
    summary:
      'Reducir una foto a dos tintas y ver qué sobrevive de la persona. Por ahora solo es una idea escrita.',
    body: [
      'Cuando una foto pasa a dos colores se pierde casi todo: la piel, la luz suave, los detalles que hacen que alguien parezca alguien. Y aun así, muchas veces se le reconoce.',
      'Quiero probar dónde está ese límite. Empezar con retratos a tamaño normal e ir bajando la resolución de la trama hasta que la cara deje de ser una cara.',
      'Si tienes una idea de cómo medir ese momento, cuéntamela en Comentar.',
    ],
  },
]

export function getExperiment(slug) {
  return EXPERIMENTS.find((experiment) => experiment.slug === slug) || null
}

export function sortedExperiments() {
  return [...EXPERIMENTS].sort((a, b) => b.number.localeCompare(a.number))
}

export const EXPERIMENT_SLUGS = EXPERIMENTS.map((experiment) => experiment.slug)

export function formatDate(iso) {
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(`${iso}T12:00:00Z`))
}

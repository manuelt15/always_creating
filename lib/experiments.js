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

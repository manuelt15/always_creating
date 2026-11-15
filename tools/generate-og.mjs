// Imágenes en dither: la de las metas (Open Graph y Twitter), que es la portada tramada, y la
// franja de cabecera de los correos.
//
//   node tools/generate-og.mjs [origen] [destino]
//
// Por defecto lee docs/portada.webp y escribe public/og-image.png (1200x630), que declaran las
// metas de app/layout.js. Usa sharp, que ya viene con Next.
//
// Técnica: la misma matriz Bayer 8x8 del sitio. Lo muy claro (el titular) se queda sólido para
// que se lea, en blanco o en azul hielo según su tono; el resto se trama en azul sobre el fondo.
// Se trabaja a mitad de tamaño y se escala sin suavizado: cada punto mide 2x2 px, como en la web.

import sharp from 'sharp'

const [origen = 'docs/portada.webp', destino = 'public/og-image.png'] = process.argv.slice(2)

const ANCHO = 1200
const ALTO = 630
const ESCALA = 2

const INK = [4, 10, 30] // --ink del tema azul
const DOT = [80, 128, 255] // --dither del tema azul
const PAPER = [230, 238, 255] // --paper del tema azul
const ACCENT = [168, 196, 255] // --accent del tema azul: "creating."

const BAYER_8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64)

// Recorte: solo el titular y la trama de alrededor, con la proporción de la tarjeta (1.91:1).
// El texto pequeño no se leería en una vista previa de redes.
const meta = await sharp(origen).metadata()
const anchoRecorte = Math.min(meta.width, Math.round(meta.width * 0.75))
const altoRecorte = Math.round(anchoRecorte * (ALTO / ANCHO))

const w = ANCHO / ESCALA
const h = ALTO / ESCALA

const { data } = await sharp(origen)
  .extract({ left: 0, top: 0, width: anchoRecorte, height: altoRecorte })
  .resize(w, h, { fit: 'fill' })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })

const salida = Buffer.alloc(w * h * 3)
for (let y = 0; y < h; y += 1) {
  for (let x = 0; x < w; x += 1) {
    const i = y * w + x
    const r = data[i * 3]
    const g = data[i * 3 + 1]
    const b = data[i * 3 + 2]
    const luz = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    let color = INK
    // Texto claro: blanco si es neutro, azul hielo si tira a azul (como "creating.").
    if (luz > 0.62) color = b - r > 50 ? ACCENT : PAPER
    else if (Math.min(1, Math.max(0, luz - 0.03) * 2.6) > BAYER_8[((y & 7) << 3) | (x & 7)]) color = DOT
    salida.set(color, i * 3)
  }
}

await sharp(salida, { raw: { width: w, height: h, channels: 3 } })
  .resize(ANCHO, ALTO, { kernel: 'nearest' })
  .png({ compressionLevel: 9, palette: true })
  .toFile(destino)

console.log(`${destino}: ${ANCHO}x${ALTO}`)

// Franja de cabecera de los correos (public/email-band.png, 1200x120, se ve a 600x60): la misma
// trama del campo del hero, generada (no sale de la captura), sobre --surface del tema azul.
const SURFACE = [8, 16, 48]
const BW = 600
const BH = 60
const banda = Buffer.alloc(BW * BH * 3)
for (let y = 0; y < BH; y += 1) {
  for (let x = 0; x < BW; x += 1) {
    const nx = x / BW
    const ny = y / BH
    const ruido = Math.sin(x * 0.135 + Math.sin(y * 0.085) * 1.6) * 0.5 + Math.sin(y * 0.17 - x * 0.05) * 0.5
    const luzCentro = Math.max(0, 1 - Math.hypot((nx - 0.72) * 1.6, (ny - 0.5) * 0.8)) ** 2
    const valor = 0.08 + nx * 0.22 + ruido * 0.12 + luzCentro * 0.75
    const color = valor > BAYER_8[((y & 7) << 3) | (x & 7)] ? DOT : SURFACE
    banda.set(color, (y * BW + x) * 3)
  }
}
await sharp(banda, { raw: { width: BW, height: BH, channels: 3 } })
  .resize(BW * 2, BH * 2, { kernel: 'nearest' })
  .png({ compressionLevel: 9, palette: true })
  .toFile('public/email-band.png')
console.log('public/email-band.png: 1200x120')

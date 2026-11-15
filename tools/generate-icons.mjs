// Iconos del sitio: el punto de "creating." en dither de un bit, sobre el fondo del tema azul.
//
//   node tools/generate-icons.mjs
//
// Escribe app/icon.png (512), app/apple-icon.png (180) y app/favicon.ico (16 y 32). Next los
// enlaza solos en <head>. Se dibuja en una rejilla de 16x16 y se escala sin suavizado, para que
// a 16 px cada celda sea un píxel y la trama se lea igual que en la web. Usa sharp (viene con Next).

import { writeFileSync } from 'node:fs'
import sharp from 'sharp'

const N = 16
const INK = [4, 10, 30] // --ink
const DOT = [80, 128, 255] // --dither
const ICE = [168, 196, 255] // --accent

const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16)

const celdas = Buffer.alloc(N * N * 3)
for (let y = 0; y < N; y += 1) {
  for (let x = 0; x < N; x += 1) {
    // Centro algo abajo a la derecha, como el punto final de una frase.
    const d = Math.hypot(x + 0.5 - 9, y + 0.5 - 9)
    let color = INK
    if (d < 3.4) color = ICE
    else if (d < 6.6 && (6.6 - d) / 3.2 > BAYER_4[((y & 3) << 2) | (x & 3)]) color = DOT
    celdas.set(color, (y * N + x) * 3)
  }
}

const png = (lado) =>
  sharp(celdas, { raw: { width: N, height: N, channels: 3 } })
    .resize(lado, lado, { kernel: 'nearest' })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()

writeFileSync('app/icon.png', await png(512))
writeFileSync('app/apple-icon.png', await png(180))

// ICO con PNG dentro (lo aceptan todos los navegadores actuales): cabecera, directorio y datos.
// Los PNG del ICO van en RGBA sin paleta: Next no decodifica otro formato dentro de un .ico.
const pngRGBA = (lado) =>
  sharp(celdas, { raw: { width: N, height: N, channels: 3 } })
    .resize(lado, lado, { kernel: 'nearest' })
    .ensureAlpha()
    .png({ compressionLevel: 9 })
    .toBuffer()
const tamanos = [16, 32]
const imagenes = await Promise.all(tamanos.map(pngRGBA))
const cabecera = Buffer.alloc(6)
cabecera.writeUInt16LE(0, 0)
cabecera.writeUInt16LE(1, 2)
cabecera.writeUInt16LE(tamanos.length, 4)
let offset = 6 + 16 * tamanos.length
const directorio = tamanos.map((lado, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(lado, 0)
  e.writeUInt8(lado, 1)
  e.writeUInt8(0, 2)
  e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(imagenes[i].length, 8)
  e.writeUInt32LE(offset, 12)
  offset += imagenes[i].length
  return e
})
writeFileSync('app/favicon.ico', Buffer.concat([cabecera, ...directorio, ...imagenes]))

console.log('app/icon.png 512, app/apple-icon.png 180, app/favicon.ico 16+32')

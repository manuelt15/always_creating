// Migración única: de sala de artistas a cuaderno personal (2026-11-15).
//
//   node --env-file=.env.local tools/migrar-cuaderno.mjs <carpeta-de-copia>
//
// 1. Copia la colección `artists` a <carpeta-de-copia>/always_creating-artists-<fecha>.json.
// 2. Borra `artists` y `newslettersubscribers`.
// 3. Da a los mensajes de contacto antiguos los campos nuevos (kind: 'idea', about: null).
//
// Es idempotente: si las colecciones ya no existen, no hace nada con ellas.

import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import mongoose from 'mongoose'

const destino = process.argv[2]
if (!destino) {
  console.error('Falta la carpeta donde guardar la copia de artistas.')
  process.exit(1)
}

await mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection.db
const existentes = new Set((await db.listCollections().toArray()).map((c) => c.name))

if (existentes.has('artists')) {
  const artistas = await db.collection('artists').find({}).toArray()
  const fecha = new Date().toISOString().slice(0, 10)
  const archivo = join(destino, `always_creating-artists-${fecha}.json`)
  writeFileSync(archivo, JSON.stringify(artistas, null, 2), { mode: 0o600 })
  console.log(`artists: ${artistas.length} copiados en ${archivo}`)
  await db.collection('artists').drop()
  console.log('artists: borrada')
}

if (existentes.has('newslettersubscribers')) {
  const total = await db.collection('newslettersubscribers').countDocuments()
  await db.collection('newslettersubscribers').drop()
  console.log(`newslettersubscribers: borrada (${total} suscriptores)`)
}

const { modifiedCount } = await db
  .collection('contactmessages')
  .updateMany({ kind: { $exists: false } }, { $set: { kind: 'idea', about: null } })
console.log(`contactmessages: ${modifiedCount} mensajes con los campos nuevos`)

await mongoose.disconnect()

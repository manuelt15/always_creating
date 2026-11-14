import mongoose from 'mongoose'

const ContactMessageSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  message:     { type: String, required: true },
  token:       { type: String, required: true, index: true },
  confirmado:  { type: Boolean, default: false },
  confirmadoEn:{ type: Date, default: null },
  createdAt:   { type: Date, default: Date.now },
})

export default mongoose.models.ContactMessage ||
  mongoose.model('ContactMessage', ContactMessageSchema)

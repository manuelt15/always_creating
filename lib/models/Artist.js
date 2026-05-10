import mongoose from 'mongoose'

const ArtistSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  slug:         { type: String, required: true, unique: true },
  bio:          { type: String },
  discipline:   [{ type: String }],
  stats: {
    releases:  { type: Number, default: 0 },
    listeners: { type: Number, default: 0 },
  },
  social: {
    instagram:  { type: String },
    x:          { type: String },
    spotify:    { type: String },
    soundcloud: { type: String },
    youtube:    { type: String },
    github:     { type: String },
    website:    { type: String },
  },
  email:        { type: String },
  profileImage: { type: String },
  featured:     { type: Boolean, default: false },
  order:        { type: Number, default: 99 },
  createdAt:    { type: Date, default: Date.now },
})

export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema)

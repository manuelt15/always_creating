'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = "w-full bg-primary border border-subtle rounded-[8px] px-4 py-3 text-text-primary placeholder:text-text-muted font-body text-[13px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors duration-150"
  const labelClass = "block font-body text-[10px] tracking-[1px] uppercase text-text-muted mb-1.5"

  return (
    <div className="bg-card border border-subtle rounded-lg p-6">
      {status === 'success' ? (
        <div className="border border-brand/20 bg-brand/5 rounded-[8px] px-6 py-10 text-brand font-body text-sm text-center">
          Message sent — we'll be in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Name</label>
            <input name="name" type="text" placeholder="Your full name" value={form.name} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Message</label>
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>
          {status === 'error' && (
            <p className="text-red-500 text-xs font-body">Something went wrong. Try again.</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 font-body font-bold text-[13px] bg-brand text-white rounded-[8px] py-3 hover:bg-brand-dark active:scale-[0.98] transition-all duration-150 disabled:opacity-40"
          >
            {status === 'loading' ? 'Sending…' : 'Send message →'}
          </button>
          <p className="text-[11px] font-body text-text-muted text-center">
            Your information will not be shared with third parties.
          </p>
        </form>
      )}
    </div>
  )
}

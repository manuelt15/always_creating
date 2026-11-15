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

  if (status === 'success') {
    return (
      <div className="border border-line bg-ink px-5 py-10 sm:px-8">
        <p className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-none text-paper">
          Message sent.
        </p>
        <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.6] text-ash">
          We will be in touch soon.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="field-label">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="field-label">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          placeholder="Tell us what you are working on"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="field resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="border-l border-paper pl-3 text-[13px] leading-[1.5] text-paper">
          Something went wrong. Try again.
        </p>
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-[34ch] text-[11px] leading-[1.55] text-ash">
          Your information will not be shared with third parties.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-lime w-full shrink-0 disabled:pointer-events-none disabled:opacity-40 sm:w-auto"
        >
          {status === 'loading' ? 'Sending' : 'Send message'}
        </button>
      </div>
    </form>
  )
}

'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail]   = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.status === 409) { setStatus('duplicate'); return }
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-body text-[13px] text-brand">
        You're in — we'll be in touch soon.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-lg">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-card border border-subtle rounded-[8px] px-4 py-3 text-text-primary placeholder:text-text-muted font-body text-[13px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors duration-150"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="shrink-0 inline-flex items-center justify-center font-body font-bold text-[13px] bg-brand text-white rounded-[8px] px-6 py-3 hover:bg-brand-dark transition-all duration-150 disabled:opacity-40"
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>
      {status === 'duplicate' && (
        <p className="font-body text-[11px] text-text-muted">That email is already subscribed.</p>
      )}
      {status === 'error' && (
        <p className="font-body text-[11px] text-red-500">Something went wrong. Try again.</p>
      )}
    </div>
  )
}

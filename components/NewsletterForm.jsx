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
      <p className="border border-line px-4 py-3 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-lime">
        You are in. We will be in touch soon.
      </p>
    )
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="field"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-line w-full disabled:pointer-events-none disabled:opacity-40"
        >
          {status === 'loading' ? 'Subscribing' : 'Subscribe'}
        </button>
      </form>
      {status === 'duplicate' && (
        <p className="text-[12px] leading-[1.5] text-ash">That email is already subscribed.</p>
      )}
      {status === 'error' && (
        <p className="text-[12px] leading-[1.5] text-paper">Something went wrong. Try again.</p>
      )}
    </div>
  )
}

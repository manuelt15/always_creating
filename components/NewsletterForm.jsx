'use client'

import { useState } from 'react'
import { Field, FieldError, FieldLabel } from '@ui-sdk/react/field'
import { Input } from '@ui-sdk/react/input'
import { validateEmail } from '@/lib/validation'

const EMAIL_ERROR = 'We need an email to send the notes to.'

export default function NewsletterForm() {
  const [email, setEmail]   = useState('')
  const [error, setError]   = useState('')
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateEmail(email).ok) {
      setError(EMAIL_ERROR)
      setStatus('idle')
      document.getElementById('newsletter-email')?.focus()
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="border border-line bg-ink px-4 py-5">
        <p className="font-serif text-[clamp(1.4rem,2.2vw,1.9rem)] leading-none text-paper">
          You are on the list.
        </p>
        <p className="mt-2 text-[12px] leading-[1.55] text-ash">
          Confirm the link we just emailed you and the first note will arrive there.
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-2">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <Field name="email" invalid={error ? true : undefined} className="flex flex-col gap-2">
          <FieldLabel className="sr-only">Email address</FieldLabel>
          <Input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={handleChange}
            autoComplete="email"
            className="field h-auto"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-line w-full disabled:pointer-events-none disabled:opacity-40"
          >
            {status === 'loading' ? 'Subscribing' : 'Subscribe'}
          </button>
          {error && (
            <FieldError className="text-[12px] leading-[1.5] text-lime">
              {error}
            </FieldError>
          )}
        </Field>
      </form>
      {status === 'error' && (
        <p role="alert" className="text-[12px] leading-[1.5] text-paper">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}

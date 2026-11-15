'use client'

import { useState } from 'react'
import { Field, FieldError, FieldLabel } from '@ui-sdk/react/field'
import { Input } from '@ui-sdk/react/input'
import { Textarea } from '@ui-sdk/react/textarea'
import { validateEmail } from '@/lib/validation'

const FIELDS = ['name', 'email', 'message']

function findErrors(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Tell us your name.'
  if (!validateEmail(values.email).ok) errors.email = 'We need an email we can reply to.'
  if (!values.message.trim()) errors.message = 'A sentence is enough.'
  return errors
}

export default function ContactForm() {
  const [form, setForm]     = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const nextErrors = findErrors(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      const first = FIELDS.find((field) => nextErrors[field])
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

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
      <div role="status" aria-live="polite" className="border border-line bg-ink px-5 py-10 sm:px-8">
        <p className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-none text-paper">
          Check your inbox.
        </p>
        <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.6] text-ash">
          Your message is held until you confirm the link we just sent. That is how it
          reaches us.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" invalid={errors.name ? true : undefined} className="block">
          <FieldLabel className="field-label">Name</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            className="field h-auto"
          />
          {errors.name && (
            <FieldError className="mt-2 text-[11px] leading-[1.4] text-lime">
              {errors.name}
            </FieldError>
          )}
        </Field>
        <Field name="email" invalid={errors.email ? true : undefined} className="block">
          <FieldLabel className="field-label">Email</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="field h-auto"
          />
          {errors.email && (
            <FieldError className="mt-2 text-[11px] leading-[1.4] text-lime">
              {errors.email}
            </FieldError>
          )}
        </Field>
      </div>

      <Field name="message" invalid={errors.message ? true : undefined} className="block">
        <FieldLabel className="field-label">Message</FieldLabel>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell us what you are working on"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="field resize-none"
        />
        {errors.message && (
          <FieldError className="mt-2 text-[11px] leading-[1.4] text-lime">
            {errors.message}
          </FieldError>
        )}
      </Field>

      {status === 'error' && (
        <p role="alert" className="border-l border-paper pl-3 text-[13px] leading-[1.5] text-paper">
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

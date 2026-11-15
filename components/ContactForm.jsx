'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { Field, FieldError, FieldLabel } from '@ui-sdk/react/field'
import { Input } from '@ui-sdk/react/input'
import { Textarea } from '@ui-sdk/react/textarea'
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from '@ui-sdk/react/segmented-control'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectTrigger,
  SelectValue,
} from '@ui-sdk/react/select'
import { validateEmail } from '@/lib/validation'

const FIELDS = ['name', 'email', 'message']
const GENERAL = 'general'
const MAX_MESSAGE = 2000

const PLACEHOLDERS = {
  idea: 'Algo que te gustaría ver probado aquí',
  comment: 'Qué te ha parecido, qué te ha sugerido',
}

function findErrors(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Dime cómo te llamas.'
  if (!validateEmail(values.email).ok) errors.email = 'Necesito un correo al que responder.'
  if (!values.message.trim()) errors.message = 'Con una frase basta.'
  return errors
}

export default function ContactForm({
  experiments = [],
  initialAbout = '',
  hideAbout = false,
  successAction = null,
}) {
  const empty = {
    kind: initialAbout ? 'comment' : 'idea',
    about: initialAbout || GENERAL,
    name: '',
    email: '',
    message: '',
  }
  const [form, setForm]     = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const successRef = useRef(null)

  // Al enviar, el botón desaparece: el foco pasa al aviso para no perderse.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const update = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev))
  }

  const handleChange = (e) => update(e.target.name, e.target.value)

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
        body: JSON.stringify({ ...form, about: form.about === GENERAL ? '' : form.about }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="border border-line bg-ink px-5 py-10 outline-none sm:px-8"
      >
        <p className="label text-accent">Enviado</p>
        <p className="mt-4 font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-none text-paper">
          Mira tu correo.
        </p>
        <p className="mt-3 max-w-[38ch] text-[14px] leading-[1.6] text-ash">
          Tu mensaje espera hasta que confirmes el enlace que te acabo de enviar. Así es como
          me llega.
        </p>
        {successAction ?? (
          <button type="button" onClick={() => setStatus('idle')} className="btn-line mt-6">
            Escribir otro
          </button>
        )}
      </div>
    )
  }

  const aboutOptions = [
    { value: GENERAL, label: 'Nada en concreto' },
    ...experiments.map((experiment) => ({
      value: experiment.slug,
      label: `E/${experiment.number} ${experiment.title}`,
    })),
  ]

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className={hideAbout ? 'grid gap-6' : 'grid gap-6 sm:grid-cols-2 sm:gap-5'}>
        <Field name="kind" className="block">
          <FieldLabel className="field-label">Qué traes</FieldLabel>
          <SegmentedControl
            value={form.kind}
            onValueChange={(kind) => update('kind', kind)}
            className="door-kind"
          >
            <SegmentedControlIndicator className="door-kind-indicator" />
            <SegmentedControlItem value="idea" className="door-kind-item">
              Una idea
            </SegmentedControlItem>
            <SegmentedControlItem value="comment" className="door-kind-item">
              Un comentario
            </SegmentedControlItem>
          </SegmentedControl>
        </Field>

        {hideAbout ? null : (
          <Field name="about" className="block">
            <FieldLabel className="field-label">Sobre</FieldLabel>
            <Select
              items={aboutOptions}
              value={form.about}
              onValueChange={(about) => update('about', about ?? GENERAL)}
            >
              <SelectTrigger className="select-trigger">
                <SelectValue className="truncate" />
                <ChevronDown aria-hidden="true" size={16} strokeWidth={1.5} className="select-chevron" />
              </SelectTrigger>
              <SelectContent className="select-content">
                {aboutOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    className="select-item"
                  >
                    <span className="truncate">{option.label}</span>
                    <SelectItemIndicator className="ml-auto shrink-0 text-accent">
                      <Check aria-hidden="true" size={14} strokeWidth={2} />
                    </SelectItemIndicator>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
        <Field name="name" invalid={errors.name ? true : undefined} className="block">
          <FieldLabel className="field-label">Nombre</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            type="text"
            placeholder="Cómo te llamas"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            className="field h-auto"
          />
          {errors.name && <FieldError className="field-error">{errors.name}</FieldError>}
        </Field>
        <Field name="email" invalid={errors.email ? true : undefined} className="block">
          <FieldLabel className="field-label">Correo</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            placeholder="tu@correo.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            className="field h-auto"
          />
          {errors.email && <FieldError className="field-error">{errors.email}</FieldError>}
        </Field>
      </div>

      <Field name="message" invalid={errors.message ? true : undefined} className="block">
        <div className="flex items-baseline justify-between gap-4">
          <FieldLabel className="field-label">Mensaje</FieldLabel>
          <span aria-hidden="true" className="label mb-2 tabular-nums">
            {form.message.length} / {MAX_MESSAGE}
          </span>
        </div>
        <Textarea
          id="contact-message"
          name="message"
          placeholder={PLACEHOLDERS[form.kind]}
          value={form.message}
          onChange={handleChange}
          maxLength={MAX_MESSAGE}
          rows={5}
          className="field min-h-[140px] resize-y"
        />
        {errors.message && <FieldError className="field-error">{errors.message}</FieldError>}
      </Field>

      {status === 'error' && (
        <p role="alert" className="border-l border-paper pl-3 text-[13px] leading-[1.5] text-paper">
          No se ha podido enviar. Revisa tu conexión y prueba otra vez.
        </p>
      )}

      <div className="flex flex-col-reverse justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
        <p className="max-w-[34ch] text-[12px] leading-[1.55] text-ash">
          Tus datos solo sirven para responderte. No se comparten con nadie.
        </p>
        <button
          type="submit"
          disabled={status === 'loading'}
          aria-busy={status === 'loading' || undefined}
          className="btn-primary w-full shrink-0 disabled:pointer-events-none disabled:opacity-40 sm:w-auto sm:min-w-[160px]"
        >
          {status === 'loading' ? 'Enviando' : 'Enviar'}
        </button>
      </div>
    </form>
  )
}

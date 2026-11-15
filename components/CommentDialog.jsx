'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@ui-sdk/react/dialog'
import ContactForm from '@/components/ContactForm'

export default function CommentDialog({ experiment, experiments }) {
  // Cada apertura monta un formulario limpio: tras enviar o cerrar, se empieza de cero.
  const [round, setRound] = useState(0)

  return (
    <Dialog onOpenChange={(open) => open && setRound((n) => n + 1)}>
      <DialogTrigger className="btn-primary px-4 py-2.5">Comentar</DialogTrigger>
      <DialogBackdrop className="comment-backdrop" />
      <DialogContent className="comment-dialog" initialFocus="#contact-message">
        <div className="dither-rule-strong" aria-hidden />

        <div className="flex items-start justify-between gap-6 px-5 pt-6 sm:px-8 sm:pt-8">
          <div>
            <p className="label text-accent">E/{experiment.number}</p>
            <DialogTitle className="mt-3 font-serif text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1] tracking-[-0.02em] text-paper">
              {experiment.title}
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-[40ch] text-[14px] leading-[1.6] text-ash">
              Cuéntame qué te ha parecido o qué idea te ha dado. Una frase basta.
            </DialogDescription>
          </div>
          <DialogClose
            aria-label="Cerrar"
            className="-mr-2 -mt-1 grid h-10 w-10 shrink-0 place-items-center text-ash transition-colors duration-150 hover:text-paper focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent"
          >
            <X aria-hidden="true" size={18} strokeWidth={1.5} />
          </DialogClose>
        </div>

        <div className="px-5 pb-6 pt-8 sm:px-8 sm:pb-8">
          <ContactForm
            key={round}
            experiments={experiments}
            initialAbout={experiment.slug}
            hideAbout
            successAction={
              <DialogClose className="btn-line mt-6">Volver al experimento</DialogClose>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

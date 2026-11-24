'use client'

import { useId, useState } from 'react'
import { Blinds, Lamp, LampCeiling, Lightbulb } from 'lucide-react'
import { Button } from '@ui-sdk/react/button'
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from '@ui-sdk/react/slider'
import { Toggle } from '@ui-sdk/react/toggle'
import { DialRoot } from '@/experiments/hermes-controller/dial'

// Estado en memoria: no hay backend, no hay fetch y nada se guarda.
// Al recargar, la casa vuelve a como estaba.

const LIGHTS = [
  { id: 'lampara', name: 'lámpara', Icon: Lamp },
  { id: 'techo', name: 'techo', Icon: LampCeiling },
  { id: 'tira', name: 'tira led', Icon: Lightbulb },
]

const SCENES = [
  { id: 'noche', name: 'Noche', on: { lampara: true, techo: false, tira: true }, brightness: 20, curtains: 0 },
  { id: 'lectura', name: 'Lectura', on: { lampara: true, techo: false, tira: false }, brightness: 35, curtains: 100 },
  { id: 'salir', name: 'Salir', on: { lampara: false, techo: false, tira: false }, brightness: 0, curtains: 0 },
]

const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

export default function HermesController() {
  const ids = useId()
  const curtainsStateId = `${ids}-cortinas`
  // Qué luz está encendida. El dial da el brillo de las encendidas.
  const [on, setOn] = useState({ lampara: true, techo: false, tira: true })
  const [brightness, setBrightness] = useState(60)
  // Las cortinas van aparte: apertura, no brillo.
  const [curtains, setCurtains] = useState(100)
  const [status, setStatus] = useState('')

  const curtainsOpen = curtains > 0

  const toggleLight = (id, next) => {
    setOn((current) => ({ ...current, [id]: next }))
    const name = LIGHTS.find((light) => light.id === id).name
    setStatus(`${name} del salón: ${next ? `encendida al ${brightness} %` : 'apagada'}`)
  }

  const setDial = (value) => {
    const level = clamp(value)
    setBrightness(level)
    setStatus(`Brillo de las luces del salón: ${level} %`)
  }

  const moveCurtains = (value) => {
    const level = clamp(value)
    setCurtains(level)
    setStatus(`Cortinas del salón: ${level === 0 ? 'cerradas' : `abiertas al ${level} %`}`)
  }

  const applyScene = (scene) => {
    setOn(scene.on)
    setBrightness(scene.brightness)
    setCurtains(scene.curtains)
    setStatus(`Escena ${scene.name.toLowerCase()} aplicada`)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
      <div>
        <p className="label">Salón</p>

        <p className="mt-4 border-l-2 border-accent pl-4 text-[15px] leading-[1.6] text-paper">
          Prototipo simulado. No hay aparatos detrás: los controles guardan el estado en memoria y se pierde al recargar.
        </p>

        <section className="mt-8 border border-line">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
            <p className="label">Luces</p>
            <p className="label">El dial marca el brillo de las encendidas</p>
          </div>

          <div className="grid grid-cols-3">
            {LIGHTS.map(({ id, name, Icon }, index) => {
              const stateId = `${ids}-${id}`
              return (
                <div
                  key={id}
                  className={`flex flex-col items-start gap-3 px-4 py-4 ${
                    index < LIGHTS.length - 1 ? 'border-r border-line' : ''
                  }`}
                >
                  <Toggle
                    pressed={on[id]}
                    onPressedChange={(next) => toggleLight(id, next)}
                    aria-label={name}
                    aria-describedby={stateId}
                    className="flex w-full items-center gap-2 text-left focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-accent"
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.4} className="text-ash" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper">{name}</span>
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 rounded-full ${on[id] ? 'bg-accent' : 'bg-line-strong'}`}
                    />
                  </Toggle>
                  <p id={stateId} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                    {on[id] ? `${brightness} % de brillo` : 'apagada'}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mt-6 border border-line">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
            <p className="label">Cortinas</p>
            <div className="flex items-center gap-3">
              <p id={curtainsStateId} className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash">
                {curtainsOpen ? `abiertas al ${curtains} %` : 'cerradas'}
              </p>
              <Toggle
                pressed={curtainsOpen}
                onPressedChange={(next) => moveCurtains(next ? 100 : 0)}
                aria-label="cortinas"
                aria-describedby={curtainsStateId}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper"
              >
                <Blinds aria-hidden="true" size={16} strokeWidth={1.4} className="text-ash" />
                cortinas
              </Toggle>
            </div>
          </div>

          <div className="px-4 py-5">
            <Slider value={curtains} onValueChange={moveCurtains} min={0} max={100} step={1}>
              <div className="mb-4 flex items-center justify-between">
                <p className="label">Apertura</p>
                <SliderValue className="font-mono text-[11px] uppercase tracking-[0.14em] text-ash" />
              </div>
              <SliderControl className="h-6">
                <SliderTrack className="h-[2px] w-full bg-line-strong">
                  <SliderIndicator className="h-full bg-accent" />
                </SliderTrack>
                <SliderThumb
                  aria-label="Apertura de las cortinas del salón"
                  className="block h-4 w-4 rounded-full border border-accent bg-ink [&:has(:focus-visible)]:outline [&:has(:focus-visible)]:outline-1 [&:has(:focus-visible)]:outline-offset-4 [&:has(:focus-visible)]:outline-accent"
                />
              </SliderControl>
            </Slider>
          </div>
        </section>

        <section className="mt-6 border border-line">
          <div className="border-b border-line px-4 py-3">
            <p className="label">Escenas</p>
          </div>
          <div className="flex flex-wrap gap-2 px-4 py-4">
            {SCENES.map((scene) => (
              <Button
                key={scene.id}
                onClick={() => applyScene(scene)}
                className="border border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-paper transition-colors duration-150 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-accent"
              >
                {scene.name}
              </Button>
            ))}
          </div>
        </section>

        <p aria-live="polite" className="mt-4 min-h-[1.5em] text-[13px] leading-[1.5] text-ash">
          {status}
        </p>
      </div>

      <div className="lg:justify-self-end">
        <DialRoot
          value={brightness}
          unit="brillo"
          onValueChange={setDial}
          aria-label="Brillo de las luces del salón"
          className="relative block aspect-square w-full max-w-[18rem] cursor-grab touch-none select-none rounded-full border border-line bg-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 100 100" aria-hidden="true" className="h-full w-full">
            <circle cx="50" cy="50" r="47" fill="none" stroke="var(--line-strong)" strokeWidth="0.5" />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1.4"
              pathLength="100"
              strokeDasharray="75 100"
              transform="rotate(135 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.4"
              pathLength="100"
              strokeDasharray={`${brightness * 0.75} 100`}
              transform="rotate(135 50 50)"
              strokeLinecap="round"
            />
            <g transform={`rotate(${-135 + 2.7 * brightness} 50 50)`}>
              <line x1="50" y1="9" x2="50" y2="22" stroke="var(--paper)" strokeWidth="0.7" />
            </g>
          </svg>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-serif text-[clamp(2.6rem,7vw,3.6rem)] leading-none text-paper">{brightness}</span>
            <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ash">brillo</span>
          </span>
        </DialRoot>
        <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ash">Dial de brillo</p>
      </div>
    </div>
  )
}

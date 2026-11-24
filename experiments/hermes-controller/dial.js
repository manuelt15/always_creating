'use client'

// Dial rotatorio: el arco va de -135° a +135°, 270° de recorrido.
//
// El SDK aporta el comportamiento (role, teclado, foco, ARIA) y el estado;
// el dibujo y la paleta son del sitio.
//
// En el catálogo de @ui-sdk/react no hay un dial (el Slider es lineal), así que
// el primitivo se define con @ui-sdk/core y se monta en React con createParts,
// que es la vía documentada para primitivos propios.

import { createChange, definePrimitive } from '@ui-sdk/core'
import { createParts } from '@ui-sdk/react/primitive'

const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)))

const angleToValue = (angle) => (angle + 135) / 2.7

const dial = definePrimitive({
  name: 'dial',
  options: {
    value: 'number',
    defaultValue: 'number',
    onValueChange: 'callback',
  },
  controlled: ['value'],
  state: (options) => ({
    // value es el valor controlado, el que devuelve la app. live es la copia
    // que lleva el dedo o la flecha.
    value: options.value ?? options.defaultValue ?? 0,
    live: options.value ?? options.defaultValue ?? 0,
  }),
  sync: (options) => (options.value === undefined ? {} : { value: options.value }),
  api: (context) => {
    const change = createChange(context)
    // Lo pedido por última vez. Con el valor controlado, la respuesta llega un
    // render después: sin esta copia, dos teclas seguidas partirían del mismo
    // número y el dial se quedaría corto.
    let asked = null

    const current = () => context.store.get().live

    const fromPointer = (event, el) => {
      const box = el.getBoundingClientRect()
      const angle =
        (Math.atan2(event.clientX - (box.left + box.width / 2), -(event.clientY - (box.top + box.height / 2))) * 180) /
        Math.PI
      if (angle > 135 || angle < -135) return null
      return angleToValue(angle)
    }

    // Un valor que llega de fuera (una escena) manda sobre lo pedido.
    context.store.subscribe((_, delivered, changed) => {
      if (!delivered || !changed.includes('value')) return
      const value = context.store.get().value
      if (asked !== null && asked === value) return
      asked = null
      context.store.set({ live: value })
    })

    const request = (value, reason, event) => {
      const next = clamp(value)
      asked = next
      context.store.set({ live: next })
      change('value', next, { reason, event })
    }

    return {
      keydown(event) {
        const step = { ArrowUp: 1, ArrowRight: 1, ArrowDown: -1, ArrowLeft: -1 }
        let value = current()
        if (event.key in step) value += step[event.key] * (event.shiftKey ? 10 : 1)
        else if (event.key === 'PageUp') value += 10
        else if (event.key === 'PageDown') value -= 10
        else if (event.key === 'Home') value = 0
        else if (event.key === 'End') value = 100
        else return
        event.preventDefault()
        request(value, 'step-key', event)
      },
      down(event, el) {
        try {
          el.setPointerCapture(event.pointerId)
        } catch (error) {
          // puntero ya liberado: el arrastre sigue funcionando
        }
        const value = fromPointer(event, el)
        if (value != null) request(value, 'track-press', event)
      },
      move(event, el) {
        const value = fromPointer(event, el)
        if (value != null) request(value, 'drag', event)
      },
      up() {},
    }
  },
  slots: (slot) => ({
    root: slot({
      role: 'slider',
      focus: 'tab-stop',
      keys: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End'],
      // La unidad es una prop del slot, no una opción: describe el control, no
      // su estado.
      props: { unit: 'string' },
      attrs: (state, { props }) => ({
        tabindex: '0',
        'aria-valuenow': String(state.live),
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        'aria-valuetext': props.unit ? `${state.live} % de ${props.unit}` : `${state.live} %`,
      }),
      on: {
        keydown: (event, { api }) => api.keydown(event),
        pointerdown: (event, { api, el }) => el && api.down(event, el),
        pointermove: (event, { api, el }) => el && api.move(event, el),
        pointerup: (event, { api }) => api.up(event),
      },
    }),
  }),
})

export const { Root: DialRoot } = createParts(dial, { root: 'div' })

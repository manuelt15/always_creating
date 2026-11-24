import dynamic from 'next/dynamic'

// Un import por experimento de código. El slug tiene que coincidir con lib/experiments.js.
export const EXPERIMENT_COMPONENTS = {
  'campo-dither': dynamic(() => import('@/experiments/campo-dither')),
  'hermes-controller': dynamic(() => import('@/experiments/hermes-controller')),
}

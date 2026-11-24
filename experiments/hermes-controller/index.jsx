// El prototipo entero, tal cual: es el mismo build del repo hermes-controller,
// servido desde public/prototipos/hermes-controller. Sin port ni adaptación, así
// que lo que se ve aquí es exactamente lo que se ve al abrirlo en su web.
//
// Para actualizarlo: en el repo hermes-controller,
//   npx vite build --base=/prototipos/hermes-controller/
// y copiar dist/* a public/prototipos/hermes-controller/.

export default function HermesController() {
  return (
    <figure className="-mx-4 sm:mx-0">
      <iframe
        src="/prototipos/hermes-controller/index.html"
        title="Controlador de hogar, prototipo interactivo"
        className="block h-[620px] w-full border border-line bg-white"
        loading="lazy"
      />
      <figcaption className="label mt-3">
        Prototipo simulado: no hay aparatos detrás. El estado se pierde al recargar.
      </figcaption>
    </figure>
  )
}

export default function Tag({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center border border-line px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-ash ${className}`}
    >
      {children}
    </span>
  )
}

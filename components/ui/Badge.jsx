export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-[3px] bg-brand/10 text-brand font-ui font-semibold text-[10px] tracking-[2.5px] uppercase ${className}`}>
      {children}
    </span>
  )
}

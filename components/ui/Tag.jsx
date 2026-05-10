export default function Tag({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-[5px] bg-black/60 text-white backdrop-blur-sm text-[10px] tracking-[0.4px] font-body uppercase ${className}`}>
      {children}
    </span>
  )
}

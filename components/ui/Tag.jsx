export default function Tag({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-[5px] bg-brand/10 text-brand text-[10px] tracking-[0.4px] font-body uppercase ${className}`}>
      {children}
    </span>
  )
}

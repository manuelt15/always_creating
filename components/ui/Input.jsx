export default function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full bg-card border border-default rounded-[8px] px-4 py-3 text-text-primary placeholder:text-text-muted font-body text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors duration-150 ${className}`}
      {...props}
    />
  )
}

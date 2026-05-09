export default function Divider({ orientation = 'horizontal', className = '' }) {
  if (orientation === 'vertical') {
    return <div className={`w-px bg-border self-stretch ${className}`} />
  }
  return <div className={`h-px w-full bg-border ${className}`} />
}

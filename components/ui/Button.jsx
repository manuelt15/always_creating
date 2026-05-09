'use client'

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-bold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-brand text-white rounded-[8px] hover:bg-brand-dark active:scale-[0.98] font-body',
    outline: 'bg-transparent text-text-primary border border-default rounded-[8px] hover:border-brand hover:text-brand font-body',
    dark:    'bg-text-primary text-primary rounded-[8px] hover:opacity-80 active:scale-[0.98] font-body',
  }

  const sizes = {
    sm: 'text-[13px] px-4 py-2',
    md: 'text-[13px] px-5 py-2.5',
    lg: 'text-[13px] px-6 py-3',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

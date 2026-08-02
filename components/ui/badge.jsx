import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-shadcn-primary text-shadcn-primary-foreground',
        secondary: 'border-transparent bg-shadcn-secondary text-shadcn-secondary-foreground',
        destructive: 'border-transparent bg-shadcn-destructive text-shadcn-destructive-foreground',
        outline: 'border-shadcn-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
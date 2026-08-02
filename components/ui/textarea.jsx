import * as React from 'react'
import { cn } from '@/lib/utils'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-shadcn-border bg-shadcn-input px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-shadcn-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-shadcn-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
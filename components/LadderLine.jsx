'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const LINE_CLASSES =
  'block h-0.5 w-24 sm:w-28 md:w-32 rounded-full bg-shadcn-border transition-colors duration-200'

/**
 * A short horizontal line (ladder "rung"). Gray by default, blue on hover/focus.
 * - Desktop (>=1280px): Radix Popover that opens on hover and to the side.
 * - Mobile/tablet (<1280px): a self-contained centered modal (fixed, backdrop,
 *   internal scroll) so content is never clipped or pushed off-screen.
 */
export default function LadderLine({
  children,
  side = 'right',
  lineClassName = '',
  contentClassName = '',
  label,
}) {
  const [open, setOpen] = useState(false)
  const [hoverable, setHoverable] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const closeTimer = useRef(null)

  useEffect(() => {
    setHoverable(
      typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
    )
    const mq = window.matchMedia('(max-width: 1279px)')
    const update = () => {
      setIsMobile(mq.matches)
      setOpen(false)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpen(false), 220)
  }
  useEffect(() => () => cancelClose(), [])

  const hoverHandlers = hoverable
    ? {
        onMouseEnter: () => {
          cancelClose()
          setOpen(true)
        },
        onMouseLeave: scheduleClose,
      }
    : {}

  // ── Mobile/tablet: centered modal ──
  if (isMobile) {
    return (
      <div className="flex items-center">
        <button
          type="button"
          aria-label={label || 'Open section'}
          onClick={() => setOpen(true)}
          className="group flex items-center gap-3 rounded-full focus-visible:outline-none px-1 py-2"
        >
          <span
            className={cn(LINE_CLASSES, 'group-hover:bg-shadcn-primary group-focus-visible:bg-shadcn-primary', lineClassName)}
          />
        </button>

        {open && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
            <div
              className={cn(
                'w-full max-w-[460px] max-h-[80vh] overflow-y-auto',
                'rounded-lg border border-shadcn-border bg-shadcn-popover p-5 text-foreground shadow-lg',
                contentClassName
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end -mt-1 -mr-1 mb-1">
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="text-shadcn-muted-foreground hover:text-foreground p-1 rounded-md"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {children}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── Desktop: Radix Popover (hover + click) ──
  return (
    <div className="flex items-center" {...hoverHandlers}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={label || 'Open section'}
            className="group flex items-center gap-3 rounded-full focus-visible:outline-none px-1 py-2"
          >
            <span
              className={cn(
                LINE_CLASSES,
                'group-hover:bg-shadcn-primary group-focus-visible:bg-shadcn-primary',
                open && 'bg-shadcn-primary',
                lineClassName
              )}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          side={side}
          align="center"
          sideOffset={6}
          onMouseEnter={hoverable ? cancelClose : undefined}
          onMouseLeave={hoverable ? scheduleClose : undefined}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={cn(
            'w-[min(92vw,440px)] border-shadcn-border bg-shadcn-popover text-foreground p-5',
            'max-h-[80vh] overflow-y-auto',
            contentClassName
          )}
        >
          {children}
        </PopoverContent>
      </Popover>
    </div>
  )
}
'use client'

export default function NewsletterForm() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
      <input
        type="email"
        placeholder="Your email address"
        required
        className="flex-1 bg-card border border-subtle rounded-[8px] px-4 py-3 text-text-primary placeholder:text-text-muted font-body text-[13px] focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/20 transition-colors duration-150"
      />
      <button
        type="submit"
        className="shrink-0 inline-flex items-center justify-center font-body font-bold text-[13px] bg-brand text-white rounded-[8px] px-6 py-3 hover:bg-brand-dark transition-all duration-150"
      >
        Subscribe
      </button>
    </form>
  )
}

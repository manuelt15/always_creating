export default function Footer() {
  return (
    <footer className="bg-footer border-t border-subtle">
      <div className="max-w-content mx-auto px-4 lg:px-page py-10 flex flex-col sm:flex-row items-start justify-between gap-8">
        <div>
          <p className="font-body text-[11px] text-text-muted">
            Dedicated to the ones who never stop creating.
          </p>
          <p className="font-body text-[11px] text-text-muted mt-3">
            © {new Date().getFullYear()} alwayscreating. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-3">
          <p className="font-body text-[12px] text-text-secondary max-w-[240px] sm:text-right leading-[20px]">
            Not curated perfection. Real process. Real identity.
          </p>
        </div>
      </div>
    </footer>
  )
}
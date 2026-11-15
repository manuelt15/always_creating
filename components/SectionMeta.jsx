export default function SectionMeta({ index, title, aside }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-line pb-3">
      <div className="flex items-baseline gap-3">
        <span className="label text-accent">{index}</span>
        <span className="label">{title}</span>
      </div>
      {aside ? <span className="label text-right">{aside}</span> : null}
    </div>
  )
}

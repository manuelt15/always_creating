import Tag from './ui/Tag'

export default function ArtistCard({ artist, onSelect, index = 0 }) {
  const { name, slug, bio, discipline = [], stats = {}, profileImage, social = {}, email } = artist

  return (
    <div
      className="animate-fade-up overflow-hidden rounded-lg border border-subtle bg-card group transition-all duration-200 hover:border-border hover:shadow-sm flex flex-col"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-primary">
        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted text-[10px] tracking-[0.8px] uppercase font-body">
            No image
          </div>
        )}
        {discipline[0] && (
          <div className="absolute top-3 left-3">
            <Tag>{discipline[0]}</Tag>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-heading text-[18px] text-text-primary leading-tight">
          <span className="name-underline">{name}</span>
        </h3>
        {bio && (
          <p className="text-[12px] font-body text-text-secondary line-clamp-3 leading-[1.6]">{bio}</p>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 pb-4">
        <div className="border-t border-subtle pt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-body text-text-muted">
            {social.instagram ? (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">social</a>
            ) : (
              <span className="opacity-30 cursor-default">social</span>
            )}
            <span>·</span>
            {email ? (
              <a href={`mailto:${email}`} className="hover:text-brand transition-colors">contact</a>
            ) : (
              <span className="opacity-30 cursor-default">contact</span>
            )}
          </div>
        </div>
        <button
          onClick={() => onSelect?.(artist)}
          className="mt-2 text-brand text-[12px] font-body hover:underline text-left transition-colors duration-150"
        >
          View profile →
        </button>
      </div>
    </div>
  )
}

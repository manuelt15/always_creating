'use client'

import Link from 'next/link'
import Tag from './ui/Tag'

const SOCIAL_ICONS = {
  instagram: {
    label: 'Instagram',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  x: {
    label: 'X',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  spotify: {
    label: 'Spotify',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 1 1-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.622.622 0 0 1 .207.857zm1.223-2.722a.779.779 0 0 1-1.07.257c-2.687-1.652-6.785-2.13-9.965-1.166a.779.779 0 0 1-.458-1.489c3.633-1.118 8.147-.576 11.235 1.328a.779.779 0 0 1 .258 1.07zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 0 1-.955 1.609z"/>
      </svg>
    ),
  },
  soundcloud: {
    label: 'SoundCloud',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.175 12.225c-.015.082.017.163.083.207l.415.277c.132.088.304.05.39-.083a6.74 6.74 0 0 1 5.589-2.965c.112 0 .223.005.333.013V8.013A8.044 8.044 0 0 0 1.175 12.225zM11.99 6c-.343 0-.68.034-1.007.098v9.831c0 .151.122.274.274.274h9.44C22.058 16.203 23 14.783 23 13.143c0-2.126-1.723-3.849-3.849-3.849a3.83 3.83 0 0 0-1.013.136A5.985 5.985 0 0 0 11.99 6zm-3.997 3.344v7.183c0 .15.122.274.274.274h2.45V9.344a7.946 7.946 0 0 0-2.724 0zM.274 13.643a.274.274 0 0 0-.274.274v1.918c0 .151.122.274.274.274h1.644V13.643H.274z"/>
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  github: {
    label: 'GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
  website: {
    label: 'Website',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
}

export default function ArtistOverlay({ artist, onClose }) {
  const { name, slug, bio, discipline = [], stats = {}, profileImage, social = {} } = artist

  const socialLinks = Object.entries(social).filter(([, url]) => url)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div onClick={onClose} aria-hidden className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] bg-secondary border border-subtle rounded-lg overflow-hidden flex flex-col sm:flex-row">
        {/* Image */}
        <div className="sm:w-2/5 shrink-0 aspect-[3/4] sm:aspect-auto bg-primary overflow-hidden">
          {profileImage ? (
            <img src={profileImage} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full min-h-[200px] flex items-center justify-center text-text-muted text-[11px] tracking-[0.8px] uppercase font-body">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 px-6 py-6 overflow-y-auto flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {discipline.map((d) => <Tag key={d}>{d}</Tag>)}
            </div>
            <button
              onClick={onClose}
              className="shrink-0 text-text-muted hover:text-text-primary transition-colors duration-150 p-1 -mt-1"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <h2 className="font-heading text-[28px] leading-tight text-text-primary">{name}</h2>

          {bio && (
            <p className="font-body text-[13px] leading-[22px] text-text-secondary">{bio}</p>
          )}

          {(stats.releases > 0 || stats.listeners > 0) && (
            <div className="flex gap-8 py-5 border-y border-subtle">
              {stats.releases > 0 && (
                <div>
                  <div className="font-body font-bold text-[28px] text-text-primary leading-none">{stats.releases}</div>
                  <div className="font-body text-[12px] text-text-muted mt-1">Works</div>
                </div>
              )}
              {stats.listeners > 0 && (
                <div>
                  <div className="font-body font-bold text-[28px] text-text-primary leading-none">
                    {stats.listeners.toLocaleString('en-US')}
                  </div>
                  <div className="font-body text-[12px] text-text-muted mt-1">Followings</div>
                </div>
              )}
            </div>
          )}

          {/* Social */}
          {socialLinks.length > 0 && (
            <div>
              <p className="font-body text-[10px] tracking-[1px] uppercase text-text-muted mb-3">Social</p>
              <div className="flex items-center gap-4">
                {socialLinks.map(([platform, url]) => {
                  const entry = SOCIAL_ICONS[platform]
                  if (!entry) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={entry.label}
                      className="text-text-muted hover:text-text-primary transition-colors duration-150"
                    >
                      {entry.icon}
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          <Link
            href={`/artists/${slug}`}
            onClick={onClose}
            className="inline-flex items-center gap-2 text-brand font-body text-sm hover:underline mt-auto"
          >
            View full profile →
          </Link>
        </div>
      </div>
    </div>
  )
}

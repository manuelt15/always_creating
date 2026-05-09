'use client'

import Tag from './ui/Tag'
import Button from './ui/Button'

export default function ArtistProfile({ artist }) {
  const { name, bio, discipline = [], stats = {}, profileImage } = artist

  return (
    <article className="max-w-content mx-auto px-4 lg:px-page py-16">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/3">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary border border-default">
            {profileImage ? (
              <img src={profileImage} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted text-xs font-body uppercase tracking-widest">
                No image
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {discipline.map((d) => <Tag key={d}>{d}</Tag>)}
          </div>

          <h1 className="font-display font-bold text-hxl text-text-primary">{name}</h1>

          {bio && (
            <p className="font-body text-[14px] leading-[24px] text-text-secondary max-w-prose">{bio}</p>
          )}

          <div className="flex gap-8 py-6 border-y border-default">
            {stats.releases > 0 && (
              <div>
                <div className="font-display font-bold text-stat text-text-primary">{stats.releases}</div>
                <div className="font-body text-[12px] text-text-muted mt-1">Releases</div>
              </div>
            )}
            {stats.listeners > 0 && (
              <div>
                <div className="font-display font-bold text-stat text-text-primary">{stats.listeners.toLocaleString('en-US')}</div>
                <div className="font-body text-[12px] text-text-muted mt-1">Listeners</div>
              </div>
            )}
          </div>

          <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact
          </Button>
        </div>
      </div>
    </article>
  )
}

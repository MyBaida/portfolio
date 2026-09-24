import { motion } from 'framer-motion'
import { profile, socials } from '../data/profile'
import { SECTIONS, type SectionId } from '../data/sections'

export default function Header({ activeId }: { activeId: SectionId }) {
  const active = SECTIONS.find((s) => s.id === activeId) ?? SECTIONS[0]
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-4 sm:px-8">
      {/* Center — current section title (frees vertical space inside panels) */}
      <motion.div
        key={active.id}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`h-7 w-1.5 rounded-full ${
              active.accent === 'mint' ? 'bg-mint' : 'bg-sky'
            }`}
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              {active.caption}
            </p>
            <h2 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">
              {active.label}
            </h2>
          </div>
        </div>
      </motion.div>
      {/* Left — name + role */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="glass flex items-center gap-3 rounded-2xl px-3 py-2 sm:px-4">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-sky to-mint font-display text-sm font-extrabold text-white shadow-sm">
            {profile.firstName.slice(0, 1)}
            {profile.name.split(' ')[1]?.slice(0, 1) ?? ''}
          </span>
          <span className="leading-tight">
            <span
              style={{ color: '#1b2831' }}
              className="block font-display text-sm font-bold tracking-tight text-[#1b2831] sm:text-base"
            >
              {profile.name}
            </span>
            <span className="block font-mono text-[11px] tracking-wide text-gradient sm:text-xs">
              {profile.role}
            </span>
          </span>
        </div>
      </div>

      {/* Right — socials */}
      <motion.nav
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
        aria-label="Social links"
        className="glass pointer-events-auto flex items-center gap-1 rounded-2xl px-2 py-2"
      >
        {socials.map((s) => {
          const Icon = s.icon
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              title={s.label}
              aria-label={s.label}
              className="group relative grid h-9 w-9 place-items-center rounded-xl text-ink-soft transition-colors hover:text-sky-deep"
            >
              <span className="absolute inset-0 rounded-xl bg-sky/0 transition-all duration-300 group-hover:bg-sky/10 group-hover:scale-105" />
              <Icon className="relative h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
            </a>
          )
        })}
      </motion.nav>
    </header>
  )
}

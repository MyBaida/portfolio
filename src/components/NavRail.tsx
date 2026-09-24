import { motion } from 'framer-motion'
import { SECTIONS, type SectionId } from '../data/sections'

type Props = {
  active: SectionId
  onNavigate: (id: SectionId) => void
}

/**
 * Vertical nav pinned to the right edge. Labels expand on hover,
 * and a sliding pill marks the active section.
 */
export default function NavRail({ active, onNavigate }: Props) {
  const activeIndex = SECTIONS.findIndex((s) => s.id === active)

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 top-1/2 z-40 -translate-y-1/2 sm:right-5"
    >
      <motion.ul
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        className="glass relative flex flex-col gap-1 rounded-3xl p-2"
      >
        {SECTIONS.map((s) => {
          const Icon = s.icon
          const isActive = s.id === active
          return (
            <li key={s.id} className="relative">
              <button
                onClick={() => onNavigate(s.id)}
                aria-label={s.label}
                aria-current={isActive ? 'page' : undefined}
                className="group relative flex items-center justify-end gap-0 py-2 pl-8 pr-2 sm:pl-9"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-y-1 -left-1 -right-1 rounded-2xl bg-linear-to-br from-sky/18 to-mint/18 ring-1 ring-inset ring-sky/25"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                {/* label */}
                <span
                  className={`pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-lg px-2 py-1 font-mono text-[11px] tracking-wide transition-all duration-300 sm:opacity-0 ${
                    isActive
                      ? 'text-sky-deep opacity-100'
                      : 'text-ink-soft opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {s.label}
                </span>
                <Icon
                  className={`relative h-[19px] w-[19px] transition-all duration-300 ${
                    isActive
                      ? 'text-sky-deep scale-110'
                      : 'text-ink-soft group-hover:text-mint-deep group-hover:scale-110'
                  }`}
                />
              </button>
            </li>
          )
        })}

        {/* progress dot indicator */}
        <span className="pointer-events-none absolute -left-4 top-0 hidden h-full flex-col justify-center lg:flex">
          <span className="font-mono text-[10px] text-muted">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
        </span>
      </motion.ul>
    </nav>
  )
}

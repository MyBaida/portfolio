import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GraduationCap, Rocket } from 'lucide-react'
import PanelShell from '../PanelShell'
import { profile } from '../../data/profile'
import { education, career, type TimelineItem } from '../../data/timeline'

type Tab = 'education' | 'career'

export default function About() {
  const [tab, setTab] = useState<Tab>('education')
  const items: TimelineItem[] = tab === 'education' ? education : career
  const accent = tab === 'education' ? 'sky' : 'mint'

  return (
    <PanelShell caption="Get to know me" title="About" accent="mint">
      <div className="grid h-full min-h-0 items-start gap-8 lg:grid-cols-[1fr_1.05fr]">
        {/* Left — about text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="scrollbar-thin min-h-0 space-y-5 overflow-y-auto pr-1"
        >
          <p className="font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
            A <span className="text-gradient">First Class Honours</span> engineer who ships
            from concept to working prototype.
          </p>
          <p className="leading-relaxed text-muted">{profile.intro}</p>
          <p className="leading-relaxed text-muted">
            From a QR-code restaurant ordering system at iBitSoft, to designing RESTful
            APIs at Suku Technologies, to leading technical direction at eDuBoost — I've
            shipped across the stack. Along the way I took 1st place at the GirlCode
            Hackathon Ghana 2025 with LockedIn, a fintech concept for group susu savings.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Stat label="Based in" value={profile.location} />
            <Stat label="Degree" value="First Class Honours" />
            <Stat label="Focus" value="Backend + Full-Stack" />
          </div>
        </motion.div>

        {/* Right — tabbed timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="glass-strong flex h-full min-h-0 flex-col rounded-3xl p-4 sm:p-5"
        >
          {/* Tabs */}
          <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-base-2/60 p-1.5">
            <TabButton
              active={tab === 'education'}
              onClick={() => setTab('education')}
              icon={<GraduationCap className="h-4 w-4" />}
              label="Education"
            />
            <TabButton
              active={tab === 'career'}
              onClick={() => setTab('career')}
              icon={<Rocket className="h-4 w-4" />}
              label="Career Roadmap"
            />
          </div>

          {/* Timeline */}
          <div className="scrollbar-thin min-h-0 flex-1 overflow-y-auto pr-2">
            <AnimatePresence mode="wait">
              <motion.ol
                key={tab}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.3 }}
                className="relative space-y-5 border-l-2 pl-6"
                style={{
                  borderColor:
                    accent === 'sky'
                      ? 'color-mix(in srgb, var(--color-sky) 30%, transparent)'
                      : 'color-mix(in srgb, var(--color-mint) 35%, transparent)',
                }}
              >
                {items.map((item, i) => (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * i }}
                    className="relative"
                  >
                    <span
                      className={`absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full ring-4 ring-base ${
                        accent === 'sky' ? 'bg-sky' : 'bg-mint'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {item.period}
                    </p>
                    <h4 className="font-display text-base font-bold text-ink">
                      {item.title}
                    </h4>
                    <p
                      className={`text-sm font-medium ${
                        accent === 'sky' ? 'text-sky-deep' : 'text-mint-deep'
                      }`}
                    >
                      {item.org}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.detail}
                    </p>
                    {item.tags && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-base-2/80 px-2 py-0.5 font-mono text-[10px] text-ink-soft"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </PanelShell>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 font-display text-sm font-semibold transition-colors ${
        active ? 'text-ink' : 'text-muted hover:text-ink-soft'
      }`}
    >
      {active && (
        <motion.span
          layoutId="about-tab"
          className="absolute inset-0 rounded-xl bg-surface shadow-sm ring-1 ring-inset ring-sky/15"
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="font-display text-sm font-bold text-ink">{value}</p>
    </div>
  )
}

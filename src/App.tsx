import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Header from './components/Header'
import NavRail from './components/NavRail'
import ParticleField from './components/ParticleField'
import Home from './components/panels/Home'
import About from './components/panels/About'
import Skills from './components/panels/Skills'
import Projects from './components/panels/Projects'
import Playground from './components/panels/Playground'
import Contact from './components/panels/Contact'
import { SECTIONS, type SectionId } from './data/sections'
import { NavProvider } from './context/nav'

const PANELS: Record<SectionId, () => React.ReactElement> = {
  home: Home,
  about: About,
  skills: Skills,
  projects: Projects,
  playground: Playground,
  contact: Contact,
}

const slide = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    scale: 0.98,
  }),
}

export default function App() {
  const [[index, direction], setState] = useState<[number, number]>([0, 1])
  const active = SECTIONS[index]

  const goTo = useCallback((next: number) => {
    setState(([cur]) => {
      const clamped = Math.max(0, Math.min(SECTIONS.length - 1, next))
      if (clamped === cur) return [cur, 1]
      return [clamped, clamped > cur ? 1 : -1]
    })
  }, [])

  const goById = useCallback(
    (id: SectionId) => goTo(SECTIONS.findIndex((s) => s.id === id)),
    [goTo],
  )

  const next = useCallback(() => goTo(index + 1), [goTo, index])
  const prev = useCallback(() => goTo(index - 1), [goTo, index])

  // Keyboard: arrow keys slide between sections
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const Panel = PANELS[active.id]

  return (
    <div className="app-bg relative h-full w-full overflow-hidden">
      <ParticleField />
      <Header activeId={active.id} />
      <NavRail active={active.id} onNavigate={goById} />

      <NavProvider value={{ go: goById }}>
      <main className="relative z-10 h-full w-full">
        <AnimatePresence initial={false} custom={direction}>
          <motion.section
            key={active.id}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 },
              opacity: { duration: 0.35 },
              scale: { duration: 0.4 },
            }}
            className="absolute inset-0 will-change-transform"
          >
            <Panel />
          </motion.section>
        </AnimatePresence>
      </main>
      </NavProvider>

      {/* Bottom-left prev/next + counter */}
      <div className="pointer-events-none fixed bottom-4 left-5 z-40 flex items-center gap-2 sm:left-8">
        <div className="glass pointer-events-auto flex items-center gap-1 rounded-2xl p-1.5">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous section"
            className="grid h-8 w-8 place-items-center rounded-xl text-ink-soft transition-colors hover:bg-sky/10 hover:text-sky-deep disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="min-w-16 text-center font-mono text-[11px] text-muted">
            {String(index + 1).padStart(2, '0')} /{' '}
            {String(SECTIONS.length).padStart(2, '0')}
          </span>
          <button
            onClick={next}
            disabled={index === SECTIONS.length - 1}
            aria-label="Next section"
            className="grid h-8 w-8 place-items-center rounded-xl text-ink-soft transition-colors hover:bg-mint/10 hover:text-mint-deep disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

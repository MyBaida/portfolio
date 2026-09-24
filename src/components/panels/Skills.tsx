import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Magnet, Wand2 } from 'lucide-react'
import PanelShell from '../PanelShell'
import { skillCategories, allSkills } from '../../data/skills'

type SwarmIcon = {
  name: string
  el: HTMLDivElement | null
  x: number
  y: number
  vx: number
  vy: number
  hx: number
  hy: number
  wander: number
}

const SIZE = 46

export default function Skills() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chipRefs = useRef<Map<string, HTMLElement>>(new Map())
  const iconsRef = useRef<SwarmIcon[]>([])
  const mouse = useRef({ x: 0, y: 0, active: false, moving: false })
  const modeRef = useRef<'roam' | 'snap'>('roam')
  const [mode, setMode] = useState<'roam' | 'snap'>('roam')
  const rafRef = useRef(0)

  // Measure the "home" slot (the chip) for each icon, relative to container.
  const measure = () => {
    const c = containerRef.current
    if (!c) return
    const cr = c.getBoundingClientRect()
    for (const ic of iconsRef.current) {
      const chip = chipRefs.current.get(ic.name)
      if (!chip) continue
      const r = chip.getBoundingClientRect()
      ic.hx = r.left - cr.left + r.width / 2
      ic.hy = r.top - cr.top + r.height / 2
    }
  }

  // Initialise swarm icons once.
  useLayoutEffect(() => {
    const c = containerRef.current
    const w = c?.clientWidth ?? 800
    const h = c?.clientHeight ?? 500
    iconsRef.current = allSkills.map((s, i) => ({
      name: s.name,
      el: null,
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      hx: 0,
      hy: 0,
      wander: i * 0.7,
    }))
    measure()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    modeRef.current = mode
    if (mode === 'snap') measure()
  }, [mode])

  // Animation loop
  useEffect(() => {
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(32, now - last)
      last = now
      const c = containerRef.current
      if (c) {
        const w = c.clientWidth
        const h = c.clientHeight
        const m = mouse.current
        for (const ic of iconsRef.current) {
          if (!ic.el) continue

          if (modeRef.current === 'snap') {
            // Ease into home slot (slow, gentle settle)
            ic.x += (ic.hx - ic.x) * 0.07
            ic.y += (ic.hy - ic.y) * 0.07
            ic.vx = 0
            ic.vy = 0
          } else {
            // Wander (slow drift)
            ic.wander += 0.005
            ic.vx += Math.cos(ic.wander) * 0.012
            ic.vy += Math.sin(ic.wander * 1.3) * 0.012

            // Gather toward cursor when it moves (lazy follow)
            if (m.active && m.moving) {
              const dx = m.x - ic.x
              const dy = m.y - ic.y
              const dist = Math.hypot(dx, dy) || 1
              const force = Math.min(0.6, 160 / dist) * 0.022
              ic.vx += (dx / dist) * force * dt * 0.4
              ic.vy += (dy / dist) * force * dt * 0.4
            }

            // Friction (heavier damping = slower)
            ic.vx *= 0.9
            ic.vy *= 0.9
            // Clamp speed (low cap = gentle)
            const sp = Math.hypot(ic.vx, ic.vy)
            if (sp > 1.4) {
              ic.vx = (ic.vx / sp) * 1.4
              ic.vy = (ic.vy / sp) * 1.4
            }
            ic.x += ic.vx * dt * 0.35
            ic.y += ic.vy * dt * 0.35

            // Bounce off bounds
            const pad = SIZE / 2
            if (ic.x < pad) {
              ic.x = pad
              ic.vx *= -0.7
            }
            if (ic.x > w - pad) {
              ic.x = w - pad
              ic.vx *= -0.7
            }
            if (ic.y < pad) {
              ic.y = pad
              ic.vy *= -0.7
            }
            if (ic.y > h - pad) {
              ic.y = h - pad
              ic.vy *= -0.7
            }
          }

          ic.el.style.transform = `translate3d(${ic.x - SIZE / 2}px, ${
            ic.y - SIZE / 2
          }px, 0)`
        }
      }
      // decay "moving" flag shortly after pointer stops
      if (mouse.current.moving) {
        mouse.current.moving = false
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Resize handling
  useEffect(() => {
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const onPointerMove = (e: React.PointerEvent) => {
    const c = containerRef.current
    if (!c) return
    const r = c.getBoundingClientRect()
    mouse.current.x = e.clientX - r.left
    mouse.current.y = e.clientY - r.top
    mouse.current.active = true
    mouse.current.moving = true
  }
  const onPointerLeave = () => {
    mouse.current.active = false
    mouse.current.moving = false
  }

  return (
    <PanelShell caption="My toolkit" title="Skills">
      <div
        ref={containerRef}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative flex h-full min-h-0 w-full flex-col"
      >
        {/* Swarm layer (floating icons) */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {allSkills.map((s, i) => {
            const Icon = s.icon
            return (
              <div
                key={`swarm-${s.name}`}
                ref={(el) => {
                  if (iconsRef.current[i]) iconsRef.current[i].el = el
                }}
                className="absolute left-0 top-0 will-change-transform"
                style={{ width: SIZE, height: SIZE }}
              >
                <span
                  className="grid h-full w-full place-items-center rounded-2xl border border-white/70 bg-white/70 shadow-md backdrop-blur-sm transition-opacity duration-300"
                  style={{ opacity: mode === 'snap' ? 1 : 0.9 }}
                >
                  <Icon style={{ color: s.color }} size={24} />
                </span>
              </div>
            )
          })}
        </div>

        {/* Controls */}
        <div className="relative z-10 mb-4 flex shrink-0 flex-wrap items-center justify-between gap-3">
          <p className="max-w-md text-sm text-muted">
            Move your cursor — the icons follow. Then snap them home into their stacks.
          </p>
          <button
            onClick={() => setMode((m) => (m === 'snap' ? 'roam' : 'snap'))}
            className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-sky-deep to-mint-deep px-4 py-2.5 font-display text-sm font-semibold text-white shadow-lg shadow-sky/20 transition-transform hover:-translate-y-0.5"
          >
            {mode === 'snap' ? (
              <>
                <Wand2 className="h-4 w-4" /> Release icons
              </>
            ) : (
              <>
                <Magnet className="h-4 w-4" /> Snap to grid
              </>
            )}
          </button>
        </div>

        {/* Category cards (scrolls internally if it overflows) */}
        <div
          onScroll={() => {
            if (modeRef.current === 'snap') measure()
          }}
          className="scrollbar-thin relative z-10 min-h-0 flex-1 overflow-y-auto pr-1"
        >
          <div className="grid gap-4 sm:grid-cols-2">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 * ci }}
              className="glass rounded-3xl p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted">{cat.blurb}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 font-mono text-[10px] ${
                    cat.accent === 'sky'
                      ? 'bg-sky/12 text-sky-deep'
                      : 'bg-mint/15 text-mint-deep'
                  }`}
                >
                  {cat.skills.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {cat.skills.map((s) => {
                  const Icon = s.icon
                  return (
                    <div
                      key={s.name}
                      ref={(el) => {
                        if (el) chipRefs.current.set(s.name, el)
                        else chipRefs.current.delete(s.name)
                      }}
                      className="flex items-center gap-2 rounded-xl bg-base-2/60 px-2.5 py-2 ring-1 ring-inset ring-transparent transition-all hover:ring-sky/25"
                    >
                      <span
                        className="grid h-6 w-6 shrink-0 place-items-center transition-opacity duration-300"
                        style={{ opacity: mode === 'snap' ? 0 : 1 }}
                      >
                        <Icon style={{ color: s.color }} size={18} />
                      </span>
                      <span className="truncate text-xs font-medium text-ink-soft">
                        {s.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

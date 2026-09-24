import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download, Sparkles } from 'lucide-react'
import PanelShell from '../PanelShell'
import { profile } from '../../data/profile'
import { useNav } from '../../context/nav'

export default function Home() {
  const { go } = useNav()
  const ref = useRef<HTMLDivElement | null>(null)

  // Cursor-driven parallax for the hero image
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 18 })
  const sy = useSpring(my, { stiffness: 120, damping: 18 })
  const imgX = useTransform(sx, [-0.5, 0.5], [-22, 22])
  const imgY = useTransform(sy, [-0.5, 0.5], [-18, 18])
  const rotY = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const rotX = useTransform(sy, [-0.5, 0.5], [6, -6])

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <PanelShell caption="Welcome" title="Home">
      <div className="grid h-full min-h-0 items-center gap-6 lg:grid-cols-2">
        {/* Left — copy */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky/20 bg-sky/8 px-3 py-1.5 font-mono text-xs text-sky-deep"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Available for work
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-[#1b2831] sm:text-4xl lg:text-5xl"
          >
            Hi, I'm{' '}
            <span className="text-gradient">{profile.name}</span>
            <br />
            <span className="text-[#4b5d69]">{profile.tagline}</span>
          </motion.h1>

          <p
            style={{ color: '#4b5d69' }}
            className="mt-4 text-sm leading-relaxed sm:text-base"
          >
            {profile.intro}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => go('projects')}
              className="group inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-sky-deep to-mint-deep px-5 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-sky/25 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              View my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={profile.resumeUrl}
              download
              className="glass inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-display text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4 text-mint-deep" />
              Resume
            </a>
          </motion.div>
        </div>

        {/* Right — hero image with hover parallax */}
        <div
          ref={ref}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="relative mx-auto flex h-full w-full max-w-[320px] items-center justify-center [perspective:900px] sm:max-w-[420px]"
        >
          <motion.div
            style={{ x: imgX, y: imgY, rotateX: rotX, rotateY: rotY }}
            className="relative w-full [transform-style:preserve-3d]"
          >
            <div className="absolute inset-6 -z-10 rounded-full bg-linear-to-br from-sky/25 to-mint/25 blur-3xl" />
            <img
              src={profile.heroImage}
              alt={profile.name}
              className="w-full select-none drop-shadow-2xl"
              draggable={false}
            />
          </motion.div>

          {/* floating badges */}
          <FloatingBadge className="-left-2 top-8" label="React" delay={0} />
          <FloatingBadge className="right-0 top-1/3" label="Node.js" delay={0.6} />
          <FloatingBadge className="-left-4 bottom-16" label="Python" delay={1.1} />
        </div>
      </div>
    </PanelShell>
  )
}

function FloatingBadge({
  className,
  label,
  delay,
}: {
  className?: string
  label: string
  delay: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + delay * 0.1, type: 'spring', stiffness: 200 }}
      className={`glass absolute ${className ?? ''}`}
      style={{ animation: `floaty ${5 + delay}s ease-in-out ${delay}s infinite` }}
    >
      <span className="block rounded-2xl px-3 py-2 font-mono text-xs font-medium text-ink-soft">
        {label}
      </span>
    </motion.span>
  )
}

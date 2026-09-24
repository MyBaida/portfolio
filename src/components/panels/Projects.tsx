import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Layers } from 'lucide-react'
import PanelShell from '../PanelShell'
import { projects, type Project } from '../../data/projects'

export default function Projects() {
  const [order, setOrder] = useState<string[]>(projects.map((p) => p.id))
  const [opened, setOpened] = useState(false)

  const byId = (id: string) => projects.find((p) => p.id === id)!

  const bringToFront = (id: string) => {
    setOrder((prev) => [id, ...prev.filter((x) => x !== id)])
    setOpened(true)
  }

  const geometry = (j: number, total: number) => {
    if (!opened) {
      // Messy fanned stack in the centre
      const mid = (total - 1) / 2
      return {
        x: (j - mid) * 26,
        y: Math.abs(j - mid) * 10 + j * 6,
        rotate: (j - mid) * 7,
        scale: 1 - j * 0.015,
        z: total - j,
      }
    }
    if (j === 0) {
      return { x: -160, y: 0, rotate: 0, scale: 1, z: 100 }
    }
    return {
      x: 70 + (j - 1) * 34,
      y: (j - 1) * 16,
      rotate: 5 + (j - 1) * 2.5,
      scale: 0.95,
      z: 60 - (j - 1),
    }
  }

  return (
    <PanelShell caption="Things I built" title="Projects" accent="mint">
      <div className="flex h-full min-h-0 flex-col">
        <p className="mb-2 max-w-lg shrink-0 text-sm text-muted">
          A messy pile of things I've shipped. Click any card to pull it to the front.
        </p>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          <div className="relative h-full max-h-[480px] w-full max-w-3xl">
            {order.map((id, j) => {
              const p = byId(id)
              const g = geometry(j, order.length)
              const isFront = j === 0 && opened
              return (
                <motion.article
                  key={p.id}
                  animate={{ x: g.x, y: g.y, rotate: g.rotate, scale: g.scale }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                  style={{ zIndex: g.z }}
                  onClick={() => !isFront && bringToFront(p.id)}
                  className={`absolute left-1/2 top-1/2 h-[400px] max-h-full w-[290px] -translate-x-1/2 -translate-y-1/2 sm:w-[320px] ${
                    isFront ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <ProjectCard project={p} expanded={isFront} />
                </motion.article>
              )
            })}
          </div>
        </div>

        {!opened && (
          <div className="pointer-events-none absolute bottom-20 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-xs text-muted">
            <Layers className="h-3.5 w-3.5" /> click a card
          </div>
        )}
      </div>
    </PanelShell>
  )
}

function ProjectCard({
  project,
  expanded,
}: {
  project: Project
  expanded: boolean
}) {
  return (
    <div className="glass-strong flex h-full w-full flex-col overflow-hidden rounded-3xl">
      {/* Cover */}
      <div
        className="relative flex h-36 shrink-0 items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${project.cover.from}, ${project.cover.to})`,
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="text-5xl drop-shadow-lg">{project.cover.emoji}</span>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-black/20 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
          {project.tagline}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight text-ink">
          {project.title}
        </h3>
        <p
          className={`mt-1.5 text-sm leading-relaxed text-muted ${
            expanded ? '' : 'line-clamp-3'
          }`}
        >
          {project.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-base-2/80 px-2 py-0.5 font-mono text-[10px] text-ink-soft"
            >
              {t}
            </span>
          ))}
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-auto flex gap-2 pt-4"
          >
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-3 py-2.5 font-display text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-sky-deep to-mint-deep px-3 py-2.5 font-display text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <ExternalLink className="h-4 w-4" /> Demo
              </a>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

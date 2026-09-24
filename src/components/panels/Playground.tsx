import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw, Trophy, Timer, MousePointerClick } from 'lucide-react'
import PanelShell from '../PanelShell'
import { allSkills } from '../../data/skills'
import type { IconType } from 'react-icons'

type Card = {
  uid: number
  name: string
  icon: IconType
  color: string
  matched: boolean
}

const PAIRS = 8

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDeck(): Card[] {
  const picks = shuffle(allSkills).slice(0, PAIRS)
  const doubled = picks.flatMap((s, i) => [
    { uid: i * 2, name: s.name, icon: s.icon, color: s.color, matched: false },
    { uid: i * 2 + 1, name: s.name, icon: s.icon, color: s.color, matched: false },
  ])
  return shuffle(doubled)
}

export default function Playground() {
  const [deck, setDeck] = useState<Card[]>(() => buildDeck())
  const [selected, setSelected] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [best, setBest] = useState<number | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('pg-best-moves')
    if (stored) setBest(Number(stored))
  }, [])

  const won = useMemo(
    () => deck.length > 0 && deck.every((c) => c.matched),
    [deck],
  )

  // Timer
  useEffect(() => {
    if (!running || won) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [running, won])

  // Record best on win
  useEffect(() => {
    if (won) {
      setRunning(false)
      setBest((prev) => {
        const next = prev == null ? moves : Math.min(prev, moves)
        localStorage.setItem('pg-best-moves', String(next))
        return next
      })
    }
  }, [won, moves])

  const reset = useCallback(() => {
    setDeck(buildDeck())
    setSelected([])
    setMoves(0)
    setLock(false)
    setSeconds(0)
    setRunning(false)
  }, [])

  const flip = (uid: number) => {
    if (lock) return
    const card = deck.find((c) => c.uid === uid)
    if (!card || card.matched || selected.includes(uid)) return
    if (!running) setRunning(true)

    const nextSel = [...selected, uid]
    setSelected(nextSel)

    if (nextSel.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextSel.map((u) => deck.find((c) => c.uid === u)!)
      if (a.name === b.name) {
        // match
        setTimeout(() => {
          setDeck((d) =>
            d.map((c) =>
              c.uid === a.uid || c.uid === b.uid ? { ...c, matched: true } : c,
            ),
          )
          setSelected([])
        }, 380)
      } else {
        setLock(true)
        setTimeout(() => {
          setSelected([])
          setLock(false)
        }, 780)
      }
    }
  }

  const faceUp = (c: Card) => c.matched || selected.includes(c.uid)

  return (
    <PanelShell caption="Have some fun" title="Playground" accent="mint">
      <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Board */}
        <div className="relative flex min-h-0 items-center justify-center">
          <div className="grid w-full max-w-[min(100%,54vh)] grid-cols-4 gap-3 sm:gap-4">
            {deck.map((c) => {
              const Icon = c.icon
              const up = faceUp(c)
              return (
                <button
                  key={c.uid}
                  onClick={() => flip(c.uid)}
                  aria-label={up ? c.name : 'Hidden card'}
                  className="group relative aspect-square w-full [perspective:800px]"
                >
                  <motion.div
                    className="relative h-full w-full [transform-style:preserve-3d]"
                    animate={{ rotateY: up ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  >
                    {/* Back */}
                    <div className="absolute inset-0 grid place-items-center rounded-2xl border border-white/70 bg-linear-to-br from-sky/25 to-mint/25 shadow-sm [backface-visibility:hidden] group-hover:from-sky/35 group-hover:to-mint/35">
                      <span className="font-mono text-lg font-bold text-white/80">
                        {'</>'}
                      </span>
                    </div>
                    {/* Front */}
                    <div
                      className={`absolute inset-0 grid place-items-center rounded-2xl border bg-white shadow-sm [backface-visibility:hidden] ${
                        c.matched
                          ? 'border-mint/50 ring-2 ring-mint/40'
                          : 'border-white/80'
                      }`}
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <Icon style={{ color: c.color }} size={34} />
                    </div>
                  </motion.div>
                </button>
              )
            })}
          </div>

          {/* Win overlay */}
          <AnimatePresence>
            {won && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 grid place-items-center rounded-3xl bg-base/70 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.85, y: 12 }}
                  animate={{ scale: 1, y: 0 }}
                  className="glass-strong flex flex-col items-center gap-3 rounded-3xl px-8 py-6 text-center"
                >
                  <Trophy className="h-8 w-8 text-mint-deep" />
                  <h3 className="font-display text-xl font-bold text-ink">
                    Nice memory!
                  </h3>
                  <p className="text-sm text-muted">
                    Cleared in {moves} moves · {fmt(seconds)}
                  </p>
                  <button
                    onClick={reset}
                    className="mt-1 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-deep to-mint-deep px-4 py-2.5 font-display text-sm font-semibold text-white"
                  >
                    <RotateCcw className="h-4 w-4" /> Play again
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar */}
        <div className="scrollbar-thin min-h-0 space-y-4 overflow-y-auto pr-1">
          <div className="glass rounded-3xl p-5">
            <h3 className="mb-3 font-display text-base font-bold text-ink">
              Match the stacks
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Flip the cards and find all {PAIRS} matching tech logos. Fewer moves = better
              score.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <ScoreTile icon={<MousePointerClick className="h-4 w-4" />} label="Moves" value={String(moves)} />
              <ScoreTile icon={<Timer className="h-4 w-4" />} label="Time" value={fmt(seconds)} />
              <ScoreTile icon={<Trophy className="h-4 w-4" />} label="Best" value={best == null ? '—' : String(best)} />
              <ScoreTile
                icon={<span className="font-mono text-xs font-bold">✓</span>}
                label="Pairs"
                value={`${deck.filter((c) => c.matched).length / 2}/${PAIRS}`}
              />
            </div>
            <button
              onClick={reset}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky/25 bg-sky/8 px-4 py-2.5 font-display text-sm font-semibold text-sky-deep transition-colors hover:bg-sky/15"
            >
              <RotateCcw className="h-4 w-4" /> Reset board
            </button>
          </div>

          <div className="glass rounded-3xl p-5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Tip
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              The board reshuffles with a fresh set of logos every time you reset. Beat your
              best move count!
            </p>
          </div>
        </div>
      </div>
    </PanelShell>
  )
}

function ScoreTile({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-base-2/60 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-mint-deep">
        {icon}
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
      <p className="mt-0.5 font-display text-lg font-bold text-ink">{value}</p>
    </div>
  )
}

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

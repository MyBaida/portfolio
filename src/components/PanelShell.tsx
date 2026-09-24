import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
  caption: string
  title: string
  accent?: 'sky' | 'mint'
  children: ReactNode
}

/**
 * Shared frame for every section: a small caption + big title at the top,
 * then the section content. Padding keeps clear of the fixed header (top)
 * and the nav rail (right). Content scrolls internally if it overflows.
 */
export default function PanelShell({
  caption,
  title,
  accent = 'sky',
  children,
}: Props) {
  return (
    <div className="scrollbar-thin relative h-full w-full overflow-y-auto">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col px-5 pb-6 pt-24 sm:px-10 lg:pr-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-4 flex shrink-0 items-center gap-3 md:hidden"
        >
          <span
            className={`h-8 w-1.5 rounded-full ${
              accent === 'mint' ? 'bg-mint' : 'bg-sky'
            }`}
          />
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {caption}
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {title}
            </h2>
          </div>
        </motion.div>

        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  )
}

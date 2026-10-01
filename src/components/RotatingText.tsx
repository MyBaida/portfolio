import { useEffect, useRef, useState } from 'react'

type Props = {
  words: string[]
  /** ms per character while typing */
  typingSpeed?: number
  /** ms per character while deleting */
  deletingSpeed?: number
  /** ms to hold the full word before deleting */
  pauseDuration?: number
  className?: string
}

/**
 * Classic typewriter effect: types a word, pauses, deletes it,
 * then moves to the next word in the list — looping forever.
 * A blinking cursor sits at the end of the text at all times.
 */
export default function RotatingText({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1400,
  className,
}: Props) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const currentWord = words[wordIndex] ?? ''

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        timeoutRef.current = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1))
        }, typingSpeed)
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), pauseDuration)
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('deleting'), 0)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1))
        }, deletingSpeed)
      } else {
        setWordIndex((i) => (i + 1) % words.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeoutRef.current)
  }, [text, phase, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration])

  // reserve width for the longest word so layout doesn't shift
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className={`relative inline-grid ${className ?? ''}`}>
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {longest}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        {text}
        <span className="typing-cursor" aria-hidden="true">|</span>
      </span>
    </span>
  )
}
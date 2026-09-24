import { House, User, Code2, Layers, Gamepad2, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SectionId =
  | 'home'
  | 'about'
  | 'skills'
  | 'projects'
  | 'playground'
  | 'contact'

export type Section = {
  id: SectionId
  label: string
  icon: LucideIcon
  /** Short caption shown in the panel header */
  caption: string
  /** Accent colour used by the header title bar */
  accent: 'sky' | 'mint'
}

export const SECTIONS: Section[] = [
  { id: 'home', label: 'Home', icon: House, caption: 'Welcome', accent: 'sky' },
  { id: 'about', label: 'About', icon: User, caption: 'Get to know me', accent: 'mint' },
  { id: 'skills', label: 'Skills', icon: Code2, caption: 'My toolkit', accent: 'sky' },
  { id: 'projects', label: 'Projects', icon: Layers, caption: 'Things I built', accent: 'mint' },
  { id: 'playground', label: 'Playground', icon: Gamepad2, caption: 'Have some fun', accent: 'mint' },
  { id: 'contact', label: 'Contact', icon: Mail, caption: "Let's talk", accent: 'mint' },
]

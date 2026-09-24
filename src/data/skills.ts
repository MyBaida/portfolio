import type { IconType } from 'react-icons'
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiPython,
  SiSocketdotio,
  SiCplusplus,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
} from 'react-icons/si'
import { FiDatabase, FiServer } from 'react-icons/fi'

export type Skill = {
  name: string
  icon: IconType
  color: string
}

export type SkillCategory = {
  id: string
  title: string
  blurb: string
  accent: 'sky' | 'mint'
  skills: Skill[]
}

/** Your stack, grouped into the four cards. */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    blurb: 'Interfaces & client-side',
    accent: 'sky',
    skills: [
      { name: 'React', icon: SiReact, color: '#5aa7c9' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#1b2831' },
      { name: 'JavaScript', icon: SiJavascript, color: '#c9a227' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    blurb: 'APIs & server-side logic',
    accent: 'mint',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#3c873a' },
      { name: 'Express.js', icon: SiExpress, color: '#4b5d69' },
      { name: 'Django REST', icon: SiDjango, color: '#092e20' },
      { name: 'Python', icon: SiPython, color: '#3572a5' },
      { name: 'Socket.IO', icon: SiSocketdotio, color: '#4b5d69' },
      { name: 'C++', icon: SiCplusplus, color: '#00599c' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    blurb: 'Data that scales',
    accent: 'sky',
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47a248' },
      { name: 'SQL', icon: FiDatabase, color: '#457e9f' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    blurb: 'My daily drivers',
    accent: 'mint',
    skills: [
      { name: 'Git', icon: SiGit, color: '#f05033' },
      { name: 'GitHub', icon: SiGithub, color: '#181717' },
      { name: 'REST API Design', icon: FiServer, color: '#4a8f7d' },
    ],
  },
]

/** Flat list — handy for the roaming icons + memory match. */
export const allSkills: (Skill & { category: string })[] = skillCategories.flatMap(
  (c) => c.skills.map((s) => ({ ...s, category: c.title })),
)

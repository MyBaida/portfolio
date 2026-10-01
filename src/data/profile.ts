import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import type { IconType } from 'react-icons'

export type Social = {
  label: string
  href: string
  icon: IconType
}

/** Your name, role, and contact details. */
export const profile = {
  name: 'Ubaida Abdul',
  firstName: 'Ubaida',
  role: 'Full Stack Developer',
  tagline: 'Backend systems, full-stack apps & AI-integrated products.',

  /** Words/phrases that cycle in the hero heading, e.g. "I build Backend Systems". */
  rotatingRoles: [
    'Backend Systems',
    'Full-Stack Apps',
    'AI-Integrated Products',
    'Web Applications',
  ],

  intro:
    "I'm a Computer Engineering graduate who enjoys turning ideas into working software, from backend logic to full-stack web apps and AI-integrated projects. I work comfortably across Python, JavaScript, and SQL, and I'm always looking for the next thing to learn and build.",

  location: 'Accra, Ghana',
  email: 'ubaidaabdul723@gmail.com',
  phone: '+233 20 081 7325',
  resumeUrl: '/resume.pdf',
  heroImage: '/profile.png',
}

/** Social links (shown top-right on every section). */
export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/MyBaida', icon: FaGithub },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ubaida-a-069a22265',
    icon: FaLinkedinIn,
  },
]

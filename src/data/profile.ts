import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import type { IconType } from 'react-icons'

export type Social = {
  label: string
  href: string
  icon: IconType
}

/** Your name, role, and contact details. */
export const profile = {
  name: 'Ubaida Abdul-Fatahu',
  firstName: 'Ubaida',
  role: 'Full Stack Developer',
  tagline: 'Backend systems, full-stack apps & AI-integrated products.',
  intro:
    'Computer Engineering graduate (First Class Honours) building experience across backend systems, full-stack web applications, and AI-integrated projects. Comfortable across Python, JavaScript, and SQL, with a growing portfolio of independently shipped projects from concept to working prototype.',
  location: 'Accra, Ghana',
  email: 'ubaidaabdul723@gmail.com',
  phone: '+233 20 081 7325',
  resumeUrl: '/resume.pdf',
  /** Transparent-background profile photo in /public. */
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

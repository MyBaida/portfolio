export type TimelineItem = {
  period: string
  title: string
  org: string
  detail: string
  /** Optional tags shown as little chips */
  tags?: string[]
}

/** Education history. */
export const education: TimelineItem[] = [
  {
    period: '2021 — 2025',
    title: 'BSc Computer Engineering — First Class Honours',
    org: 'University of Ghana, Legon',
    detail:
      'Graduated Sep 2025 with First Class Honours. Coursework across software engineering, computer systems, databases, and AI. Final-year project: SwiftAid, an AI-powered emergency response system.',
    tags: ['Computer Engineering', 'First Class Honours'],
  },
  {
    period: '2018 — 2021',
    title: 'Senior High School (SHS)',
    org: 'Achimota School',
    detail:
      'Completed secondary education with a focus on science and mathematics.',
    tags: ['Sciences', 'Mathematics'],
  },
]

/** Career roadmap — roles, wins, and where you are now. */
export const career: TimelineItem[] = [
  {
    period: '2024',
    title: 'Software Developer (Intern)',
    org: 'iBitSoft Ltd',
    detail:
      'Developed a QR code-based restaurant menu and ordering system and contributed to client-facing web features within a small engineering team.',
    tags: ['React', 'Django', 'QR Systems'],
  },
  {
    period: '2025',
    title: 'Software Engineer (NSS)',
    org: 'Suku Technologies Ltd',
    detail:
      'Develop and maintain web applications and client websites for NGOs, schools, and businesses. Design and implement RESTful APIs using Node.js and Express for internal and client projects.',
    tags: ['Node.js', 'Express', 'REST APIs'],
  },
  {
    period: '2025',
    title: '1st Place — GirlCode Hackathon Ghana',
    org: 'MobileWebGhana (MTN & ABSA)',
    detail:
      'Won with LockedIn, a fintech solution for secure and accountable group susu savings, conceived and prototyped over a 36-hour hackathon.',
    tags: ['Fintech', 'Hackathon Winner'],
  },
  {
    period: 'Now',
    title: 'Tech Lead',
    org: 'eDuBoost',
    detail:
      'Lead the technical direction of a youth-focused technology education initiative. Design and facilitate training in web development and programming, and lead technical planning for school and community outreach.',
    tags: ['Leadership', 'Training', 'Outreach'],
  },
]

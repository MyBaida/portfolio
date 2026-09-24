export type Project = {
  id: string
  title: string
  tagline: string
  description: string
  tags: string[]
  repo?: string
  demo?: string
  /** Optional real screenshot URL. If omitted, a generated gradient cover is used. */
  image?: string
  /** Fallback cover styling */
  cover: { from: string; to: string; emoji: string }
}

/** Your shipped projects. */
export const projects: Project[] = [
  {
    id: 'swiftaid',
    title: 'SwiftAid',
    tagline: 'AI-Powered Emergency Response',
    description:
      'Final-year project: an emergency reporting and dispatch platform. Users report incidents via a mobile interface while a Llama API analyses severity and suggests responder allocation. Includes live responder tracking and an agency admin dashboard with analytics.',
    tags: ['Flutter', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Llama API'],
    repo: 'https://github.com/Ofori01/swift-aid-backend',
    cover: { from: '#457e9f', to: '#4a8f7d', emoji: '🚨' },
  },
  {
    id: 'optiimage',
    title: 'OptiImage',
    tagline: 'Batch Image Compression API',
    description:
      'Backend service that compresses images and converts them to optimized formats like WebP to cut storage and bandwidth. Supports batch uploads (up to 10 images per request, processed in batches of two) and returns results as a single ZIP archive.',
    tags: ['Express.js', 'Sharp', 'Archiver'],
    repo: 'https://github.com/MyBaida/optiimage-server',
    demo: 'https://optiimage-two.vercel.app/',
    cover: { from: '#6fa8c7', to: '#6fb3a1', emoji: '🖼️' },
  },
  {
    id: 'menumingle',
    title: 'MenuMingle',
    tagline: 'QR-Based Restaurant Ordering',
    description:
      'Restaurant ordering platform where customers scan table-specific QR codes to view the menu, browse items by category, and order online. Ships with an admin panel for menu items, categories, tables, orders, QR generation, and site customization.',
    tags: ['React', 'Django', 'Django REST Framework'],
    repo: 'https://github.com/MyBaida/MenuMingle',
    cover: { from: '#4a8f7d', to: '#6fa8c7', emoji: '🍽️' },
  },
  {
    id: 'lockedin',
    title: 'LockedIn',
    tagline: '1st Place — GirlCode Hackathon 2025',
    description:
      'A fintech concept for secure, accountable group susu savings. Conceived and prototyped during the 36-hour GirlCode Hackathon Ghana (MobileWebGhana, sponsored by MTN & ABSA), taking 1st place.',
    tags: ['Fintech', 'Product Design', 'Prototype'],
    demo: 'https://www.figma.com/design/gNAndkHQc2rdcR36idzEzp/LockedIn-Updated',
    cover: { from: '#457e9f', to: '#6fb3a1', emoji: '🔐' },
  },
]

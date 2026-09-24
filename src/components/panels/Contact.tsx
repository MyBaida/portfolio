import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import PanelShell from '../PanelShell'
import { profile, socials } from '../../data/profile'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Opens the visitor's mail client pre-filled. Swap for a real endpoint later.
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  const field =
    'w-full rounded-2xl border border-sky/15 bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-muted/70 outline-none transition-all focus:border-sky/40 focus:ring-2 focus:ring-sky/20'

  return (
    <PanelShell caption="Let's talk" title="Contact" accent="mint">
      <div className="grid h-full min-h-0 gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Left — form */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="scrollbar-thin glass-strong min-h-0 overflow-y-auto rounded-3xl p-5 sm:p-6"
        >
          <h3 className="font-display text-xl font-bold text-ink">
            Send me a message
          </h3>
          <p className="mb-5 mt-1 text-sm text-muted">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>

          <div className="space-y-3">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className={field}
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your email"
              className={field}
            />
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about it…"
              className={`${field} resize-none`}
            />
          </div>

          <button
            type="submit"
            className="group mt-4 inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-sky-deep to-mint-deep px-5 py-3 font-display text-sm font-semibold text-white shadow-lg shadow-sky/20 transition-transform hover:-translate-y-0.5"
          >
            {sent ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Opening your mail…
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                Send message
              </>
            )}
          </button>
        </motion.form>

        {/* Right — details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="scrollbar-thin flex min-h-0 flex-col gap-4 overflow-y-auto pr-1"
        >
          <ContactRow
            icon={<Mail className="h-5 w-5" />}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
            accent="sky"
          />
          <ContactRow
            icon={<Phone className="h-5 w-5" />}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
            accent="mint"
          />
          <ContactRow
            icon={<MapPin className="h-5 w-5" />}
            label="Location"
            value={profile.location}
            accent="sky"
          />

          <div className="glass rounded-3xl p-5">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted">
              Find me online
            </p>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-xl bg-base-2/70 px-3 py-2 text-sm font-medium text-ink-soft transition-all hover:-translate-y-0.5 hover:text-sky-deep"
                  >
                    <Icon className="h-4 w-4" />
                    {s.label}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="glass rounded-3xl bg-linear-to-br from-sky/10 to-mint/10 p-5">
            <p className="font-display text-base font-bold text-ink">
              Let's build something cool. 🚀
            </p>
            <p className="mt-1 text-sm text-muted">
              Currently open to freelance projects and full-time roles.
            </p>
          </div>
        </motion.div>
      </div>
    </PanelShell>
  )
}

function ContactRow({
  icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  accent: 'sky' | 'mint'
}) {
  const Wrap = href ? 'a' : 'div'
  return (
    <Wrap
      {...(href
        ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer noopener' }
        : {})}
      className="glass flex items-center gap-4 rounded-3xl p-4 transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
          accent === 'sky'
            ? 'bg-sky/12 text-sky-deep'
            : 'bg-mint/15 text-mint-deep'
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
          {label}
        </span>
        <span className="block truncate font-display text-sm font-semibold text-ink">
          {value}
        </span>
      </span>
    </Wrap>
  )
}

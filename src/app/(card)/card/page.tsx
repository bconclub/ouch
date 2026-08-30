import Image from 'next/image'
import React from 'react'

const EMAIL = 'oouucchhed@gmail.com'
const INSTAGRAM = 'oouucchhed'

const ACTIONS = [
  {
    label: 'Email',
    sub: EMAIL,
    href: `mailto:${EMAIL}`,
    chip: 'bg-pink',
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <rect height="16" rx="3" width="20" x="2" y="4" />
        <path d="M2 7l10 6 10-6" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    sub: `@${INSTAGRAM}`,
    href: `https://instagram.com/${INSTAGRAM}`,
    chip: 'bg-purple',
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <rect height="18" rx="5" width="18" x="3" y="3" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'The shop',
    sub: 'oouucchh.com',
    href: 'https://oouucchh.com',
    chip: 'bg-orange',
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
      </svg>
    ),
  },
]

export default function CardPage() {
  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#080808] px-4 py-10 text-white">
      {/* blur gradient blobs */}
      <div aria-hidden className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-pink opacity-35 blur-3xl" />
      <div aria-hidden className="absolute top-1/3 -right-28 h-96 w-96 rounded-full bg-purple opacity-40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-28 left-1/4 h-80 w-80 rounded-full bg-cyan opacity-25 blur-3xl" />
      <div aria-hidden className="absolute top-10 right-1/4 h-52 w-52 rounded-full bg-yellow opacity-20 blur-3xl" />

      {/* frosted card */}
      <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-white/10 p-7 pt-0 text-center shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        {/* founder cutout overlapping the top */}
        <div className="relative mx-auto -mt-24 h-48 w-48">
          <Image
            alt="The Ouch founder"
            className="object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
            fill
            priority
            sizes="12rem"
            src="/brand/covers/hero-cutout.png"
          />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="Ouch" className="mx-auto mt-2 h-9 w-auto" src="/brand/logo-white.png" />
        <p className="text-poster mt-2 text-[12px] tracking-[0.16em] uppercase">
          Peace. Love. <span className="text-pink">Piercings.</span>
        </p>

        <div className="mt-6 space-y-3">
          {ACTIONS.map((a) => (
            <a
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-left backdrop-blur-md transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              href={a.href}
              key={a.label}
              rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              target={a.href.startsWith('http') ? '_blank' : undefined}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${a.chip}`}>
                {a.icon}
              </span>
              <span className="min-w-0">
                <span className="text-poster block text-[14px] tracking-wide uppercase">{a.label}</span>
                <span className="block truncate text-[12px] text-white/65">{a.sub}</span>
              </span>
              <span aria-hidden className="ml-auto text-white/50">→</span>
            </a>
          ))}
        </div>

        <p className="text-marker mt-6 text-[12px] text-white/55">Hey you. Thanks for scanning 🤘</p>
      </div>
    </main>
  )
}

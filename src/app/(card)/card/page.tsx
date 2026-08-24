import Image from 'next/image'
import React from 'react'

const PHONE = '+917259956780'
const PHONE_PRETTY = '+91 72599 56780'
const EMAIL = 'oouucchhed@gmail.com'
const INSTAGRAM = 'oouucchhed'

const ACTIONS = [
  {
    label: 'Call us',
    sub: PHONE_PRETTY,
    href: `tel:${PHONE}`,
    chip: 'bg-cyan',
    icon: (
      <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
        <path d="M21 16.5c0 1.4-1.1 2.5-2.5 2.5C10 19 5 14 5 5.5 5 4.1 6.1 3 7.5 3L10 5.5 8.5 8.5c1 2.5 2.5 4 5 5l3-1.5z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    sub: 'fastest way, dude',
    href: `https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent('Hey Ouch! 🤘')}`,
    chip: 'bg-lime',
    icon: (
      <svg fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
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
        <p className="mt-1 text-[13px] text-white/70">Rare silver studs &amp; hoops · Bengaluru</p>

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

        <p className="text-marker mt-6 text-[12px] text-white/55">Hey dude. Thanks for scanning 🤘</p>
      </div>
    </main>
  )
}

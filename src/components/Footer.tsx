import Link from 'next/link'
import React from 'react'

import { getCategories, getSiteSettings } from '@/lib/queries'
import { Logo } from './Logo'

export async function Footer() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()])
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <footer className="mt-20">
      {/* Gradient wash band */}
      <div className="wash-footer">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-ink/70 uppercase">
              Stay in the loop
            </p>
            <p className="font-serif text-2xl leading-snug font-medium text-ink">
              New drops, studio days & good stuff.
            </p>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-ink/70 uppercase">
              Find us
            </p>
            <p className="text-script text-3xl leading-tight text-ink">
              Here for good times
              <br />& good vibes ☺
            </p>
            <div className="mt-4 flex gap-4 text-sm font-semibold text-ink/80">
              {settings.instagramUrl && (
                <a className="hover:text-ink" href={settings.instagramUrl} rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              )}
              <a className="hover:text-ink" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                WhatsApp
              </a>
              {settings.contactEmail && (
                <a className="hover:text-ink" href={`mailto:${settings.contactEmail}`}>
                  Email
                </a>
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-ink/70 uppercase">
              Let&apos;s talk
            </p>
            <p className="font-serif text-2xl leading-snug font-medium text-ink">
              Questions, bookings, collabs?
            </p>
            <a
              className="btn-vibrant mt-5 inline-block px-7 py-3 text-[12px] font-bold tracking-[0.2em] uppercase"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Say hello ↗
            </a>
          </div>
        </div>
      </div>

      {/* Dark base bar */}
      <div className="bg-ink text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6 sm:px-6">
          <Link aria-label={`${settings.storeName} home`} className="text-white" href="/">
            <Logo className="h-7 w-auto" />
          </Link>
          <nav className="flex flex-wrap gap-5 text-[11px] font-semibold tracking-[0.18em] uppercase">
            <Link className="text-white/70 hover:text-white" href="/shop">
              Shop All
            </Link>
            {categories.slice(0, 5).map((c) => (
              <Link
                className="text-white/70 hover:text-white"
                href={`/category/${c.slug}`}
                key={c.id}
              >
                {c.name}
              </Link>
            ))}
          </nav>
          <p className="text-[11px] tracking-[0.15em] text-white/60 uppercase">
            © {new Date().getFullYear()} {settings.storeName} Studio · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

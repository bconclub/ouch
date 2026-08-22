import React from 'react'

import { getSiteSettings } from '@/lib/queries'
import { DoodleHeart, DoodleLightning, DoodlePeace, DoodleSmiley } from './Doodles'
import { Logo } from './Logo'
import { NewsletterForm } from './NewsletterForm'
import { BandBlend, BrushStroke } from './Paint'

export async function Footer() {
  const settings = await getSiteSettings()
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <footer id="connect">
      {/* 04 · Hey, let's connect! */}
      <div className="band-alt relative">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="var(--band-2)" seed={63} />
        <div className="mx-auto grid min-h-[65vh] max-w-7xl content-center items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[220px_1fr_1fr_240px]">
          <div className="relative">
            <h2 className="text-marker mt-1 text-3xl leading-snug">
              Hey, let&apos;s
              <br />
              connect!
            </h2>
            <DoodleHeart className="mt-3 h-8 w-8 text-pink" />
          </div>

          <div>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  className="inline-flex items-center gap-2.5 hover:text-pink"
                  href={settings.instagramUrl || 'https://instagram.com/ouch.piercings'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg fill="none" height="17" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="17">
                    <rect height="18" rx="5" width="18" x="3" y="3" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
                  </svg>
                  @ouch.piercings
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2.5 hover:text-pink" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                  <svg fill="none" height="17" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="17">
                    <path d="M21 16.5c0 1.4-1.1 2.5-2.5 2.5C10 19 5 14 5 5.5 5 4.1 6.1 3 7.5 3L10 5.5 8.5 8.5c1 2.5 2.5 4 5 5l3-1.5z" />
                  </svg>
                  {settings.whatsappNumber}
                </a>
              </li>
              <li>
                <a className="inline-flex items-center gap-2.5 hover:text-pink" href="mailto:hello@ouchjewellery.com">
                  <svg fill="none" height="17" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="17">
                    <rect height="16" rx="3" width="20" x="2" y="4" />
                    <path d="M2 7l10 6 10-6" />
                  </svg>
                  hello@ouchjewellery.com
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <svg fill="none" height="17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="17">
                  <path d="M12 22s7-7.1 7-12a7 7 0 10-14 0c0 4.9 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                Bengaluru, India
              </li>
            </ul>

            <div className="relative mt-6 w-fit">
              <BrushStroke className="absolute -inset-x-4 top-1/2 h-[140%] -translate-y-1/2 -rotate-1" color="var(--color-pink)" seed={91} />
              <p className="text-poster relative px-4 py-2 text-[13px] leading-relaxed tracking-wide text-white uppercase">
                DM us on Instagram
                <br />
                or chat on WhatsApp
              </p>
              <DoodleLightning className="absolute top-1/2 -right-8 h-7 w-6 -translate-y-1/2 text-yellow" />
              <DoodleSmiley className="absolute -right-14 -bottom-2 h-7 w-7 text-yellow" />
            </div>
          </div>

          <div className="rounded-2xl bg-purple p-6 text-white">
            <h3 className="text-poster text-lg tracking-wide uppercase">Join the loop</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/85">
              New drops. Piercing tips.
              <br />
              Special offers. Good vibes.
            </p>
            <NewsletterForm whatsappHref={whatsappHref} />
          </div>

          <div className="relative mx-auto w-full max-w-56 rotate-2 rounded-md bg-[#f6f1e6] p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <span aria-hidden className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 rotate-3 bg-[#d8d2c2]/80" />
            <span aria-hidden className="absolute -bottom-2 left-4 h-5 w-12 -rotate-6 bg-[#d8d2c2]/80" />
            <Logo className="mx-auto h-10 w-auto" variant="ink" />
            <p className="text-poster mt-3 text-[11px] leading-relaxed tracking-[0.12em] text-[#17141a] uppercase">
              Piercings that hit <span className="text-pink">different.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="band-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <DoodlePeace className="h-6 w-6 text-pink" />
          <p className="text-center text-[11px] tracking-[0.15em] opacity-70 uppercase">
            © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
          </p>
          <span className="flex items-center gap-3">
            <DoodleLightning className="h-5 w-4 text-yellow" />
            <span className="text-marker text-sm text-pink">×××</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

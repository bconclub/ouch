import React from 'react'

import { getSiteSettings } from '@/lib/queries'
import { DoodleHeart, DoodleLightning, DoodlePeace, DoodleSmiley } from './Doodles'
import { Logo } from './Logo'
import { NewsletterForm } from './NewsletterForm'
import { BandBlend } from './Paint'

export async function Footer() {
  const settings = await getSiteSettings()
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <footer id="connect">
      {/* 04 · Hey, let's connect! */}
      <div className="band-alt relative">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="var(--band-2)" seed={63} />
        <div className="mx-auto grid min-h-[65vh] max-w-7xl content-center items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[200px_2fr_320px]">
          <div className="relative">
            <h2 className="text-marker mt-1 text-3xl leading-snug">
              Hey, let&apos;s
              <br />
              connect!
            </h2>
            <DoodleHeart className="mt-3 h-8 w-8 text-pink" />
          </div>

          {/* The Ouch card — a business card that isn't a business card */}
          <div className="relative mx-auto w-full max-w-2xl -rotate-1 rounded-xl bg-[#f6f1e6] p-7 text-[#17141a] shadow-[0_16px_44px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:rotate-0 lg:col-span-2">
            <span aria-hidden className="absolute -top-2.5 left-10 h-6 w-20 rotate-3 bg-[#d8d2c2]/80" />
            <span aria-hidden className="absolute -bottom-2.5 right-12 h-6 w-16 -rotate-6 bg-[#d8d2c2]/80" />
            <div className="flex flex-wrap items-center gap-7">
              <div className="min-w-0 flex-1">
                <Logo className="h-11 w-auto" variant="ink" />
                <p className="text-poster mt-2 text-[12px] tracking-[0.14em] uppercase">
                  Peace. Love. <span className="text-pink">Piercings.</span>
                </p>
                <ul className="mt-5 space-y-2.5 text-sm">
                  <li>
                    <a className="inline-flex items-center gap-2.5 font-semibold hover:text-pink" href="https://oouucchh.com">
                      <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" /></svg>
                      oouucchh.com
                    </a>
                  </li>
                  <li>
                    <a className="inline-flex items-center gap-2.5 hover:text-pink" href="mailto:hello@ouchjewellery.com">
                      <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16"><rect height="16" rx="3" width="20" x="2" y="4" /><path d="M2 7l10 6 10-6" /></svg>
                      hello@ouchjewellery.com
                    </a>
                  </li>
                  <li>
                    <a className="inline-flex items-center gap-2.5 hover:text-pink" href={whatsappHref} rel="noopener noreferrer" target="_blank">
                      <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M21 16.5c0 1.4-1.1 2.5-2.5 2.5C10 19 5 14 5 5.5 5 4.1 6.1 3 7.5 3L10 5.5 8.5 8.5c1 2.5 2.5 4 5 5l3-1.5z" /></svg>
                      {settings.whatsappNumber}
                    </a>
                  </li>
                  <li>
                    <a className="inline-flex items-center gap-2.5 hover:text-pink" href={settings.instagramUrl || 'https://instagram.com/ouch.piercings'} rel="noopener noreferrer" target="_blank">
                      <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16"><rect height="18" rx="5" width="18" x="3" y="3" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" /></svg>
                      @ouch.piercings
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2.5">
                    <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16"><path d="M12 22s7-7.1 7-12a7 7 0 10-14 0c0 4.9 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    Bengaluru, India
                  </li>
                </ul>
              </div>
              <div className="mx-auto text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Scan to visit oouucchh.com" className="h-36 w-36 rounded-lg border-4 border-[#17141a]/10" src="/brand/qr-site.png" />
                <p className="text-poster mt-2 text-[10px] tracking-[0.16em] uppercase">Scan me, dude</p>
                <DoodlePeace className="mx-auto mt-2 h-7 w-7 text-purple" />
              </div>
            </div>
            <DoodleLightning className="absolute -top-4 right-6 h-7 w-6 text-yellow" />
            <DoodleSmiley className="absolute right-40 -bottom-4 h-8 w-8 text-pink" />
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

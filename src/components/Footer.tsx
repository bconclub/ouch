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
            <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-center sm:gap-10 sm:text-left">
              <div>
                <Logo className="mx-auto h-12 w-auto sm:mx-0" variant="ink" />
                <p className="text-poster mt-2.5 text-[13px] tracking-[0.14em] uppercase">
                  Peace. Love. <span className="text-pink">Piercings.</span>
                </p>
              </div>
              <div className="text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="Scan me" className="h-40 w-40" src="/brand/qr-site.png" />
                <p className="text-poster mt-1.5 text-[11px] tracking-[0.16em] uppercase">Scan me, dude</p>
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

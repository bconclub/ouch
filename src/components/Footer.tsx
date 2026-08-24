import React from 'react'

import { getSiteSettings } from '@/lib/queries'
import { DoodleHeart, DoodleLightning, DoodlePeace, DoodleSmiley } from './Doodles'
import { Logo } from './Logo'
import { InfoBar } from './InfoBar'
import { BandBlend } from './Paint'

export async function Footer() {
  const settings = await getSiteSettings()
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <footer id="connect">
      {/* 04 · Hey, let's connect! */}
      <div className="band-alt relative">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="var(--band-2)" seed={63} />
        <div className="mx-auto grid min-h-[70vh] max-w-7xl content-center items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-16">
          <div className="relative">
            <h2 className="text-marker mt-1 text-3xl leading-snug">
              Hey, let&apos;s
              <br />
              connect!
            </h2>
            <DoodleHeart className="mt-3 h-8 w-8 text-pink" />
          </div>

          {/* Connect card — same frosted language as /card */}
          <div className="mx-auto w-full max-w-2xl [perspective:1200px]">
            <a
              className="flex flex-col items-center gap-8 text-center transition-transform duration-500 [transform:rotateY(-12deg)_rotateX(4deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] sm:flex-row sm:items-center sm:gap-14 sm:text-left"
              href="/card"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Scan for our contact card" className="block h-44 w-44 shrink-0 [filter:drop-shadow(0_18px_28px_rgba(255,255,255,0.12))]" src="/brand/qr-site.png" />
              <span>
                <Logo className="mx-auto h-9 w-auto sm:mx-0" />
                <span className="text-poster mt-2.5 block text-[13px] tracking-[0.14em] uppercase">
                  Peace. Love. <span className="text-pink">Piercings.</span>
                </span>
                <span className="text-marker mt-3 block text-[15px] opacity-80">
                  Scan to save us, or just say hi 👇
                </span>
              </span>
            </a>

            <div className="mt-10 flex flex-wrap justify-center gap-4 sm:justify-start">
              <a
                className="text-poster inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-[13px] tracking-wide text-black uppercase transition-transform hover:scale-105"
                href={`${whatsappHref}?text=${encodeURIComponent('Hey Ouch! 🤘')}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                className="text-poster inline-flex items-center gap-2 rounded-full border-2 border-[var(--band-line)] px-7 py-3.5 text-[13px] tracking-wide uppercase transition-colors hover:bg-[var(--band-1)] hover:text-[var(--band-1-ink)]"
                href="/card"
              >
                Our card <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Safe & sound / shipping / payments / aftercare — after the card */}
      <InfoBar />

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

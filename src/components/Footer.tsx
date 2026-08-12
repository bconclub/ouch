import Link from 'next/link'
import React from 'react'

import { getSiteSettings } from '@/lib/queries'
import { Logo } from './Logo'

function StayRealStamp() {
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg className="h-full w-full animate-[spin_18s_linear_infinite] text-ink" viewBox="0 0 120 120">
        <defs>
          <path d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" id="stamp-circle" />
        </defs>
        <circle cx="60" cy="60" fill="none" r="57" stroke="currentColor" strokeWidth="2" />
        <text fill="currentColor" fontSize="15" fontWeight="700" letterSpacing="3.5">
          <textPath href="#stamp-circle" startOffset="4%">
            STAY REAL · STAY YOU ·
          </textPath>
        </text>
      </svg>
      <svg
        className="absolute top-1/2 left-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-pink"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21S3 15.5 3 9.5A5.5 5.5 0 0112 5a5.5 5.5 0 019 4.5C21 15.5 12 21 12 21z" />
      </svg>
    </div>
  )
}

export async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer className="mt-4">
      <div aria-hidden className="bar-rainbow h-1.5" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_auto]">
        <div>
          <Logo className="h-9 w-auto" />
          <p className="text-poster mt-4 text-[13px] tracking-[0.15em] uppercase">
            Piercings that hit
            <br />
            <span className="text-pink">different.</span>
          </p>
        </div>

        <div>
          <h3 className="text-poster mb-4 text-[13px] tracking-[0.2em] text-cyan uppercase">
            Let&apos;s connect
          </h3>
          {/* Contact lines from the brand mockup — confirm they're live before launch */}
          <ul className="space-y-2.5 text-sm text-ink">
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-pink"
                href={settings.instagramUrl || 'https://instagram.com/ouch.piercings'}
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
                  <rect height="18" rx="5" width="18" x="3" y="3" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
                </svg>
                @ouch.piercings
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-pink" href="mailto:hello@ouchjewellery.com">
                <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
                  <rect height="16" rx="3" width="20" x="2" y="4" />
                  <path d="M2 7l10 6 10-6" />
                </svg>
                hello@ouchjewellery.com
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center gap-2 hover:text-pink"
                href="https://www.ouchjewellery.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg fill="none" height="16" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
                </svg>
                www.ouchjewellery.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-poster mb-4 text-[13px] tracking-[0.2em] text-pink uppercase">Journal</h3>
          <p className="text-sm leading-relaxed text-ink">
            Real people.
            <br />
            Real stories.
            <br />
            Real vibes.
          </p>
          <Link
            className="text-poster mt-3 inline-flex items-center gap-1.5 text-[12px] tracking-[0.15em] text-pink uppercase hover:opacity-80"
            href="/shop"
          >
            Read more <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <StayRealStamp />
        </div>
      </div>

      <div className="border-t border-line px-4 py-5 text-center text-[11px] tracking-[0.15em] text-muted uppercase sm:px-6">
        © {new Date().getFullYear()} {settings.storeName} · All rights reserved
      </div>
    </footer>
  )
}

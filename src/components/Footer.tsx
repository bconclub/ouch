import Link from 'next/link'
import React from 'react'

import { getSiteSettings } from '@/lib/queries'
import { Logo } from './Logo'

function StayRealStamp() {
  return (
    <div className="relative h-32 w-32 shrink-0 -rotate-12">
      <svg className="h-full w-full text-ink" viewBox="0 0 120 120">
        <defs>
          <path d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" id="stamp-circle" />
          <filter height="140%" id="stamp-rough" width="140%" x="-20%" y="-20%">
            <feTurbulence baseFrequency="0.55" numOctaves="2" result="n" seed="7" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
        <g filter="url(#stamp-rough)">
          <circle cx="60" cy="60" fill="none" r="56" stroke="currentColor" strokeDasharray="5 3" strokeWidth="2.5" />
          <circle cx="60" cy="60" fill="none" r="30" opacity="0.0" />
          <text fill="currentColor" fontSize="14.5" fontWeight="700" letterSpacing="3.2">
            <textPath href="#stamp-circle" startOffset="2%">
              STAY REAL · STAY YOU ·
            </textPath>
          </text>
          <path
            d="M60 78S44 68.5 44 58.2A9.5 9.5 0 0160 50.5a9.5 9.5 0 0116 7.7C76 68.5 60 78 60 78z"
            fill="var(--color-bg)"
            stroke="currentColor"
            strokeWidth="2"
          />
        </g>
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
            <span className="text-marker relative inline-block text-[17px] normal-case tracking-normal text-pink">
              Different.
              <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full bg-pink" />
            </span>
            <svg className="ml-2 inline-block h-4 w-4 align-middle text-pink" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 20S4.5 15 4.5 9.8A4.6 4.6 0 0112 6a4.6 4.6 0 017.5 3.8C19.5 15 12 20 12 20z" />
            </svg>
          </p>
        </div>

        <div>
          <h3 className="text-marker mb-4 -skew-x-6 text-[16px] tracking-wide text-cyan">
            Let&apos;s Connect
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
          <h3 className="text-marker mb-4 -skew-x-6 text-[16px] tracking-wide text-pink">Journal</h3>
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

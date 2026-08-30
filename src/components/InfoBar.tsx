import React from 'react'

import { Reveal } from './Reveal'

const PAYMENT_CHIPS = ['UPI', 'GPay', 'Apple Pay', 'VISA', 'Mastercard', 'RuPay']

/** Safe & sound / shipping / payments / aftercare — shown after the card. */
export function InfoBar() {
  return (
      <section className="band-black" id="info">
        <div className="mx-auto grid max-w-7xl content-center gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <Reveal>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-pink" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 26">
                <path d="M12 1l10 4v7c0 6-4 11-10 13C6 23 2 18 2 12V5z M8 12l3 3 5-6" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide uppercase">Safe &amp; sound</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] opacity-85">
              <li>✓ Hypoallergenic — your skin stays happy</li>
              <li>✓ Sterile everything, every time</li>
              <li>✓ We gotchu, always 🤞</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-purple" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 28 24">
                <path d="M1 5h16v13H1z M17 9h5l4 4v5h-9 M6 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M21 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide uppercase">A day. Two, tops.</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] opacity-85">
              <li>✓ 24–48 hours, anywhere in Bengaluru</li>
              <li>✓ Studs — delivery free, always</li>
              <li>✓ Posters — ask us, we&apos;ll work it out</li>
              <li>✓ Rest of India — soon 🤞</li>
            </ul>
          </Reveal>
          <Reveal delay={200}>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-cyan" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 26 20">
                <rect height="16" rx="3" width="24" x="1" y="2" />
                <path d="M1 8h24" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide uppercase">Easy peasy payments</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {PAYMENT_CHIPS.map((chip) => (
                <span className="rounded-md border border-[var(--band-line)] px-2.5 py-1 text-[11px] font-bold" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={300}>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-yellow" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide uppercase">Just ask, dude</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] opacity-85">
              <li>✓ Ask us anything, anytime</li>
              <li>✓ We answer like a friend, not a form</li>
              <li>✓ No robots, no scripts 🎶</li>
            </ul>
          </Reveal>
        </div>
      </section>
  )
}

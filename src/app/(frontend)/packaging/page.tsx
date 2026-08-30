import type { Metadata } from 'next'
import React from 'react'

import { DoodleHeart, DoodlePeace } from '@/components/Doodles'
import { BrushStroke } from '@/components/Paint'
import { Reveal } from '@/components/Reveal'

/** Private working page — not linked from the site, not indexed.
 *  Everything packaging lives here until it is decided. */
export const metadata: Metadata = {
  title: 'Packaging — internal',
  robots: { index: false, follow: false, nocache: true },
}

/** Three things per order. Simple on purpose, happy on purpose. */
const INSIDE = [
  { n: '1', title: 'Clear pouch', body: 'Little zip pouch so the piece travels safe and sound.', cost: '₹1–3', chip: 'bg-cyan' },
  { n: '2', title: 'Thank you card', body: 'A happy little note, with the maker&apos;s name on it.', cost: '₹3–6', chip: 'bg-pink' },
  { n: '3', title: 'Logo sticker', body: 'Seals it shut and makes it feel like a gift.', cost: '₹1–3', chip: 'bg-orange' },
]

const COLOURS = [
  ['Black Classic', 'Bold. Edgy. Always Ouch.', 'bg-[#141414]'],
  ['Pink Pop', 'Bright. Playful. Full of love.', 'bg-pink'],
  ['Lilac Vibes', 'Soft. Calm. Aesthetic.', 'bg-purple'],
  ['Sunshine Day', 'Warm. Happy. Positive.', 'bg-yellow'],
  ['Ocean Mood', 'Fresh. Fun. Free.', 'bg-cyan'],
]

const VENDORS = [
  ['Chickpet / SP Road', 'Pouches, boxes, sticker sheets. Walk in, buy 50 cash. Cheapest for small runs.'],
  ['Rubber stamp shop, Chickpet', 'Logo stamp, roughly ₹250 once. Then stamp pouches and cards by hand.'],
  ['Local print shop', 'The three cards in one run — cheaper than online at 100 pieces.'],
  ['Packman / Bigsmall (online)', 'Kraft mailers and pouches delivered, if walking around is not possible.'],
]

const OPEN = [
  'Printed pouches or plain pouches + hand stamp? Stamp is cheaper and no two look alike.',
  'Colours later — plain first, keep it easy.',
  'Cards printed in a batch of 100, or handwritten while the numbers are small?',
  'Poster tubes — separate supplier, decide after poster delivery opens.',
]

export default function PackagingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-marker text-sm text-pink">Private page — not linked, not searchable</p>
        <h1 className="text-poster relative mt-2 w-fit text-4xl sm:text-5xl">
          Our packaging
          <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-pink)" seed={41} />
        </h1>
        <p className="text-marker mt-4 text-lg">
          Simple. Thoughtful. <span className="text-pink">Unapologetically Ouch.</span>
        </p>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed opacity-85">
          Everything needed to deliver a happy experience. No extras, just the right details.
        </p>
      </Reveal>

      {/* the correct brand mark — the mockup's logo is only a sketch */}
      <Reveal className="mt-10 rounded-2xl border border-line p-8">
        <p className="text-marker text-sm text-pink">Use this exact logo on everything</p>
        <div className="mt-5 rounded-2xl bg-[#f6f1e6] px-6 py-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Ouch" className="mx-auto h-14 w-auto" src="/brand/logo.png" />
          <p className="text-poster mt-3 text-[15px] tracking-[0.1em] text-[#17141a]">
            peace, love and piercings.
          </p>
        </div>
        <ul className="mt-5 space-y-1.5 text-sm opacity-85">
          <li>✓ Logo file: <span className="font-mono text-[13px]">/brand/logo.png</span> (dark) · <span className="font-mono text-[13px]">/brand/logo-white.png</span> (light)</li>
          <li>✓ Tagline font: Start Story — the same font as the website</li>
          <li>✓ Never redraw or retype the logo. Always use the file.</li>
        </ul>
        <p className="mt-4 text-sm opacity-70">
          Always print from the logo file. Never redraw it.
        </p>
      </Reveal>

      {/* the real artwork, built from the logo file */}
      <Reveal className="mt-10">
        <h2 className="text-marker text-2xl">The artwork — ready to print</h2>
        <p className="mt-2 text-sm opacity-75">
          Made with the real logo file and Start Story. 300dpi. Five different card fronts — print
          all five and drop a random one in each order, so nobody gets the same card twice.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            ['card-a.png', 'Card — “Congrats. You have taste.”', '90 × 50 mm'],
            ['card-b.png', 'Card — “Small thing. Big flex.”', '90 × 50 mm'],
            ['card-c.png', 'Card — “Wear it like you stole it.”', '90 × 50 mm'],
            ['card-d.png', 'Card — “Warning: people will ask.”', '90 × 50 mm'],
            ['card-e.png', 'Card — “This one found you.”', '90 × 50 mm'],
            ['card-back.png', 'Thank you card — back', 'write the maker&apos;s name by hand'],
            ['sticker.png', 'Sticker', '40 mm round'],
            ['pouch-print.png', 'Pouch print / stamp', 'for the pouch or a rubber stamp'],
          ].map(([file, title, note]) => (
            <div className="rounded-2xl bg-[var(--card-tint)] p-4" key={file}>
              <div className="overflow-hidden rounded-xl bg-[#f6f1e6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt={title} className="w-full" src={`/brand/packaging/${file}`} />
              </div>
              <p className="text-poster mt-3 text-[15px]">{title}</p>
              <p className="text-[13px] opacity-70" dangerouslySetInnerHTML={{ __html: note }} />
              <a className="text-marker mt-2 inline-block text-[13px] text-pink" href={`/brand/packaging/${file}`} download>
                Download →
              </a>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="text-marker text-2xl">What&apos;s inside every order</h2>
        <p className="mt-2 text-sm opacity-75">
          Three things, and they do the whole job. Simple, happy, done.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INSIDE.map((item) => (
            <div className="rounded-2xl bg-[var(--card-tint)] p-5" key={item.n}>
              <span className={`chip-arrow ${item.chip} text-[13px] font-bold`}>{item.n}</span>
              <h3 className="text-poster mt-3 text-lg">{item.title}</h3>
              <p className="mt-1 text-sm opacity-80">{item.body}</p>
              <p className="text-marker mt-2 text-[15px] text-cyan">{item.cost} each</p>
            </div>
          ))}
        </div>
        <p className="text-marker mt-5 text-lg">
          Roughly <span className="text-pink">₹5–12</span> per order, all three together.
        </p>
      </Reveal>

      <Reveal className="mt-12 rounded-2xl bg-[var(--card-tint)] p-6">
        <h2 className="text-marker text-2xl">What the thank you card says</h2>
        <div className="mt-5 rounded-2xl bg-[#f6f1e6] px-6 py-8 text-center text-[#17141a]">
          <p className="text-poster text-2xl">Congrats. You have taste. 🤘</p>
          <p className="text-marker mt-3 text-[15px]">
            Made by <span className="text-pink">[maker&apos;s name]</span>, Bengaluru.
          </p>
          <p className="text-marker mt-1 text-[15px] opacity-70">One of a few. Now yours.</p>
          <p className="text-poster mt-4 text-[12px] tracking-[0.14em]">peace, love and piercings.</p>
        </div>
        <p className="mt-4 text-sm opacity-75">
          Five fronts printed: Congrats. You have taste. · Small thing. Big flex. · Wear it like
          you stole it. · Warning: people will ask. · This one found you.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <h2 className="text-marker text-2xl">Colour moods</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {COLOURS.map(([name, note, bg]) => (
            <div className="rounded-2xl bg-[var(--card-tint)] p-4" key={name}>
              <span className={`block h-14 w-full rounded-xl ${bg}`} />
              <p className="text-poster mt-3 text-[15px]">{name}</p>
              <p className="mt-1 text-[13px] opacity-75">{note}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-12 rounded-2xl bg-[var(--card-tint)] p-6">
        <h2 className="text-marker text-2xl">Where to buy</h2>
        <ul className="mt-4 space-y-3">
          {VENDORS.map(([name, note]) => (
            <li key={name}>
              <span className="text-poster block text-[15px]">{name}</span>
              <span className="block text-sm opacity-75">{note}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-8 rounded-2xl border border-line p-6">
        <h2 className="text-marker text-2xl">Still to decide</h2>
        <ul className="mt-4 space-y-2 text-sm opacity-85">
          {OPEN.map((q) => (
            <li className="flex items-start gap-2.5" key={q}>
              <span aria-hidden className="text-pink">•</span>
              {q}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-12 text-center" delay={100}>
        <DoodlePeace className="mx-auto h-9 w-9 text-purple" />
        <p className="text-marker mt-3 text-xl">Small package, big happy energy 🎶</p>
        <p className="mt-2 text-sm opacity-75">
          The card is the idea — the maker&apos;s name in the box. The rest just carries it.
        </p>
        <DoodleHeart className="mx-auto mt-5 h-7 w-7 text-pink" />
      </Reveal>
    </div>
  )
}

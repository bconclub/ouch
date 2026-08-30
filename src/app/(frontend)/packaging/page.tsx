import type { Metadata } from 'next'
import React from 'react'

import { DoodleHeart } from '@/components/Doodles'
import { BrushStroke } from '@/components/Paint'
import { Reveal } from '@/components/Reveal'

/** Private working page — not linked from the site, not indexed.
 *  A shared place to think about packaging before anything is decided. */
export const metadata: Metadata = {
  title: 'Packaging — internal',
  robots: { index: false, follow: false, nocache: true },
}

const IDEAS = [
  {
    n: '01',
    title: 'The box',
    body: 'Small kraft box, roughly 6×6×3 cm. Bought plain, stamped by hand with the Ouch logo so no two are identical.',
    chip: 'bg-pink',
  },
  {
    n: '02',
    title: 'The card inside',
    body: 'A handwritten card naming the jeweller who made the piece, their shop, and that it was one of a small batch. This is the part nobody else does.',
    chip: 'bg-purple',
  },
  {
    n: '03',
    title: 'The wrap',
    body: 'Tissue or butter paper, one sticker to seal it. Cheap, quiet, feels considered when it opens.',
    chip: 'bg-cyan',
  },
  {
    n: '04',
    title: 'Posters',
    body: 'Rolled in a tube with a paper band. Separate from the jewellery packaging — different shape, different job.',
    chip: 'bg-orange',
  },
]

const VENDORS = [
  ['Chickpet / SP Road', 'Walk in, buy 50 boxes cash. Cheapest for small runs.'],
  ['Rubber stamp shop, Chickpet', 'Logo stamp, roughly ₹250 one-time. Then every box is stamped by hand.'],
  ['Packman / Bigsmall (online)', 'Kraft boxes ~₹15–25 each, delivered. Good if walking around is not possible.'],
  ['Local print shop', 'Cards and stickers in small runs, cheaper than online for 100 pieces.'],
]

export default function PackagingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-marker text-sm text-pink">Private page — not linked, not searchable</p>
        <h1 className="text-poster relative mt-2 w-fit text-4xl sm:text-5xl">
          Packaging
          <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-pink)" seed={41} />
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed opacity-85">
          Somewhere to keep the packaging thinking while it is still being decided. Nothing here is
          final and nothing here is public.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {IDEAS.map((idea, i) => (
          <Reveal delay={i * 90} key={idea.n}>
            <div className="h-full rounded-2xl bg-[var(--card-tint)] p-6">
              <span className={`chip-arrow ${idea.chip} text-[13px] font-bold`}>{idea.n}</span>
              <h2 className="text-poster mt-4 text-xl">{idea.title}</h2>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{idea.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

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

      <Reveal className="mt-10 text-center" delay={100}>
        <DoodleHeart className="mx-auto h-8 w-8 text-pink" />
        <p className="text-marker mt-3 text-lg">
          The card is the idea. The box just carries it.
        </p>
      </Reveal>
    </div>
  )
}

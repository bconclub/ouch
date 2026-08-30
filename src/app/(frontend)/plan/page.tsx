import type { Metadata } from 'next'
import React from 'react'

import { DoodleHeart, DoodlePeace } from '@/components/Doodles'
import { BrushStroke } from '@/components/Paint'
import { Reveal } from '@/components/Reveal'

/** Private working page — not linked, not indexed. The business plan. */
export const metadata: Metadata = {
  title: 'The plan — internal',
  robots: { index: false, follow: false, nocache: true },
}

type Point = { n: string; title: string; body: string; note?: string }

const FOUNDATION: Point[] = [
  { n: '01', title: 'What Ouch is', body: 'A curated shop for rare silver piercing jewellery, found in small Bengaluru shops and sold with the maker’s name on the piece. Posters sit alongside as a second, smaller line.' },
  { n: '02', title: 'Who it is for', body: 'People in Bengaluru who already have piercings and are bored of mall jewellery. They want something nobody else is wearing.' },
  { n: '03', title: 'The model', body: 'Buy a small batch from a small jeweller. Photograph it. Sell it with their name on it. When the batch is gone, that piece never returns.', note: 'Rarity is the product. Not volume.' },
  { n: '04', title: 'Bengaluru only, on purpose', body: 'One city, delivered in 24–48 hours, personally. No pan-India promises until the city works properly.' },
  { n: '05', title: 'What Ouch does not do', body: 'No piercing service. No bulk stock. No claims about metal grade or skin safety. No comparing to anyone.', note: 'Fewer promises, fewer problems.' },
]

const MONEY: Point[] = [
  { n: '06', title: 'Stud unit economics', body: 'Buy at ~₹1,000. Sell at ~₹2,200. Packaging ₹10. Delivery ₹80. Margin roughly ₹1,100 a piece — about 50%.' },
  { n: '07', title: 'Pricing rule', body: 'Sell at 2.2–2.5× what you paid. Never guess. If the maths does not work at 2.2×, do not buy the piece.' },
  { n: '08', title: 'Poster economics', body: '₹333 flat. Printing ₹80–120, tube and band ₹30, delivery charged separately. Margin ₹150–200 a print. Low, but it brings people to the site.' },
  { n: '09', title: 'Packaging cost', body: 'Clear pouch, thank-you card, sticker — ₹5–12 an order. Artwork is already made and print-ready.' },
  { n: '10', title: 'Starting capital', body: '₹4,000 for the first 3–4 studs. Then reinvest every rupee earned for the first six months. No outside money needed to start.' },
]

const GROWTH: Point[] = [
  { n: '11', title: 'Targets, Sept 2026 → Sept 2027', body: 'Sep–Nov: 10 orders a month. Dec–Feb: 25. Mar–May: 40. Jun–Aug: 60. That is roughly ₹8–10 lakh in year one, ending at a ₹15 lakh run rate.', note: 'Peaceful growth. Not a rush.' },
  { n: '12', title: 'Vendor pipeline', body: 'Start with five shops in BTM. Add two or three new jewellers a month. Twenty artisans by September 2027.' },
  { n: '13', title: 'Instagram is the engine', body: 'One post per piece, one reel per vendor visit. Film the jeweller, the shop, the hands. The artisan story is the content — it costs nothing and nobody else has it.' },
  { n: '14', title: 'The moat', body: 'Anyone can sell silver. Nobody else puts the small jeweller’s name in the box and on the site. That relationship is the asset, and it deepens every month.' },
  { n: '15', title: 'Repeat customers', body: 'Piercing people buy again — they collect. A customer who bought once should hear from you when a new batch lands. That is the cheapest revenue there is.' },
]

const OPERATIONS: Point[] = [
  { n: '16', title: 'Payments', body: 'Google Pay, screenshot sent on WhatsApp, order confirmed by hand. Add a proper gateway only when the volume makes it worth the fees.' },
  { n: '17', title: 'Stock discipline', body: 'Every piece has a real count on the site. Never list what is not in hand. Never restock a sold-out batch.' },
  { n: '18', title: 'Keep records from day one', body: 'Every purchase bill, every sale, every vendor name in one place. Investors ask for twelve months of numbers, and they cannot be reconstructed later.', note: 'This is the one that gets forgotten.' },
]

const SHARKTANK: Point[] = [
  { n: '19', title: 'What Shark Tank needs to see', body: 'Revenue, a story, and a reason nobody can copy you. By September 2027: around ₹10 lakh revenue, 20 artisans earning through Ouch, and a founder who was a piercing artist before a brain injury and built this instead.', note: 'The story is genuinely strong. The numbers need to be real, not projected.' },
  { n: '20', title: 'The ask, when it comes', body: 'Not money to survive — money to widen. Something like: funds to onboard 100 artisans across Karnataka and build the maker-credit platform properly. That is a business a shark can see growing.' },
]

const SECTIONS: [string, Point[], string][] = [
  ['Foundation', FOUNDATION, 'var(--color-pink)'],
  ['The money', MONEY, 'var(--color-cyan)'],
  ['Growth', GROWTH, 'var(--color-yellow)'],
  ['Running it', OPERATIONS, 'var(--color-purple)'],
  ['Shark Tank', SHARKTANK, 'var(--color-orange)'],
]

export default function PlanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Reveal>
        <p className="text-marker text-sm text-pink">Private page — not linked, not searchable</p>
        <h1 className="text-poster relative mt-2 w-fit text-4xl sm:text-5xl">
          The plan
          <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-pink)" seed={57} />
        </h1>
        <p className="text-marker mt-4 text-lg">
          September 2026 → September 2027. <span className="text-cyan">Bengaluru only.</span>
        </p>
        <p className="mt-3 text-[15px] leading-relaxed opacity-85">
          Twenty points. A peaceful flow of money and partners, not a crowd.
        </p>
      </Reveal>

      {SECTIONS.map(([heading, points, colour], si) => (
        <Reveal className="mt-12" delay={si * 60} key={heading}>
          <h2 className="text-poster relative w-fit text-2xl">
            {heading}
            <BrushStroke className="absolute -bottom-1.5 left-0 h-2.5 w-full" color={colour} seed={60 + si} />
          </h2>
          <div className="mt-5 space-y-4">
            {points.map((p) => (
              <div className="rounded-2xl bg-[var(--card-tint)] p-5" key={p.n}>
                <div className="flex items-baseline gap-3">
                  <span className="text-poster text-[13px] opacity-50">{p.n}</span>
                  <h3 className="text-poster text-lg">{p.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed opacity-85">{p.body}</p>
                {p.note && <p className="text-marker mt-2 text-[15px] text-pink">{p.note}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      ))}

      <Reveal className="mt-12 rounded-2xl border border-line p-6">
        <h2 className="text-marker text-2xl">Honest bit</h2>
        <p className="mt-3 text-sm leading-relaxed opacity-85">
          Shark Tank India usually looks at brands doing considerably more than ₹10 lakh a year.
          Hitting that in twelve months, alone, in one city, would be a real achievement — but it
          would still be a small number in that room. What carries it is the story and the artisans:
          twenty small jewellers earning because of Ouch is something the numbers alone cannot say.
        </p>
        <p className="mt-3 text-sm leading-relaxed opacity-85">
          So the plan is not to chase the show. It is to build something real for a year and then
          see. If the revenue lands and the artisan network is genuine, the application writes
          itself.
        </p>
      </Reveal>

      <Reveal className="mt-12 text-center" delay={100}>
        <DoodlePeace className="mx-auto h-9 w-9 text-purple" />
        <p className="text-marker mt-3 text-xl">One city. Twenty artisans. One year.</p>
        <DoodleHeart className="mx-auto mt-4 h-7 w-7 text-pink" />
      </Reveal>
    </div>
  )
}

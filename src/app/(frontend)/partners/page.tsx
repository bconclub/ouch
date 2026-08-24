import type { Metadata } from 'next'
import React from 'react'

import { DoodleHeart, DoodlePeace, DoodleStar } from '@/components/Doodles'
import { BrushStroke } from '@/components/Paint'
import { Reveal } from '@/components/Reveal'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Hidden Gems',
  description: 'The Bengaluru jewellers nobody is talking about yet. Show us your work and we will put it on the wall with your name on it.',
}

const STEPS = [
  {
    n: '01',
    title: 'You make it',
    body: 'Silver pieces nobody else is making. Odd shapes, old techniques, one-offs — the weirder the better.',
    chip: 'bg-pink',
  },
  {
    n: '02',
    title: 'We show it',
    body: 'Photos, a page of your own, your name on every piece. People finally see what you make.',
    chip: 'bg-purple',
  },
  {
    n: '03',
    title: 'We split it',
    body: 'It sells, we share the money. No stall rent, no upfront fee, nothing to lose.',
    chip: 'bg-cyan',
  },
]

const FOR_YOU = [
  'You run a small shop and your best pieces sit in a drawer',
  'You make by hand and hate selling',
  'You have one-of-a-kind pieces nobody has seen',
  'You are somewhere in Bengaluru and tired of being invisible',
]

export default async function PartnersPage() {
  const settings = await getSiteSettings()
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`
  const chat = `${whatsappHref}?text=${encodeURIComponent("Hey Ouch! I make jewellery and I'd like to show you my work 🤝")}`

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Reveal className="text-center">
        <h1 className="text-poster relative mx-auto w-fit text-5xl sm:text-6xl">
          Hidden Gems
          <BrushStroke className="absolute -bottom-2 left-0 h-3.5 w-full" color="var(--color-orange)" seed={99} />
        </h1>
        <p className="text-marker mx-auto mt-6 max-w-xl text-lg leading-relaxed">
          The Bengaluru jewellers nobody&apos;s talking about. Yet.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm opacity-75">
          This city is full of people making beautiful silver in small shops, and almost nobody
          gets to see it. Show us what you make — we&apos;ll put it on the wall with your name on it.
        </p>
        <a
          className="text-poster mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-sm tracking-wide text-white uppercase transition-transform hover:scale-105"
          href={chat}
          rel="noopener noreferrer"
          target="_blank"
        >
          Show us your work <span aria-hidden>→</span>
        </a>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal delay={i * 100} key={step.n}>
            <div className="h-full rounded-2xl bg-[var(--card-tint)] p-6">
              <span className={`chip-arrow ${step.chip} text-[13px] font-bold`}>{step.n}</span>
              <h2 className="text-poster mt-4 text-xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-2xl bg-[var(--card-tint)] p-8">
        <h2 className="text-marker text-2xl">
          This is for you if&hellip; <DoodleStar className="ml-1 inline h-6 w-6 text-yellow" />
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {FOR_YOU.map((line) => (
            <li className="flex items-start gap-2.5 text-sm" key={line}>
              <span aria-hidden className="text-pink">✦</span>
              {line}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-14 text-center" delay={100}>
        <DoodlePeace className="mx-auto h-10 w-10 text-purple" />
        <p className="text-marker mt-4 text-xl">No contracts. No jargon. Just a chat first.</p>
        <p className="mt-2 text-sm opacity-75">
          Send a photo of one piece you&apos;re proud of. That&apos;s the whole application.
        </p>
        <a
          className="text-poster mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-sm tracking-wide text-black uppercase transition-transform hover:scale-105"
          href={chat}
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message us on WhatsApp
        </a>
        <DoodleHeart className="mx-auto mt-8 h-8 w-8 text-pink" />
      </Reveal>
    </div>
  )
}

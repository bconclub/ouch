import type { Metadata } from 'next'
import React from 'react'

import { DoodleGem, DoodleHeart, DoodlePeace, DoodleSparkleSmall, DoodleStar } from '@/components/Doodles'
import { BrushStroke } from '@/components/Paint'
import { Reveal } from '@/components/Reveal'
import { getSiteSettings } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Partner with us',
  description: 'For small jewellers of Bengaluru: you craft rare silver, we curate it and sell it with your name on every piece. Jewellery only.',
}

const STEPS = [
  {
    n: '01',
    title: 'You craft it',
    body: 'Rare silver nobody else is making. Odd shapes, old techniques, one-offs — the weirder the better.',
    chip: 'bg-pink',
    gem: 'text-pink',
  },
  {
    n: '02',
    title: 'We curate it',
    body: 'We pick the pieces, photograph them properly and list them with your name on every one.',
    chip: 'bg-purple',
    gem: 'text-purple',
  },
  {
    n: '03',
    title: 'We split it',
    body: 'When it sells, the money is shared, fair and square. No stall rent, no upfront fee, nothing to lose.',
    chip: 'bg-cyan',
    gem: 'text-cyan',
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
  const chat = `${whatsappHref}?text=${encodeURIComponent("Hey Ouch! I make jewellery — here's a piece I'm proud of 🤝")}`

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <Reveal className="relative text-center">
        {/* the gems themselves, scattered like they have been unearthed */}
        <DoodleGem className="absolute top-2 left-[6%] hidden h-10 w-10 text-cyan opacity-70 sm:block" />
        <DoodleGem className="absolute top-16 right-[8%] hidden h-14 w-14 text-pink opacity-60 sm:block" />
        <DoodleGem className="absolute top-40 left-[14%] hidden h-8 w-8 text-yellow opacity-50 lg:block" />
        <DoodleSparkleSmall className="absolute top-8 right-[26%] h-4 w-4 text-yellow" />
        <DoodleSparkleSmall className="absolute top-28 left-[30%] h-3 w-3 text-cyan" />
        <DoodleSparkleSmall className="absolute top-1 right-[14%] h-3 w-3 text-pink" />

        <h1 className="text-poster relative mx-auto w-fit text-5xl sm:text-6xl">
          Partner <span className="text-pink">with us</span>
          <DoodleGem className="absolute -top-7 -right-9 h-8 w-8 rotate-12 text-purple" />
          <BrushStroke className="absolute -bottom-2 left-0 h-3.5 w-full" color="var(--color-orange)" seed={99} />
        </h1>
        <p className="text-marker mx-auto mt-6 max-w-xl text-lg leading-relaxed">
          For the small jewellers of Bengaluru. You keep making it — we curate and sell it.
        </p>
        <p className="mx-auto mt-3 max-w-lg text-sm opacity-75">
          Bengaluru is full of small jewellers whose work almost nobody gets to see. Send us your
          pieces, we photograph them, put them on the shop with your name on them, and share what
          they sell for. You make — we handle the rest.
        </p>
        <p className="text-marker mx-auto mt-4 max-w-lg text-[15px] text-cyan">
          Jewellery only — the posters are ours, not a partner category.
        </p>
        <a
          className="text-poster mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-sm tracking-wide text-white uppercase transition-transform hover:scale-105"
          href={chat}
          rel="noopener noreferrer"
          target="_blank"
        >
          Start with one piece <span aria-hidden>→</span>
        </a>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal delay={i * 100} key={step.n}>
            <div className="h-full rounded-2xl bg-[var(--card-tint)] p-6">
              <span className="flex items-center gap-2.5">
                <DoodleGem className={`h-7 w-7 ${step.gem}`} />
                <span className="text-poster text-[13px] opacity-60">{step.n}</span>
              </span>
              <h2 className="text-poster mt-4 text-xl">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 rounded-2xl bg-[var(--card-tint)] p-8">
        <h2 className="text-marker text-2xl">
          You&apos;re one of them if&hellip; <DoodleStar className="ml-1 inline h-6 w-6 text-yellow" />
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {FOR_YOU.map((line) => (
            <li className="flex items-start gap-2.5 text-sm" key={line}>
              <DoodleGem className="mt-0.5 h-4 w-4 shrink-0 text-pink" />
              {line}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-12 text-center" delay={100}>
        <DoodlePeace className="mx-auto h-10 w-10 text-purple" />
        <p className="text-marker mt-4 text-xl">No contracts. No jargon. A chat over tea works.</p>
        <p className="mt-2 text-sm opacity-75">
          One photo of a piece you&apos;re proud of. That&apos;s the whole application.
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
          Send a photo on WhatsApp
        </a>
        <DoodleHeart className="mx-auto mt-8 h-8 w-8 text-pink" />
      </Reveal>
    </div>
  )
}

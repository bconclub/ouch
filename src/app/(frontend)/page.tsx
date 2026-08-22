import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  DoodleHeart,
  DoodleLightning,
  DoodlePeace,
  DoodleSmiley,
  DoodleSquiggle,
  DoodleStar,
} from '@/components/Doodles'
import { BandBlend, BrushStroke, PaintBurst, SpraySplash } from '@/components/Paint'
import { ParallaxHero } from '@/components/ParallaxHero'
import { getSiteSettings } from '@/lib/queries'

// Always render fresh so catalogue changes made in the admin appear immediately.
export const dynamic = 'force-dynamic'

const STATS = [
  { value: '1000+', label: 'Happy humans', color: 'text-yellow', icon: <DoodleSmiley className="h-7 w-7" /> },
  { value: '3000+', label: 'Piercings done', color: 'text-purple', icon: <DoodleLightning className="h-7 w-7" /> },
  { value: '5+', label: 'Years of good vibes', color: 'text-cyan', icon: <DoodleHeart className="h-7 w-7" /> },
  {
    value: 'Premium',
    label: 'Sterile & safe',
    color: 'text-yellow',
    icon: (
      <svg fill="none" height="26" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 28 26" width="26">
        <path d="M7 3h14l5 7-12 14L2 10z M2 10h24 M7 3l7 7 7-7 M14 10v14" />
      </svg>
    ),
  },
]

const ZONES = [
  { name: 'Septum', href: '/category/septum-vibes', image: '/brand/covers/zone-septum.png', chip: 'bg-pink' },
  { name: 'Ear', href: '/category/ear-stacks', image: '/brand/covers/zone-ear.png', chip: 'bg-purple' },
  { name: 'Nose', href: '/category/dainty-nostrils', image: '/brand/covers/zone-nose.png', chip: 'bg-cyan' },
  { name: 'Body', href: '/category/body-sparks', image: '/brand/covers/zone-body.png', chip: 'bg-orange' },
]

const STUD_CARDS = [
  { name: 'Dainty AF', tag: 'Tiny but cute', href: '/category/studs-gems', image: '/brand/covers/studs-dainty.png', chip: 'bg-pink' },
  { name: 'Hoop Dreams', tag: 'Classic never dies', href: '/category/ear-stacks', image: '/brand/covers/studs-hoops.png', chip: 'bg-purple' },
  { name: 'Nose Goals', tag: 'Subtle or savage', href: '/category/dainty-nostrils', image: '/brand/covers/studs-nose.png', chip: 'bg-cyan' },
  { name: 'Spark It Up', tag: 'Little shine gang', href: '/category/studs-gems', image: '/brand/covers/studs-spark.png', chip: 'bg-yellow' },
  { name: 'Body Love', tag: 'Anywhere. Slay.', href: '/category/body-sparks', image: '/brand/covers/studs-body.png', chip: 'bg-pink' },
]

const STUD_TRUST = [
  {
    text: '925 sterling silver & gold options',
    icon: (
      <svg fill="none" height="22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 28 26" width="22">
        <path d="M7 3h14l5 7-12 14L2 10z M2 10h24" />
      </svg>
    ),
  },
  { text: 'Hypoallergenic — your skin says thanks', icon: <DoodleSmiley className="h-6 w-6" /> },
  { text: 'Sterile & safe, for real for real', icon: <DoodleStar className="h-6 w-6" /> },
]

const POSTERS = [
  { kind: 'photo-text', text: 'Be bold. Be you.', image: '/brand/covers/zone-ear.png', bg: 'bg-purple', textColor: 'text-white' },
  { kind: 'text', text: 'Pierced to express, not to impress.', bg: 'band-paper', textColor: 'text-purple' },
  { kind: 'paint-text', text: 'Small piece. Big vibes.', bg: 'bg-pink', textColor: 'text-white' },
  { kind: 'photo-text', text: 'Your body, your rules.', image: '/brand/covers/cat-sets.png', bg: 'bg-orange', textColor: 'text-white' },
  { kind: 'paint-text', text: 'Not basic. Always Ouch.', bg: 'bg-cyan', textColor: 'text-white' },
]

const PAYMENT_CHIPS = ['UPI', 'GPay', 'Apple Pay', 'VISA', 'Mastercard', 'RuPay']

export default async function HomePage() {
  const settings = await getSiteSettings()
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <div className="overflow-hidden">
      {/* ============ HERO — It's a whole vibe ============ */}
      <section className="band-black relative">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr_auto] lg:py-16">
          {/* Headline + copy + CTAs */}
          <div className="relative">
            <DoodleStar className="absolute -top-4 -left-2 h-8 w-8 text-purple" />
            <DoodleSmiley className="absolute top-[44%] -left-6 hidden h-9 w-9 text-yellow xl:block" />
            <DoodleHeart className="absolute bottom-[30%] -left-4 hidden h-7 w-7 text-pink xl:block" />
            <DoodleLightning className="absolute top-0 right-[12%] h-9 w-7 text-yellow" />

            <h1>
              <span className="text-marker block text-xl text-white sm:text-2xl">Hey bestie, you made it.</span>
              <span className="text-poster mt-2 block text-4xl text-white sm:text-5xl">Good vibes.</span>
              <span className="text-poster block text-5xl text-pink sm:text-6xl">Cool studs.</span>
              <span className="text-poster relative block w-fit text-5xl text-yellow sm:text-6xl">
                Happy you.
                <BrushStroke className="absolute -bottom-3 left-0 h-4 w-full" color="var(--color-purple)" seed={71} />
              </span>
            </h1>

            <p className="mt-8 max-w-md text-[15px] leading-relaxed text-white sm:text-base">
              Studs, hoops and barbells from your friendly neighbourhood piercing folks — safe{' '}
              <span className="mark-highlight font-semibold">implant-grade</span> metals, zero drama,
              all smiles.
            </p>

            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                className="text-poster inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-[13px] tracking-wide text-white uppercase transition-transform hover:scale-[1.04] active:scale-95"
                href="/shop"
              >
                Shop studs <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Founder cutout over the paint burst */}
          <div className="relative">
            <ParallaxHero
              back={<PaintBurst className="absolute -inset-x-14 -inset-y-8" />}
              className="relative mx-auto aspect-[1011/1531] w-full max-w-xs lg:max-w-sm"
              front={
                <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]">
                  <Image
                    alt="The Ouch founder — eyebrow, septum, nostril and labret piercings, tie-dye headband"
                    className="object-contain"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 38vw"
                    src="/brand/covers/hero-cutout.png"
                  />
                </div>
              }
            />
          </div>

          {/* Stats column */}
          <div className="flex flex-row flex-wrap justify-center gap-x-10 gap-y-6 lg:flex-col lg:justify-start lg:gap-7">
            {STATS.map((stat) => (
              <div className="flex items-center gap-3" key={stat.label}>
                <span className={stat.color}>{stat.icon}</span>
                <span>
                  <span className={`text-poster block text-xl ${stat.color}`}>{stat.value}</span>
                  <span className="block text-[10px] font-bold tracking-[0.18em] text-white uppercase">
                    {stat.label}
                  </span>
                </span>
              </div>
            ))}
            <div className="mt-1 flex max-w-56 items-center gap-3 rounded-xl border-2 border-white/70 px-4 py-3">
              <DoodlePeace className="h-9 w-9 shrink-0 text-purple" />
              <span className="text-marker text-[15px] leading-snug text-white">
                Safe metals. Happy ears. <span className="text-pink underline">Pinky promise.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 01 · Choose your piercing zone ============ */}
      <section className="band-paper relative" id="zones">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="#ece5d6" seed={31} />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[220px_1fr_190px]">
          <div className="relative">
            <h2 className="text-marker mt-1 text-3xl leading-snug">
              Where&apos;s the
              <br />
              bling going?
            </h2>
            <svg className="mt-3 h-8 w-14 text-[#17141a]" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 56 32">
              <path d="M2 6c14 14 30 20 46 20M48 20l6 6-8 3" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ZONES.map((zone) => (
              <Link className="group relative overflow-hidden rounded-2xl" href={zone.href} key={zone.name}>
                <div className="relative aspect-[4/5]">
                  <Image
                    alt={`${zone.name} piercings`}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 45vw, 20vw"
                    src={zone.image}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between">
                  <span className="text-poster text-lg text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {zone.name}
                  </span>
                  <span aria-hidden className={`chip-arrow ${zone.chip}`}>→</span>
                </div>
              </Link>
            ))}
          </div>

          <div>
            <p className="text-marker text-lg leading-snug">
              Pro piercers.
              <br />
              Super sterile.
              <br />
              Good energy only.
            </p>
            <a
              className="text-poster mt-4 inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-[12px] tracking-wide text-[#0a2a30] uppercase transition-transform hover:scale-105"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Hit us up <span aria-hidden>→</span>
            </a>
            <DoodleSquiggle className="mt-4 h-5 w-12 text-[#17141a]" />
          </div>
        </div>
      </section>

      {/* ============ 02 · Our studs collection ============ */}
      <section className="band-black relative" id="studs">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="#0a0a0a" seed={47} />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[220px_1fr_200px]">
          <div className="relative">
            <DoodleStar className="absolute -top-6 right-2 h-7 w-7 text-yellow" />
            <h2 className="text-marker mt-1 text-3xl leading-snug text-white">
              Our studs
              <br />
              collection
            </h2>
            <p className="mt-3 text-sm text-white/75">Shiny lil things that go with everything.</p>
            <Link
              className="text-poster mt-4 inline-flex items-center gap-2 rounded-full bg-purple px-5 py-2.5 text-[12px] tracking-wide text-white uppercase transition-transform hover:scale-105"
              href="/shop"
            >
              Peep them all <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {STUD_CARDS.map((card) => (
              <Link className="band-paper group overflow-hidden rounded-2xl" href={card.href} key={card.name}>
                <div className="relative m-2 aspect-square overflow-hidden rounded-xl">
                  <Image
                    alt={card.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 640px) 45vw, 16vw"
                    src={card.image}
                  />
                </div>
                <div className="flex items-center justify-between px-3 pb-3">
                  <span>
                    <span className="text-poster block text-[13px] uppercase">{card.name}</span>
                    <span className="text-muted-band block text-[11px]">{card.tag}</span>
                  </span>
                  <span aria-hidden className={`chip-arrow h-7 w-7 text-sm ${card.chip}`}>→</span>
                </div>
              </Link>
            ))}
          </div>

          <ul className="space-y-5">
            {STUD_TRUST.map((item) => (
              <li className="flex items-start gap-3" key={item.text}>
                <span className="mt-0.5 shrink-0 text-yellow">{item.icon}</span>
                <span className="text-[11px] leading-relaxed font-bold tracking-[0.15em] text-white uppercase">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ 03 · Walls can feel too (posters) ============ */}
      <section className="band-black" id="posters">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[220px_1fr]">
          <div>
            <h2 className="text-marker mt-1 text-3xl leading-snug text-pink">
              Walls can
              <br />
              feel too.
            </h2>
            <p className="mt-3 text-sm text-white/75">
              Art that talks back.
              <br />
              Your walls deserve it.
            </p>
            <Link
              className="text-poster mt-4 inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-[12px] tracking-wide text-[#0a2a30] uppercase transition-transform hover:scale-105"
              href="/shop"
            >
              Peep the walls <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {POSTERS.map((poster, i) => (
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl ${poster.kind === 'text' ? poster.bg : ''} ${
                    poster.kind !== 'photo-text' && poster.kind !== 'text' ? poster.bg : ''
                  }`}
                  key={poster.text}
                >
                  {poster.kind === 'photo-text' && poster.image && (
                    <>
                      <Image
                        alt=""
                        className="object-cover opacity-80"
                        fill
                        sizes="(max-width: 640px) 45vw, 16vw"
                        src={poster.image}
                      />
                      <div aria-hidden className={`absolute inset-0 opacity-55 ${poster.bg}`} />
                    </>
                  )}
                  {poster.kind === 'paint-text' && (
                    <SpraySplash
                      className="absolute -right-6 -bottom-6 h-28 w-28 opacity-70"
                      color={i === 2 ? 'var(--color-orange)' : 'var(--color-purple)'}
                      seed={80 + i}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center p-4">
                    <span className={`text-poster text-lg leading-tight uppercase ${poster.textColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
                      {poster.text}
                    </span>
                  </div>
                  <DoodleHeart className="absolute right-3 bottom-3 h-5 w-5 text-white/80" />
                </div>
              ))}
            </div>
            <span aria-hidden className="chip-arrow bg-pink absolute top-1/2 -right-4 hidden -translate-y-1/2 lg:flex">→</span>
          </div>
        </div>
      </section>

      {/* ============ INFO · Trust bar ============ */}
      <section className="band-black" id="info">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <div>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-pink" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 26">
                <path d="M12 1l10 4v7c0 6-4 11-10 13C6 23 2 18 2 12V5z M8 12l3 3 5-6" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide text-white uppercase">Safe &amp; sound</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] text-white/85">
              <li>✓ Sterile everything</li>
              <li>✓ 100% good vibes, 0% oops</li>
              <li>✓ We gotchu, always</li>
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-purple" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 28 24">
                <path d="M1 5h16v13H1z M17 9h5l4 4v5h-9 M6 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M21 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide text-white uppercase">We ship fast</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] text-white/85">
              <li>✓ Pan India delivery</li>
              <li>✓ Discreet packaging</li>
              <li>✓ 3–7 days, zoom zoom</li>
            </ul>
          </div>
          <div>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-cyan" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 26 20">
                <rect height="16" rx="3" width="24" x="1" y="2" />
                <path d="M1 8h24" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide text-white uppercase">Easy peasy payments</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {PAYMENT_CHIPS.map((chip) => (
                <span className="rounded-md border border-white/30 px-2.5 py-1 text-[11px] font-bold text-white" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-yellow" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide text-white uppercase">Jewellery care (aka TLC)</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] text-white/85">
              <li>✓ Lil soap, lil love</li>
              <li>✓ No perfume parties, please</li>
              <li>✓ Keep it cozy &amp; dry</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

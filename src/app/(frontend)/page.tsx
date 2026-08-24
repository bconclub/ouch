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
  DoodleTicks,
} from '@/components/Doodles'
import { BandBlend, BrushStroke, PaintBurst, SpraySplash } from '@/components/Paint'
import { ParallaxHero } from '@/components/ParallaxHero'
import { Reveal } from '@/components/Reveal'
import { WordCycle } from '@/components/WordCycle'
import { getSiteSettings } from '@/lib/queries'

// Always render fresh so catalogue changes made in the admin appear immediately.
export const dynamic = 'force-dynamic'

const STATS = [
  { value: '100+', label: 'Happy humans', color: 'text-yellow', icon: <DoodleSmiley className="h-7 w-7" /> },
  { value: '100+', label: 'Piercings done', color: 'text-purple', icon: <DoodleLightning className="h-7 w-7" /> },
  { value: '3+', label: 'Years of good vibes', color: 'text-cyan', icon: <DoodleHeart className="h-7 w-7" /> },
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

const PIERCING_CARDS = [
  {
    name: 'Nose',
    href: '/category/dainty-nostrils',
    image: '/brand/piercings/nose.png',
    studs: '/brand/piercings/nose-studs.png',
    text: 'text-pink',
    stroke: 'var(--color-pink)',
    chip: 'bg-pink',
    includes: ['Nostril (Single / Double)', 'Bridge', 'High Nostril'],
  },
  {
    name: 'Septum',
    href: '/category/septum-vibes',
    image: '/brand/piercings/septum.png',
    studs: '/brand/piercings/septum-studs.png',
    text: 'text-purple',
    stroke: 'var(--color-purple)',
    chip: 'bg-purple',
    includes: ['Septum', 'Septum Stacks', 'Vertical Septum'],
  },
  {
    name: 'Ear',
    href: '/category/ear-stacks',
    image: '/brand/piercings/ear.png',
    studs: '/brand/piercings/ear-studs.png',
    text: 'text-orange',
    stroke: 'var(--color-orange)',
    chip: 'bg-orange',
    includes: ['Lobe', 'Helix'],
  },
  {
    name: 'Belly',
    href: '/category/body-sparks',
    image: '/brand/piercings/belly.png',
    studs: '/brand/piercings/belly-studs.png',
    text: 'text-cyan',
    stroke: 'var(--color-cyan)',
    chip: 'bg-cyan',
    includes: ['Navel'],
  },
  {
    name: 'Eyebrow',
    href: '/category/studs-gems',
    image: '/brand/piercings/eyebrow.png',
    studs: '/brand/piercings/eyebrow-studs.png',
    text: 'text-lime',
    stroke: 'var(--color-lime)',
    chip: 'bg-lime',
    includes: ['Eyebrow'],
  },
]

/* Masonry gallery — the founder's own shots. Swap/extend freely:
   drop files in public/brand/gallery/ (or media) and add them here. */
const GALLERY = [
  '/brand/gallery/client-01.jpeg',
  '/brand/gallery/client-05.jpeg',
  '/brand/gallery/client-02.jpeg',
  '/brand/gallery/client-04.jpeg',
  '/brand/gallery/client-06.jpeg',
  '/brand/gallery/client-03.jpeg',
]

const STUD_TILES = [
  { name: 'Star', image: '/brand/piercings/stud-star.png' },
  { name: 'Bezel Crystal', image: '/brand/piercings/stud-bezel-crystal.png' },
  { name: 'Tiny Ball', image: '/brand/piercings/stud-tiny-ball.png' },
  { name: 'Opal Stud', image: '/brand/piercings/stud-opal-stud.png' },
  { name: 'Flower', image: '/brand/piercings/stud-flower.png' },
  { name: 'Moon', image: '/brand/piercings/stud-moon.png' },
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
        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl content-center items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_1fr_auto] lg:py-16">
          {/* Headline + copy + CTAs */}
          <div className="relative">
            <DoodleStar className="absolute -top-12 right-6 hidden h-8 w-8 text-purple lg:block" />
            <DoodleLightning className="absolute top-[-44px] right-[34%] hidden h-9 w-7 text-yellow lg:block" />

            <h1>
              <span className="text-marker anim-fade-up block text-xl sm:text-2xl">Hey dude.</span>
              <span className="text-poster anim-fade-up anim-d1 mt-2 block text-4xl sm:text-5xl">Peace.</span>
              <span className="text-poster anim-fade-up anim-d2 block text-5xl text-pink sm:text-6xl">Love.</span>
              <span className="text-poster anim-fade-up anim-d3 relative block w-fit text-5xl text-yellow sm:text-6xl">
                <WordCycle words={['Piercings.', 'Studs.', 'Hope.', 'Sparkle.', 'Hoops.', 'Magic.']} />
                <BrushStroke className="absolute -bottom-3 left-0 h-4 w-full" color="var(--color-purple)" seed={71} />
              </span>
            </h1>

            <p className="anim-fade-up anim-d4 mt-8 max-w-md text-[15px] leading-relaxed sm:text-base">
              Studs, hoops and barbells — <span className="mark-highlight font-semibold">kind to your skin</span>,
              easy to love.
            </p>

            <div className="anim-fade-up anim-d5 mt-7 flex flex-wrap gap-4">
              <Link
                className="text-poster inline-flex items-center gap-2 rounded-full bg-pink px-7 py-3.5 text-[13px] tracking-wide text-white uppercase transition-transform hover:scale-[1.04] active:scale-95"
                href="/shop"
              >
                Shop studs <span aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Founder cutout over the paint burst */}
          <div className="anim-pop anim-d2 relative">
            <ParallaxHero
              back={<PaintBurst className="absolute -inset-x-14 -inset-y-8" />}
              className="relative mx-auto aspect-[1035/1512] w-full max-w-xs lg:max-w-sm"
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
          <div className="anim-fade-up anim-d4 flex flex-row flex-wrap justify-center gap-x-10 gap-y-6 lg:flex-col lg:justify-start lg:gap-7">
            {STATS.map((stat) => (
              <div className="flex items-center gap-3" key={stat.label}>
                <span className={stat.color}>{stat.icon}</span>
                <span>
                  <span className={`text-poster block text-xl ${stat.color}`}>{stat.value}</span>
                  <span className="block text-[10px] font-bold tracking-[0.18em] uppercase">
                    {stat.label}
                  </span>
                </span>
              </div>
            ))}
            <div className="mt-1 flex max-w-56 items-center gap-3 rounded-xl border-2 border-[var(--band-line)] px-4 py-3">
              <DoodlePeace className="h-9 w-9 shrink-0 text-purple" />
              <span className="text-marker text-[15px] leading-snug">
                Happy skin. Zero itch. <span className="text-pink underline">Pinky promise.</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Piercings — categories (founder's reference design) ============ */}
      <section className="band-alt relative" id="zones">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="var(--band-2)" seed={31} />
        <div className="mx-auto min-h-[75vh] max-w-[90rem] content-center px-4 py-16 sm:px-6">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="text-poster relative w-fit text-5xl sm:text-6xl">
                Piercings
                <DoodleTicks className="absolute -top-2 -right-8 h-6 w-6 text-pink" />
              </h2>
              <p className="mt-2 text-sm font-bold tracking-[0.14em] uppercase">
                Express it. Wear it. <span className="text-pink">Own it.</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p className="max-w-xs text-sm opacity-80">
                Explore different types of piercings and find the one that speaks to you.
              </p>
              <DoodleHeart className="h-10 w-10 shrink-0 text-pink" />
            </div>
          </Reveal>

          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible lg:pb-0">
            {PIERCING_CARDS.map((card, ci) => (
              <Reveal className="w-[82%] shrink-0 snap-center sm:w-[46%] lg:w-auto" delay={ci * 90} key={card.name}>
                <div className="flex h-full flex-col rounded-2xl bg-[var(--card-tint)] p-4 transition-transform duration-300 hover:-translate-y-1.5">
                  <h3 className="text-poster relative w-fit text-2xl uppercase">
                    {card.name}
                    <BrushStroke className="absolute -bottom-1.5 left-0 h-2.5 w-full" color={card.stroke} seed={90 + ci} />
                  </h3>
                  <Link className="group relative mt-4 block overflow-hidden rounded-xl" href={card.href}>
                    <div className="relative aspect-[278/238]">
                      <Image
                        alt={`${card.name} piercings`}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(max-width: 640px) 90vw, 20vw"
                        src={card.image}
                      />
                    </div>
                    <span aria-hidden className={`chip-arrow absolute right-3 bottom-3 ${card.chip}`}>→</span>
                  </Link>
                  <p className={`mt-4 text-sm font-bold italic ${card.text}`}>Includes</p>
                  <ul className={`mt-2 grid gap-x-4 gap-y-1 text-[13px] ${card.includes.length > 4 ? 'grid-cols-2' : ''}`}>
                    {card.includes.map((item) => (
                      <li className="flex items-baseline gap-2" key={item}>
                        <span aria-hidden className="opacity-60">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-4 text-[11px] font-bold tracking-[0.15em] uppercase">Studs we love</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt={`${card.name} studs we love`} className="mt-1 w-full rounded-md" src={card.studs} />
                  <Link className={`mt-2 inline-flex items-center gap-1.5 text-[13px] font-bold ${card.text}`} href={card.href}>
                    View studs <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom row: ear placements + studs we love (per the reference) */}
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.5fr_1.9fr] lg:gap-6" id="studs">
            <Reveal className="flex flex-col justify-center rounded-2xl bg-[var(--card-tint)] p-6">
              <h3 className="text-poster relative w-fit text-2xl uppercase">
                Ear piercings
                <DoodleTicks className="absolute top-0 -right-7 h-5 w-5 text-pink" />
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-80">
                Classic placements
                <br />
                that never go out
                <br />
                of style.
              </p>
              <div className="mt-4 flex items-center gap-4">
                <DoodleStar className="h-8 w-8 text-purple" />
                <DoodleTicks className="h-6 w-6 rotate-180 text-current" />
              </div>
            </Reveal>
            <Reveal className="overflow-hidden rounded-2xl" delay={100}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="Ear piercing placements — helix, second helix, lobe" className="h-full w-full object-cover" src="/brand/piercings/ear-diagram.png" />
            </Reveal>
            <Reveal className="rounded-2xl bg-[var(--card-tint)] p-6" delay={200}>
              <h3 className="text-poster relative w-fit text-2xl uppercase">
                Studs we love
                <DoodleTicks className="absolute top-0 -right-7 h-5 w-5 text-pink" />
              </h3>
              <p className="mt-1.5 text-[13px] opacity-80">Premium quality. Hypoallergenic. Made to last.</p>
              <p className="text-marker mt-1 text-[13px] text-pink">Rare finds only — once they&apos;re gone, they&apos;re gone.</p>
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {STUD_TILES.map((tile) => (
                  <Link className="group block text-center" href="/shop" key={tile.name}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt={tile.name} className="w-full rounded-lg transition-transform duration-300 group-hover:-translate-y-1" src={tile.image} />
                    <span className="mt-1.5 block text-[10px] font-bold tracking-[0.12em] uppercase">
                      {tile.name}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                className="text-poster mt-5 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 text-[13px] tracking-wide text-white uppercase transition-transform hover:scale-105"
                href="/shop"
              >
                View all studs <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ Gallery — the founder's own shots, masonry ============ */}
      <section className="band-black relative" id="gallery">
        <BandBlend className="pointer-events-none absolute inset-x-0 -top-12 z-10 h-14 w-full" color="var(--band-1)" seed={47} />
        <div className="mx-auto min-h-[70vh] max-w-[90rem] content-center px-4 py-16 sm:px-6">
          <Reveal className="mb-10 text-center">
            <h2 className="text-poster relative mx-auto w-fit text-4xl sm:text-5xl">
              Straight from the studio.
              <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-cyan)" seed={81} />
            </h2>
            <p className="mt-4 text-sm opacity-80">Real pokes. Real people. Real shiny.</p>
          </Reveal>
          <div className="columns-2 gap-4 sm:columns-3 lg:gap-5 [&>*]:mb-4 lg:[&>*]:mb-5">
            {GALLERY.map((src, gi) => (
              <Reveal delay={(gi % 3) * 90} key={src}>
                <div className="group overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt="From the Ouch studio"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={src}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 03 · Walls can feel too (posters) ============ */}
      <section className="band-black" id="posters">
        <div className="mx-auto grid min-h-[70vh] max-w-[90rem] content-center items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[250px_1fr]">
          <Reveal>
            <h2 className="text-marker mt-1 text-3xl leading-snug text-pink lg:text-4xl">
              Walls can
              <br />
              feel too.
            </h2>
            <p className="mt-3 text-sm opacity-75">
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
          </Reveal>

          <div className="relative">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {POSTERS.map((poster, i) => (
                <Reveal delay={i * 70} key={poster.text}>
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-1deg] ${poster.kind === 'text' ? poster.bg : ''} ${
                    poster.kind !== 'photo-text' && poster.kind !== 'text' ? poster.bg : ''
                  }`}
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
                    <span className={`text-poster text-xl leading-tight uppercase lg:text-2xl ${poster.textColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
                      {poster.text}
                    </span>
                  </div>
                  <DoodleHeart className="absolute right-3 bottom-3 h-5 w-5 text-white/80" />
                </div>
                </Reveal>
              ))}
            </div>
            <span aria-hidden className="chip-arrow bg-pink absolute top-1/2 -right-4 hidden -translate-y-1/2 lg:flex">→</span>
          </div>
        </div>
      </section>

      {/* ============ INFO · Trust bar ============ */}
      <section className="band-black" id="info">
        <div className="mx-auto grid min-h-[60vh] max-w-7xl content-center gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          <Reveal>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-pink" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 26">
                <path d="M12 1l10 4v7c0 6-4 11-10 13C6 23 2 18 2 12V5z M8 12l3 3 5-6" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide uppercase">Safe &amp; sound</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] opacity-85">
              <li>✓ Hypoallergenic, always</li>
              <li>✓ Sterile everything</li>
              <li>✓ We gotchu, always</li>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="flex items-center gap-2.5">
              <svg className="h-7 w-7 shrink-0 text-purple" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 28 24">
                <path d="M1 5h16v13H1z M17 9h5l4 4v5h-9 M6 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z M21 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
              </svg>
              <span className="text-poster text-[15px] tracking-wide uppercase">We ship fast</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] opacity-85">
              <li>✓ Pan India delivery</li>
              <li>✓ Discreet packaging</li>
              <li>✓ 3–7 days, zoom zoom</li>
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
              <span className="text-poster text-[15px] tracking-wide uppercase">Jewellery care (aka TLC)</span>
            </h3>
            <ul className="mt-4 space-y-2 text-[13px] opacity-85">
              <li>✓ Lil soap, lil love</li>
              <li>✓ No perfume parties, please</li>
              <li>✓ Keep it cozy &amp; dry</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ Partner with us — jeweller friends ============ */}
      <section className="band-black relative" id="partners">
        <div className="mx-auto min-h-[45vh] max-w-5xl content-center px-4 py-16 text-center sm:px-6">
          <Reveal>
            <h2 className="text-poster relative mx-auto w-fit text-4xl sm:text-5xl">
              Partner with us.
              <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-orange)" seed={97} />
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed opacity-85">
              You make beautiful silver things? Let&apos;s sell them together — you craft, we
              showcase, everyone wins. Commission-style, zero drama, all handshakes.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[12px] font-bold tracking-[0.14em] uppercase opacity-80">
              <span className="rounded-full border border-[var(--band-line)] px-4 py-2">You craft it</span>
              <span aria-hidden>→</span>
              <span className="rounded-full border border-[var(--band-line)] px-4 py-2">We showcase it</span>
              <span aria-hidden>→</span>
              <span className="rounded-full border border-[var(--band-line)] px-4 py-2">We split it, fair &amp; square</span>
            </div>
            <a
              className="text-poster mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-4 text-sm tracking-wide text-white uppercase transition-transform hover:scale-105"
              href={`${whatsappHref}?text=${encodeURIComponent("Hey Ouch! I'm a jeweller and I'd love to partner up 🤝")}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              Partner with us <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

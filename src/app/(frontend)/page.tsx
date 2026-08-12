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
import { BrushStroke, HeroPaint, SpraySplash } from '@/components/Paint'
import { getCategories, getSiteSettings } from '@/lib/queries'
import { mediaAlt, mediaUrl } from '@/lib/utils'

// Always render fresh so catalogue changes made in the admin appear immediately.
export const dynamic = 'force-dynamic'

const TILE_COLORS = ['bg-pink', 'bg-purple', 'bg-cyan', 'bg-orange', 'bg-lime']
const LABEL_COLORS = ['text-pink', 'text-purple', 'text-cyan', 'text-orange', 'text-lime']
const PANEL_COLORS = ['dark:bg-pink', 'dark:bg-purple', 'dark:bg-cyan', 'dark:bg-yellow']

const STATS = [
  {
    value: '1000+',
    label: 'Happy humans',
    color: 'text-pink',
    icon: <DoodleSmiley className="h-8 w-8" />,
  },
  {
    value: '3000+',
    label: 'Piercings done',
    color: 'text-purple',
    icon: <DoodleLightning className="h-8 w-8" />,
  },
  {
    value: '5+',
    label: 'Years of good vibes',
    color: 'text-cyan',
    icon: <DoodleHeart className="h-8 w-8" />,
  },
  {
    value: 'Premium',
    label: '& sterile',
    color: 'text-orange',
    icon: (
      <svg fill="none" height="30" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 28 26" width="30">
        <path d="M7 3h14l5 7-12 14L2 10z M2 10h24 M7 3l7 7 7-7 M14 10v14" />
      </svg>
    ),
  },
]

export default async function HomePage() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()])
  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <div className="overflow-hidden">
      {/* ============ Hero ============ */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-4 pb-14 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:pb-20">
          <div className="relative order-2 lg:order-1">
            <DoodleStar className="absolute -top-8 left-0 hidden h-9 w-9 text-purple lg:block" />
            <DoodleHeart className="absolute top-[38%] -left-6 hidden h-8 w-8 text-pink xl:block" />
            <DoodleSmiley className="absolute top-[24%] right-2 hidden h-9 w-9 text-cyan lg:block" />

            <h1 className="text-poster text-5xl uppercase sm:text-6xl lg:text-7xl">
              <span className="text-marker block text-[0.34em] normal-case tracking-wide">
                Hey dude,
              </span>
              <span className="mt-2 block -rotate-1 text-pink">Check</span>
              <span className="block -rotate-1 text-purple dark:text-ink">These</span>
              <span className="relative block -rotate-1 text-yellow">
                Studs
                <span className="text-pink">.</span>
                <BrushStroke
                  className="absolute -bottom-3 left-0 h-4 w-[70%]"
                  color="var(--color-pink)"
                  seed={13}
                />
              </span>
            </h1>

            <p className="mt-9 text-[15px] leading-relaxed text-ink sm:text-base">
              Bold pieces. Good vibes.
              <br />
              Made to <span className="mark-highlight font-semibold">stand out</span>, just like you.
            </p>

            <Link
              className="text-poster mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-[15px] tracking-wide text-bg uppercase transition-transform hover:scale-[1.03] active:scale-95 dark:border-2 dark:border-cyan dark:bg-transparent dark:text-cyan"
              href="/shop"
            >
              Our Collection <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Portrait over hard-edged brush strokes */}
          <div className="relative order-1 lg:order-2">
            <HeroPaint className="absolute inset-x-0 top-2 bottom-2" />
            <DoodleTicks className="absolute -top-2 right-0 z-10 h-8 w-9 text-ink" />
            <DoodleLightning className="absolute top-[16%] -right-1 z-10 hidden h-10 w-8 text-yellow sm:block" />
            <DoodleHeart className="absolute right-0 bottom-[16%] z-10 h-9 w-9 text-pink" />
            <DoodleSquiggle className="absolute bottom-2 left-[6%] z-10 h-6 w-14 text-purple" />
            <div className="relative mx-auto aspect-[1122/1402] w-full max-w-md">
              <Image
                alt="Curated piercings — septum ring, nostril stud and a stacked ear"
                className="rounded-2xl object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 45vw"
                src="/brand/covers/cat-nose.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ Our collection ============ */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6" id="collection">
        <div className="relative mx-auto mb-12 w-fit">
          <BrushStroke
            className="absolute -inset-x-8 top-1/2 h-[150%] -translate-y-1/2"
            color="var(--color-pink)"
            seed={6}
          />
          <DoodleStar className="absolute -top-5 -right-10 h-7 w-7 text-yellow" />
          <DoodleTicks className="absolute -top-4 -left-10 h-6 w-7 -scale-x-100 text-pink" />
          <h2 className="text-marker relative px-6 py-2.5 text-3xl text-white sm:text-4xl">
            Our Collection
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat, i) => {
            const url = mediaUrl(cat.image, 'card')
            return (
              <Link className="group" href={`/category/${cat.slug}`} key={cat.id}>
                <div
                  className={`paint-tile relative aspect-square overflow-hidden p-2.5 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-1 dark:shadow-[0_0_18px_rgba(255,255,255,0.12)] ${
                    TILE_COLORS[i % TILE_COLORS.length]
                  }`}
                >
                  {url && (
                    <Image
                      alt={mediaAlt(cat.image, cat.name)}
                      className="paint-tile object-cover"
                      fill
                      sizes="(max-width: 640px) 45vw, 18vw"
                      src={url}
                    />
                  )}
                  {/* Dark theme: label painted onto the tile */}
                  <span className="text-marker absolute right-3 bottom-2.5 left-3 hidden items-center justify-between text-[15px] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] dark:flex">
                    {cat.name} <span aria-hidden>→</span>
                  </span>
                </div>
                {/* Light theme: label under the tile */}
                <div className="mt-3 dark:hidden">
                  <h3 className={`text-marker text-[16px] ${LABEL_COLORS[i % LABEL_COLORS.length]}`}>
                    {cat.name}
                  </h3>
                  <span className="text-poster mt-0.5 inline-flex items-center gap-1.5 text-[12px] tracking-[0.15em] text-ink uppercase">
                    Explore <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ============ Stats ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 border-y border-line py-10 lg:grid-cols-4 dark:gap-3 dark:border-transparent dark:py-4">
          {STATS.map((stat, i) => (
            <div
              className={`paint-tile flex flex-col items-center px-4 py-4 text-center dark:py-7 ${
                i > 0 ? 'lg:border-l lg:border-line dark:lg:border-0' : ''
              } ${PANEL_COLORS[i % PANEL_COLORS.length]}`}
              key={stat.label}
            >
              <div className={`mb-2 ${stat.color} dark:text-white`}>{stat.icon}</div>
              <div className={`text-poster text-2xl sm:text-3xl ${stat.color} dark:text-white`}>
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] font-bold tracking-[0.2em] text-ink uppercase dark:text-white">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Vibe banner ============ */}
      <section className="relative mx-auto mt-16 max-w-7xl px-4 sm:px-6" id="vibe">
        <div className="relative px-2 py-12 sm:px-8">
          {/* Light: painted pink band with yellow ends */}
          <BrushStroke
            className="absolute inset-x-0 top-1/2 h-[125%] w-full -translate-y-1/2 dark:hidden"
            color="var(--color-pink)"
            seed={16}
          />
          <BrushStroke
            className="absolute top-1/2 -right-2 h-[80%] w-[26%] -translate-y-1/2 rotate-3 dark:hidden"
            color="var(--color-yellow)"
            seed={21}
          />
          {/* Dark: neon spray on black */}
          <SpraySplash className="absolute top-0 left-[4%] hidden h-24 w-24 dark:block" color="var(--color-purple)" seed={14} />
          <SpraySplash className="absolute right-[6%] bottom-0 hidden h-20 w-20 dark:block" color="var(--color-yellow)" seed={17} />

          <div className="relative flex flex-col items-center gap-x-10 gap-y-6 sm:flex-row sm:justify-center">
            <DoodlePeace className="h-16 w-16 shrink-0 text-cyan sm:h-20 sm:w-20" />
            <div className="text-center sm:text-left">
              <p className="text-marker text-2xl text-[#7a1436] sm:text-3xl dark:text-yellow">
                Not just holes.
              </p>
              <p className="text-poster mt-1 text-3xl text-white uppercase sm:text-5xl dark:text-pink">
                It&apos;s a whole vibe.
              </p>
            </div>
            <DoodleStar className="absolute -top-6 right-0 h-8 w-8 text-pink sm:right-6" />
            <DoodleSmiley className="absolute -right-2 -bottom-6 hidden h-9 w-9 text-yellow sm:block" />
          </div>
        </div>
      </section>

      {/* ============ Journal teaser ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" id="journal">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-poster text-2xl uppercase sm:text-3xl">Journal</h2>
            <p className="text-marker mt-3 text-xl text-muted">Real people. Real stories. Real vibes.</p>
          </div>
          <a
            className="text-poster inline-flex w-fit items-center gap-2 rounded-full border-2 border-ink px-7 py-3 text-[14px] text-ink uppercase transition-colors hover:bg-ink hover:text-bg"
            href={whatsappHref}
            rel="noopener noreferrer"
            target="_blank"
          >
            Say hello <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </div>
  )
}

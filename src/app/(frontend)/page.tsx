import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  DoodleCrown,
  DoodleHeart,
  DoodleScratch,
  DoodleSparkle,
  DoodleStar,
  DoodleSun,
  Swoosh,
} from '@/components/Doodles'
import { ProductCard } from '@/components/ProductCard'
import { StudioCarousel, type StudioCard } from '@/components/StudioCarousel'
import { getCategories, getFeaturedProducts, getSiteSettings } from '@/lib/queries'
import { mediaUrl } from '@/lib/utils'

// Always render fresh so catalogue changes made in the admin appear immediately.
export const dynamic = 'force-dynamic'

const VALUES = [
  {
    title: 'Premium Materials',
    swoosh: '#f43f8e',
    icon: (
      <svg fill="none" height="34" stroke="#1c1410" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 40 36" width="38">
        <path d="M10 3h20l7 10-17 20L3 13z M3 13h34 M10 3l10 10L30 3 M20 13l0 20" />
      </svg>
    ),
  },
  {
    title: 'Skin-Safe',
    swoosh: '#f5b81c',
    icon: (
      <svg fill="none" height="34" stroke="#14b8a6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 40 36" width="36">
        <path d="M20 32S4 23 4 12A8 8 0 0120 7a8 8 0 0116 5c0 11-16 20-16 20z" />
      </svg>
    ),
  },
  {
    title: 'Styled for You',
    swoosh: '#8b5cf6',
    icon: (
      <svg fill="none" height="34" stroke="#8b5cf6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" viewBox="0 0 36 40" width="32">
        <path d="M22 2L8 22h9l-3 16L30 16h-10z" />
      </svg>
    ),
  },
  {
    title: 'Hygienic & Professional',
    swoosh: '#14b8a6',
    icon: (
      <svg fill="none" height="34" stroke="#5cb85c" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 44 36" width="40">
        <path d="M22 32c-4-2-7-6-7-11 0-6 3-11 7-15 4 4 7 9 7 15 0 5-3 9-7 11z" />
        <path d="M22 32c-6 1-12-1-16-6 4-4 9-6 14-5M22 32c6 1 12-1 16-6-4-4-9-6-14-5" />
      </svg>
    ),
  },
]

// Studio carousel — founder's branded studio photography.
const STUDIO_TILES: { label: string; slug: string | null; cover: string; chipColor: string }[] = [
  { label: 'Ear Curations', slug: 'ear', cover: '/brand/covers/cat-ear.png', chipColor: '#f9a8d4' },
  { label: 'Nose', slug: 'nose', cover: '/brand/covers/cat-nose.png', chipColor: '#fcd34d' },
  { label: 'Face', slug: 'lip-labret', cover: '/brand/covers/cat-face.png', chipColor: '#c4b5fd' },
  { label: 'Body', slug: 'barbells', cover: '/brand/covers/cat-body.png', chipColor: '#6ee7c9' },
  { label: 'Curated Sets', slug: null, cover: '/brand/covers/cat-sets.png', chipColor: '#f9a8d4' },
]

export default async function HomePage() {
  const [settings, categories, featured] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedProducts(),
  ])

  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  const studioCards: StudioCard[] = STUDIO_TILES.map((tile) => {
    const category = tile.slug ? categories.find((c) => c.slug === tile.slug) : undefined
    return {
      label: tile.label,
      href: category ? `/category/${category.slug}` : '/shop',
      image: tile.cover,
      chipColor: tile.chipColor,
    }
  })

  return (
    <div>
      {/* ============ 1 · Hero — "Pierce Your Story" ============ */}
      <section className="wash-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-20">
          <div className="relative">
            <DoodleSparkle className="absolute -top-6 left-0 h-8 w-8 text-[#ffd23f]" />
            <DoodleStar className="absolute right-6 -bottom-8 hidden h-10 w-10 text-white/80 lg:block" />

            <h1 className="text-script-big relative text-6xl leading-[0.95] text-[#fff8f0] drop-shadow-[0_2px_12px_rgba(120,20,0,0.35)] sm:text-7xl lg:text-8xl">
              Pierce
              <br />
              <span className="relative inline-block">
                Your Story
                <Swoosh className="absolute -bottom-2 left-2 h-3 w-4/5" color="#ffd23f" />
              </span>
              <DoodleHeart className="absolute top-1/2 -right-2 h-9 w-9 text-[#ffd23f] sm:right-4" />
            </h1>

            <p className="mt-10 text-[13px] leading-relaxed font-semibold tracking-[0.3em] text-white/90 uppercase">
              Curated piercings.
              <br />
              Timeless you.
            </p>

            <Link
              className="btn-vibrant mt-8 inline-flex items-center gap-3 px-7 py-3.5 text-[13px] font-semibold shadow-lg"
              href="/shop"
            >
              Explore Collection <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-[644/880] max-w-sm rotate-2 overflow-hidden rounded-3xl border-[6px] border-[#fff8f0] shadow-[0_24px_60px_rgba(90,10,0,0.45)]">
              <Image
                alt="Curated piercings — nostril, septum, labret and a full ear stack"
                className="object-cover"
                fill
                priority
                sizes="40vw"
                src="/brand/covers/hero-founder.png"
              />
            </div>
            <DoodleCrown className="absolute -top-6 left-[14%] h-14 w-20 -rotate-6 text-[#ffd23f]" />
            <DoodleScratch className="absolute top-[16%] -right-4 h-9 w-11 text-white" />
            <DoodleHeart className="absolute -bottom-5 left-[18%] h-9 w-9 text-white" />
            <DoodleStar className="absolute -right-2 bottom-[22%] h-11 w-11 text-[#ffd23f]" />
          </div>
        </div>
      </section>

      {/* ============ 2 · Values strip — "Feel good. Look great." ============ */}
      <section className="border-b border-line bg-bg">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-0 gap-y-10 px-4 py-12 sm:px-6">
          <DoodleSun className="mr-6 hidden h-12 w-12 shrink-0 text-tangerine xl:block" />
          <div className="grid flex-1 grid-cols-2 gap-y-10 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <div
                className={`flex flex-col items-center px-4 text-center ${
                  i > 0 ? 'lg:border-l lg:border-line' : ''
                }`}
                key={v.title}
              >
                <div className="mb-3">{v.icon}</div>
                <h3 className="max-w-36 text-[15px] leading-snug font-medium text-ink">{v.title}</h3>
                <Swoosh className="mt-2 h-2.5 w-16" color={v.swoosh} />
              </div>
            ))}
          </div>
          <div className="relative mx-auto shrink-0 pl-6 lg:border-l lg:border-line lg:pl-10">
            <p className="text-script text-4xl leading-[1.05]">
              <span className="text-coral">Feel good.</span>
              <br />
              <span className="text-tangerine">Look great.</span>
            </p>
            <DoodleHeart className="absolute top-0 -right-8 h-8 w-8 text-accent" />
          </div>
        </div>
      </section>

      {/* ============ 3 · Our piercing studio — carousel ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" id="studio">
        <h2 className="mb-10 text-[15px] font-bold tracking-[0.35em] text-ink uppercase">
          Our Piercing Studio
        </h2>
        <StudioCarousel cards={studioCards} />
      </section>

      {/* ============ 4 · The Ouch vibe ============ */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6" id="vibe">
        <DoodleScratch className="absolute top-10 left-2 h-10 w-12 -scale-x-100 text-accent" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[47/29] overflow-hidden rounded-3xl">
            <Image
              alt="Ouch studio interior with neon sign"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/brand/studio-neon.png"
            />
          </div>
          <div className="relative">
            <DoodleHeart className="absolute -top-4 right-8 h-9 w-9 text-accent" />
            <p className="mb-4 text-[13px] font-bold tracking-[0.3em] text-ink uppercase">
              The Ouch vibe
            </p>
            <h2 className="text-script-big text-5xl leading-tight text-ink sm:text-6xl">
              <span className="relative inline-block">
                Safe. Stylish. Yours.
                <Swoosh className="absolute -bottom-1 left-0 h-3 w-3/4" color="#f43f8e" />
              </span>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-ink/80">
              A space where piercing meets personality — clean, calm and full of good vibes.
            </p>
            <a
              className="btn-vibrant mt-7 inline-flex items-center gap-3 px-7 py-3.5 text-[13px] font-semibold"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Book Your Studio Visit <span aria-hidden>→</span>
            </a>
            <DoodleSun className="absolute -right-2 -bottom-10 hidden h-16 w-16 text-violet lg:block" />
            <DoodleSparkle className="absolute right-16 -bottom-2 hidden h-6 w-6 text-sun lg:block" />
          </div>
        </div>
      </section>

      {/* ============ Fresh drops ============ */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6" id="drops">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
                Fresh drops
              </p>
              <h2 className="font-serif text-3xl font-medium">
                Wear the <span className="text-script text-rainbow text-4xl">sting</span>
                <span className="text-accent">.</span>
              </h2>
            </div>
            <Link
              className="text-[12px] font-bold tracking-[0.18em] text-muted uppercase hover:text-ink"
              href="/shop"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

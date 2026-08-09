import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo'
import { ProductCard } from '@/components/ProductCard'
import { getCategories, getFeaturedProducts, getSiteSettings } from '@/lib/queries'
import { accentFor, mediaAlt, mediaUrl } from '@/lib/utils'

// Always render fresh so catalogue changes made in the admin appear immediately.
export const dynamic = 'force-dynamic'

const VALUES = [
  {
    title: 'Express',
    blurb: 'Be unapologetically you.',
    color: 'text-coral',
    icon: (
      <svg fill="none" height="36" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" viewBox="0 0 36 36" width="36">
        <path d="M18 4v28M4 18h28M8 8l20 20M28 8L8 28" />
      </svg>
    ),
  },
  {
    title: 'Curate',
    blurb: 'Thoughtful pieces, always.',
    color: 'text-violet',
    icon: (
      <svg fill="none" height="36" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" viewBox="0 0 36 36" width="36">
        <path d="M18 6a12 12 0 11-8.5 3.5M18 12a6 6 0 106 6" />
      </svg>
    ),
  },
  {
    title: 'Craft',
    blurb: 'Safe, precise, beautiful.',
    color: 'text-accent',
    icon: (
      <svg fill="none" height="36" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 36 36" width="36">
        <path d="M18 31s-12-7.5-12-16a7 7 0 0112-4.5A7 7 0 0130 15c0 8.5-12 16-12 16z" />
      </svg>
    ),
  },
  {
    title: 'Energize',
    blurb: 'Good vibes, every time.',
    color: 'text-lime',
    icon: (
      <svg fill="none" height="36" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" viewBox="0 0 36 36" width="36">
        <path d="M20 4L8 20h8l-2 12 14-18h-9z" />
      </svg>
    ),
  },
  {
    title: 'Elevate',
    blurb: 'Little details, big energy.',
    color: 'text-sun',
    icon: (
      <svg fill="none" height="36" stroke="currentColor" strokeLinecap="round" strokeWidth="2.2" viewBox="0 0 36 36" width="36">
        <circle cx="18" cy="18" r="6" />
        <path d="M18 3v5M18 28v5M3 18h5M28 18h5M7 7l3.5 3.5M25.5 25.5L29 29M29 7l-3.5 3.5M10.5 25.5L7 29" />
      </svg>
    ),
  },
]

// Category tiles cropped from the brand mockup, matched to seeded categories.
const TILE_IMAGES: Record<string, string> = {
  'rings-hoops': '/brand/tile-hoops.png',
  ear: '/brand/tile-studs.png',
  barbells: '/brand/tile-curves.png',
  nose: '/brand/tile-dangles.png',
  'lip-labret': '/brand/tile-specials.png',
}

export default async function HomePage() {
  const [settings, categories, featured] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedProducts(),
  ])

  const whatsappHref = `https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`

  return (
    <div>
      {/* Hero */}
      <section className="wash-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pt-10 pb-0 sm:px-6 lg:grid-cols-2 lg:gap-4">
          <div className="pb-12 lg:pb-20">
            <Logo className="h-16 w-auto text-ink sm:h-20" />
            <p className="text-script mt-6 text-4xl leading-tight sm:text-5xl">
              Self&#8209;expression,
              <br />
              <span className="underline-squiggle">
                <span className="text-rainbow">curated</span>
              </span>
              <span className="text-tangerine">.</span>
            </p>
            <p className="mt-6 text-sm font-semibold tracking-[0.28em] text-ink/80 uppercase">
              Piercings&ensp;·&ensp;Ornaments&ensp;·&ensp;You
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                className="btn-vibrant px-8 py-3.5 text-[12px] font-bold tracking-[0.2em] uppercase"
                href="/shop"
              >
                Shop the collection ↗
              </Link>
              <a
                className="btn-outline px-8 py-3.5 text-[12px] font-bold tracking-[0.2em] uppercase"
                href={whatsappHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                Say hello
              </a>
            </div>
          </div>
          <div className="relative hidden aspect-[554/453] lg:block">
            <Image
              alt="Curated ear piercings"
              className="object-cover object-top"
              fill
              priority
              sizes="50vw"
              src="/brand/hero-portrait.png"
            />
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-y border-line bg-surface-2/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_2fr]">
          <h2 className="font-serif text-3xl leading-snug font-medium">
            Not just
            <br />
            a piercing.
            <br />
            It&apos;s{' '}
            <span className="text-script underline-squiggle text-4xl">
              <span className="text-rainbow">your story</span>
            </span>
            <span className="text-violet">.</span>
          </h2>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {VALUES.map((v) => (
              <div className="text-center" key={v.title}>
                <div className={`mx-auto mb-3 w-fit ${v.color}`}>{v.icon}</div>
                <h3 className="text-[12px] font-bold tracking-[0.2em] uppercase">{v.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{v.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated collection — category tiles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <p className="mb-2 text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
            Curated collection
          </p>
          <h2 className="font-serif text-3xl font-medium">
            Little details.{' '}
            <span className="text-script text-rainbow text-4xl">Big energy</span>
            <span className="text-lime">.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const accent = accentFor(cat.id)
            const brandTile = cat.slug ? TILE_IMAGES[cat.slug] : undefined
            const url = brandTile ?? mediaUrl(cat.image, 'card')
            return (
              <Link
                className={`group overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:shadow-lg ${accent.border}`}
                href={`/category/${cat.slug}`}
                key={cat.id}
              >
                <div className={`relative aspect-[4/3] overflow-hidden ${accent.tile}`}>
                  {url && (
                    <Image
                      alt={mediaAlt(cat.image, cat.name)}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      src={url}
                    />
                  )}
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <span className="text-[12px] font-bold tracking-[0.18em] uppercase">
                    {cat.name}
                  </span>
                  <span className={`text-sm ${accent.text}`}>→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
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

      {/* Studio band */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 overflow-hidden rounded-2xl lg:grid-cols-[1.2fr_1fr_0.7fr]">
          <div className="relative min-h-64">
            <Image
              alt="Ouch studio with neon sign: express your edge"
              className="rounded-2xl object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              src="/brand/studio-neon.png"
            />
          </div>
          <div className="rounded-2xl bg-violet/10 p-8">
            <p className="mb-3 text-[11px] font-bold tracking-[0.28em] text-muted uppercase">
              Our studio
            </p>
            <h2 className="font-serif text-3xl leading-snug font-medium">
              Good people.
              <br />
              Good energy.
              <br />
              <span className="text-script text-rainbow text-4xl">Great piercings</span>
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A safe, inclusive space where you can be 100% you.
            </p>
            <a
              className="btn-vibrant mt-6 inline-block px-7 py-3 text-[12px] font-bold tracking-[0.2em] uppercase"
              href={whatsappHref}
              rel="noopener noreferrer"
              target="_blank"
            >
              Say hello ↗
            </a>
          </div>
          <div className="hidden flex-col gap-4 lg:flex">
            {['studio-smiley', 'studio-tray', 'studio-wall'].map((img) => (
              <div className="relative flex-1 overflow-hidden rounded-2xl" key={img}>
                <Image
                  alt="Ouch studio detail"
                  className="object-cover"
                  fill
                  sizes="20vw"
                  src={`/brand/${img}.png`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

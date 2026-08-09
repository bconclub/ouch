import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ProductCard } from '@/components/ProductCard'
import { getCategories, getFeaturedProducts, getSiteSettings } from '@/lib/queries'
import { accentFor, mediaAlt, mediaUrl } from '@/lib/utils'

// Always render fresh so catalogue changes made in the admin appear immediately.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [settings, categories, featured] = await Promise.all([
    getSiteSettings(),
    getCategories(),
    getFeaturedProducts(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,46,99,0.28),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.22),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.25),transparent_55%),radial-gradient(ellipse_at_top_left,rgba(163,230,53,0.12),transparent_45%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="mb-4 text-xs font-semibold tracking-[0.35em] uppercase">
            <span className="text-accent">Piercings</span>
            <span className="text-muted"> · </span>
            <span className="text-cyan">Jewelry</span>
            <span className="text-muted"> · </span>
            <span className="text-lime">Supplies</span>
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-tight font-extrabold tracking-tight uppercase sm:text-6xl">
            Wear the <span className="text-rainbow">sting</span>.
          </h1>
          {settings.tagline && (
            <p className="mt-5 max-w-xl text-lg text-muted">{settings.tagline}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              className="btn-vibrant rounded-md px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase"
              href="/shop"
            >
              Shop all
            </Link>
            <Link
              className="rounded-md border border-cyan/60 px-8 py-3.5 text-sm font-bold tracking-widest text-cyan uppercase transition-colors hover:bg-cyan hover:text-black"
              href="/category/aftercare"
            >
              Aftercare
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight uppercase">
            Shop by category
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const url = mediaUrl(cat.image, 'card')
            const accent = accentFor(cat.id)
            return (
              <Link
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg border bg-surface transition-transform hover:-translate-y-1 ${accent.cardBorder}`}
                href={`/category/${cat.slug}`}
                key={cat.id}
              >
                {url && (
                  <Image
                    alt={mediaAlt(cat.image, cat.name)}
                    className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    src={url}
                  />
                )}
                <div
                  className={`absolute inset-0 flex items-end bg-gradient-to-t via-transparent to-transparent p-4 ${accent.glow}`}
                >
                  <span
                    className={`font-display text-sm font-semibold tracking-widest uppercase ${accent.text}`}
                  >
                    {cat.name}
                  </span>
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
            <h2 className="font-display text-2xl font-bold tracking-tight uppercase">
              <span className="text-rainbow">Featured</span>
            </h2>
            <Link className="text-sm text-muted hover:text-cyan" href="/shop">
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

      {/* Brand strip */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 text-center sm:px-6 md:grid-cols-3">
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest text-cyan uppercase">
              ✦ Implant-grade only
            </h3>
            <p className="mt-2 text-sm text-muted">
              Titanium, niobium & 316L steel that your skin will thank you for.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest text-lime uppercase">
              ✦ Order on WhatsApp
            </h3>
            <p className="mt-2 text-sm text-muted">
              Checkout sends your order straight to our chat — confirm and pay there.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest text-sun uppercase">
              ✦ Studio supplies
            </h3>
            <p className="mt-2 text-sm text-muted">
              Sterile needles, tools and aftercare trusted by professionals.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

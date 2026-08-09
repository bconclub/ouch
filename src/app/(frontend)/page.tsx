import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ProductCard } from '@/components/ProductCard'
import { getCategories, getFeaturedProducts, getSiteSettings } from '@/lib/queries'
import { mediaAlt, mediaUrl } from '@/lib/utils'

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
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(233,69,96,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(127,90,240,0.16),transparent_55%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <p className="mb-4 text-xs font-semibold tracking-[0.35em] text-accent uppercase">
            Piercings · Jewelry · Supplies
          </p>
          <h1 className="font-display max-w-3xl text-4xl leading-tight font-extrabold tracking-tight uppercase sm:text-6xl">
            Wear the <span className="text-accent">sting</span>.
          </h1>
          {settings.tagline && (
            <p className="mt-5 max-w-xl text-lg text-muted">{settings.tagline}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              className="bg-accent px-8 py-3.5 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-accent-hover"
              href="/shop"
            >
              Shop all
            </Link>
            <Link
              className="border border-line px-8 py-3.5 text-sm font-bold tracking-widest text-ink uppercase transition-colors hover:border-accent hover:text-accent"
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
            return (
              <Link
                className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface"
                href={`/category/${cat.slug}`}
                key={cat.id}
              >
                {url && (
                  <Image
                    alt={mediaAlt(cat.image, cat.name)}
                    className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    src={url}
                  />
                )}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4">
                  <span className="font-display text-sm font-semibold tracking-widest uppercase group-hover:text-accent">
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
            <h2 className="font-display text-2xl font-bold tracking-tight uppercase">Featured</h2>
            <Link className="text-sm text-muted hover:text-accent" href="/shop">
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
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase">
              Implant-grade only
            </h3>
            <p className="mt-2 text-sm text-muted">
              Titanium, niobium & 316L steel that your skin will thank you for.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase">
              Order on WhatsApp
            </h3>
            <p className="mt-2 text-sm text-muted">
              Checkout sends your order straight to our chat — confirm and pay there.
            </p>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase">
              Studio supplies
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

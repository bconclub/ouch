import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { ProductCard } from '@/components/ProductCard'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductPurchase } from '@/components/ProductPurchase'
import { getProductBySlug, getSiteSettings, queryProducts } from '@/lib/queries'
import { contactHref, accentFor, mediaAlt, mediaUrl } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  return { title: product?.title ?? 'Product' }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [product, settings] = await Promise.all([getProductBySlug(slug), getSiteSettings()])
  if (!product) notFound()
  const whatsappHref = contactHref(settings.whatsappNumber)

  const category = typeof product.category === 'object' ? product.category : null
  const isPoster = category?.slug === 'posters'

  const galleryImages = (product.images ?? [])
    .map((entry) => {
      const url = mediaUrl(entry.image, 'card')
      const thumb = mediaUrl(entry.image, 'thumbnail') ?? url
      if (!url || !thumb) return null
      return { url, thumb, alt: mediaAlt(entry.image, product.title) }
    })
    .filter((img): img is NonNullable<typeof img> => img !== null)

  const related = category
    ? (await queryProducts({ category: category.slug ?? undefined })).docs
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : []

  const specs: [string, string][] = []
  // Material intentionally not shown — founder is deciding on material messaging.
  if (product.gauge) specs.push(['Gauge', product.gauge])
  if (product.size) specs.push(['Size', product.size])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-xs text-muted">
        <Link className="hover:text-ink" href="/shop">
          Shop
        </Link>
        {category && (
          <>
            {' / '}
            <Link className="hover:text-ink" href={`/category/${category.slug}`}>
              {category.name}
            </Link>
          </>
        )}
        {' / '}
        <span className="text-ink">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery images={galleryImages} />

        <div>
          {category && (
            <div className={`mb-2 text-xs tracking-widest uppercase ${accentFor(category.id).text}`}>
              {category.name}
            </div>
          )}
          {!isPoster && (
            <span className="text-poster mb-3 inline-flex items-center gap-2 rounded-full bg-pink px-4 py-1.5 text-[11px] tracking-[0.14em] text-white uppercase">
              ✦ One batch only
            </span>
          )}
          <h1 className="text-poster mb-2 text-3xl uppercase sm:text-4xl">{product.title}</h1>

          {product.maker && (
            <p className="text-marker mb-4 text-[15px]">
              Made by <span className="text-pink">{product.maker}</span>
            </p>
          )}

          {isPoster ? (
            <div className="rounded-2xl bg-[var(--card-tint)] p-5">
              <p className="text-poster text-2xl">Coming soon 🖌️</p>
              <p className="mt-2 text-sm opacity-80">
                Prints and prices land together. Say hi and we&apos;ll tell you the day it opens.
              </p>
              <a
                className="text-poster mt-4 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 text-[13px] tracking-wide text-white uppercase"
                href={contactHref(settings.whatsappNumber, `Hey Ouch! Tell me when "${product.title}" is ready 🖌️`)}
              >
                Tell me when <span aria-hidden>→</span>
              </a>
            </div>
          ) : (
            <ProductPurchase product={product} whatsappHref={whatsappHref} />
          )}

          {!isPoster && (
            <p className="text-marker mt-5 text-[15px] text-yellow">
              {typeof product.stockCount === 'number' && product.stockCount > 0
                ? `Only ${product.stockCount} of these. Once they're gone, they're gone for good.`
                : "One small batch. Once it's gone, it's gone for good."}
            </p>
          )}

          {isPoster && (
            <div className="mt-5 rounded-2xl border border-line p-4">
              <p className="text-marker text-[15px] text-cyan">A printed poster, posted to you.</p>
              <ul className="mt-2 space-y-1 text-[13px] opacity-80">
                <li>✓ Printed on good matte paper, rolled in a tube</li>
                <li>✓ The real print is clean art, edge to edge — the logo lives only on this preview</li>
                <li>✓ Delivery starting soon — ask us and we&apos;ll let you know</li>
              </ul>
            </div>
          )}

          {specs.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 text-sm sm:grid-cols-3">
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs tracking-widest text-muted uppercase">{label}</dt>
                  <dd className="mt-1">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          {product.description && (
            <div className="prose mt-8 max-w-none border-t border-line pt-6 text-sm leading-relaxed text-muted [&_p]:mb-3">
              <RichText data={product.description} />
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-marker mb-8 text-3xl">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

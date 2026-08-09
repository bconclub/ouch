import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { ProductCard } from '@/components/ProductCard'
import { ProductGallery } from '@/components/ProductGallery'
import { ProductPurchase } from '@/components/ProductPurchase'
import { MATERIALS } from '@/collections/Products'
import { getProductBySlug, queryProducts } from '@/lib/queries'
import { accentFor, mediaAlt, mediaUrl } from '@/lib/utils'

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
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const category = typeof product.category === 'object' ? product.category : null
  const materialLabel = MATERIALS.find((m) => m.value === product.material)?.label

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
  if (materialLabel) specs.push(['Material', materialLabel])
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
          <h1 className="font-display mb-4 text-3xl font-bold tracking-tight">{product.title}</h1>

          <ProductPurchase product={product} />

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
          <h2 className="font-display mb-8 text-2xl font-bold tracking-tight uppercase">
            You may also like
          </h2>
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

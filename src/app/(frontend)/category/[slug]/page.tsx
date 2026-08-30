import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import { BrushStroke, SpraySplash } from '@/components/Paint'
import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/ProductCard'
import { ShopFilters } from '@/components/ShopFilters'
import { getCategoryBySlug, queryProducts, type ProductQuery } from '@/lib/queries'
import { accentFor, mediaAlt, mediaUrl, TILE_IMAGES } from '@/lib/utils'

type SearchParams = { [key: string]: string | string[] | undefined }

const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return {
    title: category?.name ?? 'Category',
    description: category?.description ?? undefined,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<SearchParams>
}) {
  const { slug } = await params
  const sp = await searchParams
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const query: ProductQuery = {
    category: slug,
    material: first(sp.material),
    search: first(sp.q),
    sort: (first(sp.sort) as ProductQuery['sort']) ?? 'newest',
    page: Number(first(sp.page)) || 1,
  }

  const result = await queryProducts(query)

  const accent = accentFor(category.id)
  const coverUrl = (category.slug && TILE_IMAGES[category.slug]) || mediaUrl(category.image, 'card')

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Painted category banner */}
      <section className="relative mb-10 overflow-hidden rounded-3xl">
        {coverUrl && (
          <Image
            alt={mediaAlt(category.image, category.name)}
            className="object-cover opacity-45"
            fill
            priority
            sizes="100vw"
            src={coverUrl}
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-bg via-bg/75 to-bg/20" />
        <SpraySplash
          className="absolute -top-6 right-[8%] h-32 w-32 opacity-70"
          color="var(--color-pink)"
          seed={61}
        />
        <SpraySplash
          className="absolute -bottom-8 right-[26%] h-28 w-28 opacity-60"
          color="var(--color-yellow)"
          seed={62}
        />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16">
          <nav className="mb-3 text-[11px] font-bold tracking-[0.2em] text-muted uppercase">
            <Link className="hover:text-ink" href="/shop">
              Shop
            </Link>{' '}
            / <span className="text-ink">{category.name}</span>
          </nav>
          <h1 className="relative w-fit">
            <BrushStroke
              className="absolute -inset-x-4 top-1/2 h-[150%] -translate-y-1/2 -rotate-1"
              color={accent.paint}
              seed={63}
            />
            <span className="text-poster relative block px-4 py-1 text-4xl text-bg uppercase sm:text-5xl">
              {category.name}
            </span>
          </h1>
          {category.description && (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink/85">
              {category.description}
            </p>
          )}
          <p className="text-marker mt-3 text-xl text-ink/70">
            {result.totalDocs} piece{result.totalDocs === 1 ? '' : 's'}
          </p>
        </div>
      </section>

      <Suspense>
        <ShopFilters
          categories={[]}
          materials={[]}
          showCategory={false}
        />
      </Suspense>

      {result.docs.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface py-20 text-center">
          <p className="text-marker text-2xl text-ink">Nothing here yet.</p>
          <p className="mt-2 text-sm text-muted">Something new turns up soon 🤞</p>
          <Link
            className="text-poster mt-6 inline-block rounded-full bg-ink px-7 py-3 text-[13px] text-bg uppercase"
            href="/shop"
          >
            Shop everything
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {result.docs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        basePath={`/category/${slug}`}
        page={result.page ?? 1}
        searchParams={{
          material: query.material,
          q: query.search,
          sort: query.sort,
        }}
        totalPages={result.totalPages}
      />
    </div>
  )
}

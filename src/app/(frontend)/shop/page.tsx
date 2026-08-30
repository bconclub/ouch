import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/ProductCard'
import { ShopFilters } from '@/components/ShopFilters'
import { getCategories, queryProducts, type ProductQuery } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Shop All',
}

type SearchParams = { [key: string]: string | string[] | undefined }

const first = (v: string | string[] | undefined): string | undefined =>
  Array.isArray(v) ? v[0] : v

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const query: ProductQuery = {
    category: first(params.category),
    material: first(params.material),
    search: first(params.q),
    sort: (first(params.sort) as ProductQuery['sort']) ?? 'newest',
    page: Number(first(params.page)) || 1,
    // Posters live in their own shop at /posters
    excludeCategory: first(params.category) ? undefined : 'posters',
  }

  const [categories, result] = await Promise.all([getCategories(), queryProducts(query)])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-marker mb-1 text-4xl">The good stuff</h1>
      <p className="text-marker mb-8 text-lg text-muted">
        Hand-picked one at a time, with far too much thinking. Ask about any piece and we'll send the price, a photo and how soon it can be yours.
      </p>

      <div className="mb-8 rounded-2xl border border-line p-5">
        <p className="text-marker text-lg">
          New to this? A <span className="text-pink">stud</span> is the little one that sits flat —
          a tiny ball, a gem, a shape. A <span className="text-purple">hoop</span> is the ring that
          goes around. A <span className="text-cyan">barbell</span> is the straight bar with a ball
          at each end.
        </p>
        <p className="mt-2 text-sm opacity-80">
          Not sure what fits your piercing? Send us a photo on WhatsApp — we&apos;ll tell you
          straight. Studs come with <span className="font-semibold">free delivery — a day, two tops</span>.
        </p>
      </div>

      <Suspense>
        <ShopFilters
          categories={categories
            .filter((c) => c.slug !== 'posters')
            .map((c) => ({ label: c.name, value: c.slug ?? '' }))}
          materials={[]}
        />
      </Suspense>

      {result.docs.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface py-20 text-center text-muted">
          Nothing here yet — loosen the filters and try again 🌸
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {result.docs.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <Pagination
        basePath="/shop"
        page={result.page ?? 1}
        searchParams={{
          category: query.category,
          material: query.material,
          q: query.search,
          sort: query.sort,
        }}
        totalPages={result.totalPages}
      />
    </div>
  )
}

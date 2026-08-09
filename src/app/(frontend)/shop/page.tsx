import type { Metadata } from 'next'
import React, { Suspense } from 'react'

import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/ProductCard'
import { ShopFilters } from '@/components/ShopFilters'
import { MATERIALS } from '@/collections/Products'
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
  }

  const [categories, result] = await Promise.all([getCategories(), queryProducts(query)])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight uppercase">Shop All</h1>
      <p className="mb-8 text-sm text-muted">
        {result.totalDocs} product{result.totalDocs === 1 ? '' : 's'}
      </p>

      <Suspense>
        <ShopFilters
          categories={categories.map((c) => ({ label: c.name, value: c.slug ?? '' }))}
          materials={MATERIALS.map((m) => ({ label: m.label, value: m.value }))}
        />
      </Suspense>

      {result.docs.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface py-20 text-center text-muted">
          No products match your filters.
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

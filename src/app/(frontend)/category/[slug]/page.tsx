import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/ProductCard'
import { ShopFilters } from '@/components/ShopFilters'
import { MATERIALS } from '@/collections/Products'
import { getCategoryBySlug, queryProducts, type ProductQuery } from '@/lib/queries'
import { accentFor } from '@/lib/utils'

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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display mb-2 text-3xl font-bold tracking-tight uppercase">
        <span className={accentFor(category.id).text}>{category.name}</span>
      </h1>
      {category.description && <p className="mb-2 max-w-2xl text-muted">{category.description}</p>}
      <p className="mb-8 text-sm text-muted">
        {result.totalDocs} product{result.totalDocs === 1 ? '' : 's'}
      </p>

      <Suspense>
        <ShopFilters
          categories={[]}
          materials={MATERIALS.map((m) => ({ label: m.label, value: m.value }))}
          showCategory={false}
        />
      </Suspense>

      {result.docs.length === 0 ? (
        <div className="rounded-lg border border-line bg-surface py-20 text-center text-muted">
          No products in this category yet.
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

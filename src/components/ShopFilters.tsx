'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type Option = { label: string; value: string }

export function ShopFilters({
  categories,
  materials,
  showCategory = true,
}: {
  categories: Option[]
  materials: Option[]
  showCategory?: boolean
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '')
  }, [searchParams])

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`)
  }

  const selectClass =
    'rounded border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none'

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <form
        className="relative min-w-52 flex-1 sm:max-w-xs"
        onSubmit={(e) => {
          e.preventDefault()
          setParam('q', search.trim())
        }}
      >
        <input
          className="w-full rounded border border-line bg-surface px-3 py-2 pr-9 text-sm placeholder:text-muted focus:border-accent focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products…"
          type="search"
          value={search}
        />
        <button
          aria-label="Search"
          className="absolute top-1/2 right-2 -translate-y-1/2 text-muted hover:text-ink"
          type="submit"
        >
          <svg fill="none" height="18" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="18">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
        </button>
      </form>

      {showCategory && (
        <select
          aria-label="Filter by category"
          className={selectClass}
          onChange={(e) => setParam('category', e.target.value)}
          value={searchParams.get('category') ?? ''}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      )}

      {materials.length > 0 && (
        <select
          aria-label="Filter by material"
          className={selectClass}
          onChange={(e) => setParam('material', e.target.value)}
          value={searchParams.get('material') ?? ''}
        >
          <option value="">All materials</option>
          {materials.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      )}

      <select
        aria-label="Sort products"
        className={selectClass}
        onChange={(e) => setParam('sort', e.target.value)}
        value={searchParams.get('sort') ?? 'newest'}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price: low → high</option>
        <option value="price-desc">Price: high → low</option>
      </select>
    </div>
  )
}

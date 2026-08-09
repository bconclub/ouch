import Link from 'next/link'
import React from 'react'

export function Pagination({
  page,
  totalPages,
  basePath,
  searchParams,
}: {
  page: number
  totalPages: number
  basePath: string
  searchParams: Record<string, string | undefined>
}) {
  if (totalPages <= 1) return null

  const hrefFor = (p: number) => {
    const params = new URLSearchParams()
    for (const [key, value] of Object.entries(searchParams)) {
      if (value && key !== 'page') params.set(key, value)
    }
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return qs ? `${basePath}?${qs}` : basePath
  }

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {page > 1 && (
        <Link className="rounded border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-ink" href={hrefFor(page - 1)}>
          ← Prev
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          className={`rounded border px-3 py-1.5 text-sm ${
            p === page
              ? 'border-accent bg-accent text-white'
              : 'border-line text-muted hover:border-accent hover:text-ink'
          }`}
          href={hrefFor(p)}
          key={p}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link className="rounded border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-ink" href={hrefFor(page + 1)}>
          Next →
        </Link>
      )}
    </nav>
  )
}

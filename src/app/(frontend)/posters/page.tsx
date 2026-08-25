import type { Metadata } from 'next'
import React from 'react'

import { PosterCard } from '@/components/PosterCard'
import { Reveal } from '@/components/Reveal'
import { BrushStroke } from '@/components/Paint'
import { orderPosters } from '@/lib/posterOrder'
import { queryProducts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Peace on Paper',
}

export default async function PostersPage() {
  const result = await queryProducts({ category: 'posters', limit: 48 })
  const posters = orderPosters(result.docs)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="mb-10">
        <h1 className="text-poster relative w-fit text-4xl sm:text-5xl">
          Peace on paper.
          <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-cyan)" seed={88} />
        </h1>
        <p className="text-marker mt-4 text-lg">
          Real printed posters, posted to you. Every print <span className="text-pink">₹333</span>. Flat.
        </p>
      </Reveal>

      {result.docs.length === 0 ? (
        <div className="rounded-2xl border border-line bg-surface py-14 text-center">
          <p className="text-marker text-lg">Fresh prints landing soon.</p>
          <p className="mt-2 text-sm text-muted">Come back in a bit — good things take a minute.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-12">
          {posters.map((poster) => (
            <PosterCard key={poster.id} product={poster} />
          ))}
        </div>
      )}
    </div>
  )
}

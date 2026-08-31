import type { Metadata } from 'next'
import React from 'react'

import { BookmarkCard } from '@/components/BookmarkCard'
import { PosterCard } from '@/components/PosterCard'
import { Reveal } from '@/components/Reveal'
import { BrushStroke } from '@/components/Paint'
import { orderPosters } from '@/lib/posterOrder'
import { queryProducts } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Peace on Paper',
}

export default async function PostersPage() {
  const [result, bookmarksResult] = await Promise.all([
    queryProducts({ category: 'posters', limit: 48 }),
    queryProducts({ category: 'bookmarks', limit: 48 }),
  ])
  const posters = orderPosters(result.docs)
  const bookmarks = bookmarksResult.docs

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal className="mb-10">
        <h1 className="text-poster relative w-fit text-4xl sm:text-5xl">
          Peace on paper.
          <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-cyan)" seed={88} />
        </h1>
        <p className="text-marker mt-4 text-lg">
          Real printed posters. Price lands with the launch. <span className="text-pink">Soon.</span>
        </p>
        <p className="text-marker mt-2 text-[15px] text-cyan">
          Still cooking — drop us a note and we&apos;ll tell you the day it&apos;s served. 🍳
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

      {bookmarks.length > 0 && (
        <Reveal className="mt-16">
          <h2 className="text-poster relative w-fit text-3xl sm:text-4xl">
            Little reminders.
            <BrushStroke className="absolute -bottom-2 left-0 h-3 w-full" color="var(--color-yellow)" seed={53} />
          </h2>
          <p className="text-marker mt-3 text-[15px]">
            Bookmarks with big feelings. One for your book, one for a friend.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {bookmarks.map((b) => (
              <BookmarkCard key={b.id} product={b} />
            ))}
          </div>
        </Reveal>
      )}
    </div>
  )
}

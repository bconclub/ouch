'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

import { PaintChip } from './Doodles'

export type StudioCard = {
  label: string
  href: string
  image: string | null
  chipColor: string
}

export function StudioCarousel({ cards }: { cards: StudioCard[] }) {
  const track = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: number) => {
    track.current?.scrollBy({ left: dir * 260, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        aria-label="Scroll left"
        className="absolute top-[40%] -left-4 z-10 hidden h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-bg text-ink transition-colors hover:bg-ink hover:text-white sm:flex"
        onClick={() => scrollBy(-1)}
        type="button"
      >
        ←
      </button>
      <div className="flex gap-5 overflow-x-auto pb-8 [scrollbar-width:none]" ref={track}>
        {cards.map((card) => (
          <Link
            className="group relative w-44 shrink-0 sm:w-48"
            href={card.href}
            key={card.label}
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-surface-2">
              {card.image && (
                <Image
                  alt={card.label}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  fill
                  sizes="200px"
                  src={card.image}
                />
              )}
            </div>
            <div className="absolute -bottom-4 left-3">
              <PaintChip color={card.chipColor}>
                <span className="text-script text-2xl text-ink">{card.label}</span>
              </PaintChip>
            </div>
          </Link>
        ))}
      </div>
      <button
        aria-label="Scroll right"
        className="absolute top-[40%] -right-4 z-10 hidden h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-bg text-ink transition-colors hover:bg-ink hover:text-white sm:flex"
        onClick={() => scrollBy(1)}
        type="button"
      >
        →
      </button>
    </div>
  )
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

/**
 * Shop by the hole you already have. The founder's own portrait is the menu:
 * tap the spot on her face and see what fits there. Percentages are positions
 * on the portrait, so the dots follow the image at any size.
 */
type Spot = {
  id: string
  label: string
  note: string
  href: string
  x: number
  y: number
  dot: string
}

const SPOTS: Spot[] = [
  { id: 'eyebrow', label: 'Eyebrow', note: 'Curved barbells, tiny ends', href: '/category/studs-gems', x: 19, y: 24, dot: 'bg-yellow' },
  { id: 'septum', label: 'Septum', note: 'Clickers, horseshoes, hoops', href: '/category/septum-vibes', x: 31, y: 36, dot: 'bg-pink' },
  { id: 'nostril', label: 'Nostril', note: 'Flat backs, tiny gems', href: '/category/dainty-nostrils', x: 37, y: 33, dot: 'bg-cyan' },
  { id: 'lip', label: 'Lip', note: 'Labrets, flat discs', href: '/category/studs-gems', x: 37, y: 45, dot: 'bg-orange' },
  { id: 'lobe', label: 'Lobe', note: 'Studs, huggies, little hoops', href: '/category/ear-stacks', x: 68, y: 37, dot: 'bg-purple' },
  { id: 'helix', label: 'Helix', note: 'Stacks, chains, tiny hoops', href: '/category/ear-stacks', x: 66, y: 31, dot: 'bg-lime' },
]

export function FaceMap() {
  const [active, setActive] = useState<Spot | null>(null)

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1fr_320px]">
      <div className="relative mx-auto w-full max-w-md">
        <Image
          alt="Tap a piercing spot to see what fits"
          className="h-auto w-full"
          height={1512}
          priority={false}
          src="/brand/covers/hero-cutout.png"
          width={1035}
        />

        {SPOTS.map((s) => {
          const on = active?.id === s.id
          return (
            <button
              aria-label={`${s.label} piercings`}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              key={s.id}
              onClick={() => setActive(on ? null : s)}
              onMouseEnter={() => setActive(s)}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              type="button"
            >
              <span className={`block h-3.5 w-3.5 rounded-full ${s.dot} ring-2 ring-white/70`} />
              <span
                aria-hidden
                className={`absolute inset-0 -m-2 rounded-full ${s.dot} opacity-40 ${on ? '' : 'animate-ping'}`}
              />
              <span
                className={`text-poster absolute top-1/2 left-6 -translate-y-1/2 rounded-full bg-[var(--band-1)] px-3 py-1 text-[11px] whitespace-nowrap uppercase transition-opacity ${
                  on ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {s.label}
              </span>
            </button>
          )
        })}
      </div>

      <div>
        <p className="text-marker text-lg">
          Tap a dot. <span className="text-pink">See what fits.</span>
        </p>
        <p className="mt-2 text-sm opacity-75">
          You know where your hole is — not what the piece is called. So start there.
        </p>

        {active ? (
          <div className="mt-5 rounded-2xl bg-[var(--card-tint)] p-5">
            <p className="text-poster text-xl uppercase">{active.label}</p>
            <p className="mt-1 text-sm opacity-80">{active.note}</p>
            <Link
              className="text-poster mt-4 inline-flex items-center gap-2 rounded-full bg-pink px-6 py-3 text-[13px] tracking-wide text-white uppercase"
              href={active.href}
            >
              See {active.label.toLowerCase()} pieces <span aria-hidden>→</span>
            </Link>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2">
            {SPOTS.map((s) => (
              <button
                className="rounded-full border border-[var(--band-line)] px-4 py-2 text-[12px] font-bold tracking-[0.12em] uppercase transition-colors hover:border-pink"
                key={s.id}
                onClick={() => setActive(s)}
                type="button"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { DoodleHeart } from './Doodles'
import { BandBlend, BrushStroke, SpraySplash } from './Paint'
import { Reveal } from './Reveal'

const POSTERS = [
  { kind: 'photo-text', text: 'Be bold. Be you.', image: '/brand/covers/zone-ear.png', bg: 'bg-purple', textColor: 'text-white' },
  { kind: 'text', text: 'Pierced to express, not to impress.', bg: 'band-paper', textColor: 'text-purple' },
  { kind: 'paint-text', text: 'Small piece. Big vibes.', bg: 'bg-pink', textColor: 'text-white' },
  { kind: 'photo-text', text: 'Your body, your rules.', image: '/brand/covers/cat-sets.png', bg: 'bg-orange', textColor: 'text-white' },
  { kind: 'paint-text', text: 'Not basic. Always Ouch.', bg: 'bg-cyan', textColor: 'text-white' },
]

export function PostersSection() {
  return (
    <>
      {/* ============ 03 · Walls can feel too (posters) ============ */}
      <section className="band-black" id="posters">
        <div className="mx-auto grid min-h-[70vh] max-w-[90rem] content-center items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[250px_1fr]">
          <Reveal>
            <h2 className="text-marker mt-1 text-3xl leading-snug text-pink lg:text-4xl">
              Walls can
              <br />
              feel too.
            </h2>
            <p className="mt-3 text-sm opacity-75">
              Art that talks back.
              <br />
              Your walls deserve it.
            </p>
            <p className="text-marker mt-3 text-[15px] text-cyan">
              By the way — every poster is <span className="text-pink">₹333</span>. Flat.
            </p>
            <Link
              className="text-poster mt-4 inline-flex items-center gap-2 rounded-full bg-cyan px-5 py-2.5 text-[12px] tracking-wide text-[#0a2a30] uppercase transition-transform hover:scale-105"
              href="/shop"
            >
              Peep the walls <span aria-hidden>→</span>
            </Link>
          </Reveal>

          <div className="relative">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {POSTERS.map((poster, i) => (
                <Reveal delay={i * 70} key={poster.text}>
                <div
                  className={`relative aspect-[3/4] overflow-hidden rounded-xl transition-transform duration-300 hover:-translate-y-1.5 hover:rotate-[-1deg] ${poster.kind === 'text' ? poster.bg : ''} ${
                    poster.kind !== 'photo-text' && poster.kind !== 'text' ? poster.bg : ''
                  }`}
                >
                  {poster.kind === 'photo-text' && poster.image && (
                    <>
                      <Image
                        alt=""
                        className="object-cover opacity-80"
                        fill
                        sizes="(max-width: 640px) 45vw, 16vw"
                        src={poster.image}
                      />
                      <div aria-hidden className={`absolute inset-0 opacity-55 ${poster.bg}`} />
                    </>
                  )}
                  {poster.kind === 'paint-text' && (
                    <SpraySplash
                      className="absolute -right-6 -bottom-6 h-28 w-28 opacity-70"
                      color={i === 2 ? 'var(--color-orange)' : 'var(--color-purple)'}
                      seed={80 + i}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center p-4">
                    <span className={`text-poster text-xl leading-tight uppercase lg:text-2xl ${poster.textColor} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
                      {poster.text}
                    </span>
                  </div>
                  <DoodleHeart className="absolute right-3 bottom-3 h-5 w-5 text-white/80" />
                </div>
                </Reveal>
              ))}
            </div>
            <span aria-hidden className="chip-arrow bg-pink absolute top-1/2 -right-4 hidden -translate-y-1/2 lg:flex">→</span>
          </div>
        </div>
      </section>
    </>
  )
}

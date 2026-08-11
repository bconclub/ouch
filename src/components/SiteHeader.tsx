'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { CartButton } from './CartButton'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

const NAV_LINKS = [
  { href: '/shop', label: 'Piercings' },
  { href: '/category/rings-hoops', label: 'Jewellery' },
  { href: '/#studio', label: 'Studio' },
  { href: '/#drops', label: 'Journal' },
  { href: '/#vibe', label: 'About' },
]

export function SiteHeader({
  storeName,
  announcement,
}: {
  storeName: string
  announcement?: string | null
}) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  // Only the home page has a full-bleed colour hero to sit on top of.
  const onHero = pathname === '/'

  useEffect(() => {
    if (!onHero) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onHero])

  // Transparent, white-on-gradient while sitting over the hero.
  const overlay = onHero && !scrolled

  return (
    <>
      {announcement && (
        <div className="bar-rainbow px-4 py-1.5 text-center text-[11px] font-bold tracking-[0.2em] text-ink uppercase">
          {announcement}
        </div>
      )}
      <header
        className={`sticky top-0 z-30 border-b transition-colors duration-300 ${
          overlay
            ? 'border-transparent bg-transparent text-white'
            : 'border-line/60 bg-bg/90 text-ink backdrop-blur'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <MobileNav links={NAV_LINKS} />
            <Link aria-label={`${storeName} home`} className="text-current" href="/">
              <Logo className="h-9 w-auto sm:h-11" variant={overlay ? 'white' : 'ink'} />
            </Link>
          </div>

          <nav className="hidden items-center gap-8 text-[14px] font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                className="text-current opacity-80 transition-opacity hover:opacity-100"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Link
              aria-label="Search products"
              className="rounded p-2 text-current opacity-90 transition-opacity hover:opacity-100"
              href="/shop"
            >
              <svg fill="none" height="21" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" width="21">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              aria-label="Favourites"
              className="hidden rounded p-2 text-current opacity-90 transition-opacity hover:opacity-100 sm:block"
              href="/shop"
            >
              <svg fill="none" height="21" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" width="21">
                <path
                  d="M12 21S3 15.5 3 9.5A5.5 5.5 0 0112 5a5.5 5.5 0 019 4.5C21 15.5 12 21 12 21z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <CartButton />
          </div>
        </div>
      </header>
    </>
  )
}

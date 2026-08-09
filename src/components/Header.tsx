import Link from 'next/link'
import React from 'react'

import { getSiteSettings } from '@/lib/queries'
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

export async function Header() {
  const settings = await getSiteSettings()

  return (
    <>
      {settings.announcement && (
        <div className="bar-rainbow px-4 py-1.5 text-center text-[11px] font-bold tracking-[0.2em] text-ink uppercase">
          {settings.announcement}
        </div>
      )}
      <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <MobileNav links={NAV_LINKS} />
            <Link aria-label={`${settings.storeName} home`} className="text-ink" href="/">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          <nav className="hidden items-center gap-8 text-[14px] font-medium md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                className="text-ink/80 transition-colors hover:text-ink"
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
              className="rounded p-2 text-ink transition-colors hover:text-accent"
              href="/shop"
            >
              <svg fill="none" height="21" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" width="21">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
            </Link>
            <Link
              aria-label="Favourites"
              className="hidden rounded p-2 text-ink transition-colors hover:text-accent sm:block"
              href="/shop"
            >
              <svg fill="none" height="21" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" width="21">
                <path d="M12 21S3 15.5 3 9.5A5.5 5.5 0 0112 5a5.5 5.5 0 019 4.5C21 15.5 12 21 12 21z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <CartButton />
          </div>
        </div>
      </header>
    </>
  )
}

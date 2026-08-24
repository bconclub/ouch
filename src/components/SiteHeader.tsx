'use client'

import Link from 'next/link'
import React from 'react'

import { CartButton } from './CartButton'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from './ThemeToggle'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Piercings' },
  { href: '/category/studs-gems', label: 'Studs' },
  { href: '/posters', label: 'Posters' },
  { href: '/partners', label: 'Partner' },
  { href: '/#connect', label: 'Contact' },
]

export function SiteHeader({ storeName }: { storeName: string }) {
  return (
    <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <MobileNav links={NAV_LINKS} />
          <Link aria-label={`${storeName} home`} className="relative text-current" href="/">
            <Logo className="h-8 w-auto sm:h-10" />
          </Link>
        </div>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link, i) => (
            <Link
              className={`text-poster text-[15px] tracking-wide uppercase transition-colors ${
                i === 0 ? 'text-pink dark:text-ink' : 'text-ink hover:text-pink'
              }`}
              href={link.href}
              key={link.label}
            >
              {link.label}
              {i === 0 && (
                <span className="mt-0.5 block h-[3px] w-full rounded-full bg-pink dark:bg-yellow" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            aria-label="Search products"
            className="rounded p-2 text-ink transition-colors hover:text-pink"
            href="/shop"
          >
            <svg fill="none" height="21" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" width="21">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
            </svg>
          </Link>
          <CartButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

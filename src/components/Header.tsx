import Link from 'next/link'
import React from 'react'

import { getCategories, getSiteSettings } from '@/lib/queries'
import { CartButton } from './CartButton'
import { MobileNav } from './MobileNav'

export async function Header() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()])
  const navCategories = categories.slice(0, 5)

  return (
    <>
      {settings.announcement && (
        <div className="bg-accent px-4 py-1.5 text-center text-xs font-semibold tracking-widest text-white uppercase">
          {settings.announcement}
        </div>
      )}
      <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <MobileNav
              links={[
                { href: '/shop', label: 'Shop All' },
                ...navCategories.map((c) => ({
                  href: `/category/${c.slug}`,
                  label: c.name,
                })),
              ]}
            />
            <Link className="font-display text-2xl font-bold tracking-tight" href="/">
              {settings.storeName.toUpperCase()}
              <span className="text-accent">.</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link className="text-muted transition-colors hover:text-ink" href="/shop">
              Shop All
            </Link>
            {navCategories.map((c) => (
              <Link
                className="text-muted transition-colors hover:text-ink"
                href={`/category/${c.slug}`}
                key={c.id}
              >
                {c.name}
              </Link>
            ))}
          </nav>

          <CartButton />
        </div>
      </header>
    </>
  )
}

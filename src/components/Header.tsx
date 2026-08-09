import Link from 'next/link'
import React from 'react'

import { getCategories, getSiteSettings } from '@/lib/queries'
import { accentFor } from '@/lib/utils'
import { CartButton } from './CartButton'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

export async function Header() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()])
  const navCategories = categories.slice(0, 5)

  return (
    <>
      {settings.announcement && (
        <div className="bar-rainbow px-4 py-1.5 text-center text-[11px] font-bold tracking-[0.2em] text-ink uppercase">
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
            <Link aria-label={`${settings.storeName} home`} className="text-ink" href="/">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          <nav className="hidden items-center gap-7 text-[12px] font-semibold tracking-[0.18em] uppercase md:flex">
            <Link className="text-ink/70 transition-colors hover:text-ink" href="/shop">
              Shop All
            </Link>
            {navCategories.map((c) => (
              <Link
                className={`text-ink/70 transition-colors ${accentFor(c.id).hoverText}`}
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

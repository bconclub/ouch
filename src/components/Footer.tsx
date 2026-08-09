import Link from 'next/link'
import React from 'react'

import { getCategories, getSiteSettings } from '@/lib/queries'

export async function Footer() {
  const [settings, categories] = await Promise.all([getSiteSettings(), getCategories()])

  return (
    <footer className="mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="font-display text-2xl font-bold">
            {settings.storeName.toUpperCase()}
            <span className="text-accent">.</span>
          </div>
          {settings.tagline && <p className="mt-3 max-w-xs text-sm text-muted">{settings.tagline}</p>}
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-widest text-muted uppercase">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="text-muted hover:text-ink" href="/shop">
                All products
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link className="text-muted hover:text-ink" href={`/category/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-widest text-muted uppercase">Contact</h3>
          <ul className="space-y-2 text-sm text-muted">
            {settings.whatsappNumber && (
              <li>
                <a
                  className="hover:text-ink"
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^\d]/g, '')}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </li>
            )}
            {settings.contactEmail && (
              <li>
                <a className="hover:text-ink" href={`mailto:${settings.contactEmail}`}>
                  {settings.contactEmail}
                </a>
              </li>
            )}
            {settings.instagramUrl && (
              <li>
                <a className="hover:text-ink" href={settings.instagramUrl} rel="noopener noreferrer" target="_blank">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import React, { useState } from 'react'

type NavLink = { href: string; label: string }

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        aria-label="Open menu"
        className="rounded p-1.5 text-ink hover:text-accent"
        onClick={() => setOpen(true)}
        type="button"
      >
        <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-4">
            <span className="font-display text-xl font-bold">
              MENU<span className="text-accent">.</span>
            </span>
            <button
              aria-label="Close menu"
              className="rounded p-1.5 text-muted hover:text-ink"
              onClick={() => setOpen(false)}
              type="button"
            >
              <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-4 pt-4">
            {links.map((link) => (
              <Link
                className="border-b border-line py-4 font-display text-xl tracking-wide hover:text-accent"
                href={link.href}
                key={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}

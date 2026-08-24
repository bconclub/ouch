'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type NavLink = { href: string; label: string }

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // Close on Escape, and whenever the viewport grows to desktop (where the
  // full nav takes over) so the panel can never linger on a wide screen.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  /* The header is a sticky, z-indexed stacking context, so a panel rendered
     inside it can never paint above the page — portal it to <body>. It stays
     md:hidden in its own right, since the portal escapes the wrapper. */
  const dropdown = (
    <div className="md:hidden">
      <button
        aria-label="Close menu"
        className="fixed inset-0 z-[9998] cursor-default bg-black/60"
        onClick={() => setOpen(false)}
        type="button"
      />
      <div className="fixed top-[4.75rem] right-3 left-3 z-[9999] overflow-hidden rounded-2xl border border-line bg-[var(--color-bg)] text-[var(--color-ink)] shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
        <nav className="flex flex-col p-2">
          {links.map((link) => (
            <Link
              className="text-poster rounded-xl px-4 py-3.5 text-lg transition-colors hover:bg-[var(--card-tint)] hover:text-pink"
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-marker border-t border-line px-5 py-3 text-[13px] opacity-60">
          Peace. Love. Piercings.
        </p>
      </div>
    </div>
  )

  return (
    <div className="md:hidden">
      <button
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="rounded p-1.5 text-current opacity-90 transition-opacity hover:opacity-100"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {open ? (
          <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg fill="none" height="24" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="24">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        )}
      </button>
      {open && mounted && createPortal(dropdown, document.body)}
    </div>
  )
}

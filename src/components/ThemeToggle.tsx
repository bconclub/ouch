'use client'

import React, { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'ouch-theme'

/** Runs before paint so the page never flashes the wrong theme. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t='light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme')
    setTheme(current === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // private mode — theme just won't persist
    }
  }

  return (
    <button
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-[#17141a] transition-transform hover:scale-110 active:scale-95"
      onClick={toggle}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      type="button"
    >
      {theme === 'dark' ? (
        // Sleeping smiley for dark mode
        <svg fill="none" height="26" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 26 26" width="26">
          <circle cx="13" cy="13" r="11" strokeWidth="2" />
          <path d="M7.5 11h3.5M15 11h3.5" />
          <path d="M8.5 16.5c1.4 1.6 3 2.4 4.5 2.4s3.1-.8 4.5-2.4" />
        </svg>
      ) : (
        <svg fill="none" height="26" stroke="currentColor" strokeLinecap="round" strokeWidth="2" viewBox="0 0 26 26" width="26">
          <circle cx="13" cy="13" r="11" strokeWidth="2" />
          <circle cx="9.5" cy="10.5" fill="currentColor" r="1.4" stroke="none" />
          <circle cx="16.5" cy="10.5" fill="currentColor" r="1.4" stroke="none" />
          <path d="M8.5 15.5c1.4 1.9 3 2.8 4.5 2.8s3.1-.9 4.5-2.8" />
        </svg>
      )}
    </button>
  )
}

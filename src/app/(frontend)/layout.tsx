import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import React from 'react'

import { CartProvider } from '@/lib/cart'
import { getSiteSettings } from '@/lib/queries'
import { CartDrawer } from '@/components/CartDrawer'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import './styles.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const startStory = localFont({
  src: '../../fonts/StartStory.ttf',
  variable: '--font-start-story',
})


// Header and footer are driven by Payload, so every storefront route is
// rendered per request. This also keeps the production build from needing a
// database or secret at build time.
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  return {
    title: {
      default: `${settings.storeName} — Piercings that hit different`,
      template: `%s — ${settings.storeName}`,
    },
    description: settings.tagline ?? 'Bold pieces. Good vibes. Made to stand out, just like you.',
  }
}

export default async function StorefrontLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      className={`${spaceGrotesk.variable} ${startStory.variable}`}
      data-theme="dark"
      lang="en"
      suppressHydrationWarning
    >
      <head>
        {/* Static file: App Router only supports beforeInteractive scripts with src,
            and an inline <script> in the React tree breaks hydration. */}
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[60vh]">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}

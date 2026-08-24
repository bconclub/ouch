import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'

import '../(frontend)/styles.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const startStory = localFont({
  src: '../../fonts/StartStory.ttf',
  variable: '--font-start-story',
})

export const metadata: Metadata = {
  title: 'Ouch — Peace. Love. Piercings.',
  description: 'Say hi to Ouch — call, WhatsApp, or find us online.',
  robots: { index: false },
}

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${spaceGrotesk.variable} ${startStory.variable}`} data-theme="dark" lang="en">
      <body>{children}</body>
    </html>
  )
}

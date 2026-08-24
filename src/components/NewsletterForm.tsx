'use client'

import React, { useState } from 'react'

/** JOIN THE LOOP — opens a WhatsApp chat carrying the entered email. */
export function NewsletterForm({ whatsappHref }: { whatsappHref: string }) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hey Ouch! Add me to the loop${email ? ` — ${email}` : ''} 🤘`,
    )
    window.open(`${whatsappHref}?text=${message}`, '_blank', 'noopener')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <form className="mt-4 flex gap-2" onSubmit={subscribe}>
      <input
        className="w-full min-w-0 rounded-full bg-white px-4 py-2.5 text-sm text-[#17141a] placeholder:text-[#8a8494] focus:outline-none"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@goodvibes.com"
        type="email"
        value={email}
      />
      <button
        className="text-poster shrink-0 rounded-full bg-yellow px-5 py-2.5 text-[12px] tracking-wide text-[#17141a] uppercase transition-transform hover:scale-105 active:scale-95"
        type="submit"
      >
        {sent ? 'Yay! 🤘' : 'Count me in →'}
      </button>
    </form>
  )
}

'use client'

import React, { useEffect, useState } from 'react'

/** The hero's third word does things: cycles through the list with the same
 *  fade-up motion. Static first word under prefers-reduced-motion. */
export function WordCycle({ words }: { words: string[] }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400)
    return () => clearInterval(t)
  }, [words.length])

  return (
    <span className="anim-fade-up inline-block" key={i}>
      {words[i]}
    </span>
  )
}

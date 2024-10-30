"use client"

import React, { useEffect, useRef, useState } from 'react'

const BackgroundEffect: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (backgroundRef.current) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (scrollPosition / maxScroll) * 100

      backgroundRef.current.style.setProperty('--scroll', `${scrollPercentage}%`)
    }
  }, [scrollPosition])

  return (
    <div 
      ref={backgroundRef}
      className="fixed inset-0 z-[-1] bg-gradient-to-b from-[#F0EAD2] to-[#ADC178]"
      style={{
        backgroundImage: `
          url('/volunteer_doodle.png?height=1080&width=1920'),
          url('/fruit_print?height=1080&width=1920')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'soft-light',
        backgroundAttachment: 'fixed',
        '--scroll': '0%',
      } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#F0EAD2] to-[#ADC178] transition-opacity duration-500 ease-in-out"
        style={{
          opacity: 'calc(var(--scroll, 0) / 100)',
        }}
      />
    </div>
  )
}

export default BackgroundEffect
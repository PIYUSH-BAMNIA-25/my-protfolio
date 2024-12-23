'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function DynamicBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height } = container.getBoundingClientRect()

      const x = (clientX / width - 0.5) * 20
      const y = (clientY / height - 0.5) * 20

      container.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${-x}deg)`
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 scale-110">
        <Image
          src="images/itavhi background.jpg"
          alt="Itachi Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  )
}


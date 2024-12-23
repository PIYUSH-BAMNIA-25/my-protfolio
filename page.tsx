'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Header from './components/Header'
import Name from './components/Name'
import Picture from './components/Picture'
import About from './components/About'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import DynamicBackground from './components/DynamicBackground'
import { motion, useAnimation } from 'framer-motion'

const DynamicReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export default function Home() {
  const [isMuted, setIsMuted] = useState(true)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      rotate: [0, 360],
      transition: { duration: 4, repeat: Infinity, ease: "linear" }
    })
  }, [controls])

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <DynamicBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Header />
        <Name />
        <Picture />
        <About />
        <Education />
        <Certificates />
        <Skills />
        <Projects />
        <Contact />
      </div>
      {/* Mute/Unmute Button with Animations */}
      <motion.button
        className="fixed bottom-4 right-4 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMuted(!isMuted)}
        animate={controls}
        aria-label={isMuted ? 'Unmute Background Music' : 'Mute Background Music'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? '🔇' : '🔊'}
      </motion.button>
      {/* React Player (Background Music) */}
      <DynamicReactPlayer
        url="images/background music.mp3"
        playing={!isMuted}
        loop
        volume={0.5}
        width="0"
        height="0"
      />
    </main>
  )
}


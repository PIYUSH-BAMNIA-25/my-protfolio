import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Name() {
  const [text, setText] = useState('')
  const fullText = "Piyush Bamnia"
  const typingSpeed = 100 // Typing speed in ms

  useEffect(() => {
    let i = 0

    const typeCharacter = () => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1))
        i++
        setTimeout(typeCharacter, typingSpeed)
      }
    }

    typeCharacter()

    return () => clearTimeout(typeCharacter)
  }, [])

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-6xl font-bold text-center my-8"
    >
      {text}
    </motion.h1>
  )
}


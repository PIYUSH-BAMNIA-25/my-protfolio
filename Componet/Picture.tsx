import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Picture() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-64 h-64 mx-auto my-8 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
    >
      <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse"></div>
      <Image
        src="/itachi.jpg"
        alt="Itachi Uchiha"
        width={256}
        height={256}
        className="rounded-full object-cover z-10 relative transition-transform duration-300 hover:scale-105 shadow-lg border-4 border-red-600"
        priority
      />
    </motion.div>
  )
}


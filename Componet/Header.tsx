import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-4"
    >
      <nav aria-label="Main navigation">
        <ul className="flex justify-center space-x-4">
          <li><a href="#about" className="hover:text-red-500 transition-colors text-lg">About</a></li>
          <li><a href="#education" className="hover:text-red-500 transition-colors text-lg">Education</a></li>
          <li><a href="#skills" className="hover:text-red-500 transition-colors text-lg">Skills</a></li>
          <li><a href="#projects" className="hover:text-red-500 transition-colors text-lg">Projects</a></li>
          <li><a href="#contact" className="hover:text-red-500 transition-colors text-lg">Contact</a></li>
        </ul>
      </nav>
    </motion.header>
  )
}


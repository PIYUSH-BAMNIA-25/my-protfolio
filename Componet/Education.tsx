import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useState } from 'react'

const educationData = [
  { 
    year: 'Currently pursuing (2022 - Present)',
    achievement: 'B.Tech in Artificial Intelligence and Data Science (Regular)',
    details: 'I am pursuing my B. Tech in Artificial Intelligence and Data Science with a CGPA of 7.63 till the 6th semester; I have acquired enough practice in Python, Data Science, DSA, and DBMS. Having done quite a number of projects, including real-world data analytics along with machine learning work in them, has helped sharpen both problem-solving and my code.'
  },
  { 
    year: 'Currently Pursuing (2023 - Present)',
    achievement: 'B.Sc. in Data Science from IITM (Online)',
    details: 'My pursuit of B.Sc. in IITM Data Science specializations covers statistical analysis and mathematical modeling and data visualization. As of now, from this program, I obtained a robust foundation in areas such as Python, statistics, and techniques of machine learning.'
  },
  
]

export default function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [activeEducationIndex, setActiveEducationIndex] = useState<number | null>(null)

  return (
    <motion.section
      id="education"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-16 relative"
    >
      <h2 className="text-3xl font-bold mb-4">Education</h2>
      <div className="flex flex-wrap space-y-4 md:flex-row md:space-y-0">
        <motion.ul
          className="space-y-4 flex-1 mr-4 md:mr-0"
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {educationData.length === 0 ? (
            <p>No education data available.</p>
          ) : (
            educationData.map((item, index) => (
              <motion.li
                key={index}
                aria-label={`View details for ${item.achievement}`}
                role="button"
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center cursor-pointer"
                onClick={() => setActiveEducationIndex(activeEducationIndex === index ? null : index)}
              >
                <span className="text-red-500 font-bold mr-2">{item.year}:</span>
                <span>{item.achievement}</span>
              </motion.li>
            ))
          )}
        </motion.ul>
        <AnimatePresence>
          {activeEducationIndex !== null && (
            <motion.div
              key={activeEducationIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg w-64 flex-shrink-0"
            >
              <h3 className="text-xl font-bold mb-2">{educationData[activeEducationIndex].achievement}</h3>
              <p>{educationData[activeEducationIndex].details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.section
        className="mt-8 w-full h-64 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/itachi-education.jpg"
          alt="Itachi Education"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
          onError={(e) => e.target.src = '/fallback-image.jpg'} // Add fallback image if it fails to load
        />
      </motion.section>
    </motion.section>
  )
}


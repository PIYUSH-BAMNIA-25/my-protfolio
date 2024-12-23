import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'

// Certificates Data
const certificatesData = [
  { 
    name: 'IBM Data Science' , 
    issuer: 'IBM',
    details: 'Acquired hands-on skills in Python, Machine Learning, SQL, and Data Visualization with the world\'s most known company IBM',
    image : 'images/IBM.jpg'
  },
  { 
    name: 'Google IT Automation with Python Specialization', 
    issuer: 'Google',
    details: 'Learned advanced Python scripting, IT automation, and troubleshooting techniques to streamline workflows by the world most know compain Google',
    image : 'images/googl.jpg'
  },
  { 
    name: 'Machine Learning ( Summer Traning Program )', 
    issuer: 'Growth Ninja',
    details: 'Acquired practical knowledge about machine learning algorithms and its applications through hands-on training given by growth ninja as a summer trainee.',
    image : 'images/growth ninja.jpg'
  },
  { 
    name: 'Accenture North America - Data Analytics and Visualization Job Simulation', 
    issuer: 'Accenture North America',
    details: 'Gained practical experience in data analytics and visualization through the solution of real-world business scenarios in a job simulation provided by Accenture North America',
    image : 'images/accenture.jpg'
  },
]

// Certificate Card Component
const CertificateCard = ({ certificate, index, isSelected, onClick }) => (
  <motion.div
    key={index}
    className={`bg-gray-800 p-4 rounded cursor-pointer relative ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
  >
    <h3 className="text-xl font-bold mb-2">{certificate.name}</h3>
    <p>{certificate.issuer}</p>
    
    {/* Tooltip */}
    <motion.div
      className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white p-2 rounded opacity-0 transition-opacity duration-300"
      whileHover={{ opacity: 1 }}
      style={{ pointerEvents: 'none', zIndex: 10 }}
    >
      {certificate.details}
    </motion.div>
  </motion.div>
)

// Certificates Component
export default function Certificates() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null)

  const selectedCert = certificatesData[selectedCertificate] ?? null

  return (
    <motion.section
      id="certificates"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-16 relative"
    >
      <h2 className="text-3xl font-bold mb-4">Certificates</h2>
      <div className="flex flex-wrap">
        {/* Certificate List */}
        <div className="grid grid-cols-2 gap-4 flex-1 mr-4">
          {certificatesData.map((certificate, index) => (
            <CertificateCard
              key={index}
              certificate={certificate}
              index={index}
              isSelected={selectedCertificate === index}
              onClick={() =>
                setSelectedCertificate(selectedCertificate === index ? null : index)
              }
            />
          ))}
        </div>

        {/* Selected Certificate Details */}
        {selectedCert && (
          <motion.div
            key={selectedCertificate}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 p-4 rounded shadow-lg w-64 flex-shrink-0"
          >
            <h4 className="text-lg font-bold mb-2">{selectedCert.name}</h4>
            <p>{selectedCert.details}</p>
          </motion.div>
        )}
      </div>

      {/* Decorative Image */}
      <motion.div
        className="mt-8 w-full h-64 relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={selectedCert ? `/images/${selectedCert.name.toLowerCase().replace(/\s+/g, '-')}.jpg` : 'images/defult certificate.jpg'}
          alt="Certificate Visual"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </motion.div>
    </motion.section>
  )
}


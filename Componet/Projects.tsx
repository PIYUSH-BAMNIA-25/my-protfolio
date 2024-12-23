import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const projects = [
  { 
    title: 'Email Spam Detection System', 
    description: 'A machine learning model was created using Scikit-Learn that can classify emails into spam or genuine using methods such as TF-IDF and data visualization with Pandas and Matplotlib.',
    details: 'I used Python with Scikit-Learn and built an email spam detection system by using TF-IDF vectorization on the dataset to train models for the task. Data analysis and visualization are used to ensure robust performance using Pandas and Matplotlib.',
    links: [
      { label: 'Read more about Uchiha Clan', url: 'https://example.com/uchiha-clan' },
      { label: 'Watch the storyline', url: 'https://example.com/uchiha-video' }
    ]
  },
  { 
    title: 'Stock Market Prediction', 
    description: 'Built a stock market prediction model using historical data and machine learning techniques to analyze and forecast market trends.',
    details: 'Developed a stock market prediction system using Python and machine learning libraries like Scikit-Learn. The whole project was based on analyzing historical stock data, finding patterns, and forecasting trends to aid in making informed decisions.',
    links: [
      { label: 'Akatsuki Overview', url: 'https://example.com/akatsuki' },
      { label: 'Learn about covert missions', url: 'https://example.com/covert-missions' }
    ]
  },
  { 
    title: 'House Price Prediction', 
    description: 'Built a predictive model for the house price estimation based on features such as location, size, and amenities using Python and techniques of machine learning.',
    details: 'Developed a house price prediction system based on datasets that contain the key attributes of a property. Built regression models using Scikit-Learn and Pandas in order to analyze features of a property and predict prices for real estate valuation.',
    links: [
      { label: 'Sasuke\'s Story', url: 'https://example.com/sasuke' },
      { label: 'Sasuke vs. Naruto', url: 'https://example.com/sasuke-naruto' }
    ]
  },
  { 
    title: 'Instagram Spam Detection', 
    description: 'Develop an Instagram spam content identification/ classification machine learning model: This would help in a smooth interaction on the platform and improve security across it.',
    details: 'Developed a spam detection system using Python, NLP, and machine learning techniques. It processes the Instagram comments and messages by employing feature extraction and classification algorithms in order to accurately determine whether they are spam.',
    links: [
      { label: 'Shinobi Alliance Details', url: 'https://example.com/shinobi-alliance' },
      { label: 'Watch the reanimation battle', url: 'https://example.com/reanimation-battle' }
    ]
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <motion.section
      id="projects"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-16"
    >
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="flex flex-wrap">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 mr-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-4 rounded cursor-pointer hover:shadow-xl hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedProject(selectedProject === index ? null : index)}
              aria-label={`View details of ${project.title}`}
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p>{project.description}</p>
            </motion.div>
          ))}
        </div>
        {selectedProject !== null && (
          <motion.div
            key={selectedProject}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 p-4 rounded shadow-lg w-64 flex-shrink-0 relative"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="text-white absolute top-2 right-2 text-xl"
            >
              ×
            </button>
            <h4 className="text-lg font-bold mb-2">{projects[selectedProject].title}</h4>
            <p className="mb-4">{projects[selectedProject].details}</p>
            
            {/* Link Section */}
            <div className="mt-4">
              <h5 className="font-semibold text-md mb-2">Related Links:</h5>
              <ul className="list-disc pl-5">
                {projects[selectedProject].links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}


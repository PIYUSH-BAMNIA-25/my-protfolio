import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-16 relative"
    >
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      <motion.div
        className="text-lg relative"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p>
          Hello! I am Piyush Bamnia. I am an enthusiastic student in the field of Artificial Intelligence and Data Science. I have a dual degree:

B.Tech in Artificial Intelligence and Data Science from Bikaner Technical University and
Data Science Program from IIT Madras.
Academically, I have learned to solve complex problems and recognize patterns, especially for complex problems. With such prestigious institutes, I have gained extensive knowledge in a variety of technical areas, such as:

Programming Languages like Python, R, SQL
Technologies like Databases, Data Visualization, and Machine Learning
Other Skills like Analytical thinking and system development
Apart from academics, gaming and anime interest me very much as they are really creative sources of inspiration for innovative ideas. In my opinion, the interplay of technical knowledge with creative hobbies gives a unique view in the development of AI solutions and the exploration of new frontiers in the domain.
        </p>
      </motion.div>
    </motion.section>
  )
}


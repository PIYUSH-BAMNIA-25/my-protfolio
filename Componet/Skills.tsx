import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skills = {
  technical: [
    'Genjutsu', 'Ninjutsu', 'Sharingan', 'Mangekyo Sharingan', 'Fire Release',
    'Adobe After Effects', 'Adobe Photoshop', 'Adobe Premiere Pro', 'After Effects',
    'Algorithms', 'Artificial Intelligence', 'Big Data', 'Big Data Analytics', 'Data Mining',
    'Data Science', 'Data Visualization', 'Deep Learning', 'Excel', 'GitHub', 'Machine Learning',
    'Matplotlib', 'Microsoft Excel', 'Neural Networks', 'Numpy', 'Pandas', 'Photoshop', 'Power BI',
    'Premiere Pro', 'Python', 'Scikit-Learn', 'Seaborn', 'SQL', 'TensorFlow', 'Video Editing'
  ],
  nonTechnical: [
    'Strategic Thinking', 'Espionage', 'Infiltration', 'Intelligence Gathering'
  ],
  soft: [
    'Leadership', 'Decision Making', 'Emotional Control', 'Adaptability', 'Problem Solving',
    'Critical Thinking', 'Communication Skills', 'Collaboration', 'Creativity', 'Attention to Detail',
    'Time Management', 'Leadership', 'Project Management', 'Presentation Skills', 'Empathy'
  ],
  generalKnowledge: [
    'Computer Networks', 'Operating Systems (OS)', 'Theory of Computation (TOC)', 'Mathematics',
    'Statistics', 'Probability', 'Linear Algebra', 'Discrete Mathematics', 'Calculus', 'Optimization'
  ]
}

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const renderSkillCategory = (category: string, skillList: string[]) => (
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">{category} Skills</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillList.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-red-600 text-white p-2 rounded text-center"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </div>
  )

  return (
    <motion.section
      id="skills"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-16"
    >
      <h2 className="text-3xl font-bold mb-8">Skills</h2>
      {renderSkillCategory('Technical', skills.technical)}
      {renderSkillCategory('Non-Technical', skills.nonTechnical)}
      {renderSkillCategory('Soft', skills.soft)}
      {renderSkillCategory('General Knowledge', skills.generalKnowledge)}
    </motion.section>
  )
}


import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Instagram, Facebook, Linkedin, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
     
      const serviceId = 'service_pi4n35r'; 
      const templateId = 'template_5wgy5rs'; 
      const publicKey = 'l3DWJ4m-BnsU9aFnB'; 

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, formState, publicKey);
      setSubmitStatus('success');
    } catch (error) {
      console.error("Email sending failed", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormState({ name: '', email: '', message: '' });
        setSubmitStatus('idle');
      }, 3000);
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="my-16"
    >
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formState.name}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 rounded" 
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formState.email}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 rounded" 
            required
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-1">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            value={formState.message}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-800 rounded"
            required
          ></textarea>
        </div>
        <button 
          type="submit" 
          className={`flex items-center justify-center w-full p-2 rounded transition-colors ${
            isSubmitting 
              ? 'bg-gray-600 cursor-not-allowed' 
              : submitStatus === 'success'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Sending...'
          ) : submitStatus === 'success' ? (
            'Message Sent!'
          ) : (
            <>
              Send Message
              <Send className="ml-2" size={18} />
            </>
          )}
        </button>
      </form>
      <div className="flex justify-center space-x-6">
        <a href="https://github.com/PIYUSH-BAMNIA-25" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
          <Github size={24} />
        </a>
        <a href="https://www.instagram.com/leon25.1705/?hl=en" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
          <Instagram size={24} />
        </a>
        <a href="https://www.facebook.com/piyush.ba.25" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
          <Facebook size={24} />
        </a>
        <a href="https://www.linkedin.com/in/piyush-bamnia-ab09ab255/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-500 transition-colors">
          <Linkedin size={24} />
        </a>
      </div>
    </motion.section>
  );
}


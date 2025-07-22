'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate contact particles
      gsap.to('.contact-particle', {
        y: -50,
        x: 30,
        rotation: 360,
        duration: 6,
        repeat: -1,
        ease: "none",
        stagger: 1
      });

      // Floating social icons
      gsap.to('.social-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3
      });

      // Form field focus animations
      const fields = document.querySelectorAll('.form-field');
      fields.forEach((field) => {
        const input = field.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement;
        const label = field.querySelector('label');
        
        if (input && label) {
          input.addEventListener('focus', () => {
            gsap.to(label, { y: -25, scale: 0.8, color: '#8b5cf6', duration: 0.3 });
            gsap.to(field, { borderColor: '#8b5cf6', duration: 0.3 });
          });
          
          input.addEventListener('blur', () => {
            if (!input.value) {
              gsap.to(label, { y: 0, scale: 1, color: '#9ca3af', duration: 0.3 });
            }
            gsap.to(field, { borderColor: '#374151', duration: 0.3 });
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Show success animation
    gsap.to('.success-message', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
    
    setTimeout(() => {
      gsap.to('.success-message', {
        opacity: 0,
        y: -20,
        duration: 0.3
      });
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-gray-600 to-gray-800'
    },
    {
      name: 'LinkedIn',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Twitter',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'from-sky-400 to-sky-600'
    },
    {
      name: 'Instagram',
      url: '#',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.366C4.253 14.747 3.762 13.597 3.762 12.3s.491-2.448 1.366-3.323C6.003 8.002 7.153 7.511 8.45 7.511s2.448.491 3.323 1.366c.875.875 1.366 2.025 1.366 3.323s-.491 2.448-1.366 3.323c-.875.875-2.026 1.365-3.324 1.365zm7.068 0c-1.297 0-2.448-.49-3.323-1.366-.875-.875-1.366-2.025-1.366-3.323s.491-2.448 1.366-3.323c.875-.875 2.026-1.366 3.323-1.366s2.448.491 3.323 1.366c.875.875 1.366 2.025 1.366 3.323s-.491 2.448-1.366 3.323c-.875.875-2.026 1.365-3.323 1.365z"/>
        </svg>
      ),
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      {/* Contact Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="contact-particle absolute w-1 h-1 bg-purple-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`
          }}
        ></div>
      ))}

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>

      <motion.div 
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.h2 
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #8b5cf6)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Get In Touch
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Ready to start your next project? Let&apos;s create something amazing together!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div
              className="glass-effect rounded-2xl p-8"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
              }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-gradient-purple">
                Send Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field relative border border-gray-600 rounded-lg">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-4 bg-transparent text-white focus:outline-none peer"
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:scale-75">
                      Your Name
                    </label>
                  </div>

                  <div className="form-field relative border border-gray-600 rounded-lg">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-4 bg-transparent text-white focus:outline-none peer"
                      required
                    />
                    <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:scale-75">
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="form-field relative border border-gray-600 rounded-lg">
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-4 bg-transparent text-white focus:outline-none peer"
                    required
                  />
                  <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:scale-75">
                    Subject
                  </label>
                </div>

                <div className="form-field relative border border-gray-600 rounded-lg">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-4 bg-transparent text-white focus:outline-none peer h-32 resize-none"
                    required
                  />
                  <label className="absolute left-4 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:scale-75">
                    Your Message
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg overflow-hidden group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>

              {/* Success Message */}
              <motion.div
                className="success-message mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center opacity-0"
                initial={{ opacity: 0, y: 20 }}
              >
                Message sent successfully! I&apos;ll get back to you soon.
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Contact Info */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
              }}
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-gradient">
                Let&apos;s Connect
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-purple-500/10 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Email</h4>
                    <p className="text-gray-300">alex.johnson@example.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-purple-500/10 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Phone</h4>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-purple-500/10 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Location</h4>
                    <p className="text-gray-300">San Francisco, CA</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="glass-effect rounded-2xl p-8"
              whileHover={{ 
                scale: 1.01,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-gradient-orange">
                Follow Me
              </h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={`social-icon w-12 h-12 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 group`}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 5,
                      boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
                    }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
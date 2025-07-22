'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured: boolean;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards with stagger
      gsap.set('.project-card', {
        rotationX: 45,
        rotationY: 45,
        opacity: 0
      });

      // Floating background elements
      gsap.to('.floating-shape', {
        y: -30,
        x: 20,
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: 2
      });
    });

    return () => ctx.revert();
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory, payment processing, and advanced analytics. Built with Next.js, Node.js, and PostgreSQL.",
      tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "AI-Powered Dashboard",
      description: "An intelligent dashboard with machine learning insights, predictive analytics, and real-time data visualization. Features custom charts and interactive reports.",
      tags: ["React", "Python", "TensorFlow", "D3.js", "FastAPI"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Social Media App",
      description: "A modern social media platform with real-time messaging, story features, and advanced privacy controls. Includes mobile and web applications.",
      tags: ["React Native", "GraphQL", "Node.js", "MongoDB", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Blockchain Voting System",
      description: "A secure and transparent voting system built on blockchain technology. Features smart contracts, voter verification, and real-time result tracking.",
      tags: ["Solidity", "React", "Web3.js", "IPFS", "Ethereum"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "VR Learning Platform",
      description: "An immersive virtual reality educational platform with interactive 3D environments, collaborative spaces, and progress tracking.",
      tags: ["Unity", "C#", "WebGL", "Three.js", "WebXR"],
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=600&h=400&fit=crop",
      demoUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 6,
      title: "IoT Smart Home Hub",
      description: "A comprehensive smart home management system with device automation, energy monitoring, and AI-powered optimization suggestions.",
      tags: ["IoT", "Python", "MQTT", "React", "Docker"],
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=400&fit=crop",
      demoUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const categories = ['all', 'frontend', 'fullstack', 'mobile', 'blockchain', 'ai'];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => 
        project.tags.some(tag => 
          tag.toLowerCase().includes(selectedCategory) ||
          (selectedCategory === 'frontend' && ['React', 'Next.js', 'Vue'].some(tech => tag.includes(tech))) ||
          (selectedCategory === 'mobile' && ['React Native', 'Flutter'].some(tech => tag.includes(tech))) ||
          (selectedCategory === 'blockchain' && ['Solidity', 'Web3.js', 'Ethereum'].some(tech => tag.includes(tech))) ||
          (selectedCategory === 'ai' && ['TensorFlow', 'PyTorch', 'AI'].some(tech => tag.includes(tech)))
        )
      );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { 
      rotateX: 45,
      rotateY: 45,
      opacity: 0,
      scale: 0.8
    },
    visible: {
      rotateX: 0,
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      
      {/* Floating Shapes */}
      <div className="floating-shape absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-xl"></div>
      <div className="floating-shape absolute top-1/2 right-20 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
      <div className="floating-shape absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>

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
              textShadow: [
                "0 0 20px rgba(139, 92, 246, 0.5)",
                "0 0 40px rgba(139, 92, 246, 0.8)",
                "0 0 20px rgba(139, 92, 246, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-gradient">My Projects</span>
          </motion.h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'glass-effect text-gray-300 hover:text-white'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`project-card group relative ${project.featured ? 'lg:col-span-2' : ''}`}
              variants={cardVariants}
              layout
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <div className="glass-effect rounded-2xl overflow-hidden h-full group-hover:shadow-2xl group-hover:shadow-purple-500/20 transition-all duration-500">
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-purple-900 to-blue-900">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                              <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                            </linearGradient>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#grad)"/>
                          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">${project.title}</text>
                        </svg>
                      `)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Project Links */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                    <motion.button
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gradient-purple transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: index * 0.1 + tagIndex * 0.05,
                          duration: 0.3
                        }}
                        whileHover={{ 
                          scale: 1.1,
                          backgroundColor: "rgba(139, 92, 246, 0.3)"
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View All Projects</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
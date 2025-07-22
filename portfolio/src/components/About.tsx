'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Morphing blob animation
      gsap.to('.morphing-blob', {
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });

      // Skill cards animation on hover
      gsap.set('.skill-card', {
        rotationY: 0,
        transformOrigin: "center"
      });
    });

    return () => ctx.revert();
  }, []);

  const skills = [
    { name: "React/Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
    { name: "Node.js", level: 85, color: "from-green-500 to-emerald-500" },
    { name: "Python", level: 80, color: "from-yellow-500 to-orange-500" },
    { name: "UI/UX Design", level: 88, color: "from-purple-500 to-pink-500" },
    { name: "Database Design", level: 82, color: "from-indigo-500 to-purple-500" }
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
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const skillCardVariants = {
    hidden: { 
      rotateY: 90, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "back.out(1.7)"
      }
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Morphing Background Blob */}
      <div className="morphing-blob absolute top-1/4 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="morphing-blob absolute bottom-1/4 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>

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
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            About Me
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <motion.div
              className="glass-effect rounded-2xl p-8"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6 text-gradient-purple">
                Creative Problem Solver
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                With over 5 years of experience in full-stack development, I specialize in creating 
                digital experiences that are not only functional but visually stunning. My passion 
                lies in the intersection of technology and design.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the latest 
                industry trends. Whether it&apos;s building responsive web applications or crafting 
                immersive user interfaces, I bring creativity to every project.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "5+", label: "Years Exp" },
                { number: "30+", label: "Happy Clients" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center glass-effect rounded-xl p-6"
                  whileHover={{ 
                    scale: 1.1,
                    rotateZ: 5,
                    backgroundColor: "rgba(139, 92, 246, 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-3xl font-bold text-gradient-orange mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Skills */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-8 text-center text-gradient">
              Skills & Expertise
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card glass-effect rounded-xl p-6 group cursor-pointer"
                  variants={skillCardVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 10,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
                    backgroundColor: "rgba(139, 92, 246, 0.1)"
                  }}
                  onHoverStart={() => {
                    gsap.to(`.skill-bar-${index}`, {
                      width: `${skill.level}%`,
                      duration: 1,
                      ease: "power2.out"
                    });
                  }}
                >
                  <h4 className="text-white font-semibold mb-4 group-hover:text-purple-300 transition-colors">
                    {skill.name}
                  </h4>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <motion.div 
                        className={`skill-bar-${index} h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        style={{ width: 0 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-400">
                      <span className="group-hover:text-purple-300 transition-colors">Proficiency</span>
                      <span className="group-hover:text-purple-300 transition-colors">{skill.level}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Download Resume</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
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

export default About;
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Animate floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });

      // Animate background particles
      gsap.set('.particle', {
        scale: 0,
        opacity: 0
      });
      
      gsap.to('.particle', {
        scale: 1,
        opacity: 0.6,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.1,
        delay: 0.5
      });

      // Rotate background elements
      gsap.to('.rotating-bg', {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  const glitchVariants = {
    hidden: { x: 0 },
    visible: {
      x: [0, -2, 2, -1, 1, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  // Pre-defined particle positions to avoid hydration mismatch
  const particlePositions = [
    { left: '10%', top: '20%', delay: 0 },
    { left: '85%', top: '15%', delay: 0.2 },
    { left: '25%', top: '60%', delay: 0.4 },
    { left: '70%', top: '70%', delay: 0.6 },
    { left: '15%', top: '80%', delay: 0.8 },
    { left: '90%', top: '45%', delay: 1.0 },
    { left: '45%', top: '25%', delay: 1.2 },
    { left: '60%', top: '85%', delay: 1.4 },
    { left: '5%', top: '50%', delay: 1.6 },
    { left: '80%', top: '30%', delay: 1.8 },
    { left: '35%', top: '10%', delay: 2.0 },
    { left: '55%', top: '55%', delay: 2.2 }
  ];

  if (!mounted) return null;

  return (
    <motion.div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ y, opacity }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="aurora-effect"></div>
      
      {/* Rotating Background Elements */}
      <div className="rotating-bg absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="rotating-bg absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl"></div>
      
      {/* Floating Particles */}
      {particlePositions.map((particle, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`
          }}
        ></div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto w-full">
        {/* Floating Elements */}
        <motion.div
          className="floating-element absolute -top-8 -left-8 sm:-top-16 sm:-left-16 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>

        <motion.div
          className="floating-element absolute -bottom-8 -right-8 sm:-bottom-16 sm:-right-16 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white text-shadow mb-2 sm:mb-4"
            variants={glitchVariants}
          >
            <span className="text-gradient-purple">Alex</span>{' '}
            <span className="text-gradient-orange">Johnson</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 font-light mb-3 sm:mb-4 px-4">
            MERN Stack Developer & UI/UX Designer
          </h2>
          <div className="w-16 sm:w-24 lg:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 max-w-2xl lg:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4"
        >
          Crafting digital experiences with MongoDB, Express.js, React, and Node.js. 
          Specializing in full-stack web applications that push the boundaries of what&apos;s possible.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <motion.button
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </motion.button>

          <motion.button
            className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300"
            whileHover={{ 
              scale: 1.05,
              borderColor: "#ec4899"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="group-hover:text-white transition-colors duration-300">Get In Touch</span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
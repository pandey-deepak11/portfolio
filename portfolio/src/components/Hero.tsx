'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
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
  }, []);

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
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
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
      <div className="rotating-bg absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
      <div className="rotating-bg absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl"></div>
      
      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`particle absolute w-2 h-2 bg-white rounded-full`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`
          }}
        ></div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Floating Elements */}
        <motion.div
          className="floating-element absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"
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
          className="floating-element absolute -bottom-16 -right-16 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"
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
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="text-8xl md:text-9xl font-bold text-white text-shadow mb-4"
            variants={glitchVariants}
          >
            <span className="text-gradient-purple">Alex</span>{' '}
            <span className="text-gradient-orange">Johnson</span>
          </motion.h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-2xl md:text-4xl text-gray-300 font-light mb-4">
            Creative Developer & Digital Artist
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Crafting digital experiences that blend cutting-edge technology with stunning visual design. 
          Specializing in React, Next.js, and creating immersive web applications that push the boundaries of what&apos;s possible.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300"
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
            className="group px-8 py-4 border-2 border-purple-500 text-purple-300 font-semibold rounded-full hover:bg-purple-500 hover:text-white transition-all duration-300"
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
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
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
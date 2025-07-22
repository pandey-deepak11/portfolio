'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobileMenuOpen) {
        gsap.to('.mobile-menu', {
          x: 0,
          duration: 0.5,
          ease: "power3.out"
        });
        
        gsap.fromTo('.mobile-menu-item', 
          { x: 50, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.4, 
            stagger: 0.1, 
            ease: "power2.out",
            delay: 0.2
          }
        );
      } else {
        gsap.to('.mobile-menu', {
          x: '100%',
          duration: 0.3,
          ease: "power2.in"
        });
      }
    });

    return () => ctx.revert();
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass-effect backdrop-blur-lg border-b border-white/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="text-2xl font-bold text-white cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('home')}
            >
              <span className="text-gradient-purple">Alex</span>
              <span className="text-gradient-orange">J</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`relative px-4 py-2 text-gray-300 font-medium transition-colors duration-300 ${
                    activeSection === item.id ? 'text-white' : 'hover:text-white'
                  }`}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      layoutId="activeSection"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
              >
                Let&apos;s Talk
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                className="w-8 h-8 flex flex-col justify-center items-center space-y-1 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-white rounded-full"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-purple-900/95 via-slate-900/95 to-indigo-900/95 backdrop-blur-lg border-l border-white/10 z-40 transform translate-x-full md:hidden`}
      >
        <div className="pt-20 px-6">
          <div className="space-y-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`mobile-menu-item block w-full text-left py-4 px-6 text-xl font-medium rounded-lg transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ x: 10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-12">
            <motion.button
              className="mobile-menu-item w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full"
              onClick={() => scrollToSection('contact')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
                             Let&apos;s Talk
            </motion.button>
          </div>

          {/* Social Links */}
          <div className="mobile-menu-item mt-12">
            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
            <div className="flex gap-4">
              {[
                { name: 'GitHub', color: 'from-gray-600 to-gray-800' },
                { name: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
                { name: 'Twitter', color: 'from-sky-400 to-sky-600' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className={`w-10 h-10 bg-gradient-to-r ${social.color} rounded-full flex items-center justify-center text-white`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="text-xs">{social.name[0]}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
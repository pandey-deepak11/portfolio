'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const mainControls = useAnimation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    if (!mounted) return;

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
  }, [mounted]);

  const skills = [
    { 
      name: "MongoDB", 
      level: 90, 
      color: "from-green-500 to-green-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
        </svg>
      )
    },
    { 
      name: "Express.js", 
      level: 95, 
      color: "from-gray-600 to-gray-800",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9-.666L17.227 7.5l2.91-3.957a1.565 1.565 0 011.895.694l-5.221 7.004L24 18.588zm-20.588 0A1.529 1.529 0 011.517 17.868l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92L-7.878 5.411a1.595 1.595 0 011.9-.666L-3.361 7.5l2.91-3.957a1.565 1.565 0 011.895.694L-3.777 11.241 3.412 18.588z"/>
        </svg>
      )
    },
    { 
      name: "React.js", 
      level: 95, 
      color: "from-blue-400 to-blue-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 6.898c.74 0 1.477.055 2.202.165.365.49.729 1.013 1.084 1.554.355.54.684 1.084.992 1.627-.308.543-.637 1.087-.992 1.627-.355.541-.719 1.064-1.084 1.554-.725.11-1.462.165-2.202.165-.74 0-1.477-.055-2.202-.165-.365-.49-.729-1.013-1.084-1.554a22.717 22.717 0 0 1-.992-1.627c.308-.543.637-1.087.992-1.627.355-.541.719-1.064 1.084-1.554.725-.11 1.462-.165 2.202-.165z"/>
        </svg>
      )
    },
    { 
      name: "Node.js", 
      level: 88, 
      color: "from-green-400 to-green-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
        </svg>
      )
    },
    { 
      name: "JavaScript", 
      level: 93, 
      color: "from-yellow-400 to-yellow-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )
    },
    { 
      name: "TypeScript", 
      level: 85, 
      color: "from-blue-500 to-blue-700",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
        </svg>
      )
    },
    { 
      name: "Next.js", 
      level: 90, 
      color: "from-gray-700 to-black",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.5429.0445h-.4570l-.0985-.0646c-.0938-.0626-.1344-.1059-.1696-.1828-.0284-.0653-.0347-.1983-.0347-4.2068v-4.1283l.0661-.0825c.0375-.0497.1109-.1069.1575-.1220.0703-.0283.2407-.0334 1.0409-.0334 1.1104 0 1.1312.0024 1.2427.1203.0634.0669 5.3046 7.9295 6.9135 10.3754l2.0832 3.1636-.0378-.0177c-.2611-.1217-.5208-.2844-.7772-.48-.5114-.3933-1.0827-.9726-1.5136-1.6185C21.4062 18.501 23.9979 15.4492 24 12.0108c0-.8937-.012-1.0884-.108-1.7476C23.2401 5.757 20.0331 2.2513 15.6835.849 14.9047.5978 13.6891.4266 12.5712.3315c-.5208-.0439-.5208-.0439-.9983-.0439zm8.8663 13.0064c0 .0161 2.1358 3.2253 2.1516 3.2253.0094 0 .0188-.1422.0188-.3158v-.3158l-2.1704-3.2347v.6410z"/>
        </svg>
      )
    },
    { 
      name: "Tailwind CSS", 
      level: 92, 
      color: "from-cyan-400 to-cyan-600",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
        </svg>
      )
    },
    { 
      name: "Git", 
      level: 88, 
      color: "from-orange-500 to-red-500",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      )
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
        duration: 0.8
      }
    }
  };

  if (!mounted) return null;

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-10"></div>
      
      {/* Morphing Background Blob */}
      <div className="morphing-blob absolute top-1/4 right-4 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      <div className="morphing-blob absolute bottom-1/4 left-4 sm:left-10 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>

      <motion.div 
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={mainControls}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
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
          <div className="w-16 sm:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Text Content */}
          <motion.div variants={itemVariants} className="space-y-6 sm:space-y-8">
            <motion.div
              className="glass-effect rounded-2xl p-6 sm:p-8"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(139, 92, 246, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-gradient-purple">
                Full-Stack MERN Developer
              </h3>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                With over 4 years of experience in full-stack development, I specialize in creating 
                scalable web applications using the MERN stack. My passion lies in building 
                user-centric solutions that deliver exceptional performance and user experience.
              </p>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                I believe in writing clean, maintainable code and staying up-to-date with the latest 
                industry trends. Whether it&apos;s building responsive web applications or crafting 
                robust APIs, I bring creativity and technical excellence to every project.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-6"
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "4+", label: "Years Exp" },
                { number: "25+", label: "Happy Clients" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center glass-effect rounded-xl p-3 sm:p-6"
                  whileHover={{ 
                    scale: 1.1,
                    rotateZ: 5,
                    backgroundColor: "rgba(139, 92, 246, 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="text-2xl sm:text-3xl font-bold text-gradient-orange mb-1 sm:mb-2"
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
                  <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Skills */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center text-gradient">
              Skills & Technologies
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card glass-effect rounded-xl p-4 sm:p-6 group cursor-pointer"
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
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white mr-3 sm:mr-4`}>
                      {skill.icon}
                    </div>
                    <h4 className="text-white font-semibold text-sm sm:text-base group-hover:text-purple-300 transition-colors">
                      {skill.name}
                    </h4>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2 mb-2">
                      <motion.div 
                        className={`skill-bar-${index} h-1.5 sm:h-2 bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        style={{ width: 0 }}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm text-gray-400">
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
          className="text-center mt-12 sm:mt-16"
        >
          <motion.button
            className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden"
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
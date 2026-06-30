import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';



const About = ({ leafStartRef }) => {
  const containerRef = useRef(null);
  const imageStackRef = useRef(null);
  const [imageContainerHeight, setImageContainerHeight] = useState(0);
  
  // Get scroll progress through the container
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Transform scroll progress to scale values for images (MORE DRAMATIC zoom effect)
  // Back image: Start at 0.9 (slightly smaller) and scale up to 1.6 on scroll down
  const backImageScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.6]);
  // Front image: Start at 0.85 and scale up to 1.5 on scroll down
  const frontImageScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.5]);
  
  
  
  // Add slight Y movement for parallax effect
  const backImageY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const frontImageY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  
  // Track image container height for calculations
  useEffect(() => {
    if (imageStackRef.current) {
      setImageContainerHeight(imageStackRef.current.offsetHeight);
      
      const handleResize = () => {
        setImageContainerHeight(imageStackRef.current.offsetHeight);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Handle scroll for non-Framer Motion fallback
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate images with staggered effect
    tl.fromTo('.food-image', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)" }
    )
    .fromTo('.badge-16', 
      { opacity: 0, scale: 0,  },
      { opacity: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "-=0.4"
    )
    .fromTo('.quote-section', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.2"
    );

    // Floating animation for decorative elements
    gsap.to('.floating-leaf', {
      y: -10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5
    });

  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <img src="/onions.png" alt="decorative onion" className="absolute top-80 left-20 w-40 h-45 opacity-100 floating-leaf" />
      <div ref={leafStartRef} className="absolute top-60 right-32 w-40 h-45 opacity-0">
        <img src="/corindor.png" alt="decorative dish" className="w-full h-full" />
      </div>
      <img src="/burger.png" alt="decorative dish" className="absolute bottom-32 left-0 w-40 h-40 opacity-100 floating-leaf" />
      
     
      <div className="absolute bottom-20 right-20 floating-leaf">
        <img src="/burger.png" alt="" />
      </div>
      
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div 
          className="text-center "
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl font-bold text-gray-800 mb-4 tracking-wider">ABOUT US</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-0.5 bg-orange-400"></div>
            <span className="text-orange-400 font-semibold text-sm tracking-widest">PREMIUM PLANT PROTEIN</span>
            <div className="w-12 h-0.5 bg-orange-400"></div>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-16 mt-10">
          {/* Image Stack */}
          <div className="relative w-full flex justify-center items-center h-[600px]" ref={imageStackRef}>
            {/* Back Image - Paneer Tikka */}
            <motion.div 
              className="food-image absolute w-[700px] h-[450px] z-10"
              style={{ top: '50px', left: 'calc(50% - 300px)' }}
            >
              <div className="w-full h-full bg-white rounded-md shadow-2xl overflow-hidden">
                <motion.img 
                  src="/Paneer_Tikka.jpg"
                  alt="Paneer Tikka"
                  className="w-full h-full object-cover"
                  style={{
                    scale: backImageScale,
                    transformOrigin: 'center center',
                    willChange: 'transform'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Front Image - Spring Rolls */}
            <motion.div 
              className="food-image absolute w-[450px] h-[350px] z-20"
              style={{ top: '250px', left: 'calc(50% - 450px)' }}
            >
              <div className="w-full h-full bg-white rounded-md shadow-2xl overflow-hidden">
                <motion.img 
                  src="/Veg_Spring_Rolls.jpeg" 
                  alt="Veg Spring Rolls"
                  className="w-full h-full object-cover"
                  style={{
                    scale: frontImageScale,
                    transformOrigin: 'center center',
                    willChange: 'transform'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>

            {/* 16 Years Badge */}
            <div className="badge-16 absolute z-30" style={{ top: '30px', left: 'calc(50% - 500px)' }}>
              <div className="relative w-40 h-40">
                {/* Circular Badge Background */}
                <div className="absolute inset-0 bg-white rounded-full shadow-xl border-4 border-orange-200"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full"></div>
                
                {/* Badge Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <div className="text-xs font-medium mb-1 tracking-wider">From Our  </div>
                  <div className="text-4xl font-bold leading-none">Kitchen</div>
                  <div className="text-lg font-light italic">to Your Heart</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quote Section */}
          <div className="w-full max-w-2xl quote-section mt-8">
            <div className="relative flex items-start gap-4">
              {/* Quote Icon */}
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mt-2">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>

              {/* Quote Text */}
              <div>
                <p className="text-xl text-gray-700 leading-relaxed font-light">
                We believe every bite should bring happiness, health, and a little magic to your day.Food is the bridge that connects hearts, creates memories,{' '}
                  <span className="font-semibold border-b-2 border-orange-400 pb-1">
                  and makes life flavorful.
                  </span>
                </p>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="w-12 h-0.5 bg-orange-400"></div>
                  <p className="text-md text-gray-600 font-medium">Soydeli Tofu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default About;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const rotatingWords = ["HIGH PROTEIN", "100% VEGAN", "NO PRESERVATIVES"];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center pt-20 pb-28 sm:pt-24 sm:pb-32"
      style={{
        backgroundImage: `url("/hero.avif")`,
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/55 z-[1]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center p-4 sm:p-10 pt-6 sm:mt-12"
        >
          <p className="text-sm sm:text-base text-[#C3E9C3] tracking-[0.4em] uppercase mb-3">
            Soydeli Tofu
          </p>

          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight text-white">
            PLANT PROTEIN
            <span className="block text-[#6AAF48]">THAT TASTES BETTER</span>
          </h1>

          <p className="text-base sm:text-2xl mt-4 text-[#F4EAD7] font-light tracking-wide max-w-2xl px-2">
            Nutritious tofu made from quality soybeans. Soft, easy to cook, and
            perfect for Indian and global recipes — with 18g protein per 100g.
          </p>

          <div className="text-2xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight mt-6 min-h-[3rem] sm:min-h-[5rem] text-[#E6D9C3] drop-shadow-lg">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="block"
              >
                {rotatingWords[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <Link
              to="/menu"
              className="flex items-center space-x-3 bg-[#6AAF48] text-white px-8 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.25em] hover:bg-[#4B7A2F] transition-all shadow-lg"
            >
              <span>Shop Tofu</span>
              <FiArrowRight />
            </Link>

            <Link
              to="/about"
              className="px-8 py-3 rounded-full border border-white/40 text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] hover:bg-white/10 transition-all"
            >
              Our Story
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 text-left w-full max-w-3xl">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl">
              <p className="text-sm text-[#C3E9C3] tracking-[0.3em]">PACKED WITH</p>
              <p className="text-xl font-semibold mt-1 text-white">
                <span className="text-[#6AAF48]">30g</span> plant protein
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 shadow-xl">
              <p className="text-sm text-[#C3E9C3] tracking-[0.3em]">CLEAN LABEL</p>
              <p className="text-xl font-semibold mt-1 text-white">
                Only 4 ingredients
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden sm:flex absolute bottom-4 right-4 z-20 items-center justify-center"
      >
        <motion.img
          src="/tofu5.webp"
          alt="Soydeli Tofu"
          className="w-52 h-52 lg:w-72 lg:h-72 object-cover drop-shadow-xl"
          animate={{ y: ["-8px", "8px"] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
};

export default Hero;

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import SpecialProposals from "../components/SpecialProposals";
import { products } from "../data/products";

const OurMenu = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="relative min-h-screen bg-[#F4FAF2] overflow-hidden">
      <motion.img
        src="/tofu7.png"
        className="absolute top-10 sm:top-16 right-2 sm:right-8 w-12 sm:w-32 opacity-90"
        initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1 }}
      />

      <motion.img
        src="/tofu8.png"
        className="absolute top-32 sm:top-40 -left-1 sm:left-3 w-24 sm:w-40 opacity-90"
        initial={{ opacity: 0, x: -20, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 0.8 }}
      />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.div
          className="text-center mb-16 mt-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-black text-[#1A1A1A] tracking-tight">
            SHOP SOYDELI TOFU
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-3 gap-2 sm:gap-0">
            <div className="hidden sm:block w-8 h-0.5 bg-[#6AAF48] mr-3"></div>
            <span className="text-[#6AAF48] font-semibold tracking-widest text-sm text-center">
              HIGH PROTEIN · 100% VEGAN
            </span>
            <div className="hidden sm:block w-8 h-0.5 bg-[#6AAF48] ml-3"></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center max-w-7xl mx-auto">
          <motion.div
            className="flex justify-center lg:justify-start px-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.img
              src="/menu_plater.png"
              className="w-full max-w-lg drop-shadow-2xl"
              style={{ rotate }}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-[#6AAF48]"></div>
              <span className="text-[#6AAF48] tracking-widest font-semibold">
                FRESH FROM KOLHAPUR
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-black text-[#1A1A1A] leading-tight">
              Soydeli
              <br />
              <span className="text-[#3C3C3C]">
                Clean Protein, Real Flavour
              </span>
            </h2>

            <p className="text-gray-600 max-w-md">
              Two signature tofu variants — Masala Tofu and Extra Firm Tofu.
              No preservatives, FSSAI certified, and packed with plant protein.
              Keep refrigerated at 4°C.
            </p>
          </motion.div>
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all border border-[#e8f5e4]"
              whileHover={{ scale: 1.03 }}
            >
              <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="mt-4 font-bold text-lg text-[#1A1A1A]">
                {p.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{p.shortDescription}</p>

              <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <span className="text-[#6AAF48] font-bold text-lg">
                  {p.price}
                </span>
                <button className="px-4 py-2 text-sm bg-[#6AAF48] text-white rounded-full hover:bg-[#4E8D36] transition">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <SpecialProposals />
    </div>
  );
};

export default OurMenu;

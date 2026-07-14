import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const OurMenu = () => {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="relative min-h-screen bg-soydeli-page overflow-hidden">
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
          <h1 className="section-title">
            Explore Soydeli Tofu
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center mt-3 gap-2 sm:gap-0">
            <div className="hidden sm:block w-8 h-0.5 bg-soydeli-primary mr-3"></div>
            <span className="eyebrow !mb-0">
              High Protein · 100% Vegan
            </span>
            <div className="hidden sm:block w-8 h-0.5 bg-soydeli-primary ml-3"></div>
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
              <div className="w-12 h-0.5 bg-soydeli-primary"></div>
              <span className="eyebrow !mb-0">
                Plant Protein · 100% Vegan
              </span>
            </div>

            <h2 className="section-title leading-tight">
              Soydeli
              <br />
              <span className="text-gray-700">
                Clean Protein, Real Flavour
              </span>
            </h2>

            <p className="section-desc max-w-md">
              Two signature tofu variants — Masala Tofu and Extra Firm Tofu.
              No preservatives, FSSAI certified, and packed with plant protein.
              Keep refrigerated at 4°C.
            </p>
          </motion.div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="eyebrow">Our Range</p>
            <h2 className="section-title">Meet Our Tofu</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMenu;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allImages = [
  { id: 1, src: "/masala_tofu.png", category: "Products", label: "Masala Tofu" },
  { id: 2, src: "/extra_firm.png", category: "Products", label: "Extra Firm Tofu" },
];

const Gallery = () => {
  const [filteredImages, setFilteredImages] = useState(allImages);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(
        allImages.filter((image) => image.category === activeFilter)
      );
    }
  }, [activeFilter]);

  const filters = ["All", "Products"];

  return (
    <div className="page-shell overflow-hidden">
      <motion.img
        src="/corindor.png"
        alt="decorative sketch"
        className="absolute top-20 sm:left-72 right-0 w-12 h-12 sm:w-48 sm:h-48 opacity-100 md:block pointer-events-none"
        animate={{ y: [-10, 10], rotate: [-5, 5] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto z-10 relative">
        <motion.div
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="eyebrow">Soydeli Tofu</p>
          <h1 className="section-title">Photo Gallery</h1>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              whileTap={{ scale: 0.95 }}
              className={
                activeFilter === filter
                  ? "filter-pill-active"
                  : "filter-pill-inactive"
              }
            >
              {filter}
            </motion.button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.category}-${image.id}`}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: -20,
                  transition: { duration: 0.3 },
                }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
                className="card-soydeli card-soydeli-hover overflow-hidden cursor-pointer aspect-square"
              >
                <img
                  src={image.src}
                  alt={`${image.category} gallery image`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="section-desc">No images found in this category.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;

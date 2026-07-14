import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";

const galleryImages = products.map((product) => ({
  src: product.image,
  alt: product.name,
  label: product.name,
}));

const getVisibleRange = (activeIndex, total, count) => {
  const half = Math.floor(count / 2);
  return Array.from({ length: count }, (_, i) => {
    const offset = i - half;
    return (activeIndex + offset + total) % total;
  });
};

const getCardWidth = (visibleCount) => {
  if (visibleCount === 1) return "min(88vw, 320px)";
  if (visibleCount === 2) return "clamp(180px, 40vw, 280px)";
  return "clamp(180px, 18vw, 280px)";
};

const HomeGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);

  useEffect(() => {
    const updateCount = () => {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else setVisibleCount(2);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  const visibleIndices = getVisibleRange(
    activeIndex,
    galleryImages.length,
    visibleCount
  );

  const getOffset = (imageIndex) => {
    const centerPos = Math.floor(visibleIndices.length / 2);
    const itemPos = visibleIndices.indexOf(imageIndex);
    return itemPos - centerPos;
  };

  const cardWidth = getCardWidth(visibleCount);
  const isMobile = visibleCount === 1;

  return (
    <section className="section-page overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center section-desc max-w-3xl mx-auto mb-8 sm:mb-14 px-2"
        >
          Soydeli Masala Tofu and Extra Firm Tofu — soft, versatile, and packed
          with plant protein for curries, grills, stir-fries, and everyday meals.
        </motion.p>

        <div
          className="relative mx-auto px-1 sm:px-0"
          style={{ perspective: "1400px", perspectiveOrigin: "center center" }}
        >
          <div className="flex items-center justify-center min-h-[360px] sm:min-h-[400px] md:min-h-[480px]">
            <AnimatePresence mode="popLayout">
              {visibleIndices.map((imageIndex) => {
                const image = galleryImages[imageIndex];
                const offset = getOffset(imageIndex);
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);

                return (
                  <motion.div
                    key={imageIndex}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      opacity: isMobile ? 1 : 1 - absOffset * 0.1,
                      rotateY: isMobile ? 0 : offset * 12,
                      scale: isMobile ? 1 : isCenter ? 1.05 : 0.92,
                      x: isMobile ? 0 : offset * 36,
                      z: isCenter ? 80 : -absOffset * 55,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className="flex-shrink-0 mx-2 sm:mx-2.5 md:mx-4"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 10 - absOffset,
                    }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg transition-shadow duration-300 ${
                        isCenter ? "shadow-soydeli-lg ring-2 ring-soydeli-lime/35" : ""
                      }`}
                      style={{
                        width: cardWidth,
                        aspectRatio: "3/4",
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {(isCenter || isMobile) && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 sm:p-4">
                          <p className="text-white text-sm sm:text-base font-semibold tracking-wide">
                            {image.label}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-10">
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="btn-icon"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          <div className="flex gap-1.5 sm:hidden max-w-[50vw] overflow-x-auto py-1">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${
                  i === activeIndex ? "w-6 bg-soydeli-label" : "w-1.5 bg-soydeli-border"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next image"
            className="btn-icon"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;

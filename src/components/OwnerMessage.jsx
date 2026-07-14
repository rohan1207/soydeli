import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { COMPANY, INGREDIENTS_SHORT } from "../data/brandContent";

const FloatingDish = ({ src, alt, className, animation }) => (
  <motion.div className={`absolute ${className}`} animate={animation}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-contain drop-shadow-2xl"
    />
  </motion.div>
);

const OwnerMessage = () => {
  return (
    <section className="section-page relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10 mb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-[38px] h-[38px] sm:w-20 sm:h-20 icon-circle">
            <Quote
              className="w-[18px] h-[18px] sm:w-10 sm:h-10 text-white"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <p className="text-md sm:text-3xl font-bold text-gray-900 text-center leading-relaxed tracking-wide">
          At Soydeli, we believe healthy eating should be simple and delicious.
          Our tofu is made from quality dehulled soybeans with {INGREDIENTS_SHORT}
          — no preservatives, no shortcuts. Whether you are cooking a quick
          weekday curry or meal-prepping for the week, Soydeli gives you high
          protein you can trust, marketed by {COMPANY.marketedBy}.
        </p>

        <p className="text-center text-soydeli-dark font-semibold text-lg mt-8 uppercase tracking-[0.15em]">
          {COMPANY.marketedBy} · Makers of Soydeli Tofu
        </p>
      </div>

      <FloatingDish
        src="/masala_tofu.png"
        alt="Masala Tofu"
        className="w-48 h-48 top-[68%] sm:w-72 sm:h-72 sm:top-[35%] -translate-y-1/2 left-[0%] sm:left-[0%]"
        animation={{
          y: [0, -15, 0],
          transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <FloatingDish
        src="/extra_firm.png"
        alt="Extra Firm Tofu"
        className="w-48 h-48 sm:w-72 sm:h-72 top-[-2%] sm:top-[10%] -translate-y-[70%] right-[0%] sm:right-[0%]"
        animation={{
          y: [0, 15, 0],
          transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    </section>
  );
};

export default OwnerMessage;

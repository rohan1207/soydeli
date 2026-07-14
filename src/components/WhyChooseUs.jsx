import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiThumbsUp, FiAward } from "react-icons/fi";
import { GiTomato, GiChefToque, GiFullPizza } from "react-icons/gi";
import { MdEmojiFoodBeverage } from "react-icons/md";
import {
  COMPANY,
  INGREDIENTS_SHORT,
  PROTEIN,
  AVAILABILITY,
} from "../data/brandContent";

const features = [
  {
    icon: <GiTomato size={32} className="text-soydeli-primary" />,
    title: "HIGH PROTEIN",
    description: PROTEIN.whyChooseLine,
  },
  {
    icon: <FiThumbsUp size={32} className="text-soydeli-primary" />,
    title: "CLEAN INGREDIENTS",
    description: `${INGREDIENTS_SHORT}. Nothing hidden, nothing artificial.`,
  },
  {
    icon: <GiChefToque size={32} className="text-soydeli-primary" />,
    title: "CHEF-FRIENDLY",
    description:
      "Soft texture that holds shape in curries, tikkas, stir-fries, and snacks.",
  },
  {
    icon: <MdEmojiFoodBeverage size={32} className="text-soydeli-primary" />,
    title: "FSSAI CERTIFIED",
    description: `Marketed by ${COMPANY.marketedBy} with strict quality and hygiene standards.`,
  },
  {
    icon: <GiFullPizza size={32} className="text-soydeli-primary" />,
    title: "100% VEGAN",
    description:
      "Zero cholesterol, zero preservatives — pure plant protein for every diet.",
  },
  {
    icon: <FiAward size={32} className="text-soydeli-primary" />,
    title: "AVAILABLE AT STORES",
    description: AVAILABILITY.storeOrder,
  },
];

const WhyChooseUs = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const yRange = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scaleRange = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotateRange = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const y = useSpring(yRange, { stiffness: 50, damping: 30, restDelta: 0.001 });
  const scale = useSpring(scaleRange, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });
  const rotate = useSpring(rotateRange, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative section-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Why Soydeli
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Better Protein, Better Choices
          </motion.h2>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative z-10 flex items-start card-soydeli card-soydeli-hover p-4 sm:p-5"
            >
              <div className="flex-shrink-0 bg-soydeli-surface p-3 rounded-full border border-soydeli-border">
                {feature.icon}
              </div>
              <div className="ml-4">
                <h4 className="text-base sm:text-lg font-bold text-gray-900">
                  {feature.title}
                </h4>
                <p className="mt-1 text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="md:hidden flex justify-center mt-10 sm:mt-12 pointer-events-none"
          style={{ y, scale, rotate }}
        >
          <img
            src="/tofu3.png"
            alt="Soydeli Tofu stack"
            className="w-64 h-64 sm:w-72 sm:h-72 object-contain"
          />
        </motion.div>

        <motion.div
          className="hidden md:block absolute top-[-15%] right-[-5%] w-60 lg:w-72 h-60 lg:h-72 z-0 pointer-events-none"
          style={{ y, scale, rotate }}
        >
          <img
            src="/tofu3.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

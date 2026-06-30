import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FiThumbsUp, FiAward, FiSmile } from "react-icons/fi";
import { GiTomato, GiChefToque, GiFullPizza } from "react-icons/gi";
import { MdEmojiFoodBeverage } from "react-icons/md";

const features = [
  {
    icon: <GiTomato size={32} className="text-[#6AAF48]" />,
    title: "HIGH PROTEIN",
    description:
      "18g protein per 100g — more than paneer (14g) and eggs (13g). Fuel your day the plant way.",
  },
  {
    icon: <FiThumbsUp size={32} className="text-[#6AAF48]" />,
    title: "FOUR INGREDIENTS",
    description:
      "Soyabean, RO water, iodised salt & citric acid. Nothing hidden, nothing artificial.",
  },
  {
    icon: <GiChefToque size={32} className="text-[#6AAF48]" />,
    title: "CHEF-FRIENDLY",
    description:
      "Soft texture that holds shape in curries, tikkas, stir-fries, and snacks.",
  },
  {
    icon: <MdEmojiFoodBeverage size={32} className="text-[#6AAF48]" />,
    title: "FSSAI CERTIFIED",
    description:
      "Manufactured by Vishal Industries with strict quality and hygiene standards.",
  },
  {
    icon: <GiFullPizza size={32} className="text-[#6AAF48]  " />,
    title: "100% VEGAN",
    description:
      "Zero cholesterol, zero preservatives — pure plant protein for every diet.",
  },
  {
    icon: <FiAward size={32} className="text-[#6AAF48]" />,
    title: "FLEXIBLE ORDERS",
    description:
      "Subscribe weekly, order in bulk, or buy single packs — always fresh from our unit.",
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
    <div
      ref={containerRef}
      className="relative bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-[#4B7A2F] tracking-widest uppercase"
          >
            WHY SOYDELI
          </motion.h3>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight lg:text-4xl"
          >
            BETTER PROTEIN, BETTER CHOICES
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start bg-white/90 backdrop-blur p-4 rounded-2xl hover:shadow-2xl transition-shadow duration-300 border border-emerald-50"
            >
              <div className="flex-shrink-0 bg-gray-50 p-3 rounded-full">
                {feature.icon}
              </div>
              <div className="ml-4">
                <h4 className="text-base sm:text-lg font-bold text-gray-900">
                  {feature.title}
                </h4>
                <p className="mt-1 text-sm sm:text-base text-gray-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-auto sm:top-[-15%] sm:right-[-5%] sm:translate-x-0 sm:translate-y-0 w-52 sm:w-60 h-52 sm:h-60 z-0 pointer-events-none opacity-100 sm:opacity-100"
          style={{ y, scale, rotate }}
        >
          <img
            src="/tofu3.png"
            alt="Soydeli Tofu stack"
            className="w-full h-full object-cover "
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

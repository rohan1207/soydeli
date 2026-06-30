import React from "react";
import { motion } from "framer-motion";

const RestaurantFacilities = () => {
  const facilities = [
    {
      id: 1,
      title: "SPACIOUS & COMFORTABLE SEATING",
      description: "Perfect for families, friends, and group gatherings.",
      image: "/dining_space.png",
    },
    {
      id: 2,
      title: "HYGIENIC & FRESHLY PREPARED MEALS",
      description: "Every dish made with care and cleanliness.",
      image: "/fresh_food.png",
    },
    {
      id: 3,
      title: "AMPLE PARKING SPACE",
      description: "Hassle-free parking for a relaxed dining experience.",
      image: "/parking_space.webp",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-soydeli-gold text-sm font-medium tracking-widest mb-2">
            - RESTAURANT FACILITIES -
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight">
            RESTAURANT SPECIAL
          </h1>
        </motion.div>

        {/* Facilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              className="bg-white rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              {/* Image Container */}
              <motion.div
                className="relative h-64 overflow-hidden"
                variants={imageVariants}
                initial="rest"
                whileHover="hover"
              >
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="p-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <h3 className="text-xl font-black text-gray-800 mb-4 tracking-wide">
                  {facility.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {facility.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="w-16 h-1 bg-soydeli-gold rounded-full"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantFacilities;

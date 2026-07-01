import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { getProductBySlug } from "../data/products";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-[#4B7A2F] hover:text-[#6AAF48] font-semibold text-sm mb-8 transition-colors"
        >
          <FiArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center rounded-3xl bg-white border border-[#EEF4E6] shadow-[0_8px_30px_rgba(75,125,28,0.1)] px-6 py-8 sm:px-8 sm:py-10 min-h-[300px] sm:min-h-[360px]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-auto max-w-[80%] sm:max-w-[75%] max-h-[340px] sm:max-h-[400px] lg:max-h-[440px] object-contain"
            />
            <span className="absolute top-5 left-5 bg-[#4B7D1C] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              {product.tag}
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-[#8CC63F] font-semibold tracking-[0.25em] text-xs mb-3 uppercase">
              Soydeli Product
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-2xl font-bold text-[#4B7A2F]">
                {product.price}
              </span>
              <span className="text-gray-500 text-sm">
                · {product.weight}
              </span>
            </div>

            <p className="text-gray-600 text-base sm:text-lg mt-5 leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {product.highlights.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-[#4B7D1C] bg-[#F5F7F2] px-3 py-1.5 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-[#6AAF48] hover:bg-[#4B7A2F] text-white px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us to Order
            </Link>
          </motion.div>
        </div>

        {/* Info sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 lg:mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-[#EEF4E6] shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {product.ingredients.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-gray-600 text-sm"
                >
                  <FiCheck className="text-[#6AAF48] shrink-0" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-[#EEF4E6] shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Nutrition
            </h2>
            <ul className="space-y-3">
              {product.nutrition.map((item) => (
                <li
                  key={item.label}
                  className="flex justify-between text-sm"
                >
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-gray-800">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-gray-400 mt-4">
              Shelf life: {product.shelfLife}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 border border-[#EEF4E6] shadow-sm"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              How to Use
            </h2>
            <ol className="space-y-3">
              {product.howToUse.map((step, i) => (
                <li
                  key={step}
                  className="flex gap-3 text-gray-600 text-sm leading-relaxed"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-[#EEF4E6] text-[#4B7A2F] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

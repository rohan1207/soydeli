import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { products } from "../data/products";

const PopularDishes = () => {
  return (
    <section className="bg-[#FAFAFA] py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[#8CC63F] font-semibold tracking-[0.25em] text-xs sm:text-sm mb-3 uppercase">
            Our Bestsellers
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Meet Our Tofu
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed">
            Two signature Soydeli variants — crafted in Kolhapur with just four
            clean ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-14 max-w-4xl mx-auto items-stretch">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-[#EEF4E6] shadow-[0_8px_30px_rgba(75,125,28,0.08)] hover:shadow-[0_12px_40px_rgba(75,125,28,0.14)] transition-all duration-300 w-full"
            >
              <div className="relative h-56 sm:h-60 lg:h-64 bg-[#F5F7F2] overflow-hidden flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#4B7D1C] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-gray-600 text-sm sm:text-[15px] mt-2 leading-relaxed flex-1 min-h-[4.5rem] sm:min-h-[5rem]">
                  {product.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-4 min-h-[2rem]">
                  {product.highlights.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] sm:text-xs font-medium text-[#4B7D1C] bg-[#F5F7F2] px-2.5 py-1 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5 sm:pt-6">
                  <Link
                    to={`/products/${product.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#6AAF48] hover:bg-[#4B7A2F] active:bg-[#4B7A2F] text-white px-5 sm:px-6 py-3 rounded-xl sm:rounded-full text-sm sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Read More
                    <FiArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;

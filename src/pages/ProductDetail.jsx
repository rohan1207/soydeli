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
    <div className="page-shell">
      <div className="max-w-6xl mx-auto">
        <Link to="/home" className="btn-ghost inline-flex items-center gap-2 mb-8">
          <FiArrowLeft size={18} />
          Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex items-center justify-center card-soydeli px-6 py-8 sm:px-8 sm:py-10 min-h-[300px] sm:min-h-[360px]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-auto max-w-[80%] sm:max-w-[75%] max-h-[340px] sm:max-h-[400px] lg:max-h-[440px] object-contain"
            />
            <span className="absolute top-5 left-5 bg-soydeli-label text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
              {product.tag}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="eyebrow">Soydeli Product</p>
            <h1 className="section-title">{product.name}</h1>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="text-gray-500 text-sm">{product.weight}</span>
            </div>

            <p className="section-desc text-base sm:text-lg mt-5 max-w-none">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {product.highlights.map((item) => (
                <span
                  key={item}
                  className="text-xs font-medium text-soydeli-label bg-soydeli-surface px-3 py-1.5 rounded-full border border-soydeli-border"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link to="/contact" className="btn-primary mt-8">
              Contact Us
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 lg:mt-16">
          {[
            {
              title: "Ingredients",
              content: (
                <ul className="space-y-2">
                  {product.ingredients.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-gray-600 text-sm"
                    >
                      <FiCheck className="text-soydeli-primary shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              title: "Nutrition",
              content: (
                <>
                  <ul className="space-y-3">
                    {product.nutrition.map((item) => (
                      <li key={item.label} className="flex justify-between text-sm">
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
                </>
              ),
            },
            {
              title: "How to Use",
              content: (
                <ol className="space-y-3">
                  {product.howToUse.map((step, i) => (
                    <li
                      key={step}
                      className="flex gap-3 text-gray-600 text-sm leading-relaxed"
                    >
                      <span className="shrink-0 w-6 h-6 rounded-full bg-soydeli-border text-soydeli-dark text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              ),
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 + index * 0.1 }}
              className="card-soydeli p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              {section.content}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const ProductCard = ({ product, index = 0, animated = true }) => {
  const Wrapper = animated ? motion.article : "article";
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.45, delay: index * 0.12 },
      }
    : {};

  return (
    <Wrapper
      {...animationProps}
      className="group flex flex-col h-full min-h-[520px] sm:min-h-[560px] card-soydeli card-soydeli-hover overflow-hidden"
    >
      <div className="flex items-center justify-center h-[260px] sm:h-[280px] px-6 pt-8 pb-2 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-[75%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col flex-1 text-center px-5 sm:px-6 pb-6 sm:pb-7">
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-soydeli-label mb-2">
          {product.tag}
        </span>

        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          {product.name}
        </h3>

        <p className="section-desc mt-2 flex-1 min-h-[5.5rem] sm:min-h-[6rem] px-1">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 mt-4 min-h-[2.5rem] items-center">
          {product.highlights?.map((item) => (
            <span
              key={item}
              className="text-[11px] sm:text-xs font-medium text-soydeli-label"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 sm:mt-7">
          <Link
            to={`/products/${product.slug}`}
            className="btn-primary w-full gap-2"
          >
            Read More
            <FiArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductCard;

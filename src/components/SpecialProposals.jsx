import React from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const SpecialProposals = () => {
  return (
    <section className="section-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="eyebrow">Soydeli Picks</p>
          <h2 className="section-title">Featured Products</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialProposals;

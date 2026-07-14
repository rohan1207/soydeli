import React from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const PopularDishes = () => {
  return (
    <section className="section-page">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <p className="eyebrow">Our Bestsellers</p>
          <h2 className="section-title">Meet Our Tofu</h2>
          <p className="section-desc max-w-xl mx-auto mt-3 sm:mt-4">
            Two signature Soydeli variants — crafted with clean ingredients and
            up to 30g plant protein per pack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto items-stretch">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDishes;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ProductDetailPopup from "./ProductDetailPopup";
import { products } from "../data/products";

const menuItems = products.map((product) => ({
  sku: `SOYDELI-${product.id}`,
  name: product.name,
  description: product.shortDescription,
  discountedPrice: 120,
  mrp: 120,
  serves: 2,
  ratings: product.id === 1 ? 4.9 : 4.8,
  images: [product.image],
}));

const SpecialProposals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % menuItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? menuItems.length - 1 : prev - 1
    );
  };

  const cardBaseStyle =
    "bg-white rounded-2xl shadow-lg overflow-hidden border border-[#6AAF48]/15 hover:shadow-2xl transition-all cursor-pointer group";

  return (
    <section className="bg-[#F4EAD7] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[#6AAF48] font-semibold tracking-[0.3em] text-sm mb-3">
            - SOYDELI PICKS -
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-[#1A1A1A] tracking-tight">
            FEATURED PRODUCTS
          </h2>
        </motion.div>

        <motion.div
          className="hidden md:grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {menuItems.map((item) => (
            <motion.div
              key={item.sku}
              className={cardBaseStyle}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedProduct(item)}
            >
              <div className="relative">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow">
                  <div className="flex items-center gap-1 text-[#6AAF48] font-bold">
                    <Star className="w-4 h-4 fill-[#6AAF48]" />
                    {item.ratings}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4">{item.description}</p>

                <div className="flex justify-between items-center mt-4 mb-4">
                  <div>
                    <span className="text-2xl font-bold text-[#1A1A1A]">
                      ₹{item.discountedPrice}
                    </span>
                    <span className="ml-2 text-gray-500 line-through">
                      ₹{item.mrp}
                    </span>
                  </div>
                  <span className="text-sm text-[#6AAF48]">
                    Serves {item.serves}
                  </span>
                </div>

                <AddToCartButton item={item} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="md:hidden relative mt-8 overflow-hidden">
          <motion.div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {menuItems.map((item) => (
              <div key={item.sku} className="w-full px-4 flex-shrink-0">
                <div
                  className={cardBaseStyle}
                  onClick={() => setSelectedProduct(item)}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#1A1A1A]">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3">
                      {item.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-[#1A1A1A] font-bold text-xl">
                        ₹{item.discountedPrice}
                      </span>
                      <AddToCartButton item={item} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePrevSlide}
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            >
              ◀
            </button>
            <button
              onClick={handleNextSlide}
              className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center"
            >
              ▶
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default SpecialProposals;

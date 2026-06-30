import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import AddToCartButton from "./AddToCartButton";
import ProductDetailPopup from "./ProductDetailPopup";

const dummyItems = [
  {
    sku: "SOYDELI-MASALA-001",
    name: "Soydeli Masala Tofu",
    description: "Spiced masala tofu packed with 30g plant protein. Perfect for curries & stir-fries.",
    discountedPrice: 120,
    mrp: 120,
    serves: 2,
    ratings: 4.9,
    images: ["/product1.png"],
  },
  {
    sku: "SOYDELI-FIRM-002",
    name: "Soydeli Extra Firm Tofu",
    description: "Firm block ideal for grilling, pan-frying & tikka. 18g protein per 100g.",
    discountedPrice: 120,
    mrp: 120,
    serves: 2,
    ratings: 4.8,
    images: ["/product2.png"],
  },
  {
    sku: "SOYDELI-FAMILY-003",
    name: "Soydeli Family Pack",
    description: "4×200g value pack for weekly meal prep. Keep refrigerated at 4°C.",
    discountedPrice: 440,
    mrp: 480,
    serves: 8,
    ratings: 4.9,
    images: ["/product3.png"],
  }
];

const SpecialProposals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dummyItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? dummyItems.length - 1 : prev - 1
    );
  };

  const cardBaseStyle =
    "bg-white rounded-2xl shadow-lg overflow-hidden border border-[#6AAF48]/15 hover:shadow-2xl transition-all cursor-pointer group";

  return (
    <section className="bg-[#F4EAD7] py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
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

        {/* Desktop Grid */}
        <motion.div
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {dummyItems.map((item) => (
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

                {/* Ratings */}
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
                <p className="text-gray-700 text-sm mb-4">
                  {item.description}
                </p>

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

        {/* Mobile Slider */}
        <div className="md:hidden relative mt-8">
          <motion.div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {dummyItems.map((item) => (
              <div key={item.sku} className="w-full px-4 flex-shrink-0">
                <div
                  className={cardBaseStyle}
                  onClick={() => setSelectedProduct(item)}
                >
                  <img
                    src={item.images[0]}
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

          {/* Slider Controls */}
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

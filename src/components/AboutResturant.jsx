import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

// TODO: Replace with actual image paths from your assets

const AboutRestaurant = ({ leafEndRef }) => {
  return (
    <div className="bg-[#F9F5F2] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Background text */}
          <div className="hidden lg:block absolute -right-20 top-1/2 transform -translate-y-1/2">
            <span className="text-9xl font-extrabold text-[#EADBC8] opacity-50 transform -rotate-90 whitespace-nowrap">
              DELICIOUS DINING
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-0.5 bg-soydeli-gold"></div>
                <span className="text-soydeli-gold font-semibold text-sm tracking-widest">
                  ABOUT RESTAURANT
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                EXPERIENCE THE ORIGINAL
                <br />
                FLAVORS OF INDIA
              </h2>
              <p className="text-gray-500 mb-8">
                Fresh, flavorful, and pure vegetarian — crafted with love,
                tradition, and the finest ingredients. Every bite brings you
                closer to the heart of Indian taste.
              </p>

              {/* Review Box */}
              <div className="bg-white p-6 rounded-md shadow-lg mb-8 inline-block">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-gray-800">4.8</span>
                  <div>
                    <div className="flex text-soydeli-gold">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                    <p className="text-gray-500 text-sm">Review by Google</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FaHeart className="text-soydeli-gold" />
                <span>Authentic cultural experience.</span>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative h-[600px]">
              <img
                src="/chef_placeholder.png"
                alt="Chef"
                className="absolute z-10 w-full h-full object-contain"
              />

              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-soydeli-cream-green rounded-full opacity-50"></div>

              {/* Dish images */}
              <div className="absolute top-[-15%] right-[-20%] w-48 h-50">
                <img
                  src="/samosa.png"
                  alt="Dish"
                  className="w-full h-full object-cover"
                />
                <div
                  ref={leafEndRef}
                  className="absolute top-1/2 left-1/2 w-1 h-1"
                ></div>
              </div>
              <img
                src="/mojito.png"
                alt="Dish"
                className="absolute bottom-16 left-[-40%] w-40 h-40 object-cover  "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRestaurant;

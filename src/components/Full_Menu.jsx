import React, { useState, useMemo, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { motion } from "framer-motion";
import {
  Search,
  Star,
  ChevronsUpDown,
  Utensils,
  GlassWater,
  Soup,
  CakeSlice,
  IceCream,
  Coffee,
  Sandwich,
  Salad,
  Wheat,
  Sparkles,
  UtensilsCrossed,
  ChefHat,
} from "lucide-react";
import ProductDetailPopup from "./ProductDetailPopup";

const categoryIcons = {
  "Indian Main Course": ChefHat,
  Rice: Wheat,
  Juices: GlassWater,
  Starters: Sparkles,
  Milkshakes: IceCream,
  Desserts: CakeSlice,
  "Breakfast / Snacks": Coffee,
  "Dosas and Uttapas": UtensilsCrossed,
  Sandwiches: Sandwich,
  "Salads and Raita": Salad,
  Papad: Soup, // Using soup as a placeholder, consider a more specific icon if available
  // Add other categories and their icons here
};

const MenuItem = ({ item, onSelect }) => (
  <motion.div
    className="relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 mb-4 cursor-pointer"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    onClick={() => onSelect(item)}
  >
    <div className="w-full sm:w-24 h-48 sm:h-24 rounded-md overflow-hidden flex-shrink-0 shadow-lg bg-gray-200">
      {item.images && item.images[0] ? (
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Utensils className="w-12 h-12 text-gray-400" />
        </div>
      )}
    </div>
    <div className="flex-grow flex flex-col mt-4 sm:mt-0">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
        <h3 className="font-semibold text-gray-800 text-lg sm:text-xl mb-2 sm:mb-0">
          {item.name}
        </h3>
        <div className="hidden sm:block flex-grow mx-4 border-b-2 border-dotted border-gray-300"></div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-2">
        {item.description}
      </p>
      <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-2 sm:gap-4">
        <div className="flex items-center gap-1">
          <Star className="w-3 sm:w-4 h-3 sm:h-4 text-soydeli-gold" />
          <span>{item.ratings}</span>
        </div>
        <span className="hidden sm:inline">•</span>
        <span>Serves {item.serves}</span>
      </div>
      <div className="mt-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="text-sm font-semibold uppercase tracking-wider text-[#4B7A2F] hover:text-[#6AAF48] transition-colors"
        >
          Read More
        </button>
      </div>
    </div>
  </motion.div>
);

const FullMenu = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating"); // rating, serves

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMenuData(data);
        if (data.length > 0) {
          setActiveCategory(data[0].category); // Set initial category
        }
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch menu data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []); // Empty dependency array means this effect runs once on mount

  const categories = useMemo(
    () => menuData.map((cat) => cat.category),
    [menuData]
  );

  const filteredAndSortedItems = useMemo(() => {
    if (!activeCategory || menuData.length === 0) return [];

    let items =
      menuData.find((cat) => cat.category === activeCategory)?.items || [];

    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const sortedItems = [...items].sort((a, b) => {
      switch (sortBy) {
        case "serves":
          return a.serves - b.serves;
        case "rating":
        default:
          return b.ratings - a.ratings;
      }
    });

    return sortedItems;
  }, [activeCategory, searchTerm, sortBy, menuData]);

  if (loading) {
    return (
      <section className="section-page min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-gray-700">Loading menu...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-page min-h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold text-red-600">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="section-page overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-soydeli-gold font-semibold tracking-[0.3em] text-sm mb-4">
            - CHOOSE DELICIOUS -
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-wide">
            DELICIOUS MENU
          </h2>
        </motion.div>

        <div className="overflow-x-auto pb-4 mb-8 sm:mb-12 -mx-4 px-4 sm:px-0 sm:overflow-visible">
          <div className="flex sm:flex-wrap sm:justify-center gap-3 sm:gap-8 min-w-max sm:min-w-0">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Utensils;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex flex-col items-center gap-1 sm:gap-2 transition-all duration-300 group cursor-pointer ${
                    activeCategory === category
                      ? "text-soydeli-gold"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <div
                    className={`p-2 sm:p-3 rounded-full transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-soydeli-cream-green"
                        : "bg-gray-200 group-hover:bg-gray-300"
                    }`}
                  >
                    <Icon size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <span className="font-semibold text-[10px] sm:text-sm tracking-wide text-center max-w-[80px] sm:max-w-none truncate">
                    {category}
                  </span>
                  {activeCategory === category && (
                    <div className="w-3/4 h-0.5 bg-soydeli-gold rounded-full mt-0.5 sm:mt-1" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 p-3 sm:p-4 bg-white rounded-md shadow-md flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search in ${activeCategory}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-soydeli-gold transition"
            />
          </div>
          <div className="relative w-full sm:w-64">
            <button
              onClick={() =>
                document
                  .getElementById("sort-dropdown")
                  .classList.toggle("hidden")
              }
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-soydeli-gold focus:border-soydeli-gold transition-all text-sm"
            >
              <span className="font-medium text-gray-700">
                Sort by: {sortBy.replace("-", " ")}
              </span>
              <ChevronsUpDown className="text-gray-400 w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <div
              id="sort-dropdown"
              className="hidden absolute top-full mt-2 w-full bg-white rounded-md shadow-xl border border-gray-100 z-20 overflow-hidden"
            >
              {["rating", "serves"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    document
                      .getElementById("sort-dropdown")
                      .classList.toggle("hidden");
                  }}
                  className={`w-full text-left px-5 py-3 transition-all duration-200 ${
                    sortBy === option
                      ? "bg-soydeli-gold text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {option
                    .replace("-", " ")
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" ")}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4"
          key={activeCategory} // Re-trigger animation on category change
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredAndSortedItems.length > 0 ? (
            filteredAndSortedItems.map((item) => (
              <MenuItem
                key={item.sku}
                item={item}
                onSelect={setSelectedProduct}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2 py-12">
              No items match your search.
            </p>
          )}
        </motion.div>
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

export default FullMenu;

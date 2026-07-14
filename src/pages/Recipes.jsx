import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Users, ChefHat, Leaf } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import { recipes } from "../data/recipes";

const RecipeGridCard = ({ recipe, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.06 }}
    className="group flex flex-col h-full card-soydeli card-soydeli-hover overflow-hidden"
  >
    <div className="relative w-full aspect-[4/3] bg-soydeli-surface overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>

    <div className="flex flex-col flex-1 p-3 sm:p-5 text-center">
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] text-soydeli-label mb-1.5 sm:mb-2">
        {recipe.product}
      </span>

      <h2 className="text-sm sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2">
        {recipe.title}
      </h2>

      <p className="text-gray-600 text-[11px] sm:text-sm mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-3 flex-1">
        {recipe.tagline}
      </p>

      <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mt-3 text-[10px] sm:text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={12} className="text-soydeli-lime shrink-0" />
          <span className="truncate max-w-[4.5rem] sm:max-w-none">{recipe.time}</span>
        </span>
        <span className="flex items-center gap-1">
          <Users size={12} className="text-soydeli-lime shrink-0" />
          {recipe.servings}
        </span>
        <span className="flex items-center gap-1">
          <ChefHat size={12} className="text-soydeli-lime shrink-0" />
          {recipe.difficulty}
        </span>
      </div>

      <Link
        to={`/recipes/${recipe.slug}`}
        className="btn-primary w-full mt-4 sm:mt-5 text-[10px] sm:text-xs !px-3 !py-2.5 sm:!py-3 gap-1.5"
      >
        View Recipe
        <FiArrowRight size={14} className="shrink-0" />
      </Link>
    </div>
  </motion.article>
);

const Recipes = () => (
  <div className="page-shell">
    <div className="max-w-6xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12"
      >
        <div className="inline-flex items-center gap-2 eyebrow">
          <Leaf size={16} />
          Cook with Soydeli
        </div>
        <h1 className="section-title">Tofu Recipes</h1>
        <p className="section-desc max-w-2xl mx-auto mt-3 sm:mt-4">
          Simple recipes made for Soydeli Masala Tofu and Extra Firm Tofu. Pick a
          card, tap View Recipe, and start cooking at home.
        </p>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
        {recipes.map((recipe, index) => (
          <RecipeGridCard key={recipe.slug} recipe={recipe} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 sm:mt-14 cta-band text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-white">Ready to cook?</h2>
        <p className="text-soydeli-mint text-sm sm:text-base mt-2 max-w-md mx-auto">
          Find Soydeli Tofu at stores near you, or explore our full product range.
        </p>
        <Link
          to="/menu"
          className="inline-flex mt-5 btn-primary !bg-white !text-soydeli-dark hover:!bg-soydeli-surface gap-2"
        >
          View Our Products
          <FiArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  </div>
);

export default Recipes;

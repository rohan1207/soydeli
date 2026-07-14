import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Users, ChefHat } from "lucide-react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { getRecipeBySlug, recipes } from "../data/recipes";
import { products } from "../data/products";

const RecipeDetail = () => {
  const { slug } = useParams();
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return <Navigate to="/recipes" replace />;
  }

  const relatedProduct = products.find((p) => p.slug === recipe.productSlug);
  const otherRecipes = recipes.filter((r) => r.slug !== recipe.slug).slice(0, 2);

  return (
    <div className="page-shell">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/recipes"
          className="btn-ghost inline-flex items-center gap-2 mb-6 sm:mb-8"
        >
          <FiArrowLeft size={18} />
          Back to Recipes
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-soydeli-surface rounded-2xl sm:rounded-3xl overflow-hidden card-soydeli mb-6 sm:mb-8">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-contain object-center"
            />
          </div>

          <div className="text-center sm:text-left">
            <span className="eyebrow">{recipe.product}</span>
            <h1 className="section-title mt-1">{recipe.title}</h1>
            <p className="section-desc max-w-none mt-3 sm:mt-4">{recipe.tagline}</p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-4 sm:mt-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 bg-soydeli-surface border border-soydeli-border px-3 py-1.5 rounded-full">
                <Clock size={14} className="text-soydeli-lime shrink-0" />
                {recipe.time}
              </span>
              <span className="flex items-center gap-1.5 bg-soydeli-surface border border-soydeli-border px-3 py-1.5 rounded-full">
                <Users size={14} className="text-soydeli-lime shrink-0" />
                Serves {recipe.servings}
              </span>
              <span className="flex items-center gap-1.5 bg-soydeli-surface border border-soydeli-border px-3 py-1.5 rounded-full">
                <ChefHat size={14} className="text-soydeli-lime shrink-0" />
                {recipe.difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-8 sm:mt-10">
            <section className="card-soydeli p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-soydeli-label mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2.5">
                {recipe.ingredients.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm sm:text-base text-gray-700 leading-relaxed"
                  >
                    <span className="text-soydeli-lime mt-1.5 shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-soydeli p-5 sm:p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-soydeli-label mb-4">
                Method
              </h2>
              <ol className="space-y-4">
                {recipe.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-sm sm:text-base text-gray-700 leading-relaxed"
                  >
                    <span className="shrink-0 w-7 h-7 rounded-full bg-soydeli-surface text-soydeli-dark text-xs font-bold flex items-center justify-center border border-soydeli-border">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-soydeli-surface border border-soydeli-border">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <span className="font-semibold text-soydeli-label">Chef&apos;s tip: </span>
              {recipe.tip}
            </p>
          </div>

          <section className="mt-10 sm:mt-14">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-5 sm:mb-6">
              You may also like to cook with Soydeli
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {relatedProduct && (
                <Link
                  to={`/products/${relatedProduct.slug}`}
                  className="flex items-center gap-3 card-soydeli card-soydeli-hover p-4"
                >
                  <div className="relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] shrink-0 bg-soydeli-surface rounded-xl overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="absolute inset-0 w-full h-full object-contain object-center"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-wider text-soydeli-label font-bold">
                      Use this product
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900">
                      {relatedProduct.name}
                    </p>
                  </div>
                </Link>
              )}

              {otherRecipes.map((r) => (
                <Link
                  key={r.slug}
                  to={`/recipes/${r.slug}`}
                  className="flex items-center gap-3 card-soydeli card-soydeli-hover p-4"
                >
                  <div className="relative w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] shrink-0 bg-soydeli-surface rounded-xl overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      className="absolute inset-0 w-full h-full object-contain object-center"
                    />
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] uppercase tracking-wider text-soydeli-label font-bold">
                      Try this recipe
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">
                      {r.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Link to="/menu" className="btn-primary w-full sm:w-auto sm:min-w-[240px] mx-auto flex mt-6 gap-2">
              Explore Our Products
              <FiArrowRight size={16} />
            </Link>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default RecipeDetail;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Clock,
  Users,
  ChefHat,
  ChevronDown,
  Leaf,
} from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Soydeli Masala Tofu Bhurji",
    product: "Masala Tofu",
    image: "/masala_tofu.png",
    time: "20 mins",
    servings: "2–3",
    difficulty: "Easy",
    tagline: "A quick, protein-rich scramble — perfect for breakfast or dinner rotis.",
    ingredients: [
      "1 pack (200g) Soydeli Masala Tofu, crumbled by hand",
      "2 tbsp oil (sunflower or groundnut)",
      "1 medium onion, finely chopped",
      "1 medium tomato, finely chopped",
      "1 green chilli, slit (optional)",
      "½ tsp turmeric powder",
      "½ tsp red chilli powder (adjust to taste)",
      "½ tsp coriander powder",
      "Salt to taste (Masala Tofu already has salt — add sparingly)",
      "2 tbsp fresh coriander leaves, chopped",
      "1 tsp lemon juice",
    ],
    steps: [
      "Crumble the Soydeli Masala Tofu block into small, uneven pieces using your fingers. Do not over-mash — irregular crumbles give better texture.",
      "Heat oil in a non-stick pan or kadai on medium flame. Add chopped onion and sauté for 3–4 minutes until soft and lightly golden.",
      "Add green chilli and tomato. Cook for 4–5 minutes until the tomato breaks down and the oil begins to separate at the edges.",
      "Stir in turmeric, red chilli powder, and coriander powder. Cook for 30 seconds until fragrant.",
      "Add crumbled Masala Tofu. Mix gently and cook on medium-low heat for 5–6 minutes, stirring occasionally. The tofu should absorb the masala without drying out.",
      "Taste and adjust salt. Finish with fresh coriander and a squeeze of lemon juice.",
      "Serve hot with phulkas, paratha, or toasted bread.",
    ],
    tip: "Press the tofu lightly between palms for 10 seconds before crumbling if you prefer a drier, scramble-like texture.",
  },
  {
    id: 2,
    title: "Grilled Soydeli Tofu Tikka",
    product: "Extra Firm Tofu",
    image: "/extra_firm.png",
    time: "35 mins (+ 30 mins marination)",
    servings: "3–4",
    difficulty: "Medium",
    tagline: "Smoky, charred cubes that work as a starter or wrap filling.",
    ingredients: [
      "1 pack (200g) Soydeli Extra Firm Tofu, cut into 2 cm cubes",
      "3 tbsp thick curd (dahi), whisked smooth",
      "1 tbsp ginger-garlic paste",
      "1 tsp kasuri methi, crushed",
      "1 tsp garam masala",
      "1 tsp red chilli powder",
      "½ tsp turmeric powder",
      "1 tbsp besan (gram flour)",
      "1 tbsp mustard oil (or any neutral oil)",
      "1 bell pepper, cut into squares",
      "1 onion, cut into squares",
      "Salt to taste",
      "Lemon wedges and chaat masala for serving",
    ],
    steps: [
      "Pat tofu cubes dry with a clean kitchen towel. This helps the marinade cling and gives a better sear.",
      "In a bowl, mix curd, ginger-garlic paste, kasuri methi, garam masala, red chilli powder, turmeric, besan, mustard oil, and salt into a thick paste.",
      "Add tofu cubes, bell pepper, and onion. Toss gently until evenly coated. Marinate for at least 30 minutes in the refrigerator.",
      "Thread tofu and vegetables onto skewers (or spread on a lined baking tray).",
      "Grill on a preheated tawa or grill pan on medium-high heat, turning every 2–3 minutes, for 10–12 minutes until edges are golden and slightly charred.",
      "Alternatively, bake at 200°C for 18–20 minutes, turning once halfway through.",
      "Sprinkle chaat masala, serve with lemon wedges, mint chutney, and onion rings.",
    ],
    tip: "Soydeli Extra Firm Tofu holds its shape well on high heat — avoid flipping too early so you get proper grill marks.",
  },
  {
    id: 3,
    title: "Soydeli Tofu & Veggie Stir-Fry",
    product: "Extra Firm Tofu",
    image: "/extra_firm.png",
    time: "15 mins",
    servings: "2",
    difficulty: "Easy",
    tagline: "A light, weeknight bowl — great over rice or noodles.",
    ingredients: [
      "1 pack (200g) Soydeli Extra Firm Tofu, cut into 1.5 cm cubes",
      "1 tbsp sesame oil or vegetable oil",
      "2 cloves garlic, minced",
      "1 inch ginger, julienned",
      "1 small carrot, thinly sliced",
      "1 cup broccoli florets",
      "½ cup snap peas or French beans, trimmed",
      "2 tbsp soy sauce",
      "1 tbsp rice vinegar or lemon juice",
      "1 tsp honey or jaggery (optional)",
      "½ tsp black pepper",
      "1 tsp sesame seeds",
      "Spring onion greens for garnish",
    ],
    steps: [
      "Heat oil in a wok or large pan on high heat until it shimmers.",
      "Add tofu cubes in a single layer. Sear without moving for 2 minutes until golden on one side, then flip and sear another 2 minutes. Remove and set aside.",
      "In the same pan, add garlic and ginger. Stir for 20 seconds until aromatic.",
      "Add carrot and broccoli. Stir-fry on high heat for 2 minutes. Add snap peas and cook 1 minute more — vegetables should stay crisp.",
      "Return tofu to the pan. Pour in soy sauce, vinegar, honey, and black pepper. Toss everything together for 1–2 minutes until evenly glazed.",
      "Garnish with sesame seeds and spring onion. Serve immediately over steamed rice or hakka noodles.",
    ],
    tip: "High heat and minimal stirring after adding tofu back keeps the cubes firm and prevents breaking.",
  },
  {
    id: 4,
    title: "Creamy Soydeli Masala Tofu Curry",
    product: "Masala Tofu",
    image: "/masala_tofu.png",
    time: "30 mins",
    servings: "3–4",
    difficulty: "Easy",
    tagline: "Restaurant-style gravy using Masala Tofu — pairs beautifully with jeera rice.",
    ingredients: [
      "1 pack (200g) Soydeli Masala Tofu, cut into 2 cm cubes",
      "2 tbsp butter or oil",
      "1 large onion, roughly chopped",
      "2 medium tomatoes, chopped",
      "8–10 cashews, soaked in warm water for 15 mins",
      "1 tsp ginger-garlic paste",
      "1 tsp cumin seeds",
      "½ tsp red chilli powder",
      "½ tsp garam masala",
      "¼ tsp kasuri methi",
      "2 tbsp fresh cream or malai (optional)",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    steps: [
      "Blend soaked cashews with a little water into a smooth paste. Set aside.",
      "Heat butter in a pan. Add cumin seeds. When they splutter, add chopped onion and cook on medium heat for 6–7 minutes until deep golden.",
      "Add ginger-garlic paste. Sauté for 1 minute. Add tomatoes and cook until soft and mushy, about 8 minutes.",
      "Let the mixture cool slightly, then blend into a smooth onion-tomato purée. Return to the pan.",
      "Stir in red chilli powder, garam masala, and cashew paste. Cook on low heat for 3–4 minutes, stirring constantly, until the gravy thickens and oil traces appear at the edges.",
      "Add ½ cup warm water to reach a pourable consistency. Simmer for 2 minutes.",
      "Gently slide in Masala Tofu cubes. Simmer on low for 5 minutes — do not stir vigorously. Crush kasuri methi between palms and add.",
      "Stir in cream if using. Garnish with coriander. Serve with jeera rice, naan, or chapati.",
    ],
    tip: "Masala Tofu already carries spice — reduce extra chilli powder if you prefer a milder gravy.",
  },
];

const RecipeCard = ({ recipe, isOpen, onToggle }) => (
  <motion.article
    layout
    className="bg-white rounded-2xl sm:rounded-3xl border border-[#EEF4E6] shadow-[0_8px_30px_rgba(75,125,28,0.07)] overflow-hidden"
  >
    <button
      type="button"
      onClick={onToggle}
      className="w-full text-left relative"
      aria-expanded={isOpen}
    >
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="relative h-48 sm:h-40 md:h-44 sm:w-48 md:w-56 flex-shrink-0 bg-[#F5F7F2]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-[#4B7D1C] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {recipe.product}
          </span>
        </div>

        <div className="flex-1 p-5 sm:p-6 pr-12 sm:pr-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {recipe.title}
          </h2>
          <p className="text-gray-600 text-sm mt-1.5 leading-relaxed">
            {recipe.tagline}
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#8CC63F]" />
              {recipe.time}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} className="text-[#8CC63F]" />
              Serves {recipe.servings}
            </span>
            <span className="flex items-center gap-1.5">
              <ChefHat size={14} className="text-[#8CC63F]" />
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <ChevronDown
          size={22}
          className={`absolute top-5 right-5 sm:top-1/2 sm:-translate-y-1/2 text-[#8CC63F] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#EEF4E6]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B7D1C] mb-3">
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-sm text-gray-700 leading-relaxed"
                    >
                      <span className="text-[#8CC63F] mt-1.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B7D1C] mb-3">
                  Method
                </h3>
                <ol className="space-y-3">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F5F7F2] text-[#4B7D1C] text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-[#F5F7F2] border border-[#EEF4E6]">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-[#4B7D1C]">Chef's tip: </span>
                {recipe.tip}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.article>
);

const Recipes = () => {
  const [openId, setOpenId] = useState(recipes[0].id);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-20 sm:pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[#8CC63F] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            <Leaf size={16} />
            Cook with Soydeli
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
            Tofu Recipes
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
            Simple, detailed recipes made for Soydeli Masala Tofu and Extra Firm Tofu.
            Buy our packs from your local store, then cook these at home.
          </p>
        </motion.header>

        <div className="space-y-4 sm:space-y-5">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="relative"
            >
              <RecipeCard
                recipe={recipe}
                isOpen={openId === recipe.id}
                onToggle={() => toggle(recipe.id)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#4B7D1C] to-[#3A6315] text-white"
        >
          <h2 className="text-xl sm:text-2xl font-bold">Ready to cook?</h2>
          <p className="text-white/85 text-sm sm:text-base mt-2 max-w-md mx-auto">
            Find Soydeli Tofu at stores near you, or explore our full product range.
          </p>
          <Link
            to="/menu"
            className="inline-block mt-5 px-6 py-3 rounded-full bg-[#F9B233] hover:bg-[#E09A1F] text-gray-900 font-semibold text-sm transition-colors"
          >
            View Our Products
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Recipes;

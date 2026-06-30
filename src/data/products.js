export const products = [
  {
    id: 1,
    slug: "simple-tofu",
    name: "Simple Tofu",
    tag: "Classic",
    shortDescription:
      "Soft, clean-label tofu made from quality soybeans. Perfect for everyday curries, stir-fries, and healthy meals. 200g · 18g protein per 100g.",
    description:
      "Soydeli Simple Tofu is our everyday hero — a soft, extra-firm block made from just four clean ingredients: premium soybeans, RO water, natural coagulant, and nothing else. Crafted fresh in our Kolhapur facility, it absorbs flavours beautifully in curries, stir-fries, grills, and salads.",
    image: "/pro3.png",
    images: ["/pro3.png", "/product2.png"],
    highlights: ["100% Vegan", "No Preservatives", "Extra Firm"],
    weight: "200g",
    protein: "18g per 100g",
    price: "₹120",
    shelfLife: "7 days refrigerated at 4°C",
    ingredients: ["Soybeans", "RO Water", "Natural Coagulant", "Sea Salt"],
    nutrition: [
      { label: "Protein", value: "18g per 100g" },
      { label: "Fat", value: "4.5g per 100g" },
      { label: "Carbohydrates", value: "2g per 100g" },
      { label: "Calories", value: "~120 kcal per 100g" },
    ],
    howToUse: [
      "Drain excess water and pat dry before cooking.",
      "Marinate for 15–20 minutes for deeper flavour.",
      "Pan-fry, grill, or add directly to curries and stir-fries.",
      "Store unopened at 4°C; consume within 7 days of packaging.",
    ],
  },
  {
    id: 2,
    slug: "masala-tofu",
    name: "Masala Tofu",
    tag: "Bestseller",
    shortDescription:
      "Pre-spiced masala tofu packed with flavour and 30g plant protein per pack. Ready for curries, wraps, grills, and quick weeknight cooking. 200g pack.",
    description:
      "Soydeli Masala Tofu is our bestselling spiced variant — pre-marinated with a signature blend of Indian spices for bold flavour straight out of the pack. With 30g of plant protein per 200g pack, it's the fastest way to a protein-rich meal without compromising on taste.",
    image: "/pro1.png",
    images: ["/pro1.png", "/product1.png"],
    highlights: ["High Protein", "Masala Spiced", "Chef Favourite"],
    weight: "200g",
    protein: "30g per pack",
    price: "₹120",
    shelfLife: "7 days refrigerated at 4°C",
    ingredients: [
      "Soybeans",
      "RO Water",
      "Natural Coagulant",
      "Masala Spice Blend",
      "Sea Salt",
    ],
    nutrition: [
      { label: "Protein", value: "30g per pack" },
      { label: "Fat", value: "5g per 100g" },
      { label: "Carbohydrates", value: "3g per 100g" },
      { label: "Calories", value: "~130 kcal per 100g" },
    ],
    howToUse: [
      "Ready to cook — no extra marination needed.",
      "Grill or pan-fry for wraps, rolls, and tikkas.",
      "Toss into curries for an instant protein boost.",
      "Store refrigerated at 4°C; best consumed within 7 days.",
    ],
  },
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id) =>
  products.find((p) => p.id === Number(id));

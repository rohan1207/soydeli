export const products = [
  {
    id: 1,
    slug: "masala-tofu",
    name: "Masala Tofu",
    tag: "Bestseller",
    shortDescription:
      "Pre-spiced masala tofu packed with flavour and 30g plant protein per pack. Ready for curries, wraps, grills, and quick weeknight cooking. 200g pack.",
    description:
      "Soydeli Masala Tofu is our bestselling spiced variant — pre-marinated with a signature blend of Indian spices for bold flavour straight out of the pack. With 30g of plant protein per 200g pack, it's the fastest way to a protein-rich meal without compromising on taste.",
    image: "/masala_tofu.png",
    images: ["/masala_tofu.png"],
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
  {
    id: 2,
    slug: "extra-firm-tofu",
    name: "Extra Firm Tofu",
    tag: "Classic",
    shortDescription:
      "Firm block ideal for grilling, pan-frying and tikka. Holds shape beautifully with 18g protein per 100g. 200g pack.",
    description:
      "Soydeli Extra Firm Tofu is made from just four clean ingredients: premium soybeans, RO water, natural coagulant, and sea salt. Crafted fresh in our Kolhapur facility, it holds its shape on high heat and absorbs flavours beautifully in curries, stir-fries, grills, and salads.",
    image: "/extra_firm.png",
    images: ["/extra_firm.png"],
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
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id) =>
  products.find((p) => p.id === Number(id));

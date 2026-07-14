import {
  INGREDIENTS_LABEL,
  NUTRITION_PER_100G,
  PROTEIN,
  PACKAGING,
  TAGLINES,
} from "./brandContent";

const baseIngredients = INGREDIENTS_LABEL.split(", ").map((item) =>
  item.replace(" & ", " & ").trim()
);

// Packaging lists four components in one line — split for display
export const packagingIngredients = [
  "RO Water",
  "Dehulled Soybean",
  "Iodised Salt",
  "Coagulant (E 516)",
];

export const products = [
  {
    id: 1,
    slug: "masala-tofu",
    name: "Masala Tofu",
    tag: "Bestseller",
    shortDescription:
      "Pre-spiced masala tofu packed with flavour and up to 30g plant protein per 200g pack. Ready for curries, wraps, grills, and quick weeknight cooking.",
    description:
      "Soydeli Masala Tofu is our bestselling spiced variant — pre-marinated with a signature blend of Indian spices for bold flavour straight out of the pack. Each 200g pack delivers up to 30g of plant protein with 15g protein per 100g, as per pack labelling.",
    image: "/masala_tofu.png",
    images: ["/masala_tofu.png"],
    highlights: ["High Protein", "Masala Spiced", "Chef Favourite"],
    weight: "200g",
    protein: `${PROTEIN.perPack} per pack`,
    price: "₹120",
    shelfLife: PACKAGING.shelfLife,
    ingredients: packagingIngredients,
    nutrition: NUTRITION_PER_100G,
    howToUse: [
      "Ready to cook — no extra marination needed.",
      "Grill or pan-fry for wraps, rolls, and tikkas.",
      "Toss into curries for an instant protein boost.",
      PACKAGING.howToUseNote,
    ],
  },
  {
    id: 2,
    slug: "extra-firm-tofu",
    name: "Extra Firm Tofu",
    tag: "Classic",
    shortDescription:
      "Extra firm block ideal for grilling, pan-frying and tikka. Holds shape beautifully with 15g protein per 100g. 200g pack.",
    description:
      `Soydeli Extra Firm Tofu is made with ${INGREDIENTS_LABEL.toLowerCase()}. ${TAGLINES.productDescription} It holds its shape on high heat and absorbs flavours beautifully in curries, stir-fries, grills, and salads.`,
    image: "/extra_firm.png",
    images: ["/extra_firm.png"],
    highlights: ["100% Vegan", "No Preservatives", "Extra Firm"],
    weight: "200g",
    protein: `${PROTEIN.per100g} per 100g`,
    price: "₹120",
    shelfLife: PACKAGING.shelfLife,
    ingredients: packagingIngredients,
    nutrition: NUTRITION_PER_100G,
    howToUse: [
      "Drain excess water and pat dry before cooking.",
      "Marinate for 15–20 minutes for deeper flavour.",
      "Pan-fry, grill, or add directly to curries and stir-fries.",
      PACKAGING.howToUseNote,
    ],
  },
];

export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug);

export const getProductById = (id) =>
  products.find((p) => p.id === Number(id));

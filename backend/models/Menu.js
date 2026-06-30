import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  ratings: { type: Number, required: true },
  comment: { type: String, required: true },
});

const menuItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mrp: { type: Number },
  discountedPrice: { type: Number, required: true },
  serves: { type: Number, required: true },
  description: { type: String, required: true },
  ingredients: { type: String, required: true },
  images: [{ type: String }],
  reviews: [reviewSchema],
  recommended: [{ type: String }],
  ratings: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  bestSeller: { type: Boolean, default: false },
});

const menuCategorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  items: [menuItemSchema],
});

const Menu = mongoose.model('Menu', menuCategorySchema);

export default Menu;

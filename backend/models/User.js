import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const cartItemSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [cartItemSchema],
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to add to cart by SKU
userSchema.methods.addToCart = async function (sku, quantity) {
  const cartProductIndex = this.cart.items.findIndex(cp => cp.sku === sku);

  let newQuantity = quantity;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + newQuantity;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({ sku, quantity: newQuantity });
  }

  this.cart.items = updatedCartItems;
  return this.save();
};

// Method to update cart by SKU
userSchema.methods.updateCart = async function(sku, quantity) {
  const cartProductIndex = this.cart.items.findIndex(cp => cp.sku === sku);

  if (cartProductIndex >= 0) {
    if (quantity > 0) {
      this.cart.items[cartProductIndex].quantity = quantity;
    } else {
      this.cart.items.splice(cartProductIndex, 1);
    }
  }
  return this.save();
};


// Method to clear cart
userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;

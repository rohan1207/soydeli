import User from '../models/User.js';
import Menu from '../models/Menu.js';

export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Enrich each cart item (sku, quantity) with menu item data from embedded categories
    const items = [];
    for (const ci of user.cart.items) {
      const doc = await Menu.findOne({ 'items.sku': ci.sku }, { 'items.$': 1, category: 1 });
      const menuItem = doc?.items?.[0];
      if (menuItem) {
        items.push({ product: menuItem.toObject(), quantity: ci.quantity });
      }
    }
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

export const addToCart = async (req, res) => {
  const { sku, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    await user.addToCart(sku, Number(quantity) || 1);
    res.status(200).json({ message: 'Added', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

export const updateCart = async (req, res) => {
  const { sku, quantity } = req.body;
  try {
    const user = await User.findById(req.user.id);
    await user.updateCart(sku, Number(quantity) || 0);
    res.status(200).json({ message: 'Updated', cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    await user.clearCart();
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const mergeCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid items data' });
    }

    console.log('Merging cart items:', items);

    // Validate and filter items to ensure they have required sku field
    const validItems = items.filter(item => {
      if (!item?.sku) {
        console.warn('Item missing SKU, skipping:', item);
        return false;
      }
      if (!item.quantity || item.quantity <= 0) {
        console.warn('Item has invalid quantity, skipping:', item);
        return false;
      }
      return true;
    });

    if (validItems.length === 0) {
      return res.status(400).json({ message: 'No valid items to merge' });
    }

    // Instead of replacing the entire cart, merge items properly
    // This handles cases where user might already have items in server cart
    for (const item of validItems) {
      await user.addToCart(item.sku, item.quantity);
    }

    console.log('Cart merged successfully, final cart:', user.cart.items);
    res.json({ message: 'Carts merged successfully', cartItems: user.cart.items });
  } catch (error) {
    console.error('Error merging cart:', error);
    res.status(500).json({ message: 'Server error', error: error.message || error });
  }
};

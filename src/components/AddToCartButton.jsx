import React, { useContext } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const AddToCartButton = ({ item }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const cartItem = cartItems.find((i) => i.sku === item.sku);

  const handleAdd = () => {
    console.log("Add button clicked for item:", item);
    if (!item.sku) {
      console.error("Item missing SKU:", item);
      return;
    }
    addToCart(item);
  };

  const handleIncrease = () => {
    if (cartItem) {
      console.log("Increase button clicked for item:", item.sku);
      updateQuantity(item.sku, cartItem.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (cartItem) {
      console.log("Decrease button clicked for item:", item.sku);
      updateQuantity(item.sku, cartItem.quantity - 1);
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {!cartItem ? (
          <motion.button
            key="add"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleAdd}
            className="relative z-10 bg-white text-soydeli-gold font-bold py-2 px-6 rounded-lg hover:bg-orange-50 transition-all duration-300 border border-gray-200"
          >
            ADD
          </motion.button>
        ) : (
          <motion.div
            key="quantity"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center bg-white text-soydeli-gold font-bold rounded-lg overflow-hidden border border-gray-200"
          >
            <button
              onClick={handleDecrease}
              className="px-4 py-2 hover:bg-orange-50 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2">{cartItem.quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-4 py-2 hover:bg-orange-50 transition-colors"
            >
              +
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddToCartButton;

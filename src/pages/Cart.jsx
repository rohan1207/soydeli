import React, { useState, useEffect, useContext } from "react";
import { API_BASE_URL } from "../config";
import { useCart } from "../context/CartContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";
import { Trash2, Tag, XCircle } from "lucide-react";
import AddToCartButton from "../components/AddToCartButton";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    subtotal,
    shipping,
    discount,
    setDiscount,
    total,
  } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Coupon state is now ephemeral (not persisted) so it won't auto-apply on future orders
  const [couponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  // Removed persistence + auto-restore to avoid unintended auto-application across new orders.

  useEffect(() => {
    const fetchRecommended = async () => {
      if (cartItems.length === 0) {
        setRecommendedItems([]);
        return;
      }

      setIsLoadingRecs(true);
      try {
        // Fetch all menu items
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        const allCategories = await response.json();
        const allItems = allCategories.flatMap((cat) => cat.items);

        // Get the categories of items in cart
        const cartCategories = new Set(cartItems.map((item) => item.category));

        // Get items from the same categories but not in cart
        const cartSkus = new Set(cartItems.map((item) => item.sku));
        const recommendations = allItems
          .filter(
            (item) =>
              cartCategories.has(item.category) && // Same category as cart items
              !cartSkus.has(item.sku) && // Not already in cart
              item.isAvailable !== false // Item is available
          )
          .slice(0, 4); // Limit to 4 recommendations

        setRecommendedItems(recommendations);
      } catch (error) {
        console.error("Failed to fetch recommended items:", error);
        setRecommendedItems([]);
      } finally {
        setIsLoadingRecs(false);
      }
    };

    fetchRecommended();
  }, [cartItems]);

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "WELCOME100") {
      setDiscount(100);
      setCouponMessage({
        text: "WELCOME100 applied! You saved ₹100.",
        type: "success",
      });
    } else {
      setDiscount(0);
      setCouponMessage({ text: "Invalid coupon code.", type: "error" });
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponMessage({ text: "", type: "" });
  };

  const handleCheckout = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "You need to be logged in to proceed to checkout.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/account", { state: { from: location } });
        }
      });
    } else {
      navigate("/checkout", {
        state: {
          discount,
          couponCode,
          total: total,
          subtotal: subtotal,
        },
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-gray-800 text-center mb-12"
        >
          Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-8 rounded-lg shadow-md"
          >
            <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
            <Link
              to="/menu"
              className="mt-6 inline-block bg-soydeli-gold text-white px-8 py-3 rounded-lg font-semibold hover:bg-soydeli-gold-dark transition-transform transform hover:scale-105"
            >
              Explore Our Menu
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.sku}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        x: 50,
                        transition: { duration: 0.3 },
                      }}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      <div className="flex items-start sm:items-center flex-grow w-full">
                        <img
                          src={item.images?.[0] || "/placeholder-dish.jpg"}
                          alt={item.name}
                          className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md mr-4 sm:mr-6 shadow-sm flex-shrink-0"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/placeholder-dish.jpg";
                          }}
                        />
                        <div className="flex-grow min-w-0">
                          <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                            {item.name}
                          </h2>
                          <p className="text-gray-500 text-sm">
                            ₹{item.discountedPrice}
                          </p>
                          {/* Mobile quantity & price inline (hidden on sm and up) */}
                          <div className="mt-3 flex items-center justify-between sm:hidden gap-3">
                            <div className="flex items-center border border-gray-300 rounded-full text-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(item.sku, item.quantity - 1)
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 font-medium text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.sku, item.quantity + 1)
                                }
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                              >
                                +
                              </button>
                            </div>
                            <p className="font-semibold text-base text-gray-800">
                              ₹{item.discountedPrice * item.quantity}
                            </p>
                            <button
                              onClick={() => updateQuantity(item.sku, 0)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Desktop quantity & price (hidden on mobile) */}
                      <div className="hidden sm:flex items-center gap-6">
                        <div className="flex items-center border border-gray-300 rounded-full">
                          <button
                            onClick={() =>
                              updateQuantity(item.sku, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-medium text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.sku, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-semibold text-lg text-gray-800 w-20 text-right">
                          ₹{item.discountedPrice * item.quantity}
                        </p>
                        <button
                          onClick={() => updateQuantity(item.sku, 0)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-medium">
                      - ₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6">
                <label
                  htmlFor="coupon"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Apply Coupon
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter WELCOME100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-soydeli-gold"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-gray-800 text-white px-4 rounded-md hover:bg-gray-700"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage.text && (
                  <div
                    className={`mt-2 text-sm flex items-center ${
                      couponMessage.type === "success"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {couponMessage.type === "success" ? (
                      <Tag size={16} className="mr-2" />
                    ) : (
                      <XCircle size={16} className="mr-2" />
                    )}
                    <span className="flex-1">{couponMessage.text}</span>
                    {couponMessage.type === "success" && (
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="ml-3 text-xs underline hover:no-underline text-gray-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-soydeli-gold text-white py-3 rounded-lg font-semibold hover:bg-soydeli-gold-dark transition-transform transform hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* "You May Also Like" Section */}
        {recommendedItems.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommendedItems.map((item) => (
                <motion.div
                  key={item.sku}
                  className="bg-white rounded-lg shadow-lg overflow-hidden text-center p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={item.images?.[0] || "/placeholder-dish.jpg"}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <h3 className="font-semibold text-gray-800 truncate">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-3">₹{item.discountedPrice}</p>
                  <AddToCartButton item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

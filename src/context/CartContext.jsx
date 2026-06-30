import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import AuthContext from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = window.localStorage.getItem("cart");
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage", error);
      return [];
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const { user, token } = useContext(AuthContext);
  const API_URL = `${API_BASE_URL}/api`;

  const fetchCart = useCallback(async () => {
    if (token) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get(`${API_URL}/cart`, config);
        const items = Array.isArray(data?.items) ? data.items : [];
        const populatedItems = items
          .filter((item) => item && item.product) // guard against null refs
          .map((item) => ({
            ...item.product,
            quantity: item.quantity,
            sku: item.product.sku,
          }));
        console.log("Fetched cart from server:", populatedItems);
        setCartItems(populatedItems);
      } catch (error) {
        console.error(
          "Failed to fetch cart",
          error?.response?.data || error?.message || error
        );
        setCartItems([]);
      }
    }
  }, [token]);

  // Updated mergeCart function with validation and improved error handling
  const mergeCart = async (localCart) => {
    if (!token || !localCart || localCart.length === 0) return false;
    // Filter out items missing a required SKU field
    const validItems = localCart.filter((item) => item.sku);
    if (validItems.length !== localCart.length) {
      console.warn("Some cart items are missing SKU, filtering them out.");
    }
    if (validItems.length === 0) {
      console.warn("No valid items to merge, keeping local cart");
      return false;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      console.log("Merging cart items:", validItems);
      await axios.post(`${API_URL}/cart/merge`, { items: validItems }, config);
      window.localStorage.removeItem("cart");
      return true;
    } catch (error) {
      console.error(
        "Failed to merge cart",
        error?.response?.data || error?.message || error
      );
      console.log("Merge failed, keeping local cart");
      return false;
    }
  };

  // Effect to sync cart on login/logout and persist guest cart
  useEffect(() => {
    const syncCart = async () => {
      if (user && token) {
        // User is logged in, sync with server
        const localCart = JSON.parse(
          window.localStorage.getItem("cart") || "[]"
        );
        if (localCart.length > 0) {
          console.log("User logged in with existing cart, merging:", localCart);
          const mergeSuccess = await mergeCart(localCart);
          if (!mergeSuccess) {
            // If merge failed, keep local cart items
            console.log("Merge failed, keeping local cart");
          }
        }
        // Always fetch the updated cart from server after login
        await fetchCart();
      } else {
        // User is logged out, load from local storage
        const localCart = JSON.parse(
          window.localStorage.getItem("cart") || "[]"
        );
        console.log("User logged out, loading local cart:", localCart);
        setCartItems(localCart);
      }
    };

    syncCart();
  }, [user, token]);

  // Effect to save cart to local storage for guest users
  useEffect(() => {
    if (!user && cartItems) {
      if (cartItems.length > 0) {
        console.log("Saving cart to localStorage for guest user:", cartItems);
        window.localStorage.setItem("cart", JSON.stringify(cartItems));
      } else {
        // If cart is empty, remove it from localStorage
        console.log("Cart is empty, removing from localStorage");
        window.localStorage.removeItem("cart");
        window.localStorage.removeItem("guestCart");
      }
    }
  }, [cartItems, user]);

  // Merge guest cart items when a user logs in
  useEffect(() => {
    if (user) {
      const guestCartStr = localStorage.getItem("guestCart");
      if (guestCartStr) {
        try {
          const guestCart = JSON.parse(guestCartStr);
          if (guestCart && guestCart.length > 0) {
            console.log(
              "Merging guest cart with logged-in user cart:",
              guestCart
            );
            mergeCart(guestCart);
          }
          localStorage.removeItem("guestCart");
        } catch (error) {
          console.error("Error merging guest cart:", error);
          localStorage.removeItem("guestCart");
        }
      }
    }
  }, [user]);

  const addToCart = async (item) => {
    console.log("Adding item to cart:", item, "User logged in:", !!token);

    if (token) {
      try {
        // First update local state optimistically
        setCartItems((prevItems) => {
          const exist = prevItems.find((x) => x.sku === item.sku);
          if (exist) {
            return prevItems.map((x) =>
              x.sku === item.sku
                ? { ...exist, quantity: exist.quantity + 1 }
                : x
            );
          } else {
            return [...prevItems, { ...item, quantity: 1 }];
          }
        });

        // Then try to sync with server
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `${API_URL}/cart`,
          { sku: item.sku, quantity: 1 },
          config
        );
        if (response.data) {
          await fetchCart(); // Only fetch if server call succeeds
        }
      } catch (error) {
        console.error("Failed to add to cart", error);
        // Keep the optimistic update even if server fails
      }
    } else {
      // For guest users, ensure the item has all necessary fields including sku
      const cartItem = {
        ...item,
        sku: item.sku || item.id || item.productId, // Ensure sku exists
        quantity: 1,
      };

      if (!cartItem.sku) {
        console.error("Cannot add item to cart: missing SKU", item);
        return;
      }

      setCartItems((prevItems) => {
        const exist = prevItems.find((x) => x.sku === cartItem.sku);
        if (exist) {
          return prevItems.map((x) =>
            x.sku === cartItem.sku
              ? { ...exist, quantity: exist.quantity + 1 }
              : x
          );
        } else {
          return [...prevItems, cartItem];
        }
      });
    }
  };

  const updateQuantity = async (sku, quantity) => {
    console.log(
      "Updating quantity:",
      sku,
      quantity,
      "User logged in:",
      !!token
    );

    if (token) {
      try {
        // First update local state optimistically
        setCartItems((prevItems) => {
          if (quantity <= 0) {
            return prevItems.filter((x) => x.sku !== sku);
          }
          return prevItems.map((x) => (x.sku === sku ? { ...x, quantity } : x));
        });

        // Then try to sync with server
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.put(
          `${API_URL}/cart/update`,
          { sku, quantity },
          config
        );
        if (response.data) {
          await fetchCart(); // Only fetch if server call succeeds
        }
      } catch (error) {
        console.error("Failed to update quantity", error);
        // Keep the optimistic update even if server fails
      }
    } else {
      setCartItems((prevItems) => {
        if (quantity <= 0) {
          return prevItems.filter((x) => x.sku !== sku);
        }
        return prevItems.map((x) => (x.sku === sku ? { ...x, quantity } : x));
      });
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`${API_URL}/cart/clear`, config);
        setCartItems([]);
        // Clear all local storage cart data
        localStorage.removeItem("cart");
        localStorage.removeItem("guestCart");
      } catch (error) {
        console.error("Failed to clear cart", error);
      }
    } else {
      setCartItems([]);
      // Clear guest cart data
      localStorage.removeItem("cart");
      localStorage.removeItem("guestCart");
    }
    console.log("Cart cleared successfully");
  };

  // Calculate cart metrics with proper validation
  const calculateCartMetrics = useCallback(() => {
    if (!Array.isArray(cartItems))
      return { count: 0, subtotal: 0, shipping: 0 };

    const count = cartItems.reduce((acc, item) => {
      const quantity = parseInt(item?.quantity) || 0;
      return acc + quantity;
    }, 0);

    const subtotal = cartItems.reduce((acc, item) => {
      const price = parseFloat(item?.discountedPrice) || 0;
      const quantity = parseInt(item?.quantity) || 0;
      return acc + price * quantity;
    }, 0);

    // Can add shipping calculation logic here if needed
    const shipping = 0; // Free shipping

    return { count, subtotal, shipping };
  }, [cartItems]);

  const { count: cartCount, subtotal, shipping } = calculateCartMetrics();

  // Get any stored discount from localStorage
  const [storedDiscount, setStoredDiscount] = useState(() => {
    const saved = localStorage.getItem("cartDiscount");
    return saved ? parseFloat(saved) : 0;
  });

  // Update localStorage when discount changes
  useEffect(() => {
    localStorage.setItem("cartDiscount", storedDiscount.toString());
  }, [storedDiscount]);

  // Calculate final total with proper validation
  const total = Math.max(0, subtotal + shipping - storedDiscount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        shipping,
        discount: storedDiscount,
        setDiscount: setStoredDiscount,
        total,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

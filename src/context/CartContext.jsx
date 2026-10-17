import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API_BASE_URL from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

/* =====================================================
   BACKEND BASE URL
===================================================== */

const BACKEND_BASE_URL =
  "https://azania-galleryy-backend-production.up.railway.app";

/* =====================================================
   CONVERT IMAGE PATH TO FULL BACKEND URL
===================================================== */

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  /*
    Already a complete URL
  */

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  /*
    Backend uploaded image

    Example:
    /uploads/products/...
  */

  if (image.startsWith("/uploads/")) {
    return `${BACKEND_BASE_URL}${image}`;
  }

  return image;
};

/* =====================================================
   FORMAT CART ITEMS
===================================================== */

const formatCartItems = (items) => {
  return items.map((item) => {
    /*
      Use saved cart image first.
      If unavailable, use populated product image.
    */

    const image =
      item.image ||
      item.product?.image ||
      "";

    return {
      id:
        item.product?._id ||
        item.product ||
        item.id,

      _id:
        item.product?._id ||
        item.product ||
        item.id,

      name:
        item.name ||
        item.product?.name ||
        "",

      image: getImageUrl(image),

      price: Number(
        item.price ??
          item.product?.price ??
          0
      ),

      quantity: Number(
        item.quantity || 0
      ),

      product:
        item.product || null,
    };
  });
};

/* =====================================================
   CART PROVIDER
===================================================== */

function CartProvider({ children }) {
  const {
    token,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     GET CART FROM BACKEND
  ===================================================== */

  const fetchCart = async () => {
    if (!token || !isAuthenticated) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch cart."
        );
      }

      const backendItems =
        data.cart?.items || [];

      setCartItems(
        formatCartItems(
          backendItems
        )
      );
    } catch (error) {
      console.error(
        "Error fetching cart:",
        error
      );

      setError(
        error.message ||
          "Failed to fetch cart."
      );

      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOAD CART WHEN USER IS AUTHENTICATED
  ===================================================== */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (
      !isAuthenticated ||
      !token
    ) {
      setCartItems([]);
      return;
    }

    fetchCart();
  }, [
    token,
    isAuthenticated,
    authLoading,
  ]);

  /* =====================================================
     ADD TO CART
  ===================================================== */

  const addToCart = async (
    product,
    quantity = 1
  ) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to add products to your cart."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            productId:
              product.id ||
              product._id,

            quantity:
              Number(quantity),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add product to cart."
        );
      }

      const backendItems =
        data.cart?.items || [];

      setCartItems(
        formatCartItems(
          backendItems
        )
      );

      return data;
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error
      );

      setError(
        error.message ||
          "Failed to add product to cart."
      );

      throw error;
    }
  };

  /* =====================================================
     REMOVE FROM CART
  ===================================================== */

  const removeFromCart = async (
    productId
  ) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to manage your cart."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/cart/${productId}`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to remove product from cart."
        );
      }

      const backendItems =
        data.cart?.items || [];

      setCartItems(
        formatCartItems(
          backendItems
        )
      );

      return data;
    } catch (error) {
      console.error(
        "Error removing product from cart:",
        error
      );

      setError(
        error.message ||
          "Failed to remove product from cart."
      );

      throw error;
    }
  };

  /* =====================================================
     UPDATE CART QUANTITY
  ===================================================== */

  const updateQuantity = async (
    productId,
    quantity
  ) => {
    if (quantity < 1) {
      return;
    }

    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to manage your cart."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/cart/${productId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            quantity:
              Number(quantity),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update cart."
        );
      }

      const backendItems =
        data.cart?.items || [];

      setCartItems(
        formatCartItems(
          backendItems
        )
      );

      return data;
    } catch (error) {
      console.error(
        "Error updating cart:",
        error
      );

      setError(
        error.message ||
          "Failed to update cart."
      );

      throw error;
    }
  };

  /* =====================================================
     CLEAR CART
  ===================================================== */

  const clearCart = async () => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to manage your cart."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/cart`,
        {
          method: "DELETE",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to clear cart."
        );
      }

      setCartItems([]);

      return data;
    } catch (error) {
      console.error(
        "Error clearing cart:",
        error
      );

      setError(
        error.message ||
          "Failed to clear cart."
      );

      throw error;
    }
  };

  /* =====================================================
     CART COUNT
  ===================================================== */

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.quantity || 0
        ),
      0
    );

  /* =====================================================
     CART TOTAL
  ===================================================== */

  const cartTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(
            item.quantity || 0
          ),
      0
    );

  /* =====================================================
     CONTEXT
  ===================================================== */

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        cartCount,
        cartTotal,

        loading,
        error,

        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* =====================================================
   USE CART HOOK
===================================================== */

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}

export default CartProvider;
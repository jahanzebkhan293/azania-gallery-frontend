import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API_BASE_URL from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

/* =====================================================
   BACKEND BASE URL
===================================================== */

const BACKEND_BASE_URL ="https://azania-galleryy-backend-production.up.railway.app";
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
   FORMAT WISHLIST ITEMS
===================================================== */

const formatWishlistItems = (items) => {
  return items.map((item) => {
    /*
      Use saved wishlist image first.
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

      product: item.product || null,
    };
  });
};

/* =====================================================
   WISHLIST PROVIDER
===================================================== */

function WishlistProvider({ children }) {
  const {
    token,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [wishlistItems, setWishlistItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =====================================================
     FETCH WISHLIST
  ===================================================== */

  const fetchWishlist = async () => {
    if (!token || !isAuthenticated) {
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/wishlist`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch wishlist."
        );
      }

      const backendItems =
        data.wishlist?.items || [];

      setWishlistItems(
        formatWishlistItems(
          backendItems
        )
      );
    } catch (error) {
      console.error(
        "Error fetching wishlist:",
        error
      );

      setError(
        error.message ||
          "Failed to fetch wishlist."
      );

      setWishlistItems([]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     LOAD WISHLIST AFTER AUTH
  ===================================================== */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (
      !isAuthenticated ||
      !token
    ) {
      setWishlistItems([]);
      return;
    }

    fetchWishlist();
  }, [
    token,
    isAuthenticated,
    authLoading,
  ]);

  /* =====================================================
     ADD TO WISHLIST
  ===================================================== */

  const addToWishlist = async (product) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to add products to your wishlist."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/wishlist`,
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
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to add product to wishlist."
        );
      }

      const backendItems =
        data.wishlist?.items || [];

      setWishlistItems(
        formatWishlistItems(
          backendItems
        )
      );

      return data;
    } catch (error) {
      console.error(
        "Error adding product to wishlist:",
        error
      );

      setError(
        error.message ||
          "Failed to add product to wishlist."
      );

      throw error;
    }
  };

  /* =====================================================
     REMOVE FROM WISHLIST
  ===================================================== */

  const removeFromWishlist = async (
    productId
  ) => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to manage your wishlist."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/wishlist/${productId}`,
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
            "Failed to remove product from wishlist."
        );
      }

      const backendItems =
        data.wishlist?.items || [];

      setWishlistItems(
        formatWishlistItems(
          backendItems
        )
      );

      return data;
    } catch (error) {
      console.error(
        "Error removing product from wishlist:",
        error
      );

      setError(
        error.message ||
          "Failed to remove product from wishlist."
      );

      throw error;
    }
  };

  /* =====================================================
     TOGGLE WISHLIST
  ===================================================== */

  const toggleWishlist = async (
    product
  ) => {
    const productId =
      product.id ||
      product._id;

    const exists =
      wishlistItems.some(
        (item) =>
          String(item.id) ===
          String(productId)
      );

    if (exists) {
      return removeFromWishlist(
        productId
      );
    }

    return addToWishlist(product);
  };

  /* =====================================================
     CHECK IF PRODUCT IS WISHLISTED
  ===================================================== */

  const isWishlisted = (
    productId
  ) => {
    return wishlistItems.some(
      (item) =>
        String(item.id) ===
        String(productId)
    );
  };

  /* =====================================================
     CLEAR WISHLIST
  ===================================================== */

  const clearWishlist = async () => {
    if (
      !isAuthenticated ||
      !token
    ) {
      throw new Error(
        "Please login to manage your wishlist."
      );
    }

    try {
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/wishlist`,
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
            "Failed to clear wishlist."
        );
      }

      setWishlistItems([]);

      return data;
    } catch (error) {
      console.error(
        "Error clearing wishlist:",
        error
      );

      setError(
        error.message ||
          "Failed to clear wishlist."
      );

      throw error;
    }
  };

  /* =====================================================
     WISHLIST COUNT
  ===================================================== */

  const wishlistCount =
    wishlistItems.length;

  /* =====================================================
     PROVIDER
  ===================================================== */

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
        clearWishlist,
        loading,
        error,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

/* =====================================================
   USE WISHLIST HOOK
===================================================== */

export function useWishlist() {
  const context =
    useContext(
      WishlistContext
    );

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}

export default WishlistProvider;
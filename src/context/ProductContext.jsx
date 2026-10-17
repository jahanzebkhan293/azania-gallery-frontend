import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import initialProducts from "../data/products";

import {
  getProducts,
  createProduct,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
} from "../services/productService";

const ProductContext = createContext(null);

/* =====================================================
   BACKEND BASE URL
===================================================== */

const BACKEND_BASE_URL =
  "http://localhost:5000";

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

  /*
    Keep existing frontend/Vite
    image URLs unchanged.
  */

  return image;
};

/* =====================================================
   CONVERT BACKEND PRODUCT TO FRONTEND PRODUCT
===================================================== */

const formatBackendProduct = (
  product
) => {
  const backendImages =
    Array.isArray(product.images)
      ? product.images
      : [];

  const primaryImage =
    product.image ||
    backendImages[0] ||
    "";

  const formattedImages =
    backendImages.length > 0
      ? backendImages.map(getImageUrl)
      : primaryImage
        ? [getImageUrl(primaryImage)]
        : [];

  return {
    ...product,

    /*
      IMPORTANT:
      MongoDB _id becomes the frontend id.

      This ensures Cart/Wishlist receive
      the real MongoDB product ID.
    */

    id:
      product._id ||
      product.id,

    /*
      Convert backend image paths
      into browser-ready URLs.
    */

    image:
      getImageUrl(primaryImage),

    images:
      formattedImages,

    price:
      Number(product.price || 0),

    stock:
      Number(product.stock ?? 0),

    featured:
      Boolean(product.featured),

    isActive:
      product.isActive !== undefined
        ? Boolean(product.isActive)
        : true,
  };
};

/* =====================================================
   CONVERT FRONTEND PRODUCT TO BACKEND PRODUCT
===================================================== */

const formatProductForBackend = (
  product
) => {
  let image =
    product.image ||
    product.images?.[0] ||
    "";

  /*
    If frontend has a full backend URL,
    save only the /uploads/... path
    in MongoDB.
  */

  if (
    image.startsWith(
      `${BACKEND_BASE_URL}/uploads/`
    )
  ) {
    image =
      image.replace(
        BACKEND_BASE_URL,
        ""
      );
  }

  return {
    name:
      product.name || "",

    description:
      product.description || "",

    price:
      Number(product.price || 0),

    category:
      product.category || "Jewelry",

    subcategory:
      product.subcategory || "Other",

    image,

    stock:
      Number(product.stock ?? 0),

    featured:
      Boolean(product.featured),

    isActive:
      product.isActive !== undefined
        ? Boolean(product.isActive)
        : true,
  };
};

/* =====================================================
   PRODUCT PROVIDER
===================================================== */

function ProductProvider({
  children,
}) {
  const [products, setProducts] =
    useState(() => {
      try {
        const savedProducts =
          localStorage.getItem(
            "azania-products"
          );

        if (!savedProducts) {
          return initialProducts;
        }

        const parsedProducts =
          JSON.parse(savedProducts);

        if (
          Array.isArray(parsedProducts) &&
          parsedProducts.length > 0
        ) {
          return parsedProducts;
        }

        return initialProducts;
      } catch (error) {
        console.error(
          "Error loading products:",
          error
        );

        return initialProducts;
      }
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =====================================================
     FETCH PRODUCTS FROM BACKEND
  ===================================================== */

  useEffect(() => {
    const loadProducts =
      async () => {
        try {
          setLoading(true);
          setError("");

          const data =
            await getProducts();

          if (
            data.success &&
            Array.isArray(
              data.products
            )
          ) {
            /*
              IMPORTANT:

              Backend/MongoDB products are now
              the main source of truth.

              We do NOT merge them with the
              old frontend products.

              This prevents duplicate products
              and, more importantly, prevents
              local numeric IDs such as 1, 2, 3
              from being used by Cart/Wishlist.

              MongoDB ObjectIds are now used.
            */

            const backendProducts =
              data.products.map(
                formatBackendProduct
              );

            setProducts(
              backendProducts
            );
          } else {
            throw new Error(
              data.message ||
                "Invalid products response from backend."
            );
          }
        } catch (error) {
          console.error(
            "Error fetching products from backend:",
            error
          );

          /*
            If backend is unavailable,
            keep existing frontend products
            available as fallback.
          */

          setError(
            "Unable to load products from backend."
          );
        } finally {
          setLoading(false);
        }
      };

    loadProducts();
  }, []);

  /* =====================================================
     SAVE PRODUCTS TO LOCAL STORAGE
  ===================================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        "azania-products",
        JSON.stringify(products)
      );
    } catch (error) {
      console.error(
        "Error saving products:",
        error
      );
    }
  }, [products]);

  /* =====================================================
     ADD PRODUCT
  ===================================================== */

  const addProduct =
    async (product) => {
      try {
        const backendProduct =
          formatProductForBackend(
            product
          );

        const data =
          await createProduct(
            backendProduct
          );

        if (
          !data.success ||
          !data.product
        ) {
          throw new Error(
            data.message ||
              "Failed to create product."
          );
        }

        const newProduct =
          formatBackendProduct(
            data.product
          );

        setProducts(
          (currentProducts) => [
            newProduct,
            ...currentProducts,
          ]
        );

        return newProduct;
      } catch (error) {
        console.error(
          "Error adding product:",
          error
        );

        throw error;
      }
    };

  /* =====================================================
     UPDATE PRODUCT
  ===================================================== */

  const updateProduct =
    async (
      productId,
      updatedProduct
    ) => {
      try {
        const backendProduct =
          formatProductForBackend(
            updatedProduct
          );

        const data =
          await updateProductAPI(
            productId,
            backendProduct
          );

        if (
          !data.success ||
          !data.product
        ) {
          throw new Error(
            data.message ||
              "Failed to update product."
          );
        }

        const updatedBackendProduct =
          formatBackendProduct(
            data.product
          );

        setProducts(
          (currentProducts) =>
            currentProducts.map(
              (product) =>
                String(
                  product.id
                ) ===
                String(productId)
                  ? updatedBackendProduct
                  : product
            )
        );

        return updatedBackendProduct;
      } catch (error) {
        console.error(
          "Error updating product:",
          error
        );

        throw error;
      }
    };

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const deleteProduct =
    async (productId) => {
      try {
        const data =
          await deleteProductAPI(
            productId
          );

        if (!data.success) {
          throw new Error(
            data.message ||
              "Failed to delete product."
          );
        }

        setProducts(
          (currentProducts) =>
            currentProducts.filter(
              (product) =>
                String(
                  product.id
                ) !==
                String(productId)
            )
        );

        return data;
      } catch (error) {
        console.error(
          "Error deleting product:",
          error
        );

        throw error;
      }
    };

  /* =====================================================
     GET PRODUCT BY ID
  ===================================================== */

  const getProductById =
    (productId) => {
      return products.find(
        (product) =>
          String(
            product.id
          ) ===
          String(productId)
      );
    };

  /* =====================================================
     CONTEXT
  ===================================================== */

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

/* =====================================================
   USE PRODUCTS HOOK
===================================================== */

export function useProducts() {
  const context =
    useContext(
      ProductContext
    );

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}

export default ProductProvider;
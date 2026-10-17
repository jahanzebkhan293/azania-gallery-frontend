import API_BASE_URL from "./api";

/* =====================================================
   GET ALL PRODUCTS
===================================================== */

export const getProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products.");
  }

  return data;
};

/* =====================================================
   GET SINGLE PRODUCT
===================================================== */

export const getProductById = async (productId) => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product.");
  }

  return data;
};

/* =====================================================
   CREATE PRODUCT
===================================================== */

export const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create product.");
  }

  return data;
};

/* =====================================================
   UPDATE PRODUCT
===================================================== */

export const updateProduct = async (productId, productData) => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product.");
  }

  return data;
};

/* =====================================================
   DELETE PRODUCT
===================================================== */

export const deleteProduct = async (productId) => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product.");
  }

  return data;
};
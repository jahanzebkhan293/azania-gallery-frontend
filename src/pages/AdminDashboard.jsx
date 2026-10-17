import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import API_BASE_URL from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./AdminDashboard.css";
import "./AdminDashboard-navigation.css";

function AdminDashboard() {
  const { token } = useAuth();
  const validAdminSections = ["products", "orders", "messages", "cart", "wishlist"];

  const [searchParams, setSearchParams] = useSearchParams();
  const requestedSection = searchParams.get("section");
  const [activeSection, setActiveSection] = useState(() =>
    validAdminSections.includes(requestedSection) ? requestedSection : "products"
  );

  // Keep the visible panel in sync when the Navbar changes ?section=cart/wishlist.
  useEffect(() => {
    if (validAdminSections.includes(requestedSection)) {
      setActiveSection(requestedSection);
    } else {
      setActiveSection("products");
    }
  }, [requestedSection]);

  const handleSectionChange = (section) => {
    if (!validAdminSections.includes(section)) return;

    setActiveSection(section);
    setSearchParams({ section }, { replace: true });
  };

  /* =====================================================
     ORDERS STATE
  ===================================================== */

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     PRODUCTS STATE
  ===================================================== */

  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] =
    useState(true);
  const [productsError, setProductsError] =
    useState("");

  /* =====================================================
     CUSTOMER CART ACTIVITY STATE
  ===================================================== */

  const [cartActivities, setCartActivities] = useState([]);
  const [isCartActivityLoading, setIsCartActivityLoading] =
    useState(true);
  const [cartActivityError, setCartActivityError] =
    useState("");

  /* =====================================================
     CUSTOMER WISHLIST ACTIVITY STATE
  ===================================================== */

  const [wishlistActivities, setWishlistActivities] =
    useState([]);

  const [
    isWishlistActivityLoading,
    setIsWishlistActivityLoading,
  ] = useState(true);

  const [
    wishlistActivityError,
    setWishlistActivityError,
  ] = useState("");

  /* =====================================================
     CUSTOMER MESSAGES STATE
  ===================================================== */

  const [contactMessages, setContactMessages] = useState([]);
  const [isContactMessagesLoading, setIsContactMessagesLoading] =
    useState(true);
  const [contactMessagesError, setContactMessagesError] = useState("");

  /* =====================================================
     PRODUCT FORM STATE
  ===================================================== */

  const emptyProductForm = {
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    image: "",
    stock: "",
    featured: false,
    isActive: true,
  };

  const [productForm, setProductForm] =
    useState(emptyProductForm);

  const [isProductModalOpen, setIsProductModalOpen] =
    useState(false);

  const [editingProductId, setEditingProductId] =
    useState(null);

  const [isSavingProduct, setIsSavingProduct] =
    useState(false);

  /* =====================================================
     FETCH ORDERS
  ===================================================== */

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/orders`,
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
            "Failed to fetch orders."
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error(
        "Admin orders error:",
        error
      );

      setError(
        error.message ||
          "Failed to fetch orders."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  const fetchProducts = async () => {
    try {
      setIsProductsLoading(true);
      setProductsError("");

      const response = await fetch(
        `${API_BASE_URL}/products`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch products."
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error(
        "Admin products error:",
        error
      );

      setProductsError(
        error.message ||
          "Failed to fetch products."
      );
    } finally {
      setIsProductsLoading(false);
    }
  };

  /* =====================================================
     FETCH CUSTOMER CART ACTIVITY
  ===================================================== */

  const fetchCartActivity = async () => {
    try {
      setIsCartActivityLoading(true);
      setCartActivityError("");

      const response = await fetch(
        `${API_BASE_URL}/cart/admin/activity`,
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
            "Failed to fetch customer cart activity."
        );
      }

      setCartActivities(data.activities || []);
    } catch (error) {
      console.error(
        "Admin cart activity error:",
        error
      );

      setCartActivityError(
        error.message ||
          "Failed to fetch customer cart activity."
      );
    } finally {
      setIsCartActivityLoading(false);
    }
  };

  /* =====================================================
     FETCH CUSTOMER WISHLIST ACTIVITY
  ===================================================== */

  const fetchWishlistActivity = async () => {
    try {
      setIsWishlistActivityLoading(true);
      setWishlistActivityError("");

      const response = await fetch(
        `${API_BASE_URL}/wishlist/admin/activity`,
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
            "Failed to fetch customer wishlist activity."
        );
      }

      setWishlistActivities(
        data.activities || []
      );
    } catch (error) {
      console.error(
        "Admin wishlist activity error:",
        error
      );

      setWishlistActivityError(
        error.message ||
          "Failed to fetch customer wishlist activity."
      );
    } finally {
      setIsWishlistActivityLoading(false);
    }
  };

  /* =====================================================
     FETCH CUSTOMER MESSAGES
  ===================================================== */

  const fetchContactMessages = async () => {
    try {
      setIsContactMessagesLoading(true);
      setContactMessagesError("");

      const response = await fetch(
        `${API_BASE_URL}/contact/admin`,
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
          data.message || "Failed to fetch customer messages."
        );
      }

      setContactMessages(data.messages || []);
    } catch (error) {
      console.error("Admin contact messages error:", error);
      setContactMessagesError(
        error.message || "Failed to fetch customer messages."
      );
    } finally {
      setIsContactMessagesLoading(false);
    }
  };

  /* =====================================================
     UPDATE CUSTOMER MESSAGE STATUS
  ===================================================== */

  const updateContactMessageStatus = async (messageId, status) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/admin/${messageId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update message status."
        );
      }

      setContactMessages((previousMessages) =>
        previousMessages.map((message) =>
          message._id === messageId
            ? {
                ...message,
                status: data.message?.status || status,
              }
            : message
        )
      );
    } catch (error) {
      console.error("Update contact message status error:", error);
      alert(error.message || "Failed to update message status.");
    }
  };

  /* =====================================================
     DELETE CUSTOMER MESSAGE
  ===================================================== */

  const deleteContactMessage = async (messageId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer message?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/contact/admin/${messageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete customer message."
        );
      }

      setContactMessages((previousMessages) =>
        previousMessages.filter((message) => message._id !== messageId)
      );
    } catch (error) {
      console.error("Delete contact message error:", error);
      alert(error.message || "Failed to delete customer message.");
    }
  };

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    if (token) {
      fetchOrders();
      fetchProducts();
      fetchCartActivity();
      fetchWishlistActivity();
      fetchContactMessages();
    }
  }, [token]);

  /* =====================================================
     UPDATE ORDER STATUS
  ===================================================== */

  const updateOrderStatus = async (
    orderId,
    status
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            orderStatus: status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update order."
        );
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus:
                  data.order?.orderStatus ||
                  status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "Update order error:",
        error
      );

      alert(
        error.message ||
          "Failed to update order."
      );
    }
  };

  /* =====================================================
     PRODUCT IMAGE URL
  ===================================================== */

  const getProductImageUrl = (image) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    const backendBaseUrl =
      API_BASE_URL.replace(/\/api\/?$/, "");

    if (image.startsWith("/")) {
      return `${backendBaseUrl}${image}`;
    }

    return `${backendBaseUrl}/${image}`;
  };

  /* =====================================================
     OPEN ADD PRODUCT
  ===================================================== */

  const openAddProduct = () => {
    setEditingProductId(null);

    setProductForm({
      ...emptyProductForm,
    });

    setIsProductModalOpen(true);
  };

  /* =====================================================
     OPEN EDIT PRODUCT
  ===================================================== */

  const openEditProduct = (product) => {
    setEditingProductId(product._id);

    setProductForm({
      name: product.name || "",
      description:
        product.description || "",
      price:
        product.price !== undefined &&
        product.price !== null
          ? String(product.price)
          : "",
      category:
        product.category || "",
      subcategory:
        product.subcategory || "",
      image:
        product.image || "",
      stock:
        product.stock !== undefined &&
        product.stock !== null
          ? String(product.stock)
          : "",
      featured:
        Boolean(product.featured),
      isActive:
        product.isActive !== false,
    });

    setIsProductModalOpen(true);
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeProductModal = () => {
    if (isSavingProduct) {
      return;
    }

    setIsProductModalOpen(false);
    setEditingProductId(null);

    setProductForm({
      ...emptyProductForm,
    });
  };

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleProductFormChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setProductForm((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =====================================================
     CREATE / UPDATE PRODUCT
  ===================================================== */

  const saveProduct = async (event) => {
    event.preventDefault();

    if (!productForm.name.trim()) {
      alert("Product name is required.");
      return;
    }

    if (
      productForm.price === "" ||
      Number(productForm.price) < 0
    ) {
      alert(
        "Please enter a valid product price."
      );
      return;
    }

    if (!productForm.category.trim()) {
      alert(
        "Product category is required."
      );
      return;
    }

    if (
      productForm.stock === "" ||
      Number(productForm.stock) < 0
    ) {
      alert(
        "Please enter a valid stock quantity."
      );
      return;
    }

    if (!productForm.image.trim()) {
      alert("Product image is required.");
      return;
    }

    try {
      setIsSavingProduct(true);

      const isEditing =
        Boolean(editingProductId);

      const url = isEditing
        ? `${API_BASE_URL}/products/${editingProductId}`
        : `${API_BASE_URL}/products`;

      const response = await fetch(url, {
        method: isEditing
          ? "PUT"
          : "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          name: productForm.name.trim(),

          description:
            productForm.description.trim(),

          price: Number(
            productForm.price
          ),

          category:
            productForm.category.trim(),

          subcategory:
            productForm.subcategory.trim(),

          image:
            productForm.image.trim(),

          stock: Number(
            productForm.stock
          ),

          featured:
            Boolean(productForm.featured),

          isActive:
            Boolean(productForm.isActive),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Failed to ${
              isEditing
                ? "update"
                : "create"
            } product.`
        );
      }

      alert(
        isEditing
          ? "Product updated successfully."
          : "Product added successfully."
      );

      closeProductModal();

      await fetchProducts();
    } catch (error) {
      console.error(
        "Save product error:",
        error
      );

      alert(
        error.message ||
          "Failed to save product."
      );
    } finally {
      setIsSavingProduct(false);
    }
  };

  /* =====================================================
     DELETE PRODUCT
  ===================================================== */

  const deleteProduct = async (
    productId,
    productName
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${productId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete product."
        );
      }

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            product._id !== productId
        )
      );

      alert(
        "Product deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete product."
      );
    }
  };

  /* =====================================================
     TOGGLE FEATURED
  ===================================================== */

  const toggleFeatured = async (
    product
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${product._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            featured:
              !Boolean(
                product.featured
              ),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update featured status."
        );
      }

      setProducts((previousProducts) =>
        previousProducts.map(
          (previousProduct) =>
            previousProduct._id ===
            product._id
              ? {
                  ...previousProduct,

                  featured:
                    data.product
                      ?.featured ??
                    !Boolean(
                      product.featured
                    ),
                }
              : previousProduct
        )
      );
    } catch (error) {
      console.error(
        "Toggle featured error:",
        error
      );

      alert(
        error.message ||
          "Failed to update featured status."
      );
    }
  };

  /* =====================================================
     TOGGLE ACTIVE / INACTIVE
  ===================================================== */

  const toggleProductStatus = async (
    product
  ) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${product._id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            isActive:
              product.isActive === false,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update product status."
        );
      }

      setProducts((previousProducts) =>
        previousProducts.map(
          (previousProduct) =>
            previousProduct._id ===
            product._id
              ? {
                  ...previousProduct,

                  isActive:
                    data.product
                      ?.isActive ??
                    product.isActive ===
                      false,
                }
              : previousProduct
        )
      );
    } catch (error) {
      console.error(
        "Toggle product status error:",
        error
      );

      alert(
        error.message ||
          "Failed to update product status."
      );
    }
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (isLoading) {
    return (
      <main className="admin-loading">
        <div className="admin-loading-box">
          <div className="admin-spinner"></div>

          <h2>
            Loading Admin Panel...
          </h2>

          <p>
            Please wait while your store
            data is loading.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      {/* =================================================
          HEADER
      ================================================= */}

      <section className="admin-header">
        <div>
          <p className="admin-eyebrow">
            AZANIA GALLERY
          </p>

          <h1>
            Admin Dashboard
          </h1>

          <p className="admin-subtitle">
            Manage customer orders, products
            and store activity from one place.
          </p>
        </div>

        <div className="admin-header-badge">
          <span className="admin-status-dot"></span>
          Admin Panel
        </div>
      </section>

      <nav className="admin-section-nav" aria-label="Admin dashboard sections">
        {[
          { id: "products", label: "Product Management" },
          { id: "orders", label: "Customer Orders" },
          { id: "messages", label: "Customer Messages" },
          { id: "cart", label: "Customer Cart" },
          { id: "wishlist", label: "Customer Wishlist" },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-section-nav-button ${activeSection === item.id ? "is-active" : ""}`}
            onClick={() => handleSectionChange(item.id)}
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            <span className="admin-nav-full-label">{item.label}</span>
            {item.id === "orders" && orders.length > 0 && (
              <span className="admin-nav-count">{orders.length}</span>
            )}
            {item.id === "messages" && contactMessages.length > 0 && (
              <span className="admin-nav-count">{contactMessages.length}</span>
            )}
          </button>
        ))}
      </nav>

      {/* =================================================
          ORDER ERROR
      ================================================= */}
      {activeSection === "orders" && (
        <>


      {error && (
        <div className="admin-error">
          <strong>
            Order Error
          </strong>

          <span>
            {error}
          </span>
        </div>
      )}

      {/* =================================================
          CUSTOMER ORDERS
      ================================================= */}

      <section className="admin-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              ORDER MANAGEMENT
            </span>

            <h2>
              Customer Orders
            </h2>

            <p>
              View customer orders and update
              their order status.
            </p>
          </div>

          <div className="section-count">
            {orders.length} Orders
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">
              —
            </div>

            <h3>
              No Orders Found
            </h3>

            <p>
              Customer orders will appear
              here when available.
            </p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>
                    Order ID
                  </th>

                  <th>
                    Customer
                  </th>

                  <th>
                    Total
                  </th>

                  <th>
                    Payment
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Update
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <span className="order-id">
                        #
                        {order._id.slice(
                          -8
                        )}
                      </span>
                    </td>

                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar">
                          {(
                            order
                              .shippingAddress
                              ?.fullName ||
                            order.user?.name ||
                            "C"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {order
                              .shippingAddress
                              ?.fullName ||
                              order.user?.name ||
                              "Customer"}
                          </strong>

                          <small>
                            Customer
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      <strong className="price-text">
                        $
                        {Number(
                          order.totalAmount ||
                            0
                        ).toFixed(2)}
                      </strong>
                    </td>

                    <td>
                      <span className="payment-badge">
                        {
                          order.paymentMethod
                        }
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${String(
                          order.orderStatus ||
                            ""
                        )
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      >
                        {
                          order.orderStatus
                        }
                      </span>
                    </td>

                    <td>
                      <select
                        value={
                          order.orderStatus
                        }
                        onChange={(event) =>
                          updateOrderStatus(
                            order._id,
                            event.target
                              .value
                          )
                        }
                        className="admin-select"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>


        </>
      )}
      {/* =================================================
          CUSTOMER CART ACTIVITY
      ================================================= */}
      {activeSection === "cart" && (
        <>


      <section className="admin-section" style={{ marginTop: "28px" }}>
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              CUSTOMER ACTIVITY
            </span>

            <h2>
              Cart Activity
            </h2>

            <p>
              See which customers have recently added
              products to their carts.
            </p>
          </div>

          <div className="section-count">
            {cartActivities.length} Activities
          </div>
        </div>

        {cartActivityError && (
          <div className="admin-error">
            <strong>
              Cart Activity Error
            </strong>

            <span>
              {cartActivityError}
            </span>
          </div>
        )}

        {isCartActivityLoading ? (
          <div className="admin-empty">
            <div className="admin-spinner"></div>

            <h3>
              Loading Customer Activity
            </h3>

            <p>
              Please wait while cart activity is loading.
            </p>
          </div>
        ) : cartActivities.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">
              +
            </div>

            <h3>
              No Cart Activity Yet
            </h3>

            <p>
              Customer cart activity will appear here
              when customers add products to their carts.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {cartActivities.map((activity, index) => {
              const customerName =
                activity.userName || "Customer";

              const productName =
                activity.productName || "Product";

              const productImage =
                getProductImageUrl(
                  activity.productImage
                );

              const activityDate = activity.addedAt
                ? new Date(activity.addedAt)
                : null;

              const formattedDate =
                activityDate &&
                !Number.isNaN(activityDate.getTime())
                  ? activityDate.toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Time unavailable";

              return (
                <div
                  key={`${activity.userId}-${activity.productId}-${activity.addedAt}-${index}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "16px",
                    border: "1px solid rgba(13, 27, 42, 0.10)",
                    borderRadius: "16px",
                    background: "#ffffff",
                    boxShadow: "0 6px 20px rgba(13, 27, 42, 0.05)",
                  }}
                >
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      minWidth: "54px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: "#f7f4ee",
                      border: "1px solid rgba(176, 141, 87, 0.20)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={productName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "#777",
                        }}
                      >
                        N/A
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "5px",
                      }}
                    >
                      <strong
                        style={{
                          color: "#0D1B2A",
                          fontSize: "15px",
                        }}
                      >
                        {customerName}
                      </strong>

                      <span
                        style={{
                          fontSize: "12px",
                          color: "#ffffff",
                          background: "#B08D57",
                          borderRadius: "999px",
                          padding: "4px 8px",
                          fontWeight: 600,
                        }}
                      >
                        Added to Cart
                      </span>
                    </div>

                    <div
                      style={{
                        color: "#343434",
                        fontSize: "14px",
                        lineHeight: 1.5,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {productName}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        flexWrap: "wrap",
                        marginTop: "6px",
                        fontSize: "12px",
                        color: "#777",
                      }}
                    >
                      <span>
                        {activity.userEmail || "No email"}
                      </span>

                      <span>
                        Qty: {activity.quantity || 1}
                      </span>

                      <span>
                        ${Number(activity.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div
                    style={{
                      minWidth: "145px",
                      textAlign: "right",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        color: "#999",
                        marginBottom: "4px",
                      }}
                    >
                      Added
                    </span>

                    <strong
                      style={{
                        display: "block",
                        color: "#0D1B2A",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      {formattedDate}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>


        </>
      )}
      {/* =================================================
          CUSTOMER WISHLIST ACTIVITY
      ================================================= */}
      {activeSection === "wishlist" && (
        <>


      <section
        className="admin-section"
        style={{ marginTop: "28px" }}
      >
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              CUSTOMER ACTIVITY
            </span>

            <h2>
              Wishlist Activity
            </h2>

            <p>
              See which products customers have recently
              added to their wishlists.
            </p>
          </div>

          <div className="section-count">
            {wishlistActivities.length} Activities
          </div>
        </div>

        {wishlistActivityError && (
          <div className="admin-error">
            <strong>
              Wishlist Activity Error
            </strong>

            <span>
              {wishlistActivityError}
            </span>
          </div>
        )}

        {isWishlistActivityLoading ? (
          <div className="admin-empty">
            <div className="admin-spinner"></div>

            <h3>
              Loading Wishlist Activity
            </h3>

            <p>
              Please wait while wishlist activity is loading.
            </p>
          </div>
        ) : wishlistActivities.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">
              ♡
            </div>

            <h3>
              No Wishlist Activity Yet
            </h3>

            <p>
              Customer wishlist activity will appear here
              when customers add products to their wishlists.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {wishlistActivities.map(
              (activity, index) => {
                const customerName =
                  activity.userName || "Customer";

                const productName =
                  activity.productName || "Product";

                const productImage =
                  getProductImageUrl(
                    activity.productImage
                  );

                const activityDate =
                  activity.addedAt
                    ? new Date(activity.addedAt)
                    : null;

                const formattedDate =
                  activityDate &&
                  !Number.isNaN(
                    activityDate.getTime()
                  )
                    ? activityDate.toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "Time unavailable";

                return (
                  <div
                    key={`${activity.userId}-${activity.productId}-${activity.addedAt}-${index}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "16px",
                      border:
                        "1px solid rgba(13, 27, 42, 0.10)",
                      borderRadius: "16px",
                      background: "#ffffff",
                      boxShadow:
                        "0 6px 20px rgba(13, 27, 42, 0.05)",
                    }}
                  >
                    {/* PRODUCT IMAGE */}

                    <div
                      style={{
                        width: "54px",
                        height: "54px",
                        minWidth: "54px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: "#f7f4ee",
                        border:
                          "1px solid rgba(176, 141, 87, 0.20)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={productName}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      ) : (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#777",
                          }}
                        >
                          N/A
                        </span>
                      )}
                    </div>

                    {/* ACTIVITY DETAILS */}

                    <div
                      style={{
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                          marginBottom: "5px",
                        }}
                      >
                        <strong
                          style={{
                            color: "#0D1B2A",
                            fontSize: "15px",
                          }}
                        >
                          {customerName}
                        </strong>

                        <span
                          style={{
                            fontSize: "12px",
                            color: "#ffffff",
                            background: "#B08D57",
                            borderRadius: "999px",
                            padding: "4px 8px",
                            fontWeight: 600,
                          }}
                        >
                          Added to Wishlist
                        </span>
                      </div>

                      <div
                        style={{
                          color: "#343434",
                          fontSize: "14px",
                          lineHeight: 1.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {productName}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          flexWrap: "wrap",
                          marginTop: "6px",
                          fontSize: "12px",
                          color: "#777",
                        }}
                      >
                        <span>
                          {activity.userEmail || "No email"}
                        </span>

                        <span>
                          $
                          {Number(
                            activity.price || 0
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* TIME */}

                    <div
                      style={{
                        minWidth: "145px",
                        textAlign: "right",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          color: "#999",
                          marginBottom: "4px",
                        }}
                      >
                        Added
                      </span>

                      <strong
                        style={{
                          display: "block",
                          color: "#0D1B2A",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {formattedDate}
                      </strong>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>


        </>
      )}
      {/* =================================================
          CUSTOMER MESSAGES
      ================================================= */}
      {activeSection === "messages" && (
        <>


      <section className="admin-section" style={{ marginTop: "28px" }}>
        <div className="section-heading">
          <div>
            <span className="section-kicker">CUSTOMER SUPPORT</span>
            <h2>Customer Messages</h2>
            <p>Read messages submitted through your Contact Us form and manage their status.</p>
          </div>

          <div className="section-count">
            {contactMessages.length} Messages
          </div>
        </div>

        {contactMessagesError && (
          <div className="admin-error">
            <strong>Messages Error</strong>
            <span>{contactMessagesError}</span>
            <button
              type="button"
              onClick={fetchContactMessages}
              className="edit-button"
              style={{ marginLeft: "12px" }}
            >
              Try Again
            </button>
          </div>
        )}

        {isContactMessagesLoading ? (
          <div className="admin-empty">
            <div className="admin-spinner"></div>
            <h3>Loading Customer Messages</h3>
            <p>Please wait while messages are loading.</p>
          </div>
        ) : contactMessages.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">✉</div>
            <h3>No Customer Messages Yet</h3>
            <p>Messages submitted through the Contact Us form will appear here.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "14px" }}>
            {contactMessages.map((message) => (
              <article
                key={message._id}
                style={{
                  padding: "18px",
                  border: "1px solid rgba(13, 27, 42, 0.10)",
                  borderRadius: "14px",
                  background: "#ffffff",
                  boxShadow: "0 6px 20px rgba(13, 27, 42, 0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "14px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{ margin: "0 0 6px", color: "#0D1B2A" }}>
                      {message.subject || "No subject"}
                    </h3>
                    <div style={{ color: "#555", fontSize: "13px", lineHeight: 1.7 }}>
                      <strong>{message.name || "Customer"}</strong>
                      {" · "}
                      <a href={`mailto:${message.email}`} style={{ color: "#8A6B3D" }}>
                        {message.email || "No email"}
                      </a>
                    </div>
                    <p
                      style={{
                        margin: "12px 0",
                        color: "#343434",
                        lineHeight: 1.7,
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {message.message}
                    </p>
                    <small style={{ color: "#777" }}>
                      Received:{" "}
                      {message.createdAt
                        ? new Date(message.createdAt).toLocaleString()
                        : "Date unavailable"}
                    </small>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <select
                      className="admin-select"
                      value={message.status || "New"}
                      onChange={(event) =>
                        updateContactMessageStatus(message._id, event.target.value)
                      }
                      aria-label={`Update status for message from ${message.name || "customer"}`}
                    >
                      <option value="New">New</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteContactMessage(message._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>


        </>
      )}
      {/* =================================================
          PRODUCT MANAGEMENT
      ================================================= */}
      {activeSection === "products" && (
        <>


      <section className="admin-section product-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              STORE MANAGEMENT
            </span>

            <h2>
              Product Management
            </h2>

            <p>
              Add, edit, delete and manage
              store products.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddProduct}
            className="add-product-button"
          >
            <span className="button-plus">
              +
            </span>

            Add Product
          </button>
        </div>

        {productsError && (
          <div className="admin-error product-error">
            <strong>
              Product Error
            </strong>

            <span>
              {productsError}
            </span>
          </div>
        )}

        {isProductsLoading ? (
          <div className="admin-empty">
            <div className="admin-spinner"></div>

            <h3>
              Loading Products
            </h3>

            <p>
              Please wait while products
              are loading.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="admin-empty">
            <div className="empty-icon">
              +
            </div>

            <h3>
              No Products Found
            </h3>

            <p>
              Add your first product to
              start managing your catalog.
            </p>

            <button
              type="button"
              onClick={openAddProduct}
              className="empty-action-button"
            >
              Add Product
            </button>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table product-table">
              <thead>
                <tr>
                  <th>
                    Product
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Stock
                  </th>

                  <th>
                    Featured
                  </th>

                  <th>
                    Status
                  </th>

                  <th>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    {/* PRODUCT */}

                    <td>
                      <div className="product-cell">
                        <div className="product-image-wrapper">
                          {product.image ? (
                            <img
                              src={getProductImageUrl(
                                product.image
                              )}
                              alt={
                                product.name ||
                                "Product"
                              }
                              className="product-image"
                            />
                          ) : (
                            <div className="product-no-image">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="product-info">
                          <strong>
                            {product.name ||
                              "Unnamed Product"}
                          </strong>

                          {product.subcategory && (
                            <small>
                              {
                                product.subcategory
                              }
                            </small>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY */}

                    <td>
                      <span className="category-text">
                        {product.category ||
                          "—"}
                      </span>
                    </td>

                    {/* PRICE */}

                    <td>
                      <strong className="price-text">
                        $
                        {Number(
                          product.price ||
                            0
                        ).toFixed(2)}
                      </strong>
                    </td>

                    {/* STOCK */}

                    <td>
                      <span
                        className={`stock-value ${
                          Number(
                            product.stock ||
                              0
                          ) <= 0
                            ? "stock-out"
                            : Number(
                                product.stock ||
                                  0
                              ) <= 5
                            ? "stock-low"
                            : "stock-good"
                        }`}
                      >
                        {product.stock ??
                          0}
                      </span>
                    </td>

                    {/* FEATURED */}

                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          toggleFeatured(
                            product
                          )
                        }
                        className={`table-status-button ${
                          product.featured
                            ? "featured-active"
                            : "featured-inactive"
                        }`}
                      >
                        {product.featured
                          ? "Featured"
                          : "Set Featured"}
                      </button>
                    </td>

                    {/* ACTIVE */}

                    <td>
                      <button
                        type="button"
                        onClick={() =>
                          toggleProductStatus(
                            product
                          )
                        }
                        className={`table-status-button ${
                          product.isActive !==
                          false
                            ? "active-status"
                            : "inactive-status"
                        }`}
                      >
                        {product.isActive !==
                        false
                          ? "Active"
                          : "Inactive"}
                      </button>
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="product-actions">
                        <button
                          type="button"
                          onClick={() =>
                            openEditProduct(
                              product
                            )
                          }
                          className="edit-button"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteProduct(
                              product._id,
                              product.name
                            )
                          }
                          className="delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>


        </>
      )}
      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {activeSection === "products" && isProductModalOpen && (
        <div className="modal-overlay">
          <div className="product-modal">
            <div className="modal-header">
              <div>
                <span className="modal-kicker">
                  AZANIA GALLERY
                </span>

                <h2>
                  {editingProductId
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p>
                  {editingProductId
                    ? "Update your product information."
                    : "Add a new product to your store catalog."}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  closeProductModal
                }
                disabled={
                  isSavingProduct
                }
                className="modal-close"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={saveProduct}
              className="product-form"
            >
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Product Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={
                      productForm.name
                    }
                    onChange={
                      handleProductFormChange
                    }
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Price *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={
                      productForm.price
                    }
                    onChange={
                      handleProductFormChange
                    }
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Category *
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={
                      productForm.category
                    }
                    onChange={
                      handleProductFormChange
                    }
                    placeholder="e.g. Jewelry"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Subcategory
                  </label>

                  <input
                    type="text"
                    name="subcategory"
                    value={
                      productForm.subcategory
                    }
                    onChange={
                      handleProductFormChange
                    }
                    placeholder="e.g. Rings"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Stock *
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={
                      productForm.stock
                    }
                    onChange={
                      handleProductFormChange
                    }
                    placeholder="0"
                    min="0"
                    step="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    Image Path / URL *
                  </label>

                  <input
                    type="text"
                    name="image"
                    value={
                      productForm.image
                    }
                    onChange={
                      handleProductFormChange
                    }
                    placeholder="/uploads/jewelry/image.jpg"
                    required
                  />
                </div>
              </div>

              <div className="form-group form-description">
                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    productForm.description
                  }
                  onChange={
                    handleProductFormChange
                  }
                  placeholder="Enter product description"
                  rows="5"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={
                      productForm.featured
                    }
                    onChange={
                      handleProductFormChange
                    }
                  />

                  <span>
                    Featured Product
                  </span>
                </label>

                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={
                      productForm.isActive
                    }
                    onChange={
                      handleProductFormChange
                    }
                  />

                  <span>
                    Active Product
                  </span>
                </label>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={
                    closeProductModal
                  }
                  disabled={
                    isSavingProduct
                  }
                  className="cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    isSavingProduct
                  }
                  className="save-product-button"
                >
                  {isSavingProduct
                    ? "Saving..."
                    : editingProductId
                    ? "Update Product"
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminDashboard;
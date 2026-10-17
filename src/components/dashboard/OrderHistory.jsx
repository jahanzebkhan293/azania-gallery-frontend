import {
  useEffect,
  useState,
} from "react";

import API_BASE_URL from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import "./OrderHistory.css";

const BACKEND_BASE_URL ="https://azania-galleryy-backend-production.up.railway.app";

const getOrderImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  if (image.startsWith("/uploads/")) {
    return `${BACKEND_BASE_URL}${image}`;
  }

  return image;
};

function OrderHistory() {
  const {
    token,
    isAuthenticated,
    loading: authLoading,
  } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const fetchOrders = async () => {
    if (!token || !isAuthenticated) {
      setOrders([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/orders/my-orders`,
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
            "Failed to load your orders."
        );
      }

      setOrders(
        Array.isArray(data.orders)
          ? data.orders
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error
      );

      setError(
        error.message ||
          "Failed to load your orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !token) {
      setOrders([]);
      return;
    }

    fetchOrders();
  }, [
    token,
    isAuthenticated,
    authLoading,
  ]);

  const handleCancelOrder = async (
    orderId
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}/cancel`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to cancel the order."
        );
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus:
                  data.order?.orderStatus ||
                  "Cancelled",
              }
            : order
        )
      );
    } catch (error) {
      console.error(
        "Error cancelling order:",
        error
      );

      setError(
        error.message ||
          "Failed to cancel the order."
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  const getStatusClass = (status) => {
    return String(status || "Pending")
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="dashboard-orders">

      <div className="dashboard-section-heading">
        <div>
          <span>ORDER HISTORY</span>

          <h2>
            Your Orders
          </h2>

          <p>
            View your recent purchases and
            track their current status.
          </p>
        </div>
      </div>

      {error && (
        <div className="dashboard-orders-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="dashboard-orders-state">
          Loading your orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="dashboard-orders-empty">
          <div className="dashboard-orders-empty-mark">
            ✦
          </div>

          <div>
            <span>
              NO ORDERS YET
            </span>

            <h3>
              Your order history is empty.
            </h3>

            <p>
              Once you place an order, it will
              appear here automatically.
            </p>
          </div>
        </div>
      ) : (
        <div className="dashboard-orders-list">

          {orders.map((order) => {
            const orderId =
              order._id || order.id;

            const isExpanded =
              expandedOrderId === orderId;

            const canCancel =
              order.orderStatus ===
                "Pending" ||
              order.orderStatus ===
                "Processing";

            return (
              <article
                className="dashboard-order-card"
                key={orderId}
              >

                <div className="dashboard-order-main">

                  <div className="dashboard-order-reference">
                    <span>
                      ORDER
                    </span>

                    <strong>
                      #{String(orderId).slice(-8)}
                    </strong>
                  </div>

                  <div className="dashboard-order-date">
                    <span>
                      DATE
                    </span>

                    <strong>
                      {formatDate(
                        order.createdAt
                      )}
                    </strong>
                  </div>

                  <div className="dashboard-order-total">
                    <span>
                      TOTAL
                    </span>

                    <strong>
                      $
                      {Number(
                        order.totalAmount || 0
                      ).toFixed(2)}
                    </strong>
                  </div>

                  <div className="dashboard-order-status">
                    <span>
                      STATUS
                    </span>

                    <strong
                      className={`dashboard-order-status-badge ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus ||
                        "Pending"}
                    </strong>
                  </div>

                  <div className="dashboard-order-actions">

                    <button
                      type="button"
                      className="dashboard-order-view"
                      onClick={() =>
                        setExpandedOrderId(
                          isExpanded
                            ? null
                            : orderId
                        )
                      }
                    >
                      {isExpanded
                        ? "Hide"
                        : "View"}
                    </button>

                    {canCancel && (
                      <button
                        type="button"
                        className="dashboard-order-cancel"
                        disabled={
                          cancellingOrderId ===
                          orderId
                        }
                        onClick={() =>
                          handleCancelOrder(
                            orderId
                          )
                        }
                      >
                        {cancellingOrderId ===
                        orderId
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    )}

                  </div>

                </div>

                {isExpanded && (
                  <div className="dashboard-order-details">

                    <div className="dashboard-order-items">

                      <div className="dashboard-order-details-heading">
                        <span>
                          ORDER ITEMS
                        </span>

                        <strong>
                          {order.items?.length || 0}{" "}
                          {order.items?.length === 1
                            ? "item"
                            : "items"}
                        </strong>
                      </div>

                      {(order.items || []).map(
                        (item, index) => (
                          <div
                            className="dashboard-order-item"
                            key={`${orderId}-${item.product || index}`}
                          >

                            <div className="dashboard-order-item-image">
                              {item.image ? (
                                <img
                                  src={getOrderImageUrl(
                                    item.image
                                  )}
                                  alt={
                                    item.name ||
                                    "Ordered product"
                                  }
                                />
                              ) : (
                                <span>
                                  —
                                </span>
                              )}
                            </div>

                            <div className="dashboard-order-item-info">
                              <h4>
                                {item.name}
                              </h4>

                              <p>
                                Qty:{" "}
                                {item.quantity}
                              </p>
                            </div>

                            <strong>
                              $
                              {Number(
                                item.price || 0
                              ).toFixed(2)}
                            </strong>

                          </div>
                        )
                      )}

                    </div>

                    <div className="dashboard-order-summary">

                      <div>
                        <span>
                          PAYMENT
                        </span>

                        <strong>
                          {order.paymentMethod ||
                            "—"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          PAYMENT STATUS
                        </span>

                        <strong>
                          {order.paymentStatus ||
                            "Pending"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          SHIPPING TO
                        </span>

                        <strong>
                          {order.shippingAddress
                            ?.city ||
                            "—"}
                          {order.shippingAddress
                            ?.country
                            ? `, ${order.shippingAddress.country}`
                            : ""}
                        </strong>
                      </div>

                    </div>

                  </div>
                )}

              </article>
            );
          })}

        </div>
      )}

    </section>
  );
}

export default OrderHistory;
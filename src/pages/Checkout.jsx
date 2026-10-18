import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://azania-galleryy-backend-production.up.railway.app/api";

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, token } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
    paymentMethod: "COD",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!user || !token) {
      setError("Please login before placing your order.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!formData.address.trim()) {
      setError("Please enter your shipping address.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!formData.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    if (!formData.postalCode.trim()) {
      setError("Please enter your postal code.");
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        product: item.product?._id || item._id || item.id,
        name: item.name,
        image: item.image,
        price: Number(item.price),
        quantity: Number(item.quantity),
      }));

      const shippingAddress = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim(),
      };

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: orderItems,
          shippingAddress,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      await clearCart();

      navigate("/dashboard", {
        state: {
          orderPlaced: true,
          order: data.order || data,
        },
      });
    } catch (err) {
      console.error("Checkout error:", err);

      setError(
        err.message || "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user || !token) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-message">
            <h2>Login Required</h2>
            <p>Please login to continue with checkout.</p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="checkout-btn"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="checkout-message">
            <h2>Your Cart Is Empty</h2>
            <p>Add some products to your cart before checkout.</p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="checkout-btn"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your shipping details and place your order.</p>
        </div>

        {error && <div className="checkout-error">{error}</div>}

        <div className="checkout-layout">
          {/* SHIPPING INFORMATION */}
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>

            <form onSubmit={handleSubmit}>
              <div className="checkout-grid">
                <div className="checkout-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="checkout-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="checkout-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="checkout-field">
                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                </div>

                <div className="checkout-field checkout-field-full">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="checkout-field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                  />
                </div>

                <div className="checkout-field">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                  />
                </div>

                <div className="checkout-field">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                  />
                </div>
              </div>

              {/* PAYMENT */}
              <div className="payment-section">
                <h2>Payment Method</h2>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === "COD"}
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order is delivered.</small>
                  </span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Card"
                    checked={formData.paymentMethod === "Card"}
                    onChange={handleChange}
                  />

                  <span>
                    <strong>Card Payment</strong>
                    <small>Card payment option.</small>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h2>Order Summary</h2>

            <div className="summary-products">
              {cartItems.map((item) => (
                <div
                  className="summary-product"
                  key={item._id || item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="summary-product-info">
                    <h3>{item.name}</h3>

                    <p>
                      Qty: {item.quantity}
                    </p>

                    <strong>
                      ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-line">
              <span>Subtotal</span>
              <strong>${Number(cartTotal).toFixed(2)}</strong>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <strong>FREE</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>${Number(cartTotal).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-page {
          min-height: 100vh;
          background: #f8f7f4;
          padding: 60px 20px;
        }

        .checkout-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .checkout-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .checkout-header h1 {
          margin: 0 0 10px;
          color: #0d1b2a;
          font-size: 42px;
        }

        .checkout-header p {
          margin: 0;
          color: #666;
          font-size: 16px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(320px, 0.9fr);
          gap: 30px;
          align-items: start;
        }

        .checkout-form-section,
        .order-summary {
          background: #ffffff;
          border-radius: 14px;
          padding: 30px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.06);
        }

        .checkout-form-section h2,
        .order-summary h2,
        .payment-section h2 {
          color: #0d1b2a;
          margin-top: 0;
          margin-bottom: 24px;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .checkout-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .checkout-field-full {
          grid-column: 1 / -1;
        }

        .checkout-field label {
          color: #0d1b2a;
          font-weight: 600;
          font-size: 14px;
        }

        .checkout-field input {
          width: 100%;
          box-sizing: border-box;
          padding: 13px 14px;
          border: 1px solid #ddd;
          border-radius: 8px;
          outline: none;
          font-size: 15px;
          background: #fff;
        }

        .checkout-field input:focus {
          border-color: #b08d57;
        }

        .payment-section {
          margin-top: 35px;
          padding-top: 30px;
          border-top: 1px solid #eee;
        }

        .payment-option {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 15px;
          margin-bottom: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
        }

        .payment-option input {
          margin-top: 4px;
        }

        .payment-option span {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .payment-option strong {
          color: #0d1b2a;
        }

        .payment-option small {
          color: #777;
        }

        .place-order-btn,
        .checkout-btn {
          width: 100%;
          border: none;
          border-radius: 8px;
          padding: 15px 20px;
          background: #0d1b2a;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 25px;
        }

        .place-order-btn:hover,
        .checkout-btn:hover {
          opacity: 0.92;
        }

        .place-order-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .summary-products {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .summary-product {
          display: flex;
          gap: 14px;
          padding-bottom: 18px;
          border-bottom: 1px solid #eee;
        }

        .summary-product img {
          width: 70px;
          height: 70px;
          object-fit: cover;
          border-radius: 8px;
          background: #f5f5f5;
        }

        .summary-product-info {
          flex: 1;
        }

        .summary-product-info h3 {
          margin: 0 0 6px;
          font-size: 14px;
          color: #0d1b2a;
        }

        .summary-product-info p {
          margin: 0 0 5px;
          font-size: 13px;
          color: #777;
        }

        .summary-product-info strong {
          font-size: 14px;
          color: #b08d57;
        }

        .summary-line,
        .summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-line {
          padding: 15px 0;
          border-bottom: 1px solid #eee;
          color: #555;
        }

        .summary-total {
          padding-top: 20px;
          margin-top: 5px;
          font-size: 19px;
          color: #0d1b2a;
        }

        .summary-total strong {
          color: #b08d57;
        }

        .checkout-error {
          background: #fff0f0;
          color: #b42318;
          border: 1px solid #f0b8b8;
          border-radius: 8px;
          padding: 14px 16px;
          margin-bottom: 25px;
          text-align: center;
        }

        .checkout-message {
          max-width: 500px;
          margin: 80px auto;
          background: #fff;
          padding: 40px;
          border-radius: 14px;
          text-align: center;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.06);
        }

        .checkout-message h2 {
          color: #0d1b2a;
          margin-top: 0;
        }

        .checkout-message p {
          color: #666;
        }

        @media (max-width: 850px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }

          .order-summary {
            order: -1;
          }
        }

        @media (max-width: 600px) {
          .checkout-page {
            padding: 35px 15px;
          }

          .checkout-header h1 {
            font-size: 32px;
          }

          .checkout-form-section,
          .order-summary {
            padding: 20px;
          }

          .checkout-grid {
            grid-template-columns: 1fr;
          }

          .checkout-field-full {
            grid-column: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
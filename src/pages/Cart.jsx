import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();

  const { products } = useProducts();

  // =========================================================
  // TOTAL CART QUANTITY
  // =========================================================

  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // =========================================================
  // RECOMMENDED PRODUCTS
  // =========================================================

  const recommendedProducts = products
    .filter(
      (product) =>
        !cartItems.some(
          (cartItem) =>
            String(cartItem.id) === String(product.id)
        )
    )
    .slice(0, 4);

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <div className="cart-empty-icon">
            🛍
          </div>

          <p className="cart-eyebrow">
            AZANIA GALLERY
          </p>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Your curated collection is waiting for you.
            Discover something beautiful today.
          </p>

          <Link
            to="/shop"
            className="cart-shop-button"
          >
            Explore Collection
          </Link>
        </section>
      </main>
    );
  }

  // =========================================================
  // MAIN CART
  // =========================================================

  return (
    <main className="cart-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="cart-hero">

        <div className="cart-hero-left">

          <p className="cart-brand">
            AZANIA GALLERY
          </p>

          <h1>
            Your Cart
          </h1>

          <p className="cart-hero-description">
            Thoughtfully selected pieces for a more
            beautiful everyday.
          </p>

        </div>

        <div className="cart-hero-tagline">
          Curated Elegance
          <br />
          for Everyday Living.
        </div>

      </section>


      {/* =================================================
          MAIN CART
      ================================================= */}

      <section className="cart-main">

        {/* =================================================
            LEFT COLUMN
        ================================================= */}

        <div className="cart-left">

          <div className="cart-items-card">

            {/* CART HEADER */}

            <div className="cart-items-header">

              <div>

                <span className="cart-items-label">
                  YOUR SELECTION
                </span>

                <h2>
                  Cart Items ({totalCartQuantity})
                </h2>

              </div>

              <Link to="/shop">
                Continue Shopping →
              </Link>

            </div>


            {/* =================================================
                PRODUCTS
            ================================================= */}

            <div className="cart-products">

              {cartItems.map((item) => (

                <article
                  className="cart-product"
                  key={item.id}
                >

                  {/* PRODUCT IMAGE */}

                  <Link
                    to={`/product/${item.id}`}
                    className="cart-product-image"
                  >

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-product-main-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="cart-product-placeholder">
                        Product Image
                      </div>
                    )}

                  </Link>


                  {/* DETAILS */}

                  <div className="cart-product-details">

                    <p className="cart-product-category">
                      {item.subcategory ||
                        item.category}
                    </p>

                    <Link
                      to={`/product/${item.id}`}
                      className="cart-product-name"
                    >
                      {item.name}
                    </Link>

                    <p className="cart-product-description">
                      {item.description ||
                        "A timeless piece designed to add a refined touch to your everyday style."}
                    </p>

                    <p className="cart-stock">
                      <span>✓</span>
                      In Stock
                    </p>

                  </div>


                  {/* ACTIONS */}

                  <div className="cart-product-actions">

                    {/* PRICE */}

                    <div className="cart-product-price-area">

                      <span className="cart-price-label">
                        Price
                      </span>

                      <p className="cart-product-price">
                        ${Number(item.price).toFixed(2)}
                      </p>

                    </div>


                    {/* QUANTITY */}

                    <div className="cart-quantity-wrapper">

                      <span className="cart-price-label">
                        Quantity
                      </span>

                      <div className="cart-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity - 1
                            )
                          }
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.quantity + 1
                            )
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* REMOVE */}

                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </article>

              ))}

            </div>


            {/* =================================================
                BENEFITS
            ================================================= */}

            <div className="cart-benefits">

              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  ✦
                </div>

                <div>
                  <strong>
                    Free Shipping
                  </strong>

                  <span>
                    On orders over $100
                  </span>
                </div>

              </div>


              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  ◇
                </div>

                <div>
                  <strong>
                    Secure Checkout
                  </strong>

                  <span>
                    100% protected
                  </span>
                </div>

              </div>


              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  ↩
                </div>

                <div>
                  <strong>
                    Easy Returns
                  </strong>

                  <span>
                    30-day policy
                  </span>
                </div>

              </div>


              <div className="cart-benefit">

                <div className="cart-benefit-icon">
                  ♡
                </div>

                <div>
                  <strong>
                    Customer Support
                  </strong>

                  <span>
                    Always here to help
                  </span>
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              RECOMMENDATIONS
          ================================================= */}

          {recommendedProducts.length > 0 && (
            <section className="cart-recommendations">

              <div className="recommendations-header">

                <div>

                  <span className="recommendations-label">
                    CURATED FOR YOU
                  </span>

                  <h2>
                    You May Also Like
                  </h2>

                </div>

                <Link to="/shop">
                  Explore More →
                </Link>

              </div>


              <div className="recommendation-grid">

                {recommendedProducts.map(
                  (product) => (

                    <Link
                      to={`/product/${product.id}`}
                      className="recommendation-card"
                      key={product.id}
                    >

                      {/* PRODUCT IMAGE */}

                      <div className="recommendation-image">

                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                          />
                        ) : (
                          <span>
                            Product Image
                          </span>
                        )}

                        <span className="recommendation-heart">
                          ♡
                        </span>

                      </div>


                      {/* PRODUCT INFO */}

                      <div className="recommendation-info">

                        <p className="recommendation-category">
                          {product.subcategory ||
                            product.category}
                        </p>

                        <h3>
                          {product.name}
                        </h3>

                        <p className="recommendation-price">
                          ${Number(
                            product.price
                          ).toFixed(2)}
                        </p>

                      </div>

                    </Link>

                  )
                )}

              </div>

            </section>
          )}

        </div>


        {/* =================================================
            ORDER SUMMARY
        ================================================= */}

        <aside className="cart-summary">

          <div className="summary-top">

            <span className="summary-label">
              YOUR ORDER
            </span>

            <h2>
              Order Summary
            </h2>

          </div>


          <div className="summary-divider"></div>


          {/* SUBTOTAL */}

          <div className="cart-summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>

          </div>


          {/* SHIPPING */}

          <div className="cart-summary-row">

            <span>
              Shipping
            </span>

            <span className="summary-muted">
              Calculated at checkout
            </span>

          </div>


          <div className="summary-divider"></div>


          {/* TOTAL */}

          <div className="cart-total-row">

            <div>

              <span>
                Total
              </span>

              <small>
                USD
              </small>

            </div>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>

          </div>


          {/* CHECKOUT */}

          <Link
            to="/checkout"
            className="checkout-button"
          >
            <span>
              Proceed to Checkout
            </span>

            <span>
              →
            </span>
          </Link>


          {/* OR */}

          <div className="payment-or">

            <span></span>

            <p>
              OR
            </p>

            <span></span>

          </div>


          {/* PAYPAL */}

          <button
            type="button"
            className="paypal-button"
          >
            PayPal
          </button>


          {/* PAYMENT METHODS */}

          <div className="payment-methods">

            <span>
              VISA
            </span>

            <span>
              MC
            </span>

            <span>
              AMEX
            </span>

            <span>
               Pay
            </span>

            <span>
              G Pay
            </span>

          </div>


          {/* SECURITY */}

          <div className="secure-checkout">

            <span>
              🔒
            </span>

            <p>
              Secure and encrypted checkout
            </p>

          </div>


          {/* CLEAR CART */}

          <button
            type="button"
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </aside>

      </section>

    </main>
  );
}

export default Cart;
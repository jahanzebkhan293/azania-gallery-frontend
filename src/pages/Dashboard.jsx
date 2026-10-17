import {
  useCart,
} from "../context/CartContext";

import {
  useWishlist,
} from "../context/WishlistContext";

import {
  Link,
} from "react-router-dom";

import OrderHistory from "../components/dashboard/OrderHistory";

function Dashboard() {
  /* =====================================================
     CART
  ===================================================== */

  const {
    cartCount,
    cartTotal,
  } = useCart();

  /* =====================================================
     WISHLIST
  ===================================================== */

  const {
    wishlistCount,
  } = useWishlist();

  return (
    <main className="dashboard-page">

      {/* =================================================
          DASHBOARD HERO
      ================================================= */}

      <section className="dashboard-hero">
        <div className="dashboard-hero-content">

          <p className="dashboard-eyebrow">
            AZANIA GALLERY · CUSTOMER DASHBOARD
          </p>

          <h1>
            Welcome Back.
          </h1>

          <p>
            Manage your shopping activity, wishlist,
            orders, and account from one place.
          </p>

        </div>
      </section>


      {/* =================================================
          DASHBOARD MAIN
      ================================================= */}

      <section className="dashboard-main">

        {/* =================================================
            WELCOME
        ================================================= */}

        <div className="dashboard-welcome">

          <div>

            <span className="dashboard-label">
              YOUR ACCOUNT
            </span>

            <h2>
              AZANIA GALLERY
            </h2>

            <p>
              Manage your shopping experience,
              orders, wishlist, and account activity.
            </p>

          </div>

          <Link
            to="/shop"
            className="dashboard-shop-button"
          >
            View Store →
          </Link>

        </div>


        {/* =================================================
            OVERVIEW
        ================================================= */}

        <section className="dashboard-overview">

          <div className="dashboard-section-heading">

            <div>

              <span>
                STORE OVERVIEW
              </span>

              <h2>
                Your Activity
              </h2>

            </div>

          </div>


          <div className="dashboard-cards">

            {/* =================================================
                SHOPPING CART
            ================================================= */}

            <Link
              to="/cart"
              className="dashboard-card"
            >

              <div className="dashboard-card-icon">
                🛒
              </div>

              <div className="dashboard-card-content">

                <span>
                  SHOPPING CART
                </span>

                <strong>
                  {cartCount}
                </strong>

                <p>
                  {cartCount === 1
                    ? "Item in your cart"
                    : "Items in your cart"}
                </p>

              </div>

              <span className="dashboard-card-arrow">
                →
              </span>

            </Link>


            {/* =================================================
                WISHLIST
            ================================================= */}

            <Link
              to="/wishlist"
              className="dashboard-card"
            >

              <div className="dashboard-card-icon">
                ♡
              </div>

              <div className="dashboard-card-content">

                <span>
                  WISHLIST
                </span>

                <strong>
                  {wishlistCount}
                </strong>

                <p>
                  {wishlistCount === 1
                    ? "Saved piece"
                    : "Saved pieces"}
                </p>

              </div>

              <span className="dashboard-card-arrow">
                →
              </span>

            </Link>


            {/* =================================================
                CART VALUE
            ================================================= */}

            <div className="dashboard-card">

              <div className="dashboard-card-icon">
                $
              </div>

              <div className="dashboard-card-content">

                <span>
                  CART VALUE
                </span>

                <strong>
                  ${Number(cartTotal || 0).toFixed(2)}
                </strong>

                <p>
                  Current shopping total
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            ORDER HISTORY
        ================================================= */}

        <OrderHistory />


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section className="dashboard-actions">

          <div className="dashboard-section-heading">

            <div>

              <span>
                QUICK ACTIONS
              </span>

              <h2>
                Explore Your Store
              </h2>

            </div>

          </div>


          <div className="dashboard-action-grid">

            {/* =================================================
                EXPLORE JEWELRY
            ================================================= */}

            <Link
              to="/shop"
              className="dashboard-action"
            >

              <span>
                Explore Jewelry
              </span>

              <span>
                →
              </span>

            </Link>


            {/* =================================================
                WISHLIST
            ================================================= */}

            <Link
              to="/wishlist"
              className="dashboard-action"
            >

              <span>
                View Wishlist
              </span>

              <span>
                →
              </span>

            </Link>


            {/* =================================================
                CART
            ================================================= */}

            <Link
              to="/cart"
              className="dashboard-action"
            >

              <span>
                View Cart
              </span>

              <span>
                →
              </span>

            </Link>


            {/* =================================================
                CONTACT SUPPORT
            ================================================= */}

            <Link
              to="/contact"
              className="dashboard-action"
            >

              <span>
                Contact Support
              </span>

              <span>
                →
              </span>

            </Link>

          </div>

        </section>


        {/* =================================================
            DASHBOARD NOTE
        ================================================= */}

        <section className="dashboard-note">

          <div className="dashboard-note-mark">
            ✦
          </div>

          <div>

            <span>
              AZANIA GALLERY
            </span>

            <p>
              Your shopping activity, wishlist, and
              customer orders are connected to the
              AZANIA GALLERY backend and stored securely.
            </p>

          </div>

        </section>

      </section>

    </main>
  );
}

export default Dashboard;
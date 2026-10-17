import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar-actions-outline-fix.css";

import azaniaLogo from "../../assets/azania-logo.png";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [mobileJewelryOpen, setMobileJewelryOpen] =
    useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  /* =====================================================
     CLOSE MOBILE MENU
  ===================================================== */

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileJewelryOpen(false);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <>
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <nav className="navbar">

        <div className="navbar-container">

          {/* =================================================
              MOBILE LEFT ACTIONS
          ================================================= */}

          <div className="navbar-mobile-left">

            {/* HAMBURGER */}

            <button
              type="button"
              className={`navbar-menu-toggle ${
                mobileMenuOpen ? "active" : ""
              }`}
              onClick={() =>
                setMobileMenuOpen(
                  (prev) => !prev
                )
              }
              aria-label={
                mobileMenuOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>


            {/* SEARCH */}

            <Link
              to="/shop"
              className="navbar-mobile-search"
              aria-label="Search jewelry"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                />

                <path d="M16 16L21 21" />
              </svg>
            </Link>

          </div>


          {/* =================================================
              DESKTOP LEFT MENU
          ================================================= */}

          <div className="navbar-left">

            <div className="navbar-links">

              <Link
                to="/"
                onClick={closeMobileMenu}
              >
                Home
              </Link>

              <Link
                to="/shop"
                onClick={closeMobileMenu}
              >
                Shop
              </Link>


              {/* DESKTOP JEWELRY DROPDOWN */}

              <div className="navbar-dropdown">

                <Link
                  to="/shop"
                  className="navbar-dropdown-trigger"
                >
                  Jewelry

                  <span className="dropdown-arrow">
                    ↓
                  </span>
                </Link>


                <div className="navbar-dropdown-menu">

                  <Link to="/jewelry/rings">
                    Rings
                  </Link>

                  <Link to="/jewelry/bracelets">
                    Bracelets
                  </Link>

                  <Link to="/jewelry/earrings">
                    Earrings
                  </Link>

                  <Link to="/jewelry/necklaces">
                    Necklaces
                  </Link>

                  <Link to="/jewelry/pendants">
                    Pendants
                  </Link>

                  <Link to="/jewelry/bangles">
                    Bangles
                  </Link>

                  <Link to="/jewelry/chains">
                    Chains
                  </Link>

                  <Link to="/jewelry/jewelry-sets">
                    Jewelry Sets
                  </Link>

                </div>

              </div>


              <Link
                to="/about"
                onClick={closeMobileMenu}
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>

            </div>

          </div>


          {/* =================================================
              CENTER LOGO
          ================================================= */}

          <Link
            to="/"
            className="navbar-logo"
            aria-label="AZANIA GALLERY Home"
            onClick={closeMobileMenu}
          >
            <img
              src={azaniaLogo}
              alt="AZANIA GALLERY"
            />
          </Link>


          {/* =================================================
              RIGHT ACTIONS
          ================================================= */}

          <div className="navbar-actions">

            {/* =================================================
                ACCOUNT
            ================================================= */}

            {isAuthenticated ? (
              <button
                type="button"
                className="navbar-action navbar-account-button"
                aria-label="Logout"
                onClick={handleLogout}
              >

                <span className="navbar-action-icon">

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="7"
                      r="3.2"
                    />

                    <path
                      d="M5.5 20c.6-3.5 2.8-5.5 6.5-5.5s5.9 2 6.5 5.5"
                    />
                  </svg>

                </span>

                <span className="navbar-action-text">
                  {user?.name
                    ? user.name.toUpperCase()
                    : "ACCOUNT"}
                </span>

              </button>
            ) : (
              <Link
                to="/login"
                className="navbar-action"
                aria-label="Account"
                onClick={closeMobileMenu}
              >

                <span className="navbar-action-icon">

                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="7"
                      r="3.2"
                    />

                    <path
                      d="M5.5 20c.6-3.5 2.8-5.5 6.5-5.5s5.9 2 6.5 5.5"
                    />
                  </svg>

                </span>

                <span className="navbar-action-text">
                  ACCOUNT
                </span>

              </Link>
            )}


            {/* =================================================
                WISHLIST
            ================================================= */}

            <Link
              to={isAdminRoute ? "/admin?section=wishlist" : "/wishlist"}
              className="navbar-action navbar-wishlist-action"
              aria-label={`Wishlist (${wishlistCount} items)`}
              onClick={closeMobileMenu}
            >

              <span className="navbar-action-icon navbar-wishlist-icon">

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7C3.2 5.8 5.3 4 7.9 4c1.7 0 3.3.9 4.1 2.2C12.8 4.9 14.4 4 16.1 4c2.6 0 4.7 1.8 4.7 4.7Z"
                  />
                </svg>

              </span>

              <span className="navbar-action-text">
                WISHLIST
              </span>


              {/* WISHLIST COUNT */}

              {wishlistCount > 0 && (
                <span className="navbar-wishlist-count">
                  {wishlistCount}
                </span>
              )}

            </Link>


            {/* =================================================
                CART
            ================================================= */}

            <Link
              to={isAdminRoute ? "/admin?section=cart" : "/cart"}
              className="navbar-action navbar-cart-action"
              aria-label={`Shopping Cart (${cartCount} items)`}
              onClick={closeMobileMenu}
            >

              <span className="navbar-action-icon">

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 7H6" />

                  <circle
                    cx="10"
                    cy="20"
                    r="1"
                  />

                  <circle
                    cx="17"
                    cy="20"
                    r="1"
                  />

                </svg>

              </span>

              <span className="navbar-action-text">
                CART
              </span>


              {/* CART COUNT */}

              {cartCount > 0 && (
                <span className="navbar-cart-count">
                  {cartCount}
                </span>
              )}

            </Link>

          </div>


          {/* =================================================
              MOBILE MENU
          ================================================= */}

          <div
            className={`navbar-mobile-menu ${
              mobileMenuOpen
                ? "mobile-menu-open"
                : ""
            }`}
          >

            <Link
              to="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>

            <Link
              to="/shop"
              onClick={closeMobileMenu}
            >
              Shop
            </Link>


            {/* MOBILE JEWELRY */}

            <div className="mobile-jewelry-wrapper">

              <button
                type="button"
                className="mobile-jewelry-trigger"
                onClick={() =>
                  setMobileJewelryOpen(
                    (prev) => !prev
                  )
                }
                aria-expanded={
                  mobileJewelryOpen
                }
              >

                <span>
                  Jewelry
                </span>

                <span
                  className={`mobile-jewelry-arrow ${
                    mobileJewelryOpen
                      ? "open"
                      : ""
                  }`}
                >
                  ↓
                </span>

              </button>


              <div
                className={`mobile-jewelry-menu ${
                  mobileJewelryOpen
                    ? "open"
                    : ""
                }`}
              >

                <Link
                  to="/jewelry/rings"
                  onClick={closeMobileMenu}
                >
                  Rings
                </Link>

                <Link
                  to="/jewelry/bracelets"
                  onClick={closeMobileMenu}
                >
                  Bracelets
                </Link>

                <Link
                  to="/jewelry/earrings"
                  onClick={closeMobileMenu}
                >
                  Earrings
                </Link>

                <Link
                  to="/jewelry/necklaces"
                  onClick={closeMobileMenu}
                >
                  Necklaces
                </Link>

                <Link
                  to="/jewelry/pendants"
                  onClick={closeMobileMenu}
                >
                  Pendants
                </Link>

                <Link
                  to="/jewelry/bangles"
                  onClick={closeMobileMenu}
                >
                  Bangles
                </Link>

                <Link
                  to="/jewelry/chains"
                  onClick={closeMobileMenu}
                >
                  Chains
                </Link>

                <Link
                  to="/jewelry/jewelry-sets"
                  onClick={closeMobileMenu}
                >
                  Jewelry Sets
                </Link>

              </div>

            </div>


            <Link
              to="/about"
              onClick={closeMobileMenu}
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
            >
              Contact
            </Link>


            {/* =================================================
                MOBILE ACCOUNT
            ================================================= */}

            {isAuthenticated ? (
              <button
                type="button"
                className="mobile-account-link"
                onClick={handleLogout}
              >
                <span>
                  {user?.name
                    ? user.name
                    : "Account"}
                </span>

                <span>
                  Logout
                </span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="mobile-account-link"
              >
                <span>
                  Account
                </span>
              </Link>
            )}


            {/* MOBILE WISHLIST */}

            <Link
              to={isAdminRoute ? "/admin?section=wishlist" : "/wishlist"}
              onClick={closeMobileMenu}
              className="mobile-wishlist-link"
            >

              <span>
                Wishlist
              </span>

              {wishlistCount > 0 && (
                <span className="mobile-wishlist-count">
                  {wishlistCount}
                </span>
              )}

            </Link>

          </div>

        </div>

      </nav>
    </>
  );
}

export default Navbar;
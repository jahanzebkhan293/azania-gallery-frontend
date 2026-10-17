import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { addToCart } = useCart();

  const {
    wishlistItems,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  /* =========================================================
     EMPTY WISHLIST
  ========================================================= */

  if (wishlistItems.length === 0) {
    return (
      <main className="wishlist-page">

        <section className="wishlist-empty">

          <div
            className="wishlist-empty-icon"
            aria-hidden="true"
          >
            ♡
          </div>

          <p className="wishlist-eyebrow">
            AZANIA GALLERY
          </p>

          <h1>
            Your Wishlist is Empty
          </h1>

          <p>
            Save your favorite pieces here and
            come back to them whenever you like.
          </p>

          <Link
            to="/shop"
            className="wishlist-shop-button"
          >
            Discover Jewelry
          </Link>

        </section>

      </main>
    );
  }

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  /* =========================================================
     MAIN WISHLIST
  ========================================================= */

  return (
    <main className="wishlist-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="wishlist-hero">

        <div className="wishlist-hero-content">

          <p className="wishlist-brand">
            AZANIA GALLERY
          </p>

          <h1>
            My Wishlist
          </h1>

          <p>
            Your collection of pieces worth
            keeping close.
          </p>

        </div>

      </section>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="wishlist-main">

        {/* HEADER */}

        <div className="wishlist-header">

          <div>

            <span className="wishlist-label">
              SAVED COLLECTION
            </span>

            <h2>
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1
                ? "Product"
                : "Products"}
            </h2>

          </div>


          <div className="wishlist-header-actions">

            <Link to="/shop">
              Continue Shopping →
            </Link>

            <button
              type="button"
              onClick={clearWishlist}
              aria-label="Clear all wishlist items"
            >
              Clear Wishlist
            </button>

          </div>

        </div>


        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        <div className="wishlist-grid">

          {wishlistItems.map((product) => (

            <article
              className="wishlist-card"
              key={product.id}
            >

              {/* IMAGE */}

              <Link
                to={`/product/${product.id}`}
                className="wishlist-card-image"
                aria-label={`View ${product.name}`}
              >

                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="wishlist-image-placeholder">
                    Product Image
                  </div>
                )}

              </Link>


              {/* INFO */}

              <div className="wishlist-card-info">

                <p className="wishlist-card-category">
                  {product.subcategory ||
                    product.category}
                </p>


                <Link
                  to={`/product/${product.id}`}
                  className="wishlist-card-name"
                >
                  {product.name}
                </Link>


                <p className="wishlist-card-price">
                  $
                  {Number(
                    product.price
                  ).toFixed(2)}
                </p>


                {/* ACTIONS */}

                <div className="wishlist-card-actions">

                  <button
                    type="button"
                    className="wishlist-add-cart"
                    onClick={() =>
                      handleAddToCart(product)
                    }
                  >
                    Add to Cart
                  </button>


                  <button
                    type="button"
                    className="wishlist-remove"
                    onClick={() =>
                      removeFromWishlist(
                        product.id
                      )
                    }
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    ♡
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="wishlist-bottom">

        <p>
          Discover more from AZANIA GALLERY
        </p>

        <Link to="/shop">
          Explore All Jewelry →
        </Link>

      </section>

    </main>
  );
}

export default Wishlist;
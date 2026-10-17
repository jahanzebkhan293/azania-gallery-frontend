import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const productIsWishlisted = isWishlisted(
    product.id || product._id
  );

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product);
  };

  const handleWishlist = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await toggleWishlist(product);
    } catch (error) {
      console.error(
        "Wishlist action failed:",
        error
      );
    }
  };

  return (
    <article className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-card-image"
        aria-label={`View ${product.name}`}
      >
        {product.image ? (
          <>
            <img
              src={product.image}
              alt={product.name}
              className="product-card-main-image"
              loading="lazy"
            />

            {product.images &&
              product.images.length > 1 && (
                <img
                  src={product.images[1]}
                  alt={`${product.name} alternate view`}
                  className="product-card-hover-image"
                  loading="lazy"
                />
              )}
          </>
        ) : (
          <div className="product-image-placeholder">
            Product Image
          </div>
        )}
      </Link>

      <div className="product-card-info">

        <p className="product-card-category">
          {product.subcategory ||
            product.category}
        </p>

        <Link
          to={`/product/${product.id}`}
          className="product-card-name"
        >
          {product.name}
        </Link>

        <div className="product-card-bottom">

          <p className="product-card-price">
            ${Number(product.price).toFixed(2)}
          </p>

          <div className="product-card-actions">

            {/* WISHLIST */}
            <button
              type="button"
              className={`product-card-wishlist ${
                productIsWishlisted
                  ? "active"
                  : ""
              }`}
              onClick={handleWishlist}
              aria-label={
                productIsWishlisted
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
              aria-pressed={
                productIsWishlisted
              }
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M20.8 8.7c0 5.2-8.8 10.2-8.8 10.2S3.2 13.9 3.2 8.7C3.2 5.8 5.3 4 7.9 4c1.7 0 3.3.9 4.1 2.2C12.8 4.9 14.4 4 16.1 4c2.6 0 4.7 1.8 4.7 4.7Z"
                />
              </svg>
            </button>

            {/* CART */}
            <button
              type="button"
              className="product-card-cart"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 7H6" />

                <circle
                  cx="10"
                  cy="20"
                  r="1.2"
                />

                <circle
                  cx="17"
                  cy="20"
                  r="1.2"
                />
              </svg>
            </button>

          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
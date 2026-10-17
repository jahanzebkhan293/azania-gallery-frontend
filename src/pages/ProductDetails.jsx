import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";
import { useReviews } from "../context/ReviewContext";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const {
    products,
    getProductById,
  } = useProducts();

  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    fetchReviews,
    addReview,
  } = useReviews();

  const product = getProductById(id);

  const productImages =
    product?.images &&
    product.images.length > 0
      ? product.images
      : product?.image
        ? [product.image]
        : [];

  const [
    selectedImage,
    setSelectedImage,
  ] = useState(
    productImages[0] || null
  );

  const [quantity, setQuantity] =
    useState(1);

  /* =====================================================
     REVIEW FORM
  ===================================================== */

  const [reviewRating, setReviewRating] =
    useState(0);

  const [reviewComment, setReviewComment] =
    useState("");

  const [reviewSubmitted, setReviewSubmitted] =
    useState(false);

  /* =====================================================
     PRODUCT CHANGE
  ===================================================== */

  useEffect(() => {
    setSelectedImage(
      productImages[0] || null
    );

    setQuantity(1);

    setReviewRating(0);
    setReviewComment("");
    setReviewSubmitted(false);
  }, [id, product?.id]);

  /* =====================================================
     FETCH REVIEWS
  ===================================================== */

  useEffect(() => {
    if (!product?.id) {
      return;
    }

    fetchReviews(product.id);
  }, [product?.id]);

  /* =====================================================
     PRODUCT NOT FOUND
  ===================================================== */

  if (!product) {
    return (
      <main className="product-not-found">

        <p>
          AZANIA GALLERY
        </p>

        <h1>
          Product Not Found
        </h1>

        <p>
          Sorry, the product you are looking
          for does not exist.
        </p>

        <Link to="/shop">
          Back to Shop
        </Link>

      </main>
    );
  }

  const productIsWishlisted =
    isWishlisted(product.id);

  /* =====================================================
     RELATED PRODUCTS
  ===================================================== */

  const relatedProducts = products
    .filter((item) => {

      if (
        String(item.id) ===
        String(product.id)
      ) {
        return false;
      }

      if (
        product.category &&
        item.category
      ) {
        return (
          String(
            item.category
          ).toLowerCase() ===
          String(
            product.category
          ).toLowerCase()
        );
      }

      return false;
    })
    .slice(0, 4);

  /* =====================================================
     QUANTITY
  ===================================================== */

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(
        1,
        currentQuantity - 1
      )
    );
  };

  const increaseQuantity = () => {
    setQuantity((currentQuantity) =>
      currentQuantity + 1
    );
  };

  /* =====================================================
     CART
  ===================================================== */

  const handleAddToCart = () => {
    for (
      let index = 0;
      index < quantity;
      index += 1
    ) {
      addToCart(product);
    }

    navigate("/cart");
  };

  /* =====================================================
     WISHLIST
  ===================================================== */

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  /* =====================================================
     REVIEW SUBMIT
  ===================================================== */

  const handleReviewSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (
      reviewRating === 0 ||
      !reviewComment.trim()
    ) {
      return;
    }

    try {
      await addReview(
        product.id,
        reviewRating,
        reviewComment
      );

      setReviewRating(0);
      setReviewComment("");

      setReviewSubmitted(true);

      setTimeout(() => {
        setReviewSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error(
        "Review submission failed:",
        error
      );
    }
  };

  /* =====================================================
     REVIEW SUMMARY
  ===================================================== */

  const reviewCount =
    reviews.length;

  const averageRating =
    reviewCount > 0
      ? reviews.reduce(
          (total, review) =>
            total +
            Number(
              review.rating || 0
            ),
          0
        ) / reviewCount
      : 0;

  const ratingCounts = {
    5: reviews.filter(
      (review) =>
        Number(review.rating) === 5
    ).length,

    4: reviews.filter(
      (review) =>
        Number(review.rating) === 4
    ).length,

    3: reviews.filter(
      (review) =>
        Number(review.rating) === 3
    ).length,

    2: reviews.filter(
      (review) =>
        Number(review.rating) === 2
    ).length,

    1: reviews.filter(
      (review) =>
        Number(review.rating) === 1
    ).length,
  };

  return (
    <main className="product-details-page">

      {/* =========================================
          PRODUCT IMAGE / GALLERY
      ========================================= */}

      <section className="product-details-image">

        <div className="product-details-gallery">

          <div className="product-details-main-image-wrapper">

            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="product-details-main-image"
              />
            ) : (
              <div className="product-details-placeholder">
                Product Image
              </div>
            )}

          </div>

          {productImages.length > 1 && (
            <div className="product-details-thumbnails">

              {productImages.map(
                (image, index) => (
                  <button
                    type="button"
                    key={`${image}-${index}`}
                    className={`product-details-thumbnail ${
                      selectedImage === image
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    aria-label={`View product image ${
                      index + 1
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${
                        index + 1
                      }`}
                    />
                  </button>
                )
              )}

            </div>
          )}

        </div>

      </section>

      {/* =========================================
          PRODUCT INFORMATION
      ========================================= */}

      <section className="product-details-info">

        <p className="product-details-category">
          {product.subcategory ||
            product.category}
        </p>

        <h1>
          {product.name}
        </h1>

        <p className="product-details-price">
          $
          {Number(
            product.price
          ).toFixed(2)}
        </p>

        {product.description && (
          <p className="product-details-description">
            {product.description}
          </p>
        )}

        {/* PRODUCT META */}

        <div className="product-details-meta">

          <div>

            <span>
              Category
            </span>

            <strong>
              {product.category}
            </strong>

          </div>

          {product.subcategory && (
            <div>

              <span>
                Collection
              </span>

              <strong>
                {product.subcategory}
              </strong>

            </div>
          )}

        </div>

        {/* QUANTITY */}

        <div className="product-details-quantity">

          <span>
            Quantity
          </span>

          <div className="product-details-quantity-control">

            <button
              type="button"
              onClick={
                decreaseQuantity
              }
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span>
              {quantity}
            </span>

            <button
              type="button"
              onClick={
                increaseQuantity
              }
              aria-label="Increase quantity"
            >
              +
            </button>

          </div>

        </div>

        {/* ACTIONS */}

        <div className="product-details-actions">

          <button
            type="button"
            className="product-details-button"
            onClick={
              handleAddToCart
            }
          >
            Add to Cart
          </button>

          <button
            type="button"
            className={`product-details-wishlist ${
              productIsWishlisted
                ? "active"
                : ""
            }`}
            onClick={
              handleWishlist
            }
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

            <span>
              {productIsWishlisted
                ? "Wishlisted"
                : "Wishlist"}
            </span>

          </button>

        </div>

        {/* CONTINUE SHOPPING */}

        <Link
          to="/shop"
          className="product-details-back"
        >
          ← Continue Shopping
        </Link>

      </section>

      {/* =========================================
          REVIEWS
      ========================================= */}

      <section className="product-details-reviews">

        {/* REVIEWS HEADING */}

        <div className="product-details-reviews-heading">

          <p>
            CUSTOMER FEEDBACK
          </p>

          <h2>
            Customer Reviews
          </h2>

        </div>

        {/* =================================================
            HORIZONTAL REVIEW TOP AREA
        ================================================= */}

        <div className="product-reviews-horizontal">

          {/* ===============================================
              COLUMN 1 — RATING SUMMARY
          =============================================== */}

          <div className="product-reviews-average">

            <span className="product-reviews-label">
              Overall Rating
            </span>

            <strong>
              {averageRating
                ? averageRating.toFixed(1)
                : "0.0"}
            </strong>

            <div className="product-review-stars">

              {[1, 2, 3, 4, 5].map(
                (star) => (
                  <span
                    key={star}
                    className={
                      star <=
                      Math.round(
                        averageRating
                      )
                        ? "filled"
                        : ""
                    }
                  >
                    ★
                  </span>
                )
              )}

            </div>

            <span className="product-reviews-count">

              {reviewCount}{" "}

              {reviewCount === 1
                ? "Review"
                : "Reviews"}

            </span>

          </div>

          {/* ===============================================
              COLUMN 2 — RATING BREAKDOWN
          =============================================== */}

          <div className="product-reviews-breakdown">

            <h3>
              Rating Breakdown
            </h3>

            {[5, 4, 3, 2, 1].map(
              (rating) => {

                const count =
                  ratingCounts[rating];

                const percentage =
                  reviewCount > 0
                    ? (count /
                        reviewCount) *
                      100
                    : 0;

                return (
                  <div
                    className="review-rating-row"
                    key={rating}
                  >

                    <span>
                      {rating} ★
                    </span>

                    <div className="review-rating-bar">

                      <span
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <small>
                      {count}
                    </small>

                  </div>
                );
              }
            )}

          </div>

          {/* ===============================================
              COLUMN 3 — WRITE REVIEW
          =============================================== */}

          <div className="product-review-form-wrapper">

            <div className="product-review-form-heading">

              <h3>
                Write a Review
              </h3>

              <p>
                Share your experience
                with this product.
              </p>

            </div>

            <form
              className="product-review-form"
              onSubmit={
                handleReviewSubmit
              }
            >

              <label>
                Your Rating
              </label>

              <div
                className="review-star-selector"
                aria-label="Select rating"
              >

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <=
                        reviewRating
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        setReviewRating(
                          star
                        )
                      }
                      aria-label={`${star} star`}
                    >
                      ★
                    </button>
                  )
                )}

              </div>

              <label
                htmlFor="review-comment"
              >
                Your Review
              </label>

              <textarea
                id="review-comment"
                value={reviewComment}
                onChange={(event) =>
                  setReviewComment(
                    event.target.value
                  )
                }
                placeholder="Write your review here..."
                maxLength={1000}
                rows={3}
              />

              <div className="product-review-form-footer">

                <span>
                  {reviewComment.length}/1000
                </span>

                <button
                  type="submit"
                  disabled={
                    reviewRating === 0 ||
                    !reviewComment.trim() ||
                    reviewsLoading
                  }
                >
                  {reviewsLoading
                    ? "Submitting..."
                    : "Submit Review"}
                </button>

              </div>

              {reviewSubmitted && (
                <p className="review-success-message">
                  Thank you! Your review
                  has been added.
                </p>
              )}

              {reviewsError && (
                <p
                  className="review-error-message"
                  role="alert"
                >
                  {reviewsError}
                </p>
              )}

            </form>

          </div>

        </div>

        {/* =================================================
            CUSTOMER REVIEWS LIST
        ================================================= */}

        <div className="product-reviews-list">

          <div className="product-reviews-list-heading">

            <h3>
              Customer Reviews
            </h3>

            <span>
              {reviewCount} total
            </span>

          </div>

          {/* LOADING */}

          {reviewsLoading &&
          reviews.length === 0 ? (
            <div className="product-reviews-empty">

              <div className="product-reviews-empty-icon">
                ★
              </div>

              <h4>
                Loading Reviews...
              </h4>

              <p>
                Please wait while we
                load customer reviews.
              </p>

            </div>
          ) : reviewsError &&
            reviews.length === 0 ? (

            /* ERROR */

            <div className="product-reviews-empty">

              <div className="product-reviews-empty-icon">
                !
              </div>

              <h4>
                Unable to Load Reviews
              </h4>

              <p>
                {reviewsError}
              </p>

            </div>

          ) : reviews.length === 0 ? (

            /* EMPTY */

            <div className="product-reviews-empty">

              <div className="product-reviews-empty-icon">
                ★
              </div>

              <h4>
                No reviews yet
              </h4>

              <p>
                Be the first to review
                this product.
              </p>

            </div>

          ) : (

            /* REVIEWS */

            reviews.map(
              (review) => (
                <article
                  className="product-review-card"
                  key={
                    review.id ||
                    review._id
                  }
                >

                  <div className="product-review-card-top">

                    <div>

                      <strong>
                        {review.name ||
                          "Customer"}
                      </strong>

                      <div className="product-review-card-stars">

                        {[1, 2, 3, 4, 5].map(
                          (star) => (
                            <span
                              key={star}
                              className={
                                star <=
                                Number(
                                  review.rating
                                )
                                  ? "filled"
                                  : ""
                              }
                            >
                              ★
                            </span>
                          )
                        )}

                      </div>

                    </div>

                    <span>
                      {review.date ||
                        "Recently"}
                    </span>

                  </div>

                  <p>
                    {review.comment}
                  </p>

                </article>
              )
            )
          )}

        </div>

      </section>

      {/* =========================================
          RELATED PRODUCTS
      ========================================= */}

      {relatedProducts.length > 0 && (
        <section className="product-details-related">

          <div className="product-details-related-heading">

            <p>
              YOU MAY ALSO LIKE
            </p>

            <h2>
              Related Products
            </h2>

          </div>

          <div className="product-details-related-grid">

            {relatedProducts.map(
              (relatedProduct) => (
                <article
                  className="product-details-related-card"
                  key={
                    relatedProduct.id
                  }
                >

                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="product-details-related-image"
                  >

                    {relatedProduct.image ? (
                      <img
                        src={
                          relatedProduct.image
                        }
                        alt={
                          relatedProduct.name
                        }
                        loading="lazy"
                      />
                    ) : (
                      <div className="product-details-related-placeholder">
                        Product Image
                      </div>
                    )}

                  </Link>

                  <div className="product-details-related-info">

                    <p>
                      {relatedProduct.subcategory ||
                        relatedProduct.category}
                    </p>

                    <Link
                      to={`/product/${relatedProduct.id}`}
                      className="product-details-related-name"
                    >
                      {
                        relatedProduct.name
                      }
                    </Link>

                    <span>
                      $
                      {Number(
                        relatedProduct.price
                      ).toFixed(2)}
                    </span>

                  </div>

                </article>
              )
            )}

          </div>

        </section>
      )}

    </main>
  );
}

export default ProductDetails;
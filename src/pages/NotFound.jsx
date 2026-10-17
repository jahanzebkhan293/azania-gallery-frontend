import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-content">
        <p className="not-found-eyebrow">
          AZANIA GALLERY
        </p>

        <div className="not-found-number">
          404
        </div>

        <h1>
          Page Not Found
        </h1>

        <p className="not-found-message">
          The page you're looking for may have been
          moved, removed, or no longer exists.
        </p>

        <div className="not-found-actions">
          <Link
            to="/"
            className="not-found-home-button"
          >
            Back to Home
          </Link>

          <Link
            to="/shop"
            className="not-found-shop-button"
          >
            Explore Collection
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
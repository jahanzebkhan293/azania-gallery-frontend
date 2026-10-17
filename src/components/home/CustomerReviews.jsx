
import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    name: "Jewelry Collection",
    product: "A touch of everyday elegance",
    review:
      "Discover thoughtfully selected pieces designed to complement your personal style.",
  },
  {
    id: 2,
    name: "Handmade Rugs",
    product: "Character in every detail",
    review:
      "Explore distinctive designs that bring warmth and timeless style to your home.",
  },
  {
    id: 3,
    name: "AZANIA GALLERY",
    product: "Style that feels personal",
    review:
      "Find meaningful details for your wardrobe and home in one curated collection.",
  },
];

function CustomerReviews() {
  return (
    <section className="ag-reviews" aria-labelledby="ag-reviews-title">
      <div className="ag-reviews-inner">
        <div className="ag-reviews-heading">
          <p className="ag-reviews-eyebrow">
            THE AZANIA EXPERIENCE
          </p>

          <h2 id="ag-reviews-title">
            A Little Love From Our Community
          </h2>

          <p>
            Discover the details, craftsmanship, and style
            behind our curated collections.
          </p>
        </div>

        <div className="ag-reviews-grid">
          {reviews.map((item) => (
            <article className="ag-review-card" key={item.id}>
              <span className="ag-review-mark" aria-hidden="true">
                “
              </span>

              <p className="ag-review-product">
                {item.product}
              </p>

              <p className="ag-review-text">
                {item.review}
              </p>

              <div className="ag-review-divider" />

              <p className="ag-review-name">
                {item.name}
              </p>
            </article>
          ))}
        </div>

        <Link to="/shop" className="ag-reviews-link">
          EXPLORE OUR COLLECTIONS <span>→</span>
        </Link>
      </div>
    </section>
  );
}

export default CustomerReviews;
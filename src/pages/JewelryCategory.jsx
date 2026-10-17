import { Link, useParams } from "react-router-dom";
import ProductGrid from "../components/product/ProductGrid";
import products from "../data/products";

function JewelryCategory() {
  const { subcategory } = useParams();

  const categories = {
    rings: {
      name: "Rings",
      description:
        "Discover elegant rings crafted to complement every occasion.",
    },

    bracelets: {
      name: "Bracelets",
      description:
        "Explore refined bracelets designed for effortless everyday elegance.",
    },

    earrings: {
      name: "Earrings",
      description:
        "Discover timeless earrings that add a refined finish to every look.",
    },

    necklaces: {
      name: "Necklaces",
      description:
        "Explore delicate and sophisticated necklaces selected for timeless style.",
    },

    pendants: {
      name: "Pendants",
      description:
        "Discover distinctive pendants designed to make every look memorable.",
    },

    bangles: {
      name: "Bangles",
      description:
        "Explore classic bangles with a refined and sophisticated character.",
    },

    chains: {
      name: "Chains",
      description:
        "Discover sophisticated chains designed for versatile everyday styling.",
    },

    "jewelry-sets": {
      name: "Jewelry Sets",
      description:
        "Explore beautifully coordinated jewelry sets for a complete elegant look.",
    },
  };

  const category = categories[subcategory];

  // =========================================================
  // CATEGORY NOT FOUND
  // =========================================================

  if (!category) {
    return (
      <main className="jewelry-category-page">

        <section className="jewelry-category-not-found">

          <p>
            AZANIA GALLERY
          </p>

          <h1>
            Collection Not Found
          </h1>

          <Link to="/shop">
            Explore Jewelry
          </Link>

        </section>

      </main>
    );
  }

  // =========================================================
  // FILTER PRODUCTS FROM CENTRAL PRODUCT DATA
  // =========================================================

  const categoryProducts = products.filter(
    (product) =>
      product.subcategory?.toLowerCase() ===
      category.name.toLowerCase()
  );

  return (
    <main className="jewelry-category-page">

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="jewelry-breadcrumb">

        <Link to="/">
          Home
        </Link>

        <span>
          /
        </span>

        <Link to="/shop">
          Jewelry
        </Link>

        <span>
          /
        </span>

        <strong>
          {category.name}
        </strong>

      </div>


      {/* =====================================================
          CATEGORY HERO
      ===================================================== */}

      <section className="jewelry-category-hero">

        <div className="jewelry-category-hero-content">

          <p className="jewelry-category-eyebrow">
            AZANIA GALLERY · JEWELRY
          </p>

          <h1>
            {category.name}
          </h1>

          <p>
            {category.description}
          </p>

          <span className="jewelry-category-line"></span>

        </div>

      </section>


      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}

      <section className="jewelry-category-navigation">

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

      </section>


      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section className="jewelry-category-products">

        <div className="jewelry-products-heading">

          <div>

            <span>
              CURATED COLLECTION
            </span>

            <h2>
              {category.name}
            </h2>

          </div>

          <p>
            {categoryProducts.length} Products
          </p>

        </div>


        {categoryProducts.length > 0 ? (
          <ProductGrid
            products={categoryProducts}
          />
        ) : (
          <div className="jewelry-category-empty">
            <p>
              No products available in this collection yet.
            </p>
          </div>
        )}

      </section>


      {/* =====================================================
          BACK TO ALL JEWELRY
      ===================================================== */}

      <section className="jewelry-category-bottom">

        <p>
          Discover more from AZANIA GALLERY
        </p>

        <Link to="/shop">
          View All Jewelry →
        </Link>

      </section>

    </main>
  );
}

export default JewelryCategory;
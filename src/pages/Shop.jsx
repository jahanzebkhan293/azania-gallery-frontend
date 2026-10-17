import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/product/ProductCard";
import { useProducts } from "../context/ProductContext";

function Shop() {
  const { products } = useProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] =
    useState("featured");

  const categories = [
    "All",
    "Rings",
    "Bracelets",
    "Earrings",
    "Necklaces",
    "Pendants",
    "Bangles",
    "Chains",
    "Jewelry Sets",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...products];

    /* =========================================
       SEARCH
    ========================================= */

    if (searchTerm.trim()) {
      const search = searchTerm
        .toLowerCase()
        .trim();

      result = result.filter((product) => {
        const name =
          product.name?.toLowerCase() || "";

        const category =
          product.category?.toLowerCase() || "";

        const subcategory =
          product.subcategory?.toLowerCase() || "";

        const description =
          product.description?.toLowerCase() || "";

        return (
          name.includes(search) ||
          category.includes(search) ||
          subcategory.includes(search) ||
          description.includes(search)
        );
      });
    }

    /* =========================================
       CATEGORY FILTER
    ========================================= */

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          product.subcategory ===
          selectedCategory
      );
    }

    /* =========================================
       PRICE FILTER
    ========================================= */

    if (maxPrice !== "") {
      result = result.filter(
        (product) =>
          Number(product.price) <=
          Number(maxPrice)
      );
    }

    /* =========================================
       SORTING
    ========================================= */

    if (sortOption === "price-low") {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (sortOption === "price-high") {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
    }

    if (sortOption === "name-az") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortOption === "name-za") {
      result.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    maxPrice,
    sortOption,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setMaxPrice("");
    setSortOption("featured");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "All" ||
    maxPrice;

  return (
    <main className="shop-page">

      {/* =================================================
          SHOP HEADER
      ================================================= */}

      <section className="shop-header">
        <p>
          AZANIA GALLERY
        </p>

        <h1>
          Shop Jewelry
        </h1>

        <span>
          Discover thoughtfully selected pieces
          designed to bring timeless elegance
          to every occasion.
        </span>
      </section>

      {/* =================================================
          SHOP PRODUCTS
      ================================================= */}

      <section className="shop-products">

        {/* =================================================
            RESULTS HEADER
        ================================================= */}

        <div className="shop-results-header">

          <div>
            <span>
              OUR COLLECTION
            </span>

            <h2>
              Jewelry Collection
            </h2>
          </div>

          <p>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1
              ? "PRODUCT"
              : "PRODUCTS"}{" "}
            AVAILABLE
          </p>

        </div>

        {/* =================================================
            SHOP TOOLBAR
        ================================================= */}

        <div className="shop-toolbar">

          {/* SEARCH */}

          <div className="shop-search">

            <label htmlFor="shop-search">
              Search
            </label>

            {/* IMPORTANT:
                This class matches the existing CSS.
            */}

            <div className="shop-search-box">

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

              <input
                id="shop-search"
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
                placeholder="Search jewelry..."
              />

            </div>

          </div>

          {/* CATEGORY */}

          <div className="shop-filter">

            <label htmlFor="shop-category">
              Category
            </label>

            <select
              id="shop-category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value
                )
              }
            >
              {categories.map(
                (category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>

          </div>

          {/* MAXIMUM PRICE */}

          <div className="shop-filter">

            <label htmlFor="shop-max-price">
              Maximum Price
            </label>

            <div className="shop-price-input">

              <span>
                $
              </span>

              <input
                id="shop-max-price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(
                    event.target.value
                  )
                }
                placeholder="Any price"
              />

            </div>

          </div>

          {/* SORT */}

          <div className="shop-filter shop-sort">

            <label htmlFor="shop-sort">
              Sort By
            </label>

            <select
              id="shop-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(
                  event.target.value
                )
              }
            >
              <option value="featured">
                Featured
              </option>

              <option value="price-low">
                Price: Low to High
              </option>

              <option value="price-high">
                Price: High to Low
              </option>

              <option value="name-az">
                Name: A–Z
              </option>

              <option value="name-za">
                Name: Z–A
              </option>
            </select>

          </div>

          {/* CLEAR FILTERS */}

          <button
            type="button"
            className="shop-clear-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

        {/* =================================================
            ACTIVE FILTERS
        ================================================= */}

        {hasActiveFilters && (
          <div className="shop-active-filters">

            <span>
              Active filters:
            </span>

            {searchTerm && (
              <button
                type="button"
                onClick={() =>
                  setSearchTerm("")
                }
              >
                Search: "{searchTerm}" ×
              </button>
            )}

            {selectedCategory !==
              "All" && (
              <button
                type="button"
                onClick={() =>
                  setSelectedCategory(
                    "All"
                  )
                }
              >
                {selectedCategory} ×
              </button>
            )}

            {maxPrice && (
              <button
                type="button"
                onClick={() =>
                  setMaxPrice("")
                }
              >
                Up to ${maxPrice} ×
              </button>
            )}

          </div>
        )}

        {/* =================================================
            PRODUCT GRID
        ================================================= */}

        {filteredProducts.length > 0 ? (

          <div className="product-grid">

            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}

          </div>

        ) : (

          /* =================================================
             NO RESULTS
          ================================================= */

          <section className="shop-no-results">

            <div>
              ♡
            </div>

            <span>
              NO PRODUCTS FOUND
            </span>

            <h2>
              Nothing matches your search
            </h2>

            <p>
              Try changing your search or
              removing some filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>

          </section>

        )}

        {/* =================================================
            BOTTOM SECTION
        ================================================= */}

        <section className="shop-bottom">

          <p>
            AZANIA GALLERY
          </p>

          <h2>
            Timeless pieces.
            <br />
            Thoughtfully chosen.
          </h2>

          <Link to="/">
            Back to Home →
          </Link>

        </section>

      </section>

    </main>
  );
}

export default Shop;
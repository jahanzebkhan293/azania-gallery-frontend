
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProductCard from "../components/product/ProductCard";
import { useProducts } from "../context/ProductContext";

import TrustBar from "../components/home/TrustBar";
import CustomerReviews from "../components/home/CustomerReviews";


// =====================================================
// HERO IMAGES
// =====================================================

import hero1 from "../assets/hero-1.png";
import hero2 from "../assets/hero-2.png";
import hero3 from "../assets/hero-3.png";

// =====================================================
// COLLECTION IMAGES
// =====================================================

import ringsImage from "../assets/collections/rings.png";
import braceletsImage from "../assets/collections/bracelets.png";
import earringsImage from "../assets/collections/earrings.png";
import necklacesImage from "../assets/collections/necklaces.png";
import pendantsImage from "../assets/collections/pendants.png";
import banglesImage from "../assets/collections/bangles.png";
import chainsImage from "../assets/collections/chains.png";
import jewelrySetImage from "../assets/collections/jewelryset.png";

function Home() {
  const [activeHero, setActiveHero] = useState(0);
  const heroTrackRef = useRef(null);

  // =====================================================
  // PRODUCT SYSTEM
  // =====================================================

  const { products } = useProducts();
  const featuredProducts = products.slice(0, 8);

  // =====================================================
  // JEWELRY CATEGORIES
  // =====================================================

  const jewelryCategories = [
    {
      name: "Rings",
      slug: "rings",
      number: "01",
      image: ringsImage,
    },
    {
      name: "Bracelets",
      slug: "bracelets",
      number: "02",
      image: braceletsImage,
    },
    {
      name: "Earrings",
      slug: "earrings",
      number: "03",
      image: earringsImage,
    },
    {
      name: "Necklaces",
      slug: "necklaces",
      number: "04",
      image: necklacesImage,
    },
    {
      name: "Pendants",
      slug: "pendants",
      number: "05",
      image: pendantsImage,
    },
    {
      name: "Bangles",
      slug: "bangles",
      number: "06",
      image: banglesImage,
    },
    {
      name: "Chains",
      slug: "chains",
      number: "07",
      image: chainsImage,
    },
    {
      name: "Jewelry Sets",
      slug: "jewelry-sets",
      number: "08",
      image: jewelrySetImage,
    },
  ];

  // =====================================================
  // HERO SLIDES
  // =====================================================

  const heroSlides = [
    {
      eyebrow: "THE JEWELRY EDIT",
      title: "Timeless Beauty",
      titleSecond: "Made for You",
      description:
        "Discover elegant jewelry pieces thoughtfully selected to complement every moment.",
      image: hero1,
    },
    {
      eyebrow: "EVERYDAY ELEGANCE",
      title: "A Touch of",
      titleSecond: "Refined Luxury",
      description:
        "From delicate essentials to statement pieces, find jewelry that feels uniquely yours.",
      image: hero2,
    },
    {
      eyebrow: "CURATED COLLECTION",
      title: "Elegance in",
      titleSecond: "Every Detail",
      description:
        "Explore thoughtfully curated designs created for effortless everyday sophistication.",
      image: hero3,
    },
  ];

  // =====================================================
  // HERO SLIDER NAVIGATION
  // =====================================================

  const goToHero = (index) => {
    const totalSlides = heroSlides.length;
    const newIndex = (index + totalSlides) % totalSlides;

    setActiveHero(newIndex);

    if (heroTrackRef.current) {
      heroTrackRef.current.scrollTo({
        left: heroTrackRef.current.clientWidth * newIndex,
        behavior: "smooth",
      });
    }
  };

  const nextHero = () => {
    goToHero(activeHero + 1);
  };

  const previousHero = () => {
    goToHero(activeHero - 1);
  };

  // =====================================================
  // AUTO SLIDE — EVERY 8 SECONDS
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((current) => {
        const next = (current + 1) % heroSlides.length;

        if (heroTrackRef.current) {
          heroTrackRef.current.scrollTo({
            left: heroTrackRef.current.clientWidth * next,
            behavior: "smooth",
          });
        }

        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // =====================================================
  // HERO SWIPE / SCROLL DETECTION
  // =====================================================

  const handleHeroScroll = () => {
    if (!heroTrackRef.current) return;

    const width = heroTrackRef.current.clientWidth;
    if (!width) return;

    const index = Math.round(
      heroTrackRef.current.scrollLeft / width
    );

    setActiveHero(index);
  };

  // =====================================================
  // HOMEPAGE
  // =====================================================

  return (
    <main className="home-page">

      {/* ================================================
          HERO SECTION
      ================================================ */}

      <section className="hero-section">
        <div
          className="hero-track"
          ref={heroTrackRef}
          onScroll={handleHeroScroll}
        >
          {heroSlides.map((slide, index) => (
            <article
              className="hero-slide"
              key={index}
            >
              <img
                className="hero-image"
                src={slide.image}
                alt={`${slide.title} - AZANIA GALLERY`}
              />

              <div className="hero-overlay"></div>

              <div className="hero-content">
                <p className="hero-eyebrow">
                  {slide.eyebrow}
                </p>

                <h1>
                  {slide.title}
                  <br />
                  {slide.titleSecond}
                </h1>

                <p className="hero-description">
                  {slide.description}
                </p>

                <Link
                  to="/shop"
                  className="hero-button"
                >
                  Explore Jewelry
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* HERO ARROWS */}

        <button
          type="button"
          className="hero-nav hero-nav-left"
          onClick={previousHero}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <button
          type="button"
          className="hero-nav hero-nav-right"
          onClick={nextHero}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* HERO BOTTOM */}

        <div className="hero-bottom">
          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  index === activeHero
                    ? "hero-dot active"
                    : "hero-dot"
                }
                onClick={() => goToHero(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="hero-scroll-text">
            SCROLL TO DISCOVER
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* ================================================
          PREMIUM TRUST BAR — NEW
          Immediately below the hero
      ================================================ */}

      <TrustBar />

      {/* ================================================
          OUR COLLECTIONS
      ================================================ */}

      <section className="collections-section">
        <div className="collections-header">
          <p className="collections-eyebrow">
            EXPLORE JEWELRY
          </p>

          <h2>Our Collections</h2>

          <p className="collections-description">
            Discover timeless pieces crafted for every
            style and occasion.
          </p>
        </div>

        <div className="collections-carousel">

          {/* PREVIOUS COLLECTIONS */}

          <button
            type="button"
            className="collections-nav collections-nav-left"
            aria-label="Previous collections"
            onClick={() => {
              document
                .querySelector(".collections-track")
                ?.scrollBy({
                  left: -900,
                  behavior: "smooth",
                });
            }}
          >
            ‹
          </button>

          {/* COLLECTIONS TRACK */}

          <div className="collections-track">
            {jewelryCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/jewelry/${category.slug}`}
                className="collection-item"
              >
                <div className="collection-circle">
                  <img
                    src={category.image}
                    alt={`${category.name} collection`}
                    className="collection-image"
                  />

                  <span className="collection-number">
                    {category.number}
                  </span>
                </div>

                <h3>{category.name}</h3>

                <span className="collection-line"></span>
              </Link>
            ))}
          </div>

          {/* NEXT COLLECTIONS */}

          <button
            type="button"
            className="collections-nav collections-nav-right"
            aria-label="Next collections"
            onClick={() => {
              document
                .querySelector(".collections-track")
                ?.scrollBy({
                  left: 900,
                  behavior: "smooth",
                });
            }}
          >
            ›
          </button>
        </div>

        {/* COLLECTION DOTS */}

        <div className="collections-dots">
          <span className="active"></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* ================================================
          FEATURED JEWELRY
      ================================================ */}

      <section className="featured-section">
        <div className="featured-heading">
          <div>
            <p>FEATURED JEWELRY</p>
            <h2>Handpicked For You</h2>
          </div>

          <Link to="/shop">
            View All →
          </Link>
        </div>

        {/* 8 FEATURED PRODUCTS */}

        <div className="product-grid featured-product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      {/* ================================================
          CUSTOMER REVIEWS
          Immediately below Featured Jewelry
      ================================================ */}

      <CustomerReviews />

    </main>
  );
}

export default Home;
function Footer() {
  return (
    <footer className="azania-footer">

      <div className="azania-footer-container">

        {/* =====================================================
            TOP FOOTER
        ===================================================== */}

        <div className="azania-footer-top">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="azania-footer-brand">

            <a
              href="/"
              className="azania-footer-logo-link"
              aria-label="AZANIA GALLERY Home"
            >
              <div className="azania-footer-logo">
                AZANIA
                <span>GALLERY</span>
              </div>
            </a>

            <p className="azania-footer-description">
              AZANIA GALLERY brings together the finest
              selection of Jewelry, Handmade Rugs and
              carefully curated pieces crafted with
              quality, passion and purpose. Designed to
              elevate your lifestyle.
            </p>

          </div>


          {/* =================================================
              SHOP
          ================================================= */}

          <div className="azania-footer-column">

            <h3>Shop</h3>

            <ul className="azania-footer-links">

              <li>
                <a href="/jewelry/rings">
                  Rings
                </a>
              </li>

              <li>
                <a href="/jewelry/bracelets">
                  Bracelets
                </a>
              </li>

              <li>
                <a href="/jewelry/earrings">
                  Earrings
                </a>
              </li>

              <li>
                <a href="/jewelry/necklaces">
                  Necklaces
                </a>
              </li>

              <li>
                <a href="/jewelry/pendants">
                  Pendants
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              ABOUT
          ================================================= */}

          <div className="azania-footer-column">

            <h3>About</h3>

            <ul className="azania-footer-links">

              <li>
                <a href="/about">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="/faqs">
                  FAQ's
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              CUSTOMER CARE
          ================================================= */}

          <div className="azania-footer-column">

            <h3>Customer Care</h3>

            <ul className="azania-footer-links">

              <li>
                <a href="/shipping-policy">
                  Shipping Policy
                </a>
              </li>

              <li>
                <a href="/return-and-refund-policy">
                  Return &amp; Refund Policy
                </a>
              </li>

              <li>
                <a href="/privacy-policy">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="/terms-of-service">
                  Terms of Service
                </a>
              </li>

            </ul>

          </div>


          {/* =================================================
              FOLLOW US
          ================================================= */}

          <div className="azania-footer-social">

            <h3>Follow Us</h3>

            <div className="azania-footer-social-icons">

              {/* =================================================
                  FACEBOOK
              ================================================= */}

              <a
                href="https://www.facebook.com/azaniagallery1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.8V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.5v3h2.8v8h3.2z" />
                </svg>

              </a>


              {/* =================================================
                  INSTAGRAM
              ================================================= */}

              <a
                href="https://www.instagram.com/azaniagallery/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >

                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>

              </a>

            </div>

          </div>

        </div>


        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <div className="azania-footer-bottom">

          {/* =================================================
              COPYRIGHT
          ================================================= */}

          <div className="azania-footer-copyright">
            © 2026 AZANIA GALLERY. All rights reserved.
          </div>


          {/* =================================================
              PAYMENT METHODS
          ================================================= */}

          <div className="azania-payment-methods">

            {/* VISA */}

            <div className="azania-payment">

              <img
                src="https://cdn.shopify.com/s/files/1/0689/0353/4690/files/visa-credit-card-payment-method-19674_256.png?v=1788674913"
                alt="Visa"
              />

            </div>


            {/* MASTERCARD */}

            <div className="azania-payment">

              <img
                src="https://cdn.shopify.com/s/files/1/0689/0353/4690/files/mastercard-credit-card-payment-method-19676_256.png?v=1788675094"
                alt="Mastercard"
              />

            </div>


            {/* AMERICAN EXPRESS */}

            <div className="azania-payment">

              <img
                src="https://cdn.shopify.com/s/files/1/0689/0353/4690/files/american-express-credit-card-payment-method-19678_256.png?v=1788675094"
                alt="American Express"
              />

            </div>


            {/* PAYPAL */}

            <div className="azania-payment">

              <img
                src="https://cdn.shopify.com/s/files/1/0689/0353/4690/files/paypal-credit-card-payment-square-button-19675_256.png?v=1788675094"
                alt="PayPal"
              />

            </div>


            {/* GOOGLE PAY */}

            <div className="azania-payment">

              <img
                src="https://cdn.shopify.com/s/files/1/0689/0353/4690/files/google-pay-credit-card-payment-method-19705_256.png?v=1788675094"
                alt="Google Pay"
              />

            </div>


            {/* APPLE PAY */}

            <div className="azania-payment">

              <img
                src="https://cdn.shopify.com/s/files/1/0689/0353/4690/files/apple-pay-credit-card-payment-method-19706_256.png?v=1788675094"
                alt="Apple Pay"
              />

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;
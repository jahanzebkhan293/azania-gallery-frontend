import React from "react";

function ShippingPolicy() {
  return (
    <main className="shipping-policy-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="shipping-policy-hero">
        <div className="shipping-policy-hero-content">
          <span className="shipping-policy-eyebrow">
            AZANIA GALLERY
          </span>

          <h1>Shipping Policy</h1>

          <p>
            Everything you need to know about shipping your AZANIA GALLERY
            order.
          </p>
        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="shipping-policy-content">

        <div className="shipping-policy-container">

          {/* INTRODUCTION */}

          <div className="shipping-policy-intro">
            <h2>Shipping Information</h2>

            <p>
              At AZANIA GALLERY, we aim to make your shopping experience
              simple and convenient. We offer shipping options designed to
              provide flexibility based on your delivery needs.
            </p>

            <p>
              Delivery estimates are calculated in business days from the
              date the order is placed.
            </p>
          </div>


          {/* =================================================
              SHIPPING OPTIONS
          ================================================= */}

          <div className="shipping-options">

            {/* STANDARD SHIPPING */}

            <div className="shipping-option-card">

              <div className="shipping-option-icon">
                🚚
              </div>

              <div className="shipping-option-content">

                <div className="shipping-option-header">
                  <h3>Standard Shipping</h3>

                  <span className="shipping-price">
                    FREE
                  </span>
                </div>

                <p className="shipping-delivery">
                  Estimated delivery: <strong>5–8 business days</strong>
                </p>

                <p>
                  Enjoy complimentary standard shipping on your order with
                  an estimated delivery time of 5–8 business days.
                </p>

              </div>

            </div>


            {/* FAST SHIPPING */}

            <div className="shipping-option-card">

              <div className="shipping-option-icon">
                ⚡
              </div>

              <div className="shipping-option-content">

                <div className="shipping-option-header">
                  <h3>Fast Shipping</h3>

                  <span className="shipping-price">
                    $10
                  </span>
                </div>

                <p className="shipping-delivery">
                  Estimated delivery: <strong>3–5 business days</strong>
                </p>

                <p>
                  Need your order sooner? Select our fast shipping option
                  for an estimated delivery time of 3–5 business days.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              DELIVERY ESTIMATES
          ================================================= */}

          <div className="shipping-policy-section">

            <h2>Delivery Estimates</h2>

            <p>
              Delivery estimates are provided in business days and are
              calculated from the date your order is placed.
            </p>

            <p>
              Delivery times may vary depending on the destination,
              shipping carrier, weekends, public holidays, weather
              conditions, or other circumstances outside our control.
            </p>

          </div>


          {/* =================================================
              SHIPPING ADDRESS
          ================================================= */}

          <div className="shipping-policy-section">

            <h2>Shipping Address</h2>

            <p>
              Please make sure that your shipping information is complete
              and accurate when placing your order.
            </p>

            <p>
              AZANIA GALLERY is not responsible for delays or delivery
              issues caused by an incorrect or incomplete shipping address
              provided during checkout.
            </p>

          </div>


          {/* =================================================
              ORDER DELIVERY
          ================================================= */}

          <div className="shipping-policy-section">

            <h2>Order Delivery</h2>

            <p>
              Once your order has been shipped, delivery will be handled by
              the applicable shipping carrier. Delivery estimates are
              approximate and are not guaranteed delivery dates.
            </p>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div className="shipping-contact-box">

            <span className="shipping-contact-label">
              NEED HELP?
            </span>

            <h2>Questions About Shipping?</h2>

            <p>
              If you have any questions regarding shipping or your order,
              please contact the AZANIA GALLERY team.
            </p>

            <a href="/contact" className="shipping-contact-button">
              Contact Us
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          PAGE STYLES
      ===================================================== */}

      <style>{`

        /* ===================================================
           MAIN PAGE
        =================================================== */

        .shipping-policy-page {
          width: 100%;
          background: #ffffff;
          color: #0D1B2A;
          font-family: inherit;
        }


        /* ===================================================
           HERO
        =================================================== */

        .shipping-policy-hero {
          width: 100%;
          min-height: 330px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 70px 24px;

          background:
            linear-gradient(
              135deg,
              #0D1B2A 0%,
              #14283c 55%,
              #0D1B2A 100%
            );

          position: relative;
          overflow: hidden;

          text-align: center;
        }


        .shipping-policy-hero::before {
          content: "";
          position: absolute;

          width: 420px;
          height: 420px;

          border-radius: 50%;

          background: rgba(176, 141, 87, 0.08);

          top: -220px;
          left: -120px;
        }


        .shipping-policy-hero::after {
          content: "";
          position: absolute;

          width: 350px;
          height: 350px;

          border-radius: 50%;

          background: rgba(176, 141, 87, 0.06);

          bottom: -210px;
          right: -100px;
        }


        .shipping-policy-hero-content {
          position: relative;
          z-index: 2;

          max-width: 760px;
        }


        .shipping-policy-eyebrow {
          display: inline-block;

          margin-bottom: 14px;

          color: #B08D57;

          font-size: 12px;
          font-weight: 700;

          letter-spacing: 4px;
        }


        .shipping-policy-hero h1 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(38px, 5vw, 62px);

          font-weight: 600;

          line-height: 1.1;

          letter-spacing: -1px;
        }


        .shipping-policy-hero p {
          margin: 18px auto 0;

          max-width: 620px;

          color: rgba(255, 255, 255, 0.78);

          font-size: 16px;

          line-height: 1.7;
        }


        /* ===================================================
           CONTENT
        =================================================== */

        .shipping-policy-content {
          width: 100%;

          padding: 75px 24px 90px;

          background: #ffffff;
        }


        .shipping-policy-container {
          width: 100%;
          max-width: 1050px;

          margin: 0 auto;
        }


        /* ===================================================
           INTRO
        =================================================== */

        .shipping-policy-intro {
          max-width: 850px;

          margin: 0 auto 55px;

          text-align: center;
        }


        .shipping-policy-intro h2,
        .shipping-policy-section h2 {
          margin: 0 0 18px;

          color: #0D1B2A;

          font-size: 30px;

          font-weight: 600;

          line-height: 1.25;
        }


        .shipping-policy-intro h2::after {
          content: "";

          display: block;

          width: 55px;
          height: 2px;

          margin: 16px auto 0;

          background: #B08D57;
        }


        .shipping-policy-intro p {
          margin: 0 auto 12px;

          color: #5d6670;

          font-size: 16px;

          line-height: 1.8;
        }


        /* ===================================================
           SHIPPING OPTIONS
        =================================================== */

        .shipping-options {
          display: grid;

          grid-template-columns: repeat(2, minmax(0, 1fr));

          gap: 24px;

          margin-bottom: 70px;
        }


        .shipping-option-card {
          display: flex;

          gap: 20px;

          padding: 30px;

          background: #faf9f6;

          border: 1px solid #e8e2d8;

          border-radius: 14px;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }


        .shipping-option-card:hover {
          transform: translateY(-4px);

          border-color: rgba(176, 141, 87, 0.55);

          box-shadow:
            0 14px 35px rgba(13, 27, 42, 0.08);
        }


        .shipping-option-icon {
          flex: 0 0 52px;

          width: 52px;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #0D1B2A;

          font-size: 22px;
        }


        .shipping-option-content {
          flex: 1;
          min-width: 0;
        }


        .shipping-option-header {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 15px;

          margin-bottom: 8px;
        }


        .shipping-option-header h3 {
          margin: 0;

          color: #0D1B2A;

          font-size: 21px;

          font-weight: 600;
        }


        .shipping-price {
          color: #B08D57;

          font-size: 16px;

          font-weight: 700;

          white-space: nowrap;
        }


        .shipping-delivery {
          margin: 0 0 12px;

          color: #0D1B2A;

          font-size: 14px;

          line-height: 1.6;
        }


        .shipping-option-content > p:last-child {
          margin: 0;

          color: #68717b;

          font-size: 14px;

          line-height: 1.7;
        }


        /* ===================================================
           POLICY SECTIONS
        =================================================== */

        .shipping-policy-section {
          padding: 35px 0;

          border-top: 1px solid #e8e8e8;
        }


        .shipping-policy-section h2 {
          font-size: 26px;

          margin-bottom: 14px;
        }


        .shipping-policy-section p {
          margin: 0 0 12px;

          color: #626b74;

          font-size: 15px;

          line-height: 1.8;
        }


        .shipping-policy-section p:last-child {
          margin-bottom: 0;
        }


        /* ===================================================
           CONTACT BOX
        =================================================== */

        .shipping-contact-box {
          margin-top: 55px;

          padding: 45px 35px;

          text-align: center;

          background:
            linear-gradient(
              135deg,
              #0D1B2A,
              #162c42
            );

          border-radius: 16px;

          box-shadow:
            0 18px 45px rgba(13, 27, 42, 0.12);
        }


        .shipping-contact-label {
          display: inline-block;

          margin-bottom: 12px;

          color: #B08D57;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;
        }


        .shipping-contact-box h2 {
          margin: 0 0 12px;

          color: #ffffff;

          font-size: 30px;

          font-weight: 600;
        }


        .shipping-contact-box p {
          max-width: 650px;

          margin: 0 auto 25px;

          color: rgba(255, 255, 255, 0.72);

          font-size: 15px;

          line-height: 1.7;
        }


        .shipping-contact-button {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: 145px;

          padding: 13px 25px;

          color: #0D1B2A;

          background: #B08D57;

          border: 1px solid #B08D57;

          border-radius: 4px;

          text-decoration: none;

          font-size: 14px;

          font-weight: 700;

          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }


        .shipping-contact-button:hover {
          background: #ffffff;

          border-color: #ffffff;

          color: #0D1B2A;

          transform: translateY(-2px);
        }


        /* ===================================================
           TABLET
        =================================================== */

        @media (max-width: 850px) {

          .shipping-options {
            grid-template-columns: 1fr;
          }

        }


        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 600px) {

          .shipping-policy-hero {
            min-height: 285px;

            padding: 55px 20px;
          }


          .shipping-policy-eyebrow {
            font-size: 10px;

            letter-spacing: 3px;
          }


          .shipping-policy-hero h1 {
            font-size: 38px;
          }


          .shipping-policy-hero p {
            margin-top: 14px;

            font-size: 14px;

            line-height: 1.65;
          }


          .shipping-policy-content {
            padding: 55px 18px 65px;
          }


          .shipping-policy-intro {
            margin-bottom: 40px;
          }


          .shipping-policy-intro h2,
          .shipping-policy-section h2 {
            font-size: 25px;
          }


          .shipping-policy-intro p {
            font-size: 14px;

            line-height: 1.75;
          }


          .shipping-options {
            gap: 16px;

            margin-bottom: 45px;
          }


          .shipping-option-card {
            gap: 15px;

            padding: 22px 18px;

            border-radius: 12px;
          }


          .shipping-option-icon {
            flex: 0 0 44px;

            width: 44px;
            height: 44px;

            font-size: 18px;
          }


          .shipping-option-header {
            align-items: flex-start;
          }


          .shipping-option-header h3 {
            font-size: 18px;
          }


          .shipping-price {
            font-size: 14px;
          }


          .shipping-delivery {
            font-size: 13px;
          }


          .shipping-option-content > p:last-child {
            font-size: 13px;

            line-height: 1.65;
          }


          .shipping-policy-section {
            padding: 28px 0;
          }


          .shipping-policy-section p {
            font-size: 14px;

            line-height: 1.75;
          }


          .shipping-contact-box {
            margin-top: 35px;

            padding: 35px 20px;

            border-radius: 13px;
          }


          .shipping-contact-box h2 {
            font-size: 25px;
          }


          .shipping-contact-box p {
            font-size: 14px;
          }

        }

      `}</style>

    </main>
  );
}

export default ShippingPolicy;
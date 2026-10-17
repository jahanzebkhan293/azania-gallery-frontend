import React from "react";

function ReturnRefundPolicy() {
  return (
    <main className="return-refund-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="return-refund-hero">
        <div className="return-refund-hero-content">

          <span className="return-refund-eyebrow">
            AZANIA GALLERY
          </span>

          <h1>Return & Refund Policy</h1>

          <p>
            We want you to feel confident and satisfied with your
            AZANIA GALLERY purchase.
          </p>

        </div>
      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="return-refund-content">

        <div className="return-refund-container">

          {/* INTRODUCTION */}

          <div className="return-refund-intro">

            <h2>Our Return Policy</h2>

            <p>
              At AZANIA GALLERY, we want you to be happy with your
              purchase. If you are not completely satisfied with your
              order, you may request a return within <strong>14 days</strong>
              of receiving your order, subject to the conditions below.
            </p>

          </div>


          {/* =================================================
              RETURN WINDOW
          ================================================= */}

          <div className="return-highlight-card">

            <div className="return-highlight-icon">
              ↩
            </div>

            <div>

              <span className="return-highlight-label">
                RETURN WINDOW
              </span>

              <h3>14-Day Return Policy</h3>

              <p>
                Return requests must be submitted within 14 days of
                receiving your order.
              </p>

            </div>

          </div>


          {/* =================================================
              ELIGIBILITY
          ================================================= */}

          <section className="return-refund-section">

            <h2>Return Eligibility</h2>

            <p>
              To be eligible for a return, the item should be returned
              in its original condition and should not show signs of
              use, damage, or alteration.
            </p>

            <ul>
              <li>
                The return request must be submitted within 14 days
                of receiving the order.
              </li>

              <li>
                Items should be in their original condition.
              </li>

              <li>
                Items should not be damaged, worn, altered, or used.
              </li>

              <li>
                Original packaging should be included whenever
                applicable.
              </li>

              <li>
                Proof of purchase or order information may be required.
              </li>
            </ul>

          </section>


          {/* =================================================
              NON RETURNABLE
          ================================================= */}

          <section className="return-refund-section">

            <h2>Items That May Not Be Eligible for Return</h2>

            <p>
              Certain items may not be eligible for return when they
              have been used, damaged, altered, or returned without
              the required original condition or packaging.
            </p>

            <ul>
              <li>
                Items showing signs of wear or use.
              </li>

              <li>
                Items that have been damaged after delivery.
              </li>

              <li>
                Items that have been altered or modified.
              </li>

              <li>
                Items returned after the 14-day return period.
              </li>
            </ul>

          </section>


          {/* =================================================
              HOW TO REQUEST
          ================================================= */}

          <section className="return-refund-section">

            <h2>How to Request a Return</h2>

            <p>
              If you would like to request a return, please contact
              AZANIA GALLERY with your order information and the reason
              for your return.
            </p>

            <div className="return-steps">

              <div className="return-step">

                <span className="return-step-number">
                  01
                </span>

                <div>
                  <h3>Contact Us</h3>

                  <p>
                    Contact our team with your order details and
                    return request.
                  </p>
                </div>

              </div>


              <div className="return-step">

                <span className="return-step-number">
                  02
                </span>

                <div>
                  <h3>Return Instructions</h3>

                  <p>
                    Our team will provide the relevant instructions
                    for your return.
                  </p>
                </div>

              </div>


              <div className="return-step">

                <span className="return-step-number">
                  03
                </span>

                <div>
                  <h3>Return the Item</h3>

                  <p>
                    Send the eligible item according to the return
                    instructions provided.
                  </p>
                </div>

              </div>

            </div>

          </section>


          {/* =================================================
              REFUND
          ================================================= */}

          <section className="return-refund-section">

            <h2>Refunds</h2>

            <p>
              Once your returned item is received and reviewed, we
              will determine whether the return meets the applicable
              return requirements.
            </p>

            <p>
              If the return is approved, the applicable refund will be
              processed according to the original order and payment
              method.
            </p>

          </section>


          {/* =================================================
              REFUND PROCESSING
          ================================================= */}

          <section className="return-refund-section">

            <h2>Refund Processing</h2>

            <p>
              After an approved return has been processed, the time
              required for the refund to appear in your account may
              vary depending on your payment provider or financial
              institution.
            </p>

          </section>


          {/* =================================================
              DAMAGED / INCORRECT ITEM
          ================================================= */}

          <section className="return-refund-section">

            <h2>Damaged or Incorrect Items</h2>

            <p>
              If you receive an item that appears damaged or if you
              receive an incorrect item, please contact AZANIA GALLERY
              as soon as possible with your order details and relevant
              information so that we can review the issue.
            </p>

          </section>


          {/* =================================================
              SHIPPING COSTS
          ================================================= */}

          <section className="return-refund-section">

            <h2>Return Shipping</h2>

            <p>
              Return shipping arrangements and any applicable shipping
              costs will depend on the reason for the return and the
              circumstances of the order. Please contact us before
              sending an item back so that you can receive the
              appropriate return instructions.
            </p>

          </section>


          {/* =================================================
              ORDER CANCELLATION
          ================================================= */}

          <section className="return-refund-section">

            <h2>Order Cancellation</h2>

            <p>
              If you need to cancel an order, please contact us as
              soon as possible. Once an order has been shipped, it may
              no longer be possible to cancel it before delivery.
            </p>

          </section>


          {/* =================================================
              CONTACT BOX
          ================================================= */}

          <div className="return-contact-box">

            <span className="return-contact-label">
              NEED HELP?
            </span>

            <h2>Questions About Returns?</h2>

            <p>
              If you have any questions about a return, refund, or
              your order, our team is here to help.
            </p>

            <a
              href="/contact"
              className="return-contact-button"
            >
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

        .return-refund-page {
          width: 100%;
          background: #ffffff;
          color: #0D1B2A;
          font-family: inherit;
        }


        /* ===================================================
           HERO
        =================================================== */

        .return-refund-hero {
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


        .return-refund-hero::before {
          content: "";

          position: absolute;

          width: 420px;
          height: 420px;

          border-radius: 50%;

          background: rgba(176, 141, 87, 0.08);

          top: -220px;
          left: -120px;
        }


        .return-refund-hero::after {
          content: "";

          position: absolute;

          width: 350px;
          height: 350px;

          border-radius: 50%;

          background: rgba(176, 141, 87, 0.06);

          bottom: -210px;
          right: -100px;
        }


        .return-refund-hero-content {
          position: relative;
          z-index: 2;

          max-width: 800px;
        }


        .return-refund-eyebrow {
          display: inline-block;

          margin-bottom: 14px;

          color: #B08D57;

          font-size: 12px;
          font-weight: 700;

          letter-spacing: 4px;
        }


        .return-refund-hero h1 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(36px, 5vw, 60px);

          font-weight: 600;

          line-height: 1.1;

          letter-spacing: -1px;
        }


        .return-refund-hero p {
          margin: 18px auto 0;

          max-width: 650px;

          color: rgba(255, 255, 255, 0.78);

          font-size: 16px;

          line-height: 1.7;
        }


        /* ===================================================
           CONTENT
        =================================================== */

        .return-refund-content {
          width: 100%;

          padding: 75px 24px 90px;

          background: #ffffff;
        }


        .return-refund-container {
          width: 100%;
          max-width: 1050px;

          margin: 0 auto;
        }


        /* ===================================================
           INTRO
        =================================================== */

        .return-refund-intro {
          max-width: 850px;

          margin: 0 auto 45px;

          text-align: center;
        }


        .return-refund-intro h2,
        .return-refund-section h2 {
          margin: 0 0 18px;

          color: #0D1B2A;

          font-size: 30px;

          font-weight: 600;

          line-height: 1.25;
        }


        .return-refund-intro h2::after {
          content: "";

          display: block;

          width: 55px;
          height: 2px;

          margin: 16px auto 0;

          background: #B08D57;
        }


        .return-refund-intro p {
          margin: 0;

          color: #626b74;

          font-size: 16px;

          line-height: 1.8;
        }


        /* ===================================================
           HIGHLIGHT CARD
        =================================================== */

        .return-highlight-card {
          display: flex;

          align-items: center;

          gap: 22px;

          margin-bottom: 65px;

          padding: 28px 30px;

          background: #faf9f6;

          border: 1px solid #e8e2d8;

          border-left: 4px solid #B08D57;

          border-radius: 12px;
        }


        .return-highlight-icon {
          flex: 0 0 58px;

          width: 58px;
          height: 58px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #0D1B2A;

          color: #B08D57;

          font-size: 27px;
        }


        .return-highlight-label {
          display: block;

          margin-bottom: 5px;

          color: #B08D57;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 2px;
        }


        .return-highlight-card h3 {
          margin: 0 0 5px;

          color: #0D1B2A;

          font-size: 22px;

          font-weight: 600;
        }


        .return-highlight-card p {
          margin: 0;

          color: #68717b;

          font-size: 14px;

          line-height: 1.6;
        }


        /* ===================================================
           POLICY SECTIONS
        =================================================== */

        .return-refund-section {
          padding: 35px 0;

          border-top: 1px solid #e8e8e8;
        }


        .return-refund-section h2 {
          font-size: 26px;

          margin-bottom: 15px;
        }


        .return-refund-section p {
          margin: 0 0 13px;

          color: #626b74;

          font-size: 15px;

          line-height: 1.8;
        }


        .return-refund-section p:last-child {
          margin-bottom: 0;
        }


        /* ===================================================
           LIST
        =================================================== */

        .return-refund-section ul {
          margin: 18px 0 0;

          padding-left: 22px;

          color: #626b74;
        }


        .return-refund-section li {
          margin-bottom: 10px;

          padding-left: 6px;

          font-size: 15px;

          line-height: 1.7;
        }


        .return-refund-section li::marker {
          color: #B08D57;
        }


        /* ===================================================
           RETURN STEPS
        =================================================== */

        .return-steps {
          display: grid;

          grid-template-columns: repeat(3, minmax(0, 1fr));

          gap: 18px;

          margin-top: 28px;
        }


        .return-step {
          display: flex;

          gap: 15px;

          padding: 23px;

          background: #faf9f6;

          border: 1px solid #e8e2d8;

          border-radius: 10px;
        }


        .return-step-number {
          flex: 0 0 auto;

          color: #B08D57;

          font-size: 13px;

          font-weight: 700;

          letter-spacing: 1px;
        }


        .return-step h3 {
          margin: 0 0 7px;

          color: #0D1B2A;

          font-size: 17px;

          font-weight: 600;
        }


        .return-step p {
          margin: 0;

          color: #6b737c;

          font-size: 13px;

          line-height: 1.65;
        }


        /* ===================================================
           CONTACT BOX
        =================================================== */

        .return-contact-box {
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


        .return-contact-label {
          display: inline-block;

          margin-bottom: 12px;

          color: #B08D57;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;
        }


        .return-contact-box h2 {
          margin: 0 0 12px;

          color: #ffffff;

          font-size: 30px;

          font-weight: 600;
        }


        .return-contact-box p {
          max-width: 650px;

          margin: 0 auto 25px;

          color: rgba(255, 255, 255, 0.72);

          font-size: 15px;

          line-height: 1.7;
        }


        .return-contact-button {
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


        .return-contact-button:hover {
          background: #ffffff;

          border-color: #ffffff;

          color: #0D1B2A;

          transform: translateY(-2px);
        }


        /* ===================================================
           TABLET
        =================================================== */

        @media (max-width: 850px) {

          .return-steps {
            grid-template-columns: 1fr;
          }

        }


        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 600px) {

          .return-refund-hero {
            min-height: 285px;

            padding: 55px 20px;
          }


          .return-refund-eyebrow {
            font-size: 10px;

            letter-spacing: 3px;
          }


          .return-refund-hero h1 {
            font-size: 36px;
          }


          .return-refund-hero p {
            margin-top: 14px;

            font-size: 14px;

            line-height: 1.65;
          }


          .return-refund-content {
            padding: 55px 18px 65px;
          }


          .return-refund-intro {
            margin-bottom: 35px;
          }


          .return-refund-intro h2,
          .return-refund-section h2 {
            font-size: 25px;
          }


          .return-refund-intro p {
            font-size: 14px;

            line-height: 1.75;
          }


          .return-highlight-card {
            align-items: flex-start;

            gap: 15px;

            margin-bottom: 45px;

            padding: 22px 18px;
          }


          .return-highlight-icon {
            flex: 0 0 44px;

            width: 44px;
            height: 44px;

            font-size: 21px;
          }


          .return-highlight-card h3 {
            font-size: 19px;
          }


          .return-highlight-card p {
            font-size: 13px;
          }


          .return-refund-section {
            padding: 28px 0;
          }


          .return-refund-section p,
          .return-refund-section li {
            font-size: 14px;

            line-height: 1.75;
          }


          .return-refund-section ul {
            padding-left: 20px;
          }


          .return-step {
            padding: 20px;
          }


          .return-contact-box {
            margin-top: 35px;

            padding: 35px 20px;

            border-radius: 13px;
          }


          .return-contact-box h2 {
            font-size: 25px;
          }


          .return-contact-box p {
            font-size: 14px;
          }

        }

      `}</style>

    </main>
  );
}

export default ReturnRefundPolicy;
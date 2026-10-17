import React, { useState } from "react";

function FAQs() {

  const [openIndex, setOpenIndex] = useState(null);

  const faqCategories = [
    {
      title: "Orders & Shopping",
      questions: [
        {
          question: "How do I place an order?",
          answer:
            "Browse the products available on AZANIA GALLERY, select the product you would like to purchase, choose any available options, and add it to your cart. When you are ready, proceed to checkout and provide the required information to complete your order.",
        },
        {
          question: "Can I change or cancel my order?",
          answer:
            "If you need to change or cancel an order, please contact AZANIA GALLERY as soon as possible. Once an order has been shipped, it may no longer be possible to cancel or modify it before delivery.",
        },
        {
          question: "How can I check my order?",
          answer:
            "If you have created an AZANIA GALLERY customer account, you can sign in to your account and view your order information through your customer dashboard.",
        },
        {
          question: "Can I shop without creating an account?",
          answer:
            "Account availability and checkout options may depend on the features enabled on the website. Creating an account allows you to access customer features such as your dashboard and order history.",
        },
      ],
    },

    {
      title: "Shipping & Delivery",
      questions: [
        {
          question: "Do you offer free shipping?",
          answer:
            "Yes. AZANIA GALLERY offers FREE Standard Shipping with an estimated delivery time of 5–8 business days.",
        },
        {
          question: "Do you offer fast shipping?",
          answer:
            "Yes. Fast Shipping is available for $10 with an estimated delivery time of 3–5 business days.",
        },
        {
          question: "How are delivery estimates calculated?",
          answer:
            "Delivery estimates are calculated in business days from the date the order is placed.",
        },
        {
          question: "Are delivery times guaranteed?",
          answer:
            "Delivery estimates are approximate and are not guaranteed delivery dates. Actual delivery may vary depending on the destination, shipping carrier, weekends, holidays, weather, or other circumstances outside our control.",
        },
        {
          question: "What if I enter the wrong shipping address?",
          answer:
            "Please carefully check your shipping information before completing your order. AZANIA GALLERY is not responsible for delivery issues caused by an incorrect or incomplete shipping address provided during checkout.",
        },
      ],
    },

    {
      title: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer:
            "AZANIA GALLERY offers a 14-day return policy. Return requests must be submitted within 14 days of receiving your order and the item must meet the applicable return requirements.",
        },
        {
          question: "What condition must an item be in to be returned?",
          answer:
            "Items should be returned in their original condition and should not show signs of use, damage, wear, or alteration. Original packaging should be included whenever applicable.",
        },
        {
          question: "How do I request a return?",
          answer:
            "Contact AZANIA GALLERY with your order information and the reason for your return. Our team will provide the relevant return instructions.",
        },
        {
          question: "When will I receive my refund?",
          answer:
            "After an approved return has been processed, the time required for the refund to appear in your account may vary depending on the payment provider or financial institution.",
        },
        {
          question: "What if I receive a damaged or incorrect item?",
          answer:
            "Please contact AZANIA GALLERY as soon as possible with your order details and relevant information so that we can review the issue and provide appropriate assistance.",
        },
      ],
    },

    {
      title: "Jewelry & Products",
      questions: [
        {
          question: "Are the product images accurate?",
          answer:
            "We make reasonable efforts to display product images and descriptions as accurately as possible. However, colors and visual appearance may vary depending on your device, screen settings, lighting, and other factors.",
        },
        {
          question: "Will product availability always remain the same?",
          answer:
            "Product availability can change. Products may become unavailable or stock levels may change without prior notice.",
        },
      ],
    },

    {
      title: "Account & Privacy",
      questions: [
        {
          question: "Why should I create an account?",
          answer:
            "A customer account allows you to access features such as your customer dashboard and order history. Your account also helps us associate your orders and customer information with your account.",
        },
        {
          question: "How is my personal information handled?",
          answer:
            "AZANIA GALLERY takes reasonable measures to protect information handled through the website. For more information about how information may be collected and used, please review our Privacy Policy.",
        },
        {
          question: "Can I request information related to my account?",
          answer:
            "Depending on applicable law, you may have rights concerning personal information associated with your account, including requesting access, correction, or deletion of certain information. Please contact us with your request.",
        },
      ],
    },

    {
      title: "Contact & Support",
      questions: [
        {
          question: "How can I contact AZANIA GALLERY?",
          answer:
            "You can contact the AZANIA GALLERY team through our Contact Us page for questions about products, orders, shipping, returns, or other website-related matters.",
        },
        {
          question: "Where can I find your policies?",
          answer:
            "Our Shipping Policy, Return & Refund Policy, Privacy Policy, and Terms of Service are available through the relevant links in the website footer.",
        },
      ],
    },
  ];


  const handleToggle = (categoryIndex, questionIndex) => {

    const currentIndex = `${categoryIndex}-${questionIndex}`;

    setOpenIndex(
      openIndex === currentIndex
        ? null
        : currentIndex
    );
  };


  return (
    <main className="faqs-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="faqs-hero">

        <div className="faqs-hero-content">

          <span className="faqs-eyebrow">
            AZANIA GALLERY
          </span>

          <h1>Frequently Asked Questions</h1>

          <p>
            Find answers to common questions about orders, shipping,
            returns, products, and your AZANIA GALLERY account.
          </p>

        </div>

      </section>


      {/* =====================================================
          FAQ CONTENT
      ===================================================== */}

      <section className="faqs-content">

        <div className="faqs-container">

          <div className="faqs-intro">

            <span className="faqs-intro-label">
              NEED TO KNOW?
            </span>

            <h2>How Can We Help?</h2>

            <p>
              Browse the questions below to find helpful information
              about shopping with AZANIA GALLERY.
            </p>

          </div>


          {/* =================================================
              FAQ CATEGORIES
          ================================================= */}

          <div className="faq-categories">

            {faqCategories.map((category, categoryIndex) => (

              <section
                className="faq-category"
                key={category.title}
              >

                <div className="faq-category-heading">

                  <span className="faq-category-number">
                    {String(categoryIndex + 1).padStart(2, "0")}
                  </span>

                  <h2>
                    {category.title}
                  </h2>

                </div>


                <div className="faq-list">

                  {category.questions.map(
                    (faq, questionIndex) => {

                      const itemIndex =
                        `${categoryIndex}-${questionIndex}`;

                      const isOpen =
                        openIndex === itemIndex;

                      return (
                        <div
                          className={`faq-item ${
                            isOpen ? "faq-item-open" : ""
                          }`}
                          key={faq.question}
                        >

                          <button
                            type="button"
                            className="faq-question"
                            onClick={() =>
                              handleToggle(
                                categoryIndex,
                                questionIndex
                              )
                            }
                            aria-expanded={isOpen}
                          >

                            <span>
                              {faq.question}
                            </span>

                            <span
                              className="faq-icon"
                              aria-hidden="true"
                            >
                              {isOpen ? "−" : "+"}
                            </span>

                          </button>


                          <div
                            className={`faq-answer ${
                              isOpen ? "faq-answer-open" : ""
                            }`}
                          >

                            <div className="faq-answer-inner">

                              <p>
                                {faq.answer}
                              </p>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </section>

            ))}

          </div>


          {/* =================================================
              CONTACT BOX
          ================================================= */}

          <div className="faqs-contact-box">

            <div className="faqs-contact-content">

              <span className="faqs-contact-label">
                STILL HAVE QUESTIONS?
              </span>

              <h2>We're Here to Help</h2>

              <p>
                Couldn't find the answer you were looking for?
                Contact the AZANIA GALLERY team and we'll be happy
                to assist you.
              </p>

              <a
                href="/contact"
                className="faqs-contact-button"
              >
                Contact Us
              </a>

            </div>

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

        .faqs-page {
          width: 100%;
          background: #ffffff;
          color: #0D1B2A;
          font-family: inherit;
        }


        /* ===================================================
           HERO
        =================================================== */

        .faqs-hero {
          width: 100%;
          min-height: 350px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 70px 24px;

          position: relative;
          overflow: hidden;

          text-align: center;

          background:
            linear-gradient(
              135deg,
              #0D1B2A 0%,
              #14283c 55%,
              #0D1B2A 100%
            );
        }


        .faqs-hero::before {
          content: "";

          position: absolute;

          width: 440px;
          height: 440px;

          border-radius: 50%;

          background: rgba(176, 141, 87, 0.08);

          top: -230px;
          left: -120px;
        }


        .faqs-hero::after {
          content: "";

          position: absolute;

          width: 370px;
          height: 370px;

          border-radius: 50%;

          background: rgba(176, 141, 87, 0.06);

          bottom: -230px;
          right: -110px;
        }


        .faqs-hero-content {
          position: relative;
          z-index: 2;

          max-width: 850px;
        }


        .faqs-eyebrow {
          display: inline-block;

          margin-bottom: 15px;

          color: #B08D57;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 4px;
        }


        .faqs-hero h1 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(36px, 5vw, 60px);

          font-weight: 600;

          line-height: 1.1;

          letter-spacing: -1px;
        }


        .faqs-hero p {
          max-width: 680px;

          margin: 18px auto 0;

          color: rgba(255, 255, 255, 0.78);

          font-size: 16px;

          line-height: 1.7;
        }


        /* ===================================================
           CONTENT
        =================================================== */

        .faqs-content {
          width: 100%;

          padding: 75px 24px 90px;

          background: #ffffff;
        }


        .faqs-container {
          width: 100%;
          max-width: 1000px;

          margin: 0 auto;
        }


        /* ===================================================
           INTRO
        =================================================== */

        .faqs-intro {
          max-width: 720px;

          margin: 0 auto 55px;

          text-align: center;
        }


        .faqs-intro-label {
          display: inline-block;

          margin-bottom: 10px;

          color: #B08D57;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;
        }


        .faqs-intro h2 {
          margin: 0 0 18px;

          color: #0D1B2A;

          font-size: 32px;

          font-weight: 600;

          line-height: 1.25;
        }


        .faqs-intro h2::after {
          content: "";

          display: block;

          width: 55px;
          height: 2px;

          margin: 15px auto 0;

          background: #B08D57;
        }


        .faqs-intro p {
          margin: 0;

          color: #626b74;

          font-size: 16px;

          line-height: 1.8;
        }


        /* ===================================================
           CATEGORY
        =================================================== */

        .faq-category {
          margin-bottom: 50px;
        }


        .faq-category:last-child {
          margin-bottom: 0;
        }


        .faq-category-heading {
          display: flex;

          align-items: center;

          gap: 14px;

          margin-bottom: 18px;

          padding-bottom: 14px;

          border-bottom: 1px solid #e8e8e8;
        }


        .faq-category-number {
          color: #B08D57;

          font-size: 12px;

          font-weight: 700;

          letter-spacing: 1px;
        }


        .faq-category-heading h2 {
          margin: 0;

          color: #0D1B2A;

          font-size: 23px;

          font-weight: 600;
        }


        /* ===================================================
           FAQ ITEM
        =================================================== */

        .faq-list {
          width: 100%;
        }


        .faq-item {
          margin-bottom: 10px;

          overflow: hidden;

          background: #faf9f6;

          border: 1px solid #e7e2d9;

          border-radius: 8px;

          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }


        .faq-item:hover {
          border-color: rgba(176, 141, 87, 0.55);
        }


        .faq-item-open {
          border-color: rgba(176, 141, 87, 0.65);

          box-shadow:
            0 8px 25px rgba(13, 27, 42, 0.06);
        }


        /* ===================================================
           QUESTION
        =================================================== */

        .faq-question {
          width: 100%;

          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 20px;

          padding: 20px 22px;

          border: none;

          background: transparent;

          color: #0D1B2A;

          font-family: inherit;

          font-size: 15px;

          font-weight: 600;

          line-height: 1.5;

          text-align: left;

          cursor: pointer;
        }


        .faq-question:hover {
          color: #8d6e3f;
        }


        .faq-icon {
          flex: 0 0 28px;

          width: 28px;
          height: 28px;

          display: flex;
          align-items: center;
          justify-content: center;

          border: 1px solid #d8cfbf;

          border-radius: 50%;

          color: #B08D57;

          font-size: 19px;

          font-weight: 400;

          line-height: 1;

          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }


        .faq-item-open .faq-icon {
          background: #0D1B2A;

          border-color: #0D1B2A;

          color: #B08D57;
        }


        /* ===================================================
           ANSWER
        =================================================== */

        .faq-answer {
          display: grid;

          grid-template-rows: 0fr;

          transition:
            grid-template-rows 0.3s ease;
        }


        .faq-answer-open {
          grid-template-rows: 1fr;
        }


        .faq-answer-inner {
          min-height: 0;

          overflow: hidden;
        }


        .faq-answer-inner p {
          margin: 0;

          padding: 0 22px 21px;

          color: #68717b;

          font-size: 14px;

          line-height: 1.8;
        }


        /* ===================================================
           CONTACT BOX
        =================================================== */

        .faqs-contact-box {
          margin-top: 65px;

          padding: 50px 35px;

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


        .faqs-contact-label {
          display: inline-block;

          margin-bottom: 12px;

          color: #B08D57;

          font-size: 11px;

          font-weight: 700;

          letter-spacing: 3px;
        }


        .faqs-contact-box h2 {
          margin: 0 0 12px;

          color: #ffffff;

          font-size: 30px;

          font-weight: 600;
        }


        .faqs-contact-box p {
          max-width: 650px;

          margin: 0 auto 26px;

          color: rgba(255, 255, 255, 0.72);

          font-size: 15px;

          line-height: 1.7;
        }


        .faqs-contact-button {
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


        .faqs-contact-button:hover {
          background: #ffffff;

          border-color: #ffffff;

          color: #0D1B2A;

          transform: translateY(-2px);
        }


        /* ===================================================
           TABLET
        =================================================== */

        @media (max-width: 700px) {

          .faq-category {
            margin-bottom: 40px;
          }

        }


        /* ===================================================
           MOBILE
        =================================================== */

        @media (max-width: 600px) {

          .faqs-hero {
            min-height: 300px;

            padding: 55px 20px;
          }


          .faqs-eyebrow {
            font-size: 10px;

            letter-spacing: 3px;
          }


          .faqs-hero h1 {
            font-size: 36px;

            letter-spacing: -0.5px;
          }


          .faqs-hero p {
            margin-top: 14px;

            font-size: 14px;

            line-height: 1.65;
          }


          .faqs-content {
            padding: 55px 18px 65px;
          }


          .faqs-intro {
            margin-bottom: 40px;
          }


          .faqs-intro h2 {
            font-size: 27px;
          }


          .faqs-intro p {
            font-size: 14px;

            line-height: 1.75;
          }


          .faq-category {
            margin-bottom: 38px;
          }


          .faq-category-heading {
            gap: 11px;

            margin-bottom: 14px;
          }


          .faq-category-heading h2 {
            font-size: 20px;
          }


          .faq-category-number {
            font-size: 11px;
          }


          .faq-item {
            margin-bottom: 8px;

            border-radius: 7px;
          }


          .faq-question {
            gap: 13px;

            padding: 17px 15px;

            font-size: 14px;

            line-height: 1.5;
          }


          .faq-icon {
            flex: 0 0 25px;

            width: 25px;
            height: 25px;

            font-size: 17px;
          }


          .faq-answer-inner p {
            padding: 0 15px 18px;

            font-size: 13px;

            line-height: 1.75;
          }


          .faqs-contact-box {
            margin-top: 45px;

            padding: 35px 20px;

            border-radius: 13px;
          }


          .faqs-contact-box h2 {
            font-size: 25px;
          }


          .faqs-contact-box p {
            font-size: 14px;
          }

        }

      `}</style>

    </main>
  );
}

export default FAQs;
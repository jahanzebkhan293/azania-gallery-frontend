import API_BASE_URL from "../services/api";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    if (feedback.message) {
      setFeedback({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setFeedback({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(
        `${API_BASE_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send your message."
        );
      }

      setFeedback({
        type: "success",
        message:
          "Thank you for contacting AZANIA GALLERY! Your message has been sent successfully.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);

      setFeedback({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* CONTACT HERO */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <p className="contact-eyebrow">
            GET IN TOUCH
          </p>

          <h1>
            We'd Love to
            <br />
            Hear From You
          </h1>

          <p>
            Have a question about our collections,
            your order, or anything else?
            We're here to help.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="contact-content">
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-eyebrow">
              CONTACT AZANIA GALLERY
            </p>

            <h2>
              Let's Start a Conversation
            </h2>

            <p className="contact-description">
              Whether you need assistance with a product,
              have a question about an order, or simply
              want to learn more about AZANIA GALLERY,
              feel free to reach out.
            </p>

            <div className="contact-details">
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  ✉
                </span>

                <div>
                  <span>Email</span>
                  <strong>
                    support@azaniagallery.com
                  </strong>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail-icon">
                  ◉
                </span>

                <div>
                  <span>Location</span>
                  <strong>United States</strong>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail-icon">
                  ⏰
                </span>

                <div>
                  <span>Support Hours</span>

                  <strong>
                    Monday – Friday
                    <br />
                    9:00 AM – 5:00 PM
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* FUNCTIONAL CONTACT FORM */}
          <div className="contact-form-wrapper">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">
                    Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    maxLength={100}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">
                    Email
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={254}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows="7"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={5000}
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* SUCCESS / ERROR FEEDBACK */}
              {feedback.message && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    padding: "12px 14px",
                    marginBottom: "16px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    lineHeight: 1.6,
                    color:
                      feedback.type === "success"
                        ? "#176b3a"
                        : "#a12626",
                    background:
                      feedback.type === "success"
                        ? "#edf8f0"
                        : "#fff0f0",
                    border:
                      feedback.type === "success"
                        ? "1px solid #b8e2c4"
                        : "1px solid #f0c2c2",
                  }}
                >
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                style={{
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {isSubmitting
                  ? "Sending Message..."
                  : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="contact-closing">
        <p className="contact-eyebrow">
          AZANIA GALLERY
        </p>

        <h2>
          Your Questions,
          <br />
          Our Support
        </h2>

        <p>
          We're always happy to assist you.
        </p>
      </section>
    </main>
  );
}

export default Contact;
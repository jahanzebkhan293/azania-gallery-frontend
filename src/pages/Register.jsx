import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API_BASE_URL from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  /* =====================================================
     HANDLE INPUT CHANGE
  ===================================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
      submit: "",
    }));
  };

  /* =====================================================
     VALIDATE FORM
  ===================================================== */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName =
        "Full name is required.";
    } else if (
      formData.fullName.trim().length < 3
    ) {
      newErrors.fullName =
        "Full name must be at least 3 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (
      formData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    return newErrors;
  };

  /* =====================================================
     REGISTER USER
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});

      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.fullName.trim(),
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Registration failed."
        );
      }

      /* ===============================================
         UPDATE AUTH CONTEXT
      =============================================== */

      login({
        token: data.token,
        user: data.user,
        rememberMe: true,
      });

      /* ===============================================
         REDIRECT
      =============================================== */

      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Registration failed. Please try again.",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <section className="auth-container">

        {/* =================================================
            LEFT BRAND PANEL
        ================================================= */}

        <div className="auth-brand-panel">

          <div className="auth-brand-content">

            <p className="auth-brand-eyebrow">
              AZANIA GALLERY
            </p>

            <h1>
              Create
              <br />
              Your Account.
            </h1>

            <span className="auth-brand-line"></span>

            <p>
              Join AZANIA GALLERY and enjoy a more
              personalized and effortless shopping
              experience.
            </p>

          </div>

        </div>


        {/* =================================================
            RIGHT FORM PANEL
        ================================================= */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">

            {/* HEADING */}

            <div className="auth-heading">

              <p>
                ACCOUNT REGISTRATION
              </p>

              <h2>
                Create Account
              </h2>

              <span>
                Enter your details to create your account.
              </span>

            </div>


            {/* =================================================
                REGISTER FORM
            ================================================= */}

            <form
              className="auth-form"
              onSubmit={handleSubmit}
              noValidate
            >

              {/* FULL NAME */}

              <div className="auth-field">

                <label htmlFor="register-full-name">
                  Full Name
                </label>

                <input
                  id="register-full-name"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                />

                {errors.fullName && (
                  <span className="auth-form-error">
                    {errors.fullName}
                  </span>
                )}

              </div>


              {/* EMAIL */}

              <div className="auth-field">

                <label htmlFor="register-email">
                  Email Address
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                {errors.email && (
                  <span className="auth-form-error">
                    {errors.email}
                  </span>
                )}

              </div>


              {/* PASSWORD */}

              <div className="auth-field">

                <label htmlFor="register-password">
                  Password
                </label>

                <div className="auth-password-wrapper">

                  <input
                    id="register-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {errors.password && (
                  <span className="auth-form-error">
                    {errors.password}
                  </span>
                )}

              </div>


              {/* CONFIRM PASSWORD */}

              <div className="auth-field">

                <label htmlFor="register-confirm-password">
                  Confirm Password
                </label>

                <div className="auth-password-wrapper">

                  <input
                    id="register-confirm-password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={
                      formData.confirmPassword
                    }
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) =>
                          !previous
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <span className="auth-form-error">
                    {errors.confirmPassword}
                  </span>
                )}

              </div>


              {/* REGISTER ERROR */}

              {errors.submit && (
                <span className="auth-form-error">
                  {errors.submit}
                </span>
              )}


              {/* SUBMIT */}

              <button
                type="submit"
                className="auth-submit"
                disabled={isLoading}
              >

                <span>
                  {isLoading
                    ? "Creating Account..."
                    : "Create Account"}
                </span>

                <span>
                  →
                </span>

              </button>

            </form>


            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <div className="auth-register">

              <span>
                Already have an account?
              </span>

              <Link to="/login">
                Sign In
              </Link>

            </div>


            {/* =================================================
                BACK HOME
            ================================================= */}

            <Link
              to="/"
              className="auth-back-home"
            >
              ← Back to AZANIA GALLERY
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Register;
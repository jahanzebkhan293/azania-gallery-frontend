import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import API_BASE_URL from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");

  /* =====================================================
     HANDLE LOGIN
  ===================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError(
        "Email and password are required."
      );

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Login failed. Please try again."
        );
      }

      /* ===============================================
         UPDATE AUTH CONTEXT
      =============================================== */

      login({
        token: data.token,
        user: data.user,
        rememberMe,
      });

      /* ===============================================
         REDIRECT
      =============================================== */

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (loginError) {
      console.error(
        "Login error:",
        loginError
      );

      setError(
        loginError.message ||
          "Login failed. Please try again."
      );

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="auth-page">

      <section className="auth-container">

        {/* LEFT BRAND PANEL */}

        <div className="auth-brand-panel">

          <div className="auth-brand-content">

            <p className="auth-brand-eyebrow">
              AZANIA GALLERY
            </p>

            <h1>
              Welcome
              <br />
              Back.
            </h1>

            <span className="auth-brand-line"></span>

            <p>
              Sign in to access your account,
              manage your orders, and keep your
              favorite jewelry close.
            </p>

          </div>

        </div>


        {/* RIGHT FORM PANEL */}

        <div className="auth-form-panel">

          <div className="auth-form-wrapper">

            <div className="auth-heading">

              <p>
                ACCOUNT LOGIN
              </p>

              <h2>
                Sign In
              </h2>

              <span>
                Enter your details to continue.
              </span>

            </div>


            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              {/* EMAIL */}

              <div className="auth-field">

                <label htmlFor="login-email">
                  Email Address
                </label>

                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />

              </div>


              {/* PASSWORD */}

              <div className="auth-field">

                <div className="auth-label-row">

                  <label htmlFor="login-password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="auth-forgot"
                  >
                    Forgot Password?
                  </button>

                </div>


                <div className="auth-password-wrapper">

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(
                        event.target.value
                      );

                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
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

              </div>


              {/* LOGIN ERROR */}

              {error && (
                <span className="auth-form-error">
                  {error}
                </span>
              )}


              {/* REMEMBER */}

              <label className="auth-remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(
                      event.target.checked
                    )
                  }
                />

                <span>
                  Remember me
                </span>

              </label>


              {/* SUBMIT */}

              <button
                type="submit"
                className="auth-submit"
                disabled={isLoading}
              >
                <span>
                  {isLoading
                    ? "Signing In..."
                    : "Sign In"}
                </span>

                <span>
                  →
                </span>

              </button>

            </form>


            {/* REGISTER */}

            <div className="auth-register">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">
                Create Account
              </Link>

            </div>


            {/* BACK */}

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

export default Login;
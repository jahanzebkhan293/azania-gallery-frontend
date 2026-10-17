import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const {
    isAuthenticated,
    loading,
  } = useAuth();

  /* =====================================================
     CHECK AUTHENTICATION
  ===================================================== */

  if (loading) {
    return (
      <div className="auth-loading">
        Checking authentication...
      </div>
    );
  }

  /* =====================================================
     REDIRECT IF NOT AUTHENTICATED
  ===================================================== */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  /* =====================================================
     ALLOW AUTHENTICATED USER
  ===================================================== */

  return children;
}

export default ProtectedRoute;
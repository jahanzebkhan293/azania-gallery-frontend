import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function AdminRoute({ children }) {
  const {
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  /* =====================================================
     AUTHENTICATION LOADING
  ===================================================== */

  if (loading) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          color: "#0D1B2A",
        }}
      >
        Checking authorization...
      </div>
    );
  }

  /* =====================================================
     USER NOT LOGGED IN
  ===================================================== */

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  /* =====================================================
     ADMIN ONLY
  ===================================================== */

  if (user.role !== "admin") {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  /* =====================================================
     ADMIN AUTHORIZED
  ===================================================== */

  return children;
}

export default AdminRoute;
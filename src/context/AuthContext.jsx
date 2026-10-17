import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

/* =====================================================
   GET SAVED AUTH DATA
===================================================== */

const getSavedUser = () => {
  try {
    const localUser =
      localStorage.getItem("azania-user");

    if (localUser) {
      return JSON.parse(localUser);
    }

    const sessionUser =
      sessionStorage.getItem("azania-user");

    if (sessionUser) {
      return JSON.parse(sessionUser);
    }

    return null;
  } catch (error) {
    console.error(
      "Error loading saved user:",
      error
    );

    return null;
  }
};

/* =====================================================
   GET SAVED TOKEN
===================================================== */

const getSavedToken = () => {
  return (
    localStorage.getItem("azania-token") ||
    sessionStorage.getItem("azania-token") ||
    null
  );
};

/* =====================================================
   AUTH PROVIDER
===================================================== */

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    getSavedUser
  );

  const [token, setToken] = useState(
    getSavedToken
  );

  const [isAuthenticated, setIsAuthenticated] =
    useState(() => Boolean(getSavedToken()));

  const [loading, setLoading] =
    useState(true);

  /* =====================================================
     CHECK SAVED LOGIN
  ===================================================== */

  useEffect(() => {
    const savedUser = getSavedUser();
    const savedToken = getSavedToken();

    setUser(savedUser);
    setToken(savedToken);
    setIsAuthenticated(
      Boolean(savedUser && savedToken)
    );

    setLoading(false);
  }, []);

  /* =====================================================
     LOGIN
  ===================================================== */

  const login = (loginData) => {
    const {
      token: newToken,
      user: newUser,
      rememberMe = false,
    } = loginData;

    if (!newToken || !newUser) {
      throw new Error(
        "Invalid login data."
      );
    }

    /* ===============================================
       CLEAR OLD AUTH DATA
    =============================================== */

    localStorage.removeItem(
      "azania-token"
    );

    localStorage.removeItem(
      "azania-user"
    );

    sessionStorage.removeItem(
      "azania-token"
    );

    sessionStorage.removeItem(
      "azania-user"
    );

    /* ===============================================
       SELECT STORAGE
    =============================================== */

    const storage = rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "azania-token",
      newToken
    );

    storage.setItem(
      "azania-user",
      JSON.stringify(newUser)
    );

    /* ===============================================
       UPDATE STATE
    =============================================== */

    setToken(newToken);
    setUser(newUser);
    setIsAuthenticated(true);
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const logout = () => {
    localStorage.removeItem(
      "azania-token"
    );

    localStorage.removeItem(
      "azania-user"
    );

    sessionStorage.removeItem(
      "azania-token"
    );

    sessionStorage.removeItem(
      "azania-user"
    );

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  /* =====================================================
     UPDATE USER
  ===================================================== */

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    if (
      localStorage.getItem("azania-user")
    ) {
      localStorage.setItem(
        "azania-user",
        JSON.stringify(updatedUser)
      );
    }

    if (
      sessionStorage.getItem("azania-user")
    ) {
      sessionStorage.setItem(
        "azania-user",
        JSON.stringify(updatedUser)
      );
    }
  };

  /* =====================================================
     CONTEXT
  ===================================================== */

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =====================================================
   USE AUTH HOOK
===================================================== */

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthProvider;
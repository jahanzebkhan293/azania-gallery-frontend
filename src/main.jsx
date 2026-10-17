import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import AuthProvider from "./context/AuthContext.jsx";
import CartProvider from "./context/CartContext.jsx";
import WishlistProvider from "./context/WishlistContext.jsx";
import ProductProvider from "./context/ProductContext.jsx";
import ReviewProvider from "./context/ReviewContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <ReviewProvider>
                <App />
              </ReviewProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
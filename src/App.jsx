import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import JewelryCategory from "./pages/JewelryCategory";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/* =====================================================
   POLICY & INFORMATION PAGES
===================================================== */

import ShippingPolicy from "./pages/ShippingPolicy";
import ReturnRefundPolicy from "./pages/ReturnRefundPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQs from "./pages/FAQs";


/* =====================================================
   LAYOUT COMPONENTS
===================================================== */

import AnnouncementBar from "./components/layout/AnnouncementBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/layout/WhatsAppButton";


/* =====================================================
   AUTH ROUTES
===================================================== */

import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";


function App() {

  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";


  return (
    <>

      {/* =====================================================
          HEADER
      ===================================================== */}

      {!isAuthPage && (
        <AnnouncementBar />
      )}

      {!isAuthPage && (
        <Navbar />
      )}


      {/* =====================================================
          ROUTES
      ===================================================== */}

      <Routes>

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =================================================
            ALL JEWELRY
        ================================================= */}

        <Route
          path="/shop"
          element={<Shop />}
        />


        {/* =================================================
            JEWELRY SUBCATEGORY PAGES
        ================================================= */}

        <Route
          path="/jewelry/:subcategory"
          element={<JewelryCategory />}
        />


        {/* =================================================
            PRODUCT DETAILS
        ================================================= */}

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />


        {/* =================================================
            CART
        ================================================= */}

        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* =================================================
            CHECKOUT
        ================================================= */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />


        {/* =================================================
            WISHLIST
        ================================================= */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />


        {/* =================================================
            AUTH
        ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            PROTECTED CUSTOMER DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN PANEL
        ================================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


        {/* =================================================
            OTHER PAGES
        ================================================= */}

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />


        {/* =================================================
            SHIPPING POLICY
        ================================================= */}

        <Route
          path="/shipping-policy"
          element={<ShippingPolicy />}
        />


        {/* =================================================
            RETURN & REFUND POLICY
        ================================================= */}

        <Route
          path="/return-and-refund-policy"
          element={<ReturnRefundPolicy />}
        />


        {/* =================================================
            PRIVACY POLICY
        ================================================= */}

        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />


        {/* =================================================
            TERMS OF SERVICE
        ================================================= */}

        <Route
          path="/terms-of-service"
          element={<TermsOfService />}
        />


        {/* =================================================
            FAQs
        ================================================= */}

        <Route
          path="/faqs"
          element={<FAQs />}
        />


        {/* =================================================
            404
        ================================================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      {!isAuthPage && (
        <Footer />
      )}


      {/* =====================================================
          WHATSAPP FLOATING BUTTON
      ===================================================== */}

      {!isAuthPage && (
        <WhatsAppButton />
      )}

    </>
  );
}


export default App;
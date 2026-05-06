import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

/* ===== SITE PUBLIC ===== */
import Contacts from "./admin/pages/Contacts";
import NetworkBackground from "./components/Background/NetworkBackground";
import Navbar from "./components/Navbar/Navbar";
import Services from "./components/Services/Services";
import Welcome from "./components/Welcome/Welcome";
import CustomCursor from "./components/Cursor/CustomCursor";
import DroneService from "./pages/DroneService";
import ContactSection from "./components/ContactSection/ContactSection";
import Footer from "./components/Footer/Footer";
import Values from "./components/Values/Values";
import HeroVideo from "./components/HeroVideo/HeroVideo";
import LaunchSection from "./components/LaunchSection/LaunchSection";

/* ===== ADMIN ===== */
import { AuthProvider } from "./admin/auth/authContext";
import AdminPrivateRoute from "./admin/routes/AdminPrivateRoute";
import AdminLayout from "./admin/layout/AdminLayout";
import AdminLogin from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/Dashboard";
import Newsletter from "./admin/pages/Newsletter";

/* ================= UTILITAIRES ================= */

function ForceHomeOnReload() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      window.location.pathname !== "/" &&
      !window.location.pathname.startsWith("/admin")
    ) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return null;
}

function ScrollToHeroOnLoad() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hero = document.getElementById("hero");
    if (hero) hero.scrollIntoView({ behavior: "auto" });
    else window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

/* ================= APP ================= */

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>

        <ForceHomeOnReload />
        <ScrollToHeroOnLoad />

        {/* 🌍 SITE PUBLIC */}
        {!window.location.pathname.startsWith("/admin") && (
          <>
            <CustomCursor />
            <NetworkBackground />
            <Navbar />
          </>
        )}

        <Routes>

          {/* ===== HOME ===== */}
          <Route
            path="/"
            element={
              <>
                <div id="hero">
                  <HeroVideo start={true} />
                </div>
                <Welcome appReady={true} />
                <Values />
                <LaunchSection />
                <Services />
                <ContactSection />
                <Footer />
              </>
            }
          />

          <Route path="/services/drone" element={<DroneService />} />

          {/* ===== ADMIN ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminPrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/contacts" element={<Contacts />} />
              <Route path="/admin/newsletter" element={<Newsletter />} />
            </Route>
          </Route>

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
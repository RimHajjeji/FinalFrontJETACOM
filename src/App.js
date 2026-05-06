import React, { useEffect, useState } from "react";
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
import Offers from "./components/Offers/Offers";
import Loader from "./components/Loader/Loader";
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

/* 🎥 Scroll forcé sur la Hero Video */
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
  const [done, setDone] = useState(false);

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

        {/* 🔒 UTILITAIRES (hors admin) */}
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

          {/* ===== SITE PUBLIC ===== */}
          <Route
            path="/"
            element={
              <>
                <div id="hero">
                  <HeroVideo start={done} />
                </div>
                <Welcome appReady={done} />
                <Values />
                <LaunchSection />
                <Services />
                <Offers />
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
    <Route path="/admin/newsletter" element={<Newsletter/>} />
  </Route>
</Route>


        </Routes>

        {/* ⏳ Loader seulement pour le site public */}
        {!done && !window.location.pathname.startsWith("/admin") && (
          <Loader onFinish={() => setDone(true)} />
        )}

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

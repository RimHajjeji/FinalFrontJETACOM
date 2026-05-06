import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="navbar">
      {/* LEFT : LOGO */}
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src="/assets/Jetacomlogo2.png" alt="Logo" />
        </div>
      </div>

      {/* HAMBURGER */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MENU MOBILE */}
      <ul className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        {/* 🔗 LIGNES RÉSEAU (COMMUNICATION) */}
        <span className="network"></span>

        <li onClick={() => goToSection("welcome")}>Accueil</li>
        <li onClick={() => goToSection("services")}>Nos services</li>
        <li onClick={() => goToSection("offres")}>Nos promotions</li>
        <li onClick={() => goToSection("contact")}>Contact</li>
      </ul>
    </nav>
  );
}

import React, { useEffect, useRef, useState, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { TbLocationPin } from "react-icons/tb";
import "./Footer.css";
import { AiFillTikTok, AiOutlineMail } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io5";

/* ===== LOGO 3D ===== */
function LogoModel() {
  const { scene } = useGLTF("/assets/logo vertteste.glb");
  return (
    <Center>
      <primitive
        object={scene}
        scale={0.15}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.12, 0]}
      />
    </Center>
  );
}

const Footer = () => {
  const footerRef = useRef(null);
  const signatureRef = useRef(null);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

const [newsletterEmail, setNewsletterEmail] = useState("");
const [newsletterMsg, setNewsletterMsg] = useState("");
const [newsletterLoading, setNewsletterLoading] = useState(false);

const handleNewsletterSubmit = async () => {
  if (!newsletterEmail) return;

  setNewsletterLoading(true);
  setNewsletterMsg("");

  try {
    const response = await fetch(
  `${process.env.REACT_APP_API_URL}/api/newsletter`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: newsletterEmail }),
  }
);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur");
    }

    setNewsletterMsg("✅ Merci pour votre inscription !");
    setNewsletterEmail("");
  } catch (error) {
    setNewsletterMsg(error.message || "❌ Erreur serveur");
  } finally {
    setNewsletterLoading(false);
  }
};

  /* ===== Observer pour fade-in footer ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== Animation signature ===== */
 /* ===== Animation signature (relance au scroll) ===== */
useEffect(() => {
  const text = signatureRef.current;
  if (!text) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        let length = 0;
        try {
          length = text.getTotalLength();
        } catch {
          length = text.getComputedTextLength();
        }

        // reset animation
        text.style.animation = "none";
        text.style.strokeDasharray = length;
        text.style.strokeDashoffset = length;

        // force reflow (important)
        void text.getBoundingClientRect();

        // animation lente cinématique
        text.style.animation = "drawSignature 6.5s ease forwards";
      }
    },
    { threshold: 0.4 }
  );

  observer.observe(text);
  return () => observer.disconnect();
}, []);


  const goToSection = (id) => {
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
    <footer ref={footerRef} className={`footer ${show ? "show" : ""}`}>
      <div className="footer-top">
        {/* ABOUT / LOGO + SLOGAN */}
        <div className="footer-col">
          <div className="logoFooter-3d-wrapper">
            <Canvas
              camera={{ position: [0, 0.8, 3], fov: 40 }}
              gl={{ alpha: true }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={1.4} />
              <directionalLight position={[3, 4, 5]} intensity={1.6} />
              <Suspense fallback={null}>
                <LogoModel />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1.6}
              />
            </Canvas>
          </div>

          {/* ===== SLOGAN SIGNATURE RÉELLE ===== */}
<div className="footer-signature-wrapper">
  <svg
    viewBox="0 0 600 80"
    className="footer-signature-svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      {/* Reveal progressif cinématique */}
      <clipPath id="signatureReveal">
        <rect x="0" y="0" width="0" height="100%">
          <animate
            attributeName="width"
            from="0"
            to="600"
            dur="8s"
            fill="freeze"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
          />
        </rect>
      </clipPath>
    </defs>

    <text
      ref={signatureRef}
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      clipPath="url(#signatureReveal)"
      className="footer-signature burn"
    >
      Une signature d’exception
    </text>
  </svg>
</div>

        </div>

    <div className="footer-col">
  <h4>Coordonnées</h4>
  <span className="underline"></span>

  <div className="contact-item">
    <FaLocationDot />
    <p>8357 Libreville, Avorbam en
    face ISTA</p>
  </div>



  <div className="contact-item">
    <MdEmail />
    <p className="email">contact@jetacomm.com</p>
  </div>

  <div className="contact-item">
    <FaPhoneAlt />
    <p className="phone">+241 062 59 78 77</p>
  </div>
</div>

        {/* LIENS */}
        <div className="footer-col">
          <h4>Liens</h4>
          <span className="underline"></span>
          <ul className="footer-links">
            <li onClick={() => goToSection("welcome")}>Accueil</li>
            <li onClick={() => goToSection("services")}>Nos services</li>
            <li onClick={() => goToSection("offres")}>Nos promotions</li>
            <li onClick={() => goToSection("contact")}>Contactez-nous</li>
          </ul>
        </div>

        {/* NEWSLETTER / SOCIALS */}
       <div className="footer-col">
  <h4>Notre localisation</h4>
  <span className="underline"></span>

  <div className="map-container">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.660424018257!2d9.37939687581917!3d0.5097397636983453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f25e58f6a456f%3A0xd384c2de6ac9c0f0!2sISTA%20CEMAC%20GABON!5e0!3m2!1sfr!2sga!4v1770200415349!5m2!1sfr!2sga"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      title="Localisation Jeta Com"
    ></iframe>
  </div>

  {/* ON GARDE LES RÉSEAUX SOCIAUX */}
  <div className="socials">
    <a
      href="https://www.facebook.com/people/Jeta-Com/61586065208274/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook Jeta Com"
    >
      <FaFacebook />
    </a>

    <a
      href="https://ga.linkedin.com/company/jetacomagence"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn Jeta Com"
    >
      <IoLogoLinkedin />
    </a>

    <a
      href="https://wa.me/24162597877"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Jeta Com"
    >
      <IoLogoWhatsapp />
    </a>

    <a
      href="https://www.tiktok.com/@jetacom1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok Jeta Com"
    >
      <AiFillTikTok />
    </a>
  </div>
</div>
      </div>

      <div className="footer-bottom">
        Jetacom © 2026 — Tous droits réservés
      </div>
    </footer>
  );
};

export default Footer;

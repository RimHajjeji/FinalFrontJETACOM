import React, { Suspense, useRef, useState, useEffect } from "react";
import "./ContactSection.css";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin, IoLogoWhatsapp } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";

/* ================= TEXTES ================= */
const title = "JETACOM";
const subtitle = "Une question ? Un projet en tête ? Écrivez-nous ou appelez-nous, nous vous répondrons dans les plus brefs délais 📧 contact@jetacomm.com 📞 +241 062 59 78 77. Retrouvez-nous également sur nos réseaux sociaux.";

/* ================= LOGO 3D ================= */
function Logo3D() {
  const { scene } = useGLTF("/assets/logo vertteste.glb");
  const modelRef = useRef();
  const clonedScene = scene.clone(true);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.z = -t * 0.4;
      modelRef.current.position.x = Math.sin(t * 0.5) * 0.03;
    }
  });

  return (
    <Center>
      <primitive
        ref={modelRef}
        object={clonedScene}
        scale={0.11}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      />
    </Center>
  );
}

/* ================= SECTION CONTACT ================= */
const ContactSection = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  /* ======== DISPARITION AUTO DU MESSAGE APRÈS 5s ======== */
  useEffect(() => {
    if (!status) return;

    const timer = setTimeout(() => {
      setStatus(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [status]);
  /* ====================================================== */

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      setStatus("❌ Vous devez accepter les conditions.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          email: formData.email,
          objet: formData.objet,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("✅ Message envoyé avec succès !");
        setFormData({
          nom: "",
          email: "",
          objet: "",
          message: "",
          terms: false,
        });
      } else {
        setStatus(data.message || "❌ Erreur lors de l’envoi");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* ================= FORMULAIRE ================= */}
        <motion.div
          className="contact-form-container"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>NOM</label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>OBJET</label>
              <input
                type="text"
                name="objet"
                value={formData.objet}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>MESSAGE</label>
              <textarea
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                J'ACCEPTE LES <span>TERMES ET CONDITIONS</span> AINSI{" "}
                <span>QUE LA POLITIQUE DE CONFIDENTIALITÉ</span>.
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "ENVOI..." : "ENVOYER LE MESSAGE"}
            </button>

            {status && <p className="form-status">{status}</p>}
          </form>
        </motion.div>

        {/* ================= PARTIE VISUELLE ================= */}
        <motion.div
          className="contact-visual-container"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="logo-3d-wrapper">

            <div className="logo-3d" style={{ width: "300px", height: "300px" }}>
              <Canvas
                camera={{ position: [0, 1, 2.5], fov: 40 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: "transparent", width: "100%", height: "100%" }}
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[3, 4, 5]} intensity={1.5} />
                <Suspense fallback={<mesh>
                  <boxGeometry />
                  <meshStandardMaterial color="gray" />
                </mesh>}>
                  <Logo3D />
                </Suspense>
              </Canvas>
            </div>

            <h2 className="jetacom-title">
              {title.split("").map((letter, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                  {letter}
                </span>
              ))}
            </h2>

            <p className="jetacom-subtitle">
              {subtitle.split(" ").map((word, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.06}s` }}>
                  {word}&nbsp;
                </span>
              ))}
            </p>

            <div className="social-links">
              <a href="https://www.facebook.com/people/Jeta-Com/61586065208274/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://ga.linkedin.com/company/jetacomagence" target="_blank" rel="noopener noreferrer">
                <IoLogoLinkedin />
              </a>
              <a href="https://wa.me/24162597877" target="_blank" rel="noopener noreferrer">
                <IoLogoWhatsapp />
              </a>
              <a href="https://www.tiktok.com/@jetacom1?_r=1&_t=ZM-930PHG4xXtw" target="_blank" rel="noopener noreferrer">
                <AiFillTikTok />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;

/* ================= PRELOAD ================= */
useGLTF.preload("/assets/logo vertteste.glb");

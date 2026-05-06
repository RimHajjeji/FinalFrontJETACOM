import React, { useEffect, useRef } from "react";
import "./Welcome.css";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

// Images du dossier public/assets
const carouselImages = [
  { src: "/assets/1jetacom.jpeg", alt: "Bureau moderne" },
  { src: "/assets/2jetacom.jpeg", alt: "Réunion d'équipe" },
  { src: "/assets/3jetacom.jpeg", alt: "Design graphique" },
  { src: "/assets/4jetacom.jpeg", alt: "Studio photo" },
  { src: "/assets/5jetacom.jpeg", alt: "Studio photo" },
  { src: "/assets/6jetacom.jpeg", alt: "Studio photo" },
];

export default function Welcome() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // sectionRef.current.classList.add("visible");
          } else {
            // sectionRef.current.classList.remove("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="welcome-section" id="welcome">
      <div className="welcome-grid">
        <div className="welcome-content">
          <h2
            className="section-title"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            QUI SOMMES-NOUS ?
            <span className="underline" />
          </h2>

          <p
            className="welcome-text"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <strong>Jeta Com</strong>, filiale de la holding{" "}
            <span>JETA GROUPE</span>, est une agence de communication établie à{" "}
            <span>Libreville, au Gabon</span>.
          </p>

          <p
            className="welcome-text"
            data-aos="fade-right"
            data-aos-delay="600"
          >
            Plus que des services, nous vous ouvrons la voie à une
            <span> communication d’exception</span>, alliant créativité,
            authenticité et intemporalité.
          </p>

          <p
            className="welcome-text"
            data-aos="fade-right"
            data-aos-delay="800"
          >
            Nous vous accompagnons dans la création, le déploiement et la
            gestion d’une communication
            <span> mémorable</span>.
          </p>

          <a
            href="#contact"
            className="welcome-button"
            data-aos="fade-right"
            data-aos-delay="1000"
          >
            CONTACTEZ-NOUS
          </a>
        </div>

        <ImageCarousel images={carouselImages} aosDelay={0} />
      </div>
    </section>
  );
}

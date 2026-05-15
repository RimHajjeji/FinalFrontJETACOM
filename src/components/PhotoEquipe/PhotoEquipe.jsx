import React, { useEffect, useState } from "react";
import "./PhotoEquipe.css";

const teamPhotos = [
  {
    image: "/assets/Responsable Marketing.jpg",
    title: "Responsable Marketing",
    description:
      "Stratégies marketing modernes pour développer votre visibilité."
  },
  {
    image: "/assets/Responsable Digital.jpg",
    title: "Responsable Digital",
    description:
      "Gestion des réseaux sociaux et communication digitale."
  },
  {
    image: "/assets/equipe developpement mobile et web.jpg",
    title: "Développement Web & Mobile",
    description:
      "Création de sites web et applications performantes."
  },
  {
    image: "/assets/Responsable relation public.jpg",
    title: "Relation Public",
    description:
      "Gestion de l’image et communication avec votre audience."
  },
  {
    image: "/assets/Infographe.jpg",
    title: "Infographe",
    description:
      "Design graphique moderne et contenus visuels professionnels."
  }
];

function PhotoEquipe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === teamPhotos.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === teamPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? teamPhotos.length - 1 : prev - 1
    );
  };

  return (
    <section className="photo-equipe-section">

      {/* TITRE */}
      <div className="photo-equipe-header">
        <h2>
          NOTRE ÉQUIPE
          <span className="photo-line"></span>
        </h2>
      </div>

      {/* CONTENU */}
      <div className="photo-equipe-container">

        {/* IMAGE */}
        <div className="photo-slider">

          <img
            src={teamPhotos[currentIndex].image}
            alt={teamPhotos[currentIndex].title}
          />

          {/* Boutons */}
          <button className="prev-btn" onClick={prevSlide}>
            ❮
          </button>

          <button className="next-btn" onClick={nextSlide}>
            ❯
          </button>
        </div>

        {/* DESCRIPTION */}
        <div className="photo-description">

          <span className="small-title">
            TEAM AGENCY
          </span>

          <h3>
            {teamPhotos[currentIndex].title}
          </h3>

          <p>
            {teamPhotos[currentIndex].description}
          </p>

          {/* DOTS */}
          <div className="dots">
            {teamPhotos.map((_, index) => (
              <span
                key={index}
                className={`dot ${
                  currentIndex === index ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default PhotoEquipe;
import React, { useEffect, useState } from "react";
import "./PhotoEquipe.css";

const teamPhotos = [
  {
    image: "/assets/equipe1.jpg",
    title: "Direction Créative",
    description:
      "Notre équipe créative imagine des concepts modernes et puissants pour valoriser votre marque."
  },
  {
    image: "/assets/equipe2.jpg",
    title: "Production Photo & Vidéo",
    description:
      "Des shootings professionnels et des vidéos premium pour donner vie à vos projets."
  },
  {
    image: "/assets/equipe3.jpg",
    title: "Marketing Digital",
    description:
      "Nous développons votre visibilité sur les réseaux sociaux avec des stratégies performantes."
  }
];

function PhotoEquipe() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === teamPhotos.length - 1 ? 0 : prev + 1
      );
    }, 5000);

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
          <span className="small-title">TEAM AGENCY</span>

          <h3>{teamPhotos[currentIndex].title}</h3>

          <p>{teamPhotos[currentIndex].description}</p>

          {/* Points */}
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
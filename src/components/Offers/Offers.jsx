import React, { useState, useEffect, useRef } from "react";
import "./Offers.css";

const offers = [
  {
    title: "Pack Digital",
    subtitle: "Réseaux sociaux",
    image: "/assets/packdigi.jpeg",
    description: "Développement de votre présence en ligne."
  },
  {
    title: "Pack Shooting",
    subtitle: "Photos pro",
    image: "/assets/packshoot.jpeg",
    description: "Shooting photo professionnel."
  }
];

function Offers() {
  const [activeOffer, setActiveOffer] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("animate");

          cardRefs.current.forEach((card, i) => {
            if (card) {
              setTimeout(() => {
                card.classList.add("animate");
              }, i * 150);
            }
          });
        } else {
          sectionRef.current.classList.remove("animate");

          cardRefs.current.forEach(
            (card) => card && card.classList.remove("animate")
          );
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="offers-section" ref={sectionRef} id="offres">
        
        {/* TITRE */}
        <div className="offers-header">
          <h2 className="promo-title">
            NOS PROMOTIONS
            <span className="promo-line"></span>
          </h2>
        </div>

        {/* CONTENU */}
        <div className="offers-content">

          <div className="offers-grid two-cards">
            {offers.map((offer, index) => (
              <div
                key={index}
                className="offer-card"
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => setActiveOffer(offer)}
              >
                <div
                  className="offer-bg"
                  style={{
                    backgroundImage: `url(${offer.image})`
                  }}
                />

                <div className="offer-overlay">
                  <h3>{offer.title}</h3>
                  <span>{offer.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MODAL */}
      {activeOffer && (
        <div
          className="offer-modal"
          onClick={() => setActiveOffer(null)}
        >
          <div
            className="offer-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeOffer.image}
              alt={activeOffer.title}
            />

            <h2>{activeOffer.title}</h2>
            <p>{activeOffer.description}</p>

            <button onClick={() => setActiveOffer(null)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Offers;
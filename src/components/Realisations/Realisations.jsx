import React, { useEffect, useRef, useState } from "react";
import "./Realisations.css";
import { AiOutlineReconciliation } from "react-icons/ai";

/* ================== DATA ================== */
const projects = [
  {
    title: "Shooting Immobilier",
    category: "Photographie",
    description: "Shooting professionnel pour villa de luxe",
    longDescription:
      "Ce projet consistait à réaliser un shooting immobilier haut de gamme afin de créer un véritable coup de cœur visuel. Au-delà d’une simple série de clichés, l’objectif était de scénariser l’art de vivre propre au lieu, en capturant des ambiances chaleureuses et des perspectives épurées capables de séduire une clientèle internationale exigeante.",
    image: "/assets/immobilier.jpg",
    gallery: [
      "/assets/immobilier.jpg",
      "/assets/immobilier2.jpg",
      "/assets/immobilier3.jpg",
      "/assets/immobilier4.jpg",
    ],
    place: "Marrakech",
  },
  {
    title: "Prise de vue Drone",
    category: "Drone",
    description: "Captures aériennes pour promotion touristique",
    longDescription:
      "Réalisation de prises de vue aériennes par drone pour un projet touristique...",
    image: "/assets/drone1.jpg",
    gallery: [
      "/assets/drone1.jpg",
      "/assets/drone2.jpg",
      "/assets/drone3.jpg",
      "/assets/drone4.jpg",
    ],
    place: "Agadir",
  },
  {
    title: "Maquette UI/UX",
    category: "Design",
    description: "Design d’une application mobile",
    longDescription:
      "Création d’une maquette UI/UX moderne avec une expérience utilisateur fluide...",
    image: "/assets/maquette.jpg",
    gallery: [
      "/assets/maquette.jpg",
      "/assets/maquette2.jpg",
      "/assets/maquette3.jpg",
      "/assets/maquette4.jpg",
    ],
    place: "Startup Tech",
  },
  {
    title: "Identité Visuelle",
    category: "Branding",
    description: "Création logo & charte graphique",
    longDescription:
      "Conception d’une identité visuelle complète comprenant logo, typographie et charte graphique.",
    image: "/assets/branding.jpg",
    gallery: [
      "/assets/branding.jpg",
      "/assets/branding2.jpg",
      "/assets/branding3.jpg",
      "/assets/branding4.jpg",
    ],
    place: "Société XYZ",
  },
];

/* ================== COMPONENT ================== */
const Realisations = () => {
  const sectionRef = useRef(null);
  const [show, setShow] = useState(false);
  const [animateTitle, setAnimateTitle] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /* ================== INTERSECTION OBSERVER ================== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // RESET TOTAL
          setShow(false);
          setAnimateTitle(false);

          // RELANCE DES ANIMATIONS
          setTimeout(() => {
            setShow(true);
            setAnimateTitle(true);
          }, 80);
        } else {
          // QUAND ON SORT DE LA SECTION
          setShow(false);
          setAnimateTitle(false);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ================= SECTION ================= */}
      <section
        ref={sectionRef}
        id="realisations"
        className={`realisations ${show ? "show" : ""}`}
      >
        {/* ================= HEADER ================= */}
        <div className={`realisations-header ${animateTitle ? "animate-title" : ""}`}>
          <div className="title-wrapper">
            <AiOutlineReconciliation className="title-icon" />
            <h2 className="realisations-title">Nos Réalisations</h2>
          </div>
          <br />
        </div>

        {/* ================= GRID ================= */}
        <div className="realisations-grid">
          {show &&
            projects.map((project, index) => (
              <div
                className="real-card"
                key={index}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => setSelectedProject(project)}
              >
                <div className="real-image">
                  <img src={project.image} alt={project.title} />
                  <span className="badge">{project.category}</span>
                </div>

                <div className="real-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="place">{project.place}</span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {selectedProject && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>

            <h3>{selectedProject.title}</h3>

            <div className="modal-gallery">
              {selectedProject.gallery.map((img, i) => (
                <img
                  src={img}
                  key={i}
                  alt={`${selectedProject.title} ${i}`}
                />
              ))}
            </div>

            <p className="modal-description">
              {selectedProject.longDescription}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Realisations;

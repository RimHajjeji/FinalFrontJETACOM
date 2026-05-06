import React, { useEffect, useRef } from "react";
import "./Values.css"; // Assure-toi que ce chemin est correct
import { FaLightbulb, FaHandshake, FaRegClock } from "react-icons/fa6"; 

// Tableau de données pour vos valeurs
const valuesData = [
  {
    icon: <FaLightbulb className="card-icon" />, 
    title: "Créativité",
    frontDescription: "Pour une communication empreinte de savoir, d’émotions et d’innovation.",
    backTitle: "Notre Approche Créative",
    backDescription: "Nous repoussons les limites du design et de la narration pour captiver votre audience avec des solutions originales et impactantes, toujours à la pointe de l'innovation et des technologies émergentes.",
    delay: 0 
  },
  {
    icon: <FaHandshake className="card-icon" />, 
    title: "Authenticité",
    frontDescription: "Grâce à un suivi éthique et professionnel.",
    backTitle: "Notre Engagement Authentique",
    backDescription: "Nous valorisons l'honnêteté et la transparence dans toutes nos interactions. Nous construisons des relations durables basées sur la confiance et l'intégrité, en assurant un suivi éthique et professionnel.",
    delay: 100 
  },
  {
    icon: <FaRegClock className="card-icon" />, 
    title: "Intemporalité",
    frontDescription: "Nous communiquons pour marquer le présent et inspirer le futur.",
    backTitle: "Une Vision Intemporelle",
    backDescription: "Nos stratégies et créations sont conçues pour résister à l'épreuve du temps, assurant une pertinence continue et une croissance durable pour votre marque sur tous les supports, aujourd'hui et demain.",
    delay: 200 
  },
];

export default function Values() {
  // Références pour les titres afin que l'IntersectionObserver puisse les cibler directement
  const valuesTitleRef = useRef(null);
  const missionsTitleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // Optionnel: Si tu veux que le titre disparaisse en scrollant vers le haut
                entry.target.classList.remove('show'); 
            }
        });
      },
      { threshold: 0.6 } // Le titre devient visible si 60% de l'élément est dans le viewport
    );

    // Observe les titres via leurs références
    if (valuesTitleRef.current) observer.observe(valuesTitleRef.current);
    if (missionsTitleRef.current) observer.observe(missionsTitleRef.current);

    return () => {
      // Déconnecte les observers lors du démontage du composant
      if (valuesTitleRef.current) observer.unobserve(valuesTitleRef.current);
      if (missionsTitleRef.current) observer.unobserve(missionsTitleRef.current);
    };
  }, []);

  return (
    <section className="values-section" id="values">
      <div className="values-container">
        {/* TITRE NOS VALEURS - avec la ref */}
        <h2 ref={valuesTitleRef} className="values-title">
          NOS VALEURS
          <span className="underline" />
        </h2>

        <div className="values-grid">
          {valuesData.map((value, index) => (
            <div 
              key={index} 
              className="flip-card"
              data-aos="fade-up" 
              data-aos-delay={value.delay} 
            >
              <div className="flip-card-inner"> 
                
                <div className="flip-card-front">
                  <div className="card-header">
                    <div className="icon-circle">
                      {value.icon}
                    </div>
                    <h3>{value.title}</h3>
                  </div>
                  <p>{value.frontDescription}</p>
                </div>
                
                <div className="flip-card-back">
                  <h3>{value.backTitle}</h3>
                  <p>{value.backDescription}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TITRE NOS MISSIONS - avec la ref */}
        <h2 ref={missionsTitleRef} className="values-title mission">
          NOS MISSIONS
          <span className="underline" />
        </h2>

        <div className="missions-list">
          <div className="mission-item" data-aos="fade-right" data-aos-delay="300">
            <div className="mission-content">
              <span className="arrow">➤</span>
              <p><strong>Satisfaction client :</strong> Fournir des services de communication qui répondent aux besoins et aux attentes des clients.</p>
            </div>
          </div>

          <div className="mission-item" data-aos="fade-right" data-aos-delay="400">
            <div className="mission-content">
              <span className="arrow">➤</span>
              <p><strong>Déploiement de marque :</strong> Construire et maintenir une marque forte qui inspire confiance auprès de votre cible.</p>
            </div>
          </div>

          <div className="mission-item" data-aos="fade-right" data-aos-delay="500">
            <div className="mission-content">
              <span className="arrow">➤</span>
              <p><strong>Élargissement du portefeuille clients :</strong> Contribuer à l’acquisition de nouveaux clients et partenaires via la portée de votre communication.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

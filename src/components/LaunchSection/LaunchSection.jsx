import React, { useEffect, useRef } from 'react';
import './LaunchSection.css';

export default function LaunchSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Observateur pour déclencher l'animation d'entrée
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="launch-section">
      <div className="launch-content">
        <h2>
          CRÉER L'IMPACT <br />
          <span>DE DEMAIN</span>
        </h2>
        <p>
          L'agence JETA COM accompagne ses clients avec excellence et dévouement. Votre succès est notre priorité.
        </p>

        {/* Statistiques/commentaires supprimés pour ne garder que le cube */}
        {/*
        <div className="launch-stats">
          ...
        </div>
        */}
      </div>

      <div className="cube-wrapper">
        <div className="cube">
          <div className="face front">EXCELLENCE</div>
          <div className="face back">RÉACTIVITÉ</div>
          <div className="face right">EXPERTISE</div>
          <div className="face left">ENGAGEMENT</div>
          <div className="face top">CONFIANCE</div>
          <div className="face bottom" style={{ fontSize: '14px' }}>SATISFACTION</div>
        </div>
      </div>
    </section>
  );
}

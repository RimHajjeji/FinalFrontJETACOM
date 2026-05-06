import { useEffect, useRef } from "react";
import { GiDeliveryDrone } from "react-icons/gi";

import "./DroneService.css";

export default function DroneService() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Animation container
    setTimeout(() => {
      containerRef.current?.classList.add("open");
    }, 150);

    // Animation éléments "à la carte"
    const animatedElements = containerRef.current?.querySelectorAll(
      ".ds-animate"
    );
    animatedElements?.forEach((el, index) => {
      el.style.animationDelay = `${0.2 + index * 0.25}s`;
      el.classList.add("show");
    });
  }, []);

  return (
    <section className="ds-page">
      <div ref={containerRef} className="ds-container">

        <header className="ds-header">
          <h1 className="ds-animate ds-tilt">
            <span className="ds-title-with-icon">
              <GiDeliveryDrone className="drone-icon" />
              Photos aériennes qui laissent une impression
            </span>
          </h1>
          <p className="ds-animate ds-tilt">
            Qu’il s’agisse de bâtiments, de terrains, d’événements ou de photos
            d’images — les images de drone apportent mouvement, profondeur et
            dynamisme à votre marketing.
          </p>
        </header>

        <section className="ds-services">
          <h2 className="ds-animate">Nos drones — Services</h2>

          <div className="ds-services-grid">
            <ul className="ds-animate">
              <li><span>Photos aériennes</span> — photos haute résolution</li>
              <li><span>Immobilier & Architecture</span> — exposés et présentations</li>
              <li><span>Films d’images</span> — scènes drone cinématiques</li>
            </ul>

            <ul className="ds-animate">
              <li><span>Vidéos aériennes</span> — plans doux ou dynamiques</li>
              <li><span>Événements</span> — images émotionnelles</li>
              <li><span>Montage & étalonnage</span> — post-production incluse</li>
            </ul>
          </div>
        </section>

        <section className="ds-process">
          <h2 className="ds-animate">Comment fonctionne un projet de drone</h2>

          <div className="ds-process-grid">
            <div className="ds-process-steps ds-animate">
              <p><strong>Planification</strong> — objectif, durée, style</p>
              <p><strong>Permis & sécurité</strong> — conformité légale</p>
              <p><strong>Vol & captation</strong> — pilotes certifiés</p>
              <p><strong>Montage</strong> — rendu final premium</p>
            </div>
            <div className="ds-process-images">
              <img className="ds-animate" src="/assets/drone1.jpg" alt="Drone en vol" />
              <img className="ds-animate" src="/assets/drone2.jpg" alt="Vue aérienne" />
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}

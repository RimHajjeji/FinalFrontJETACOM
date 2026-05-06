import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";
import "./Services.css";
import { CiBullhorn } from "react-icons/ci";
import { AiOutlineAudit } from "react-icons/ai";
import { SiTaichigraphics } from "react-icons/si";
import { MdOutlinePublic } from "react-icons/md";
import { FaVideo, FaLaptopCode } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";

const services = [
  {
    icon: <CiBullhorn />,
    title: "Gestion de campagnes publicitaires",
    subtitle: "Des stratégies ciblées pour des résultats mesurables",
    text: "Sur les médias, régies publicitaires, street marketing, numérique, stratégies 360°",
  },
  {
    icon: <Share2 />,
    title: "Gestion communication et marketing",
    subtitle: "Une stratégie digitale au service de vos ambitions",
    text: "Social media et acquisition de leads, publicité des produits et services, community management.",
  },
  {
    icon: <AiOutlineAudit />,
    title: "Conseil et audit",
    subtitle: "Clarifiez votre vision, structurez votre succès",
    text: "Plan et stratégie de communication, prévention et gestion de crises, étude de marché et plan d'action.",
  },
  {
    icon: <SiTaichigraphics />,
    title: "Conception graphique",
    text: "Création identité visuelle (logo & charte graphique), conception supports de communication (cartes de visite, flyers, kakemonos, brochures, dépliants, plaquettes commerciales), refonte identité visuelle, conception livrets et magazines.",
  },
  {
    icon: <MdOutlinePublic />,
    title: "Relations publiques",
    subtitle: "Valorisez vos actualités auprès des bons réseaux",
    text: "Plans médias, communiqués et dossiers de presse.",
  },
  {
    icon: <FaVideo />,
    title: "Création audiovisuelle",
    subtitle: "Une expertise vidéo pour tous vos formats",
    text: "Spots publicitaires, motion design, documentaires, reportages.",
  },
  {
    icon: <IoMdPhotos />,
    title: "Services photos",
    subtitle: "L'excellence visuelle sous tous les angles",
    text: "Shooting produit, corporate, artistique, événementiel.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Développement web",
    subtitle: "Des solutions sur-mesure",
    text: "Création / refonte site web, application mobile, SEO / SEA.",
  },
];

export default function Services() {
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.target.classList.toggle("show", entry.isIntersecting),
      { threshold: 0.6 }
    );

    titleRef.current && observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry =>
          entry.target.classList.toggle("show", entry.isIntersecting)
        ),
      { threshold: 0.35 }
    );

    cardsRef.current.forEach(card => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services-section">
      <h2 ref={titleRef} className="services-title">
        NOS SERVICES
         <span className="underlineSER" />
      </h2>

      <div className="services-grid">
        {services.map((s, i) => (
          <div
            key={i}
            ref={el => (cardsRef.current[i] = el)}
            className="service-card"
            style={{ "--delay": `${i * 0.15}s` }}
          >
            <div className="icon icon-3d">{s.icon}</div>
            <h3>{s.title}</h3>
            {s.subtitle && <h4>{s.subtitle}</h4>}
            <p>{s.text}</p>
          
          </div>
        ))}
      </div>
    </section>
  );
}

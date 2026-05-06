import React, { useEffect, useState } from "react";
import "./Carousel3D.css";

const images = [
  "/assets/photo1.jpg",
  "/assets/photo2.jpg",
  "/assets/photo3.jpg",
  "/assets/photo4.jpg",
];

export default function Carousel3D() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getIndex = (offset) =>
    (index + offset + images.length) % images.length;

  return (
    <section
      className="carousel-hero"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className="hero-overlay" />

      <div className="cards-wrapper">
        {[-1, 0, 1].map((offset) => {
          const imgIndex = getIndex(offset);
          return (
            <div
              key={imgIndex}
              className={`card ${offset === 0 ? "active" : ""}`}
              style={{ backgroundImage: `url(${images[imgIndex]})` }}
              onClick={() => setIndex(imgIndex)}
            />
          );
        })}
      </div>
    </section>
  );
}

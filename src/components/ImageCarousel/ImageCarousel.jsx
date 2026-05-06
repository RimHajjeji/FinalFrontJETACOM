import React, { useState, useEffect, useCallback } from "react";
import "./ImageCarousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ images = [], interval = 4000, aosDelay = 1000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    if (!images || images.length === 0) return;
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [nextSlide, interval, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel-container empty-carousel" data-aos="fade-left" data-aos-delay={aosDelay}>
        <p>Aucune image configurée pour le carrousel.</p>
      </div>
    );
  }

  return (
    <div className="image-carousel-container" data-aos="fade-left" data-aos-delay={aosDelay}>
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image.src} alt={image.alt} className="carousel-image" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-button prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-button next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>

          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

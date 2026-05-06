import React, { useRef, useEffect, useState } from "react";
import "./HeroVideo.css";

export default function HeroVideo({ start }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  // 🔥 Détection fiable
  useEffect(() => {
    const updateVideoSource = () => {
      const isMobile = window.innerWidth <= 992;

      const newSrc = isMobile
        ? "https://res.cloudinary.com/dxqhtnz97/video/upload/f_auto,q_auto,so_0/v1778064136/TEASERF-Responsive_ptdpfk.mp4"
        : "https://res.cloudinary.com/dxqhtnz97/video/upload/f_auto,q_auto,so_0/v1778063874/TEASERF_xuoktk.mp4";

      setVideoSrc(newSrc);
    };

    updateVideoSource();
    window.addEventListener("resize", updateVideoSource);

    return () => window.removeEventListener("resize", updateVideoSource);
  }, []);

  const handleVideoEnd = () => {
    if (!isHeroVisible) return;

    const welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
      welcomeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (start && videoSrc) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeroVisible(entry.isIntersecting);

          if (entry.isIntersecting && start) {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [start, videoSrc]);

  return (
    <section className="hero-video-section" ref={sectionRef}>
      {videoSrc && (
        <video
          key={videoSrc} // 🔥 force reload quand ça change
          ref={videoRef}
          className="hero-video"
          src={videoSrc}
          playsInline
          preload="metadata"
          muted
          autoPlay
          onEnded={handleVideoEnd}
        />
      )}

      <div className="hero-overlay" />
    </section>
  );
}

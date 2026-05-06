import React, { useEffect, useRef } from "react";
import "./Loader.css";

export default function Loader({ onFinish }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 🔥 Accélération de la vidéo
    video.playbackRate = 2; // 1.5, 2, 3, etc.

    const handleEnd = () => {
      onFinish();
    };

    video.addEventListener("ended", handleEnd);

    return () => {
      video.removeEventListener("ended", handleEnd);
    };
  }, [onFinish]);

  return (
    <div className="loader video-loader">
      <video
        ref={videoRef}
        className="loader-video"
        src="/assets/Final Render.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}

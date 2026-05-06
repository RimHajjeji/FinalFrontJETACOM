import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isDesktop =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.innerWidth > 1024;

    if (!isDesktop) return;

    setEnabled(true);

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;
    let rafId;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", move);
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 🚫 MOBILE = rien du tout
  if (!enabled) return null;

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

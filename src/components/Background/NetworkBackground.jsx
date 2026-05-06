import React, { useEffect, useRef } from "react";
import "./NetworkBackground.css";

export default function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const POINTS = 120;
    const CONNECTIONS = 4;
    const points = [];

    // Pour l'effet 3D
    const perspective = 600; // distance de perspective
    const rotation = { x: 0, y: 0 }; // angles de rotation
    const mouse = { x: width / 2, y: height / 2 }; // position de la souris

    // Vitesse des points
    const SPEED = 0.2;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      mouse.x = width / 2;
      mouse.y = height / 2;
    };
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      // Calculer rotation selon position de la souris
      const maxAngle = 0.15; // angle max en radians
      rotation.y = ((e.clientX / width) - 0.5) * maxAngle * 2;
      rotation.x = ((e.clientY / height) - 0.5) * maxAngle * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialisation des points avec coord z pour la 3D
    for (let i = 0; i < POINTS; i++) {
      points.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: (Math.random() - 0.5) * 800, // profondeur
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        vz: (Math.random() - 0.5) * SPEED,
      });
    }

    function project(point) {
      // appliquer rotation X et Y pour effet perspective
      let x = point.x;
      let y = point.y * Math.cos(rotation.x) - point.z * Math.sin(rotation.x);
      let z = point.y * Math.sin(rotation.x) + point.z * Math.cos(rotation.x);

      const tempX = x * Math.cos(rotation.y) - z * Math.sin(rotation.y);
      const tempZ = x * Math.sin(rotation.y) + z * Math.cos(rotation.y);
      x = tempX;
      z = tempZ;

      const scale = perspective / (perspective + z);
      return {
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
      };
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Déplacer les points dans l'espace 3D
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // rebond sur les limites imaginaires
        const limit = 400;
        if (p.x < -limit || p.x > limit) p.vx *= -1;
        if (p.y < -limit || p.y > limit) p.vy *= -1;
        if (p.z < -limit || p.z > limit) p.vz *= -1;
      });

      // Dessiner les lignes
      points.forEach((p, i) => {
        const distances = points
          .map((other, j) => ({ index: j, dist: Math.hypot(p.x - other.x, p.y - other.y, p.z - other.z) }))
          .filter(d => d.index !== i)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, CONNECTIONS);

        distances.forEach(d => {
          const other = points[d.index];
          const p1 = project(p);
          const p2 = project(other);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = "rgba(53, 178, 120, 0.25)";
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      });

      // Dessiner les points
      points.forEach(p => {
        const { x, y } = project(p);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#5fe5a7ff";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" />;
}
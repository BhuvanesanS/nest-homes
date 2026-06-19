import { useState, useCallback, useRef } from "react";

export default function use3DTilt(maxTilt = 15) {
  const [style, setStyle] = useState({});
  const elementRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!elementRef.current) return;

      const el = elementRef.current;
      const rect = el.getBoundingClientRect();

      // Position of cursor relative to element bounding box
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Center point coordinates
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized offset from -1 to 1
      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      // Calculate rotation angles
      // Moving mouse to the right rotates around Y axis (positive degrees)
      // Moving mouse down rotates around X axis (negative degrees)
      const rotateX = (-percentY * maxTilt).toFixed(2);
      const rotateY = (percentX * maxTilt).toFixed(2);

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
        transition: "transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)",
        boxShadow: `${-percentX * 15}px ${-percentY * 15}px 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.1)`,
      });
    },
    [maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
    });
  }, []);

  return {
    elementRef,
    style,
    handleMouseMove,
    handleMouseLeave,
  };
}

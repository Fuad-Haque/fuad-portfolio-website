"use client";

import { useEffect, useState } from 'react';

export default function Spotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', updateMousePosition);

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div
      id="spot"
      style={{
        background: `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,255,65,0.022) 0%, transparent 65%)`,
      }}
    />
  );
}

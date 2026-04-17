"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface WindowProps {
  id: string;
  title: string;
  defaultX: number;
  defaultY: number;
  defaultW: number;
  defaultH: number;
  children: React.ReactNode;
  zIndex: number;
  onFocus: (id: string) => void;
  isActive: boolean;
  animationDelay?: number;
}

export default function Window({
  id,
  title,
  defaultX,
  defaultY,
  defaultW,
  defaultH,
  children,
  zIndex,
  onFocus,
  isActive,
  animationDelay = 0,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({
    left: -60,
    right: 1000,
    top: 0,
    bottom: 1000,
  });

  useEffect(() => {
    const updateLayout = () => {
      if (windowRef.current) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (vw <= 900) return; // handled by CSS

        // Scale for smaller wide screens
        const scale = Math.min(1, (vw - 32) / 1580);
        
        const scaledX = Math.round(defaultX * scale + (vw > 1580 ? (vw - 1580) * 0.1 : 0));
        const scaledY = Math.round(defaultY * (scale * 0.7 + 0.3));
        const scaledW = Math.round(defaultW * scale);
        const scaledH = Math.round(defaultH * (scale * 0.7 + 0.3));

        windowRef.current.style.left = `${scaledX}px`;
        windowRef.current.style.top = `${scaledY}px`;
        windowRef.current.style.width = `${scaledW}px`;
        windowRef.current.style.height = `${scaledH}px`;

        // Update drag constraints
        setDragConstraints({
          left: -60,
          right: vw - scaledW + 60,
          top: 0,
          bottom: vh - scaledH - 28,
        });
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, [defaultX, defaultY, defaultW, defaultH]);

  return (
    <motion.div
      ref={windowRef}
      id={id}
      className={`win ${isActive ? 'active' : ''}`}
      style={{
        zIndex,
        position: 'absolute',
      }}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        ease: [0.16, 1, 0.3, 1],
        duration: 0.45,
        delay: animationDelay,
      }}
      drag
      dragMomentum={false}
      dragConstraints={dragConstraints}
      dragListener={false}
      dragElastic={0}
      whileDrag={{ cursor: 'grabbing' }}
      onDragStart={() => onFocus(id)}
      onClick={(e) => {
        // Only focus if not dragging
        if (e.detail === 1) onFocus(id);
      }}
    >
      <div
        ref={dragHandleRef}
        className="wtb"
        style={{ cursor: 'grab' }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onFocus(id);
        }}
      >
        <div className="wdots">
          <div className="wd r"></div>
          <div className="wd y"></div>
          <div className="wd g"></div>
        </div>
        <span className="wtitle">{title}</span>
      </div>
      <div className="wb">{children}</div>
    </motion.div>
  );
}

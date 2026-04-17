"use client";

import { useEffect, useState } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="sbar">
      <div className="sl">
        <div className="sdot"></div>
        <span>fuad-haque · Python Backend</span>
        <span style={{ opacity: 0.2 }}>|</span>
        <span style={{ color: 'var(--silver-40)' }}>3 projects deployed</span>
      </div>
      <div className="sr">
        <span>Press</span>
        <kbd> K</kbd>
        <span>to navigate</span>
        <span style={{ opacity: 0.2 }}>·</span>
        <span id="clk" style={{ color: 'var(--silver-40)', letterSpacing: '.05em' }}>
          {time}
        </span>
      </div>
    </div>
  );
}

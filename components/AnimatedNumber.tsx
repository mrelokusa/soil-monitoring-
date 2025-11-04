import React, { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  toFixed?: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 500, toFixed = 0 }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const frameRef = useRef<number>();

  useEffect(() => {
    // If it's not a valid number, update directly
    if (isNaN(value)) {
      setDisplayValue(value);
      return;
    }
    
    const startValue = displayValue;
    const endValue = value;
    
    const range = endValue - startValue;
    if (range === 0) return;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const current = startValue + range * progress;

      setDisplayValue(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue); // Ensure it ends on the exact value
      }
    };
    
    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]); // Intentionally not including displayValue

  if (typeof displayValue !== 'number' || isNaN(displayValue)) {
      return <span>...</span>; // Fallback for invalid numbers
  }

  return <span>{displayValue.toFixed(toFixed)}</span>;
};

export default AnimatedNumber;

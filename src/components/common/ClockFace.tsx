import React from 'react';

interface ClockFaceProps {
  hours: number;
  minutes: number;
  size?: number;
  className?: string;
}

const ClockFace: React.FC<ClockFaceProps> = ({ hours, minutes, size = 200, className = '' }) => {
  const center = 100;
  const radius = 90;

  // Calculate angles
  const hourAngle = (hours % 12) * 30 + (minutes * 0.5);
  const minuteAngle = minutes * 6;

  const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      className={`bg-white rounded-full shadow-md ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rim */}
      <circle cx={center} cy={center} r={radius} fill="#f8fafc" stroke="#38bdf8" strokeWidth="8" />
      
      {/* Hour numbers */}
      {numbers.map(num => {
        const angle = (num * 30 - 90) * (Math.PI / 180);
        const textRadius = radius - 20;
        const x = center + textRadius * Math.cos(angle);
        const y = center + textRadius * Math.sin(angle);
        
        return (
          <text 
            key={num} 
            x={x} 
            y={y + 2} // Slight vertical adjustment for better centering
            fill="#0f172a" 
            fontSize="22" 
            fontWeight="900" 
            textAnchor="middle" 
            alignmentBaseline="middle"
          >
            {num}
          </text>
        );
      })}

      {/* Hour hand */}
      <line 
        x1={center} 
        y1={center} 
        x2={center} 
        y2={center - 45} 
        stroke="#0f172a" 
        strokeWidth="6" 
        strokeLinecap="round"
        className="transition-transform duration-500 ease-out"
        transform={`rotate(${hourAngle} ${center} ${center})`}
      />

      {/* Minute hand */}
      <line 
        x1={center} 
        y1={center} 
        x2={center} 
        y2={center - 65} 
        stroke="#ef4444" 
        strokeWidth="4" 
        strokeLinecap="round"
        className="transition-transform duration-500 ease-out"
        transform={`rotate(${minuteAngle} ${center} ${center})`}
      />

      {/* Center dot */}
      <circle cx={center} cy={center} r="5" fill="#ef4444" />
      <circle cx={center} cy={center} r="2" fill="#ffffff" />
    </svg>
  );
};

export default ClockFace;

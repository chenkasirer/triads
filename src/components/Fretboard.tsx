import React from 'react';
import type { FretPosition } from '../types';

interface FretboardProps {
  positions: FretPosition[];
}

const Fretboard: React.FC<FretboardProps> = ({ positions }) => {
  const strings = 6;
  const frets = 12;
  const stringSpacing = 40;
  const fretSpacing = 60;
  const topPadding = 30;
  const bottomPadding = 30;
  const leftPadding = 60;
  const rightPadding = 60;
  const width = frets * fretSpacing + leftPadding + rightPadding;
  const height = (strings - 1) * stringSpacing + topPadding + bottomPadding;

  const getRoleColor = (role: 'root' | 'third' | 'fifth') => {
    switch (role) {
      case 'root': return '#cf5c36'; // flame
      case 'third': return '#efc88b'; // sunset
      case 'fifth': return '#000000'; // black
    }
  };

  const getTextColor = (role: 'root' | 'third' | 'fifth') => {
    switch (role) {
      case 'root': return 'white'; // white text on dark flame
      case 'third': return 'black'; // black text on light sunset  
      case 'fifth': return 'white'; // white text on black
    }
  };

  return (
    <div className="bg-white rounded-lg p-2 sm:p-4 shadow-lg overflow-x-auto">
      <svg 
        width={width} 
        height={height} 
        className="mx-auto min-w-max"
        style={{ minWidth: `${width}px` }}
      >
        {/* Fret lines */}
        {Array.from({ length: frets + 1 }, (_, fret) => (
          <line
            key={`fret-${fret}`}
            x1={leftPadding + fret * fretSpacing}
            y1={topPadding}
            x2={leftPadding + fret * fretSpacing}
            y2={height - bottomPadding}
            stroke="#7c7c7c"
            strokeWidth={fret === 0 ? 4 : 1}
          />
        ))}
        
        {/* String lines */}
        {Array.from({ length: strings }, (_, string) => (
          <line
            key={`string-${string}`}
            x1={leftPadding}
            y1={topPadding + string * stringSpacing}
            x2={width - rightPadding}
            y2={topPadding + string * stringSpacing}
            stroke="#000000"
            strokeWidth={2}
          />
        ))}
        
        {/* Fret markers */}
        {[3, 5, 7, 9].map(fret => (
          <circle
            key={`marker-${fret}`}
            cx={leftPadding + (fret - 0.5) * fretSpacing}
            cy={topPadding + ((strings - 1) * stringSpacing) / 2}
            r={7}
            fill="#d1d5db"
          />
        ))}
        
        {/* 12th fret double markers */}
        <circle
          cx={leftPadding + (12 - 0.5) * fretSpacing}
          cy={topPadding + stringSpacing * 1.5}
          r={6}
          fill="#d1d5db"
        />
        <circle
          cx={leftPadding + (12 - 0.5) * fretSpacing}
          cy={topPadding + stringSpacing * 3.5}
          r={6}
          fill="#d1d5db"
        />
        
        {/* Note positions */}
        {positions.map((pos, index) => (
          <g key={index}>
            <circle
              cx={leftPadding + (pos.fret === 0 ? -30 : (pos.fret - 0.5) * fretSpacing)}
              cy={topPadding + (pos.string - 1) * stringSpacing}
              r={15}
              fill={getRoleColor(pos.role)}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={leftPadding + (pos.fret === 0 ? -30 : (pos.fret - 0.5) * fretSpacing)}
              y={topPadding + (pos.string - 1) * stringSpacing}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={getTextColor(pos.role)}
              fontSize="12"
              fontWeight="bold"
            >
              {pos.note}
            </text>
          </g>
        ))}
        
        {/* String labels */}
        {['E', 'B', 'G', 'D', 'A', 'E'].map((note, index) => {
          const stringNumber = index + 1;
          const hasTriadNote = positions.some(pos => pos.fret === 0 && pos.string === stringNumber);
          
          // Only show string label if there's no triad note on this open string
          if (hasTriadNote) return null;
          
          return (
            <text
              key={`label-${index}`}
              x={leftPadding - 30}
              y={topPadding + index * stringSpacing}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#374151"
            >
              {note}
            </text>
          );
        })}
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-flame"></div>
          <span className="text-sm font-medium text-black">Root</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-sunset"></div>
          <span className="text-sm font-medium text-black">3<sup>rd</sup></span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-black"></div>
          <span className="text-sm font-medium text-black">5<sup>th</sup></span>
        </div>
      </div>
    </div>
  );
};

export default Fretboard;

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
  const width = frets * fretSpacing + 100;
  const height = (strings - 1) * stringSpacing + 100;

  const getRoleColor = (role: 'root' | 'third' | 'fifth') => {
    switch (role) {
      case 'root': return '#ef4444'; // red
      case 'third': return '#3b82f6'; // blue
      case 'fifth': return '#10b981'; // green
    }
  };

  return (
    <div className="bg-amber-100 rounded-lg p-4 border-2 border-amber-800">
      <svg width={width} height={height} className="mx-auto">
        {/* Fret lines */}
        {Array.from({ length: frets + 1 }, (_, fret) => (
          <line
            key={`fret-${fret}`}
            x1={50 + fret * fretSpacing}
            y1={20}
            x2={50 + fret * fretSpacing}
            y2={height - 20}
            stroke="#8b5cf6"
            strokeWidth={fret === 0 ? 4 : 1}
          />
        ))}
        
        {/* String lines */}
        {Array.from({ length: strings }, (_, string) => (
          <line
            key={`string-${string}`}
            x1={50}
            y1={20 + string * stringSpacing}
            x2={width - 50}
            y2={20 + string * stringSpacing}
            stroke="#374151"
            strokeWidth={2}
          />
        ))}
        
        {/* Fret markers */}
        {[3, 5, 7, 9, 12].map(fret => (
          <circle
            key={`marker-${fret}`}
            cx={50 + (fret - 0.5) * fretSpacing}
            cy={height / 2}
            r={8}
            fill="#d1d5db"
          />
        ))}
        
        {/* Note positions */}
        {positions.map((pos, index) => (
          <g key={index}>
            <circle
              cx={50 + (pos.fret === 0 ? -15 : (pos.fret - 0.5) * fretSpacing)}
              cy={20 + (strings - pos.string) * stringSpacing}
              r={15}
              fill={getRoleColor(pos.role)}
              stroke="white"
              strokeWidth={2}
            />
            <text
              x={50 + (pos.fret === 0 ? -15 : (pos.fret - 0.5) * fretSpacing)}
              y={20 + (strings - pos.string) * stringSpacing}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {pos.note}
            </text>
          </g>
        ))}
        
        {/* String labels */}
        {['E', 'A', 'D', 'G', 'B', 'E'].map((note, index) => (
          <text
            key={`label-${index}`}
            x={20}
            y={20 + index * stringSpacing}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="14"
            fontWeight="bold"
            fill="#374151"
          >
            {note}
          </text>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm font-medium">Root</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm font-medium">Third</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm font-medium">Fifth</span>
        </div>
      </div>
    </div>
  );
};

export default Fretboard;

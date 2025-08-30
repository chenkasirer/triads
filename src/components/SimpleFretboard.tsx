import type { FretPosition } from '../types';

interface FretboardProps {
  positions: FretPosition[];
}

const SimpleFretboard = ({ positions }: FretboardProps) => {
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
    <div style={{
      backgroundColor: '#fef3c7',
      borderRadius: '0.5rem',
      padding: '1rem',
      border: '2px solid #92400e'
    }}>
      <svg width={width} height={height} style={{ display: 'block', margin: '0 auto' }}>
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
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        marginTop: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            backgroundColor: '#ef4444'
          }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Root</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            backgroundColor: '#3b82f6'
          }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Third</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: '1rem',
            height: '1rem',
            borderRadius: '50%',
            backgroundColor: '#10b981'
          }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Fifth</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleFretboard;

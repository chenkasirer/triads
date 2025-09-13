import React from 'react';
import type { TriadQuality } from '../types';

interface QualitySelectorProps {
  selectedQuality: TriadQuality;
  onQualityChange: (quality: TriadQuality) => void;
  animateToQuality?: TriadQuality | null;
}

const ALL_QUALITIES: TriadQuality[] = ['major', 'minor', 'dim'];

const QualitySelector: React.FC<QualitySelectorProps> = ({ 
  selectedQuality, 
  onQualityChange, 
  animateToQuality 
}) => {
  const formatQuality = (quality: TriadQuality) => {
    return quality.charAt(0).toUpperCase() + quality.slice(1);
  };

  const getQualitySymbol = (quality: TriadQuality) => {
    switch (quality) {
      case 'major': return 'M';
      case 'minor': return 'm';
      case 'dim': return '°';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
     
      {/* Segmented Control */}
      <div className="relative bg-gray-100 rounded-lg p-1 flex">
        {/* Animated Background */}
        <div 
          className={`absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out ${
            animateToQuality ? 'transition-all duration-800 ease-out' : ''
          }`}
          style={{
            left: `calc(${ALL_QUALITIES.indexOf(selectedQuality) * 33.333}% + 4px)`,
            width: 'calc(33.333% - 8px)'
          }}
        />
        
        {/* Quality Options */}
        {ALL_QUALITIES.map((quality) => {
          const isSelected = quality === selectedQuality;
          
          return (
            <button
              key={quality}
              onClick={() => onQualityChange(quality)}
              className={`relative z-10 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md flex-1 min-w-0 ${
                isSelected 
                  ? 'text-black' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex flex-col items-center space-y-1">
                <span className="text-lg font-bold">{getQualitySymbol(quality)}</span>
                <span className="text-xs">{formatQuality(quality)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QualitySelector;

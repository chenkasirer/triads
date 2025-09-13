import React, { useState, useEffect, useRef } from 'react';
import type { Note } from '../types';
import { useAppStore } from '../store';
import shuffleIcon from '../assets/shuffle.svg';

interface RootSelectorWheelProps {
  selectedRoot: Note;
  onRootChange: (root: Note) => void;
  onRandomize?: () => void; // Function to call for randomization
  animateToRoot?: Note | null; // For random root animation
  size?: number;
}

const ALL_NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const RootSelectorWheel: React.FC<RootSelectorWheelProps> = ({ 
  selectedRoot, 
  onRootChange, 
  onRandomize,
  animateToRoot,
  size = 260
}) => {
  const { settings } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  const lastAngleRef = useRef(0);

  const calculateRotationForRoot = (root: Note) => {
    const rootIndex = ALL_NOTES.indexOf(root);
    return -(rootIndex * 30); // 30 degrees per note, negative for clockwise
  };

  const getCurrentRootFromRotation = (currentRotation: number) => {
    const normalizedRotation = ((currentRotation % 360) + 360) % 360;
    const positiveRotation = (360 - normalizedRotation) % 360;
    const noteIndex = Math.round(positiveRotation / 30) % 12;
    return ALL_NOTES[noteIndex];
  };

  // Update rotation when selectedRoot changes (only if not dragging)
  useEffect(() => {
    if (!isDragging && !isAnimating) {
      setRotation(calculateRotationForRoot(selectedRoot));
    }
  }, [selectedRoot, isDragging, isAnimating]);

  useEffect(() => {
    if (animateToRoot) {
      setIsAnimating(true);
      const targetRotation = calculateRotationForRoot(animateToRoot);
      const extraSpins = 2 + Math.random() * 2;
      const finalRotation = targetRotation - (360 * extraSpins);
      
      setRotation(finalRotation);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  }, [animateToRoot]);

  const getAngleFromCenter = (clientX: number, clientY: number, rect: DOMRect) => {
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    setIsDragging(true);
    
    if (wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect();
      lastAngleRef.current = getAngleFromCenter(e.clientX, e.clientY, rect);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !wheelRef.current || isAnimating) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const currentAngle = getAngleFromCenter(e.clientX, e.clientY, rect);
    const angleDiff = currentAngle - lastAngleRef.current;
    
    setRotation(prev => prev + angleDiff);
    lastAngleRef.current = currentAngle;
  };

  const handleMouseUp = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    
    const currentRoot = getCurrentRootFromRotation(rotation);
    if (currentRoot !== selectedRoot) {
      onRootChange(currentRoot);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    setIsDragging(true);
    
    if (wheelRef.current && e.touches[0]) {
      const rect = wheelRef.current.getBoundingClientRect();
      lastAngleRef.current = getAngleFromCenter(e.touches[0].clientX, e.touches[0].clientY, rect);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !wheelRef.current || isAnimating || !e.touches[0]) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const currentAngle = getAngleFromCenter(e.touches[0].clientX, e.touches[0].clientY, rect);
    const angleDiff = currentAngle - lastAngleRef.current;
    
    setRotation(prev => prev + angleDiff);
    lastAngleRef.current = currentAngle;
  };

  const handleTouchEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    
    const currentRoot = getCurrentRootFromRotation(rotation);
    if (currentRoot !== selectedRoot) {
      onRootChange(currentRoot);
    }
  };

  // Add global event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    const handleGlobalTouchMove = (e: TouchEvent) => handleTouchMove(e);
    const handleGlobalTouchEnd = () => handleTouchEnd();

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  });

  const handleNoteClick = (note: Note, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating || isDragging) return;
    onRootChange(note);
  };

  const radius = size / 2 - 45;
  const centerX = size / 2;
  const centerY = size / 2;

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={wheelRef}
        className={`relative select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ width: size, height: size }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Outer circle */}
        <div 
          className="absolute inset-0 rounded-full border-4 border-gray-300 bg-white shadow-lg"
          style={{ width: size, height: size }}
        />
        
        {/* 12 o'clock marker */}
        <div 
          className="absolute w-0 h-0 border-l-[5px] border-r-[5px] border-t-[9px] border-l-transparent border-r-transparent border-b-flame"
          style={{ 
            left: centerX - 5, 
            top: 9
          }}
        />
        
        {/* Rotating wheel with notes */}
        <div
          className={`absolute inset-0 transition-transform ${
            isAnimating ? 'duration-1500 ease-out' : isDragging ? 'duration-0' : 'duration-300 ease-out'
          }`}
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center'
          }}
        >
          {ALL_NOTES.map((note, index) => {
            const angle = index * 30;
            const radian = (angle - 90) * (Math.PI / 180);
            const x = centerX + radius * Math.cos(radian);
            const y = centerY + radius * Math.sin(radian);
            const isSelected = note === selectedRoot;
            const isEnabled = settings.roots.includes(note);
            
            return (
              <div
                key={note}
                className={`absolute flex items-center justify-center rounded-full border-2 font-bold transition-all duration-200 ${
                  isEnabled ? 'cursor-pointer' : 'cursor-not-allowed'
                } ${
                  isSelected 
                    ? 'w-11 h-11 text-base bg-flame text-lavender-blush border-flame-dark shadow-lg scale-110' 
                    : isEnabled
                    ? 'w-9 h-9 text-sm bg-white text-black border-gray-400 hover:border-gray-600 hover:scale-105'
                    : 'w-9 h-9 text-sm bg-gray-100 text-gray-400 border-gray-300 opacity-60'
                }`}
                style={{
                  left: x - (isSelected ? 22 : 18),
                  top: y - (isSelected ? 22 : 18),
                  transform: `rotate(${-rotation}deg)`
                }}
                onClick={(e) => isEnabled ? handleNoteClick(note, e) : undefined}
              >
                {note}
              </div>
            );
          })}
        </div>
        
        {/* Center randomize button */}
        <div 
          className={`absolute rounded-full transition-all duration-200 flex items-center justify-center ${
            onRandomize 
              ? 'w-10 h-10 bg-flame text-white cursor-pointer hover:bg-opacity-90 hover:scale-110 shadow-lg border-2 border-flame-dark' 
              : 'w-4 h-4 bg-gray-600'
          }`}
          style={{ 
            left: centerX - (onRandomize ? 20 : 8), 
            top: centerY - (onRandomize ? 20 : 8) 
          }}
          onClick={onRandomize ? () => onRandomize() : undefined}
          title={onRandomize ? "Randomize root note" : undefined}
        >
          {onRandomize && (
            <img 
              src={shuffleIcon} 
              alt="Shuffle" 
              width="16" 
              height="16" 
              className="filter brightness-0 invert"
              style={{
                filter: 'brightness(0) invert(1) drop-shadow(0 0 0.5px white) drop-shadow(0 0 0.5px white)'
              }}
            />
          )}
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600 font-medium">Root Note</div>
        <div className="text-lg font-bold text-black">{selectedRoot}</div>
      </div>
    </div>
  );
};

export default RootSelectorWheel;

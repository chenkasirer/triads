import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { StringGroup } from '../types';

interface StringGroupSliderProps {
  selectedStringGroup: StringGroup;
  onStringGroupChange: (stringGroup: StringGroup) => void;
  animateToStringGroup?: StringGroup | null;
}

const ALL_STRING_GROUPS: StringGroup[] = ['654', '543', '432', '321'];

const StringGroupSlider: React.FC<StringGroupSliderProps> = ({ 
  selectedStringGroup, 
  onStringGroupChange, 
  animateToStringGroup 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);

  // Dynamic width based on container
  const [containerWidth, setContainerWidth] = useState(280);
  const knobSize = 60;
  const trackHeight = 8;
  const availableWidth = containerWidth - knobSize;
  const stepWidth = availableWidth / (ALL_STRING_GROUPS.length - 1);

  // Update container width when component mounts or resizes
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        const parentWidth = sliderRef.current.parentElement?.offsetWidth || 280;
        setContainerWidth(Math.max(280, parentWidth)); // Minimum 280px
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const calculatePositionForStringGroup = useCallback((stringGroup: StringGroup) => {
    const index = ALL_STRING_GROUPS.indexOf(stringGroup);
    return index * stepWidth;
  }, [stepWidth]);

  // Update position when selectedStringGroup changes
  useEffect(() => {
    if (!isDragging && !isAnimating) {
      setSliderPosition(calculatePositionForStringGroup(selectedStringGroup));
    }
  }, [selectedStringGroup, isDragging, isAnimating, calculatePositionForStringGroup]);

  // Handle animation to random string group
  useEffect(() => {
    if (animateToStringGroup) {
      setIsAnimating(true);
      const targetPosition = calculatePositionForStringGroup(animateToStringGroup);
      setSliderPosition(targetPosition);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  }, [animateToStringGroup, calculatePositionForStringGroup]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    setIsDragging(true);
    startPosRef.current = e.clientX - sliderPosition;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isAnimating) return;
    const newPosition = e.clientX - startPosRef.current;
    const clampedPosition = Math.max(0, Math.min(newPosition, availableWidth));
    setSliderPosition(clampedPosition);
  };

  const handleMouseUp = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    
    // Snap to nearest string group
    const nearestIndex = Math.round(sliderPosition / stepWidth);
    const snappedPosition = nearestIndex * stepWidth;
    setSliderPosition(snappedPosition);
    
    const newStringGroup = ALL_STRING_GROUPS[nearestIndex];
    if (newStringGroup !== selectedStringGroup) {
      onStringGroupChange(newStringGroup);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating) return;
    e.preventDefault();
    setIsDragging(true);
    if (e.touches[0]) {
      startPosRef.current = e.touches[0].clientX - sliderPosition;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || isAnimating || !e.touches[0]) return;
    const newPosition = e.touches[0].clientX - startPosRef.current;
    const clampedPosition = Math.max(0, Math.min(newPosition, availableWidth));
    setSliderPosition(clampedPosition);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isAnimating) return;
    setIsDragging(false);
    
    // Snap to nearest string group
    const nearestIndex = Math.round(sliderPosition / stepWidth);
    const snappedPosition = nearestIndex * stepWidth;
    setSliderPosition(snappedPosition);
    
    const newStringGroup = ALL_STRING_GROUPS[nearestIndex];
    if (newStringGroup !== selectedStringGroup) {
      onStringGroupChange(newStringGroup);
    }
  };

  const handleStepClick = (stringGroup: StringGroup) => {
    if (isAnimating || isDragging) return;
    onStringGroupChange(stringGroup);
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

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        ref={sliderRef}
        className="relative select-none w-full"
        style={{ height: knobSize }}
      >
        {/* Track */}
        <div 
          className="absolute bg-gray-300 rounded-full"
          style={{
            left: knobSize / 2,
            top: (knobSize - trackHeight) / 2,
            width: availableWidth,
            height: trackHeight
          }}
        />

        {/* Step markers */}
        {ALL_STRING_GROUPS.map((stringGroup, index) => {
          const x = (knobSize / 2) + (index * stepWidth);
          const isSelected = stringGroup === selectedStringGroup;
          
          return (
            <div key={stringGroup}>
              {/* Step marker */}
              <div
                className={`absolute w-3 h-3 rounded-full cursor-pointer transition-colors ${
                  isSelected ? 'bg-flame' : 'bg-gray-400 hover:bg-gray-600'
                }`}
                style={{
                  left: x - 6,
                  top: (knobSize - trackHeight) / 2 - 2
                }}
                onClick={() => handleStepClick(stringGroup)}
              />
            </div>
          );
        })}

        {/* Slider knob */}
        <div
          className={`absolute bg-white border-4 border-flame rounded-full shadow-lg cursor-pointer transition-all duration-200 ${
            isDragging ? 'scale-110 shadow-xl' : 'hover:scale-105'
          } ${isAnimating ? 'transition-all duration-800 ease-out' : isDragging ? 'transition-none' : ''}`}
          style={{
            left: sliderPosition,
            top: 0,
            width: knobSize,
            height: knobSize,
            transform: isDragging ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flex items-center justify-center h-full">
            <span className="text-flame font-bold text-md">
              {selectedStringGroup.split('').join('-')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StringGroupSlider;

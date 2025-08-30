import React from 'react';
import type { TriadExercise } from '../types';

interface ExerciseDisplayProps {
  exercise: TriadExercise;
  showAnswer: boolean;
}

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ exercise, showAnswer }) => {
  const formatInversion = (inversion: string) => {
    switch (inversion) {
      case 'root': return 'Root Position';
      case 'first': return '1st Inversion';
      case 'second': return '2nd Inversion';
      default: return inversion;
    }
  };

  const formatQuality = (quality: string) => {
    return quality.charAt(0).toUpperCase() + quality.slice(1);
  };

  const formatStringGroup = (stringGroup: string) => {
    return `Strings ${stringGroup.split('').join('-')}`;
  };

  return (
    <div className="bg-white rounded-lg p-8 border border-gray">
      <div className="text-center">
        
        {/* Central Root Note */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-flame mb-4">
            <span className="text-5xl font-bold text-lavender-blush">
              {exercise.root}
            </span>
          </div>
          <div className="text-2xl font-semibold text-black">
            {formatQuality(exercise.quality)}
          </div>
        </div>
        
        {/* Secondary Details */}
        <div className="flex justify-center gap-8 text-sm text-gray">
          <div className="text-center">
            <div className="font-medium mb-1">Inversion</div>
            <div className="text-black font-semibold">
              {formatInversion(exercise.inversion)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-medium mb-1">Strings</div>
            <div className="text-black font-semibold">
              {formatStringGroup(exercise.stringGroup)}
            </div>
          </div>
        </div>
        
        {!showAnswer && (
          <div className="mt-8 p-4 bg-sunset rounded-lg">
            <p className="text-black">
              Find and play this triad on the fretboard, then reveal the answer to check your work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDisplay;

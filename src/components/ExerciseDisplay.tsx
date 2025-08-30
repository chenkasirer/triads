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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-8">
          Practice This Triad
        </h2>
        
        {/* Central Root Note */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gray-900 dark:bg-white mb-4">
            <span className="text-5xl font-bold text-white dark:text-gray-900">
              {exercise.root}
            </span>
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatQuality(exercise.quality)} Triad
          </div>
        </div>
        
        {/* Secondary Details */}
        <div className="flex justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="text-center">
            <div className="font-medium mb-1">Inversion</div>
            <div className="text-gray-900 dark:text-gray-300 font-semibold">
              {formatInversion(exercise.inversion)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-medium mb-1">Strings</div>
            <div className="text-gray-900 dark:text-gray-300 font-semibold">
              {formatStringGroup(exercise.stringGroup)}
            </div>
          </div>
        </div>
        
        {!showAnswer && (
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">
              Find and play this triad on the fretboard, then reveal the answer to check your work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDisplay;

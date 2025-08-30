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
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Practice This Triad
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-base">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Root</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-white">
              {exercise.root}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Quality</div>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">
              {formatQuality(exercise.quality)}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Inversion</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatInversion(exercise.inversion)}
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
            <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">Strings</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatStringGroup(exercise.stringGroup)}
            </div>
          </div>
        </div>
        
        {!showAnswer && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
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

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
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Practice This Triad
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-lg">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
            <div className="text-blue-600 dark:text-blue-400 font-semibold">Root</div>
            <div className="text-2xl font-bold text-blue-800 dark:text-blue-300">
              {exercise.root}
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <div className="text-green-600 dark:text-green-400 font-semibold">Quality</div>
            <div className="text-xl font-bold text-green-800 dark:text-green-300">
              {formatQuality(exercise.quality)}
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
            <div className="text-purple-600 dark:text-purple-400 font-semibold">Inversion</div>
            <div className="text-lg font-bold text-purple-800 dark:text-purple-300">
              {formatInversion(exercise.inversion)}
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
            <div className="text-orange-600 dark:text-orange-400 font-semibold">Strings</div>
            <div className="text-lg font-bold text-orange-800 dark:text-orange-300">
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

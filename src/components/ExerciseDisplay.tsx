import React from 'react';
import type { TriadExercise } from '../types';
import { getTriadNotes } from '../fretboard';

interface ExerciseDisplayProps {
  exercise: TriadExercise;
  showAnswer: boolean;
}

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ exercise, showAnswer }) => {
  const formatQuality = (quality: string) => {
    return quality.charAt(0).toUpperCase() + quality.slice(1);
  };

  const formatStringGroup = (stringGroup: string) => {
    return `Strings ${stringGroup.split('').join('-')}`;
  };

  const getInversions = () => {
    const triadNotes = getTriadNotes(exercise.root, exercise.quality);
    return {
      root: [triadNotes.root, triadNotes.third, triadNotes.fifth],
      first: [triadNotes.third, triadNotes.fifth, triadNotes.root],
      second: [triadNotes.fifth, triadNotes.root, triadNotes.third]
    };
  };

  const inversions = getInversions();

  return (
    <div className="bg-white rounded-lg p-8 shadow-lg">
      <div className="text-center">
        
        {/* Horizontal Layout */}
        <div className="mb-8 flex items-center justify-center gap-16">
          {/* Root Note on the left */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-36 h-36 rounded-full bg-flame mb-4">
              <span className="text-5xl font-bold text-lavender-blush">
                {exercise.root}
              </span>
            </div>
            <div className="text-2xl font-semibold text-black">
              {formatQuality(exercise.quality)}
            </div>
          </div>

          {/* Right side: Inversions and Focus Area stacked */}
          <div className="space-y-6">
            {/* Inversions */}
            <div>
              <div className="text-base text-gray font-medium mb-3">Inversions:</div>
              <div className="space-y-2">
                <div className="text-base">
                  <span className="font-semibold text-black w-14 inline-block">Root</span> 
                  <span className="flex items-center gap-1.5 inline-flex ml-3">
                    <span className="w-6 h-6 rounded-full bg-flame text-white text-sm flex items-center justify-center font-bold">{inversions.root[0]}</span>
                    <span className="mx-1 text-gray">-</span>
                    <span className="w-6 h-6 rounded-full bg-sunset text-black text-sm flex items-center justify-center font-bold">{inversions.root[1]}</span>
                    <span className="mx-1 text-gray">-</span>
                    <span className="w-6 h-6 rounded-full bg-black text-white text-sm flex items-center justify-center font-bold">{inversions.root[2]}</span>
                  </span>
                </div>
                <div className="text-base">
                  <span className="font-semibold text-black w-14 inline-block">1<sup>st</sup></span> 
                  <span className="flex items-center gap-1.5 inline-flex ml-3">
                    <span className="w-6 h-6 rounded-full bg-sunset text-black text-sm flex items-center justify-center font-bold">{inversions.first[0]}</span>
                    <span className="mx-1 text-gray">-</span>
                    <span className="w-6 h-6 rounded-full bg-black text-white text-sm flex items-center justify-center font-bold">{inversions.first[1]}</span>
                    <span className="mx-1 text-gray">-</span>
                    <span className="w-6 h-6 rounded-full bg-flame text-white text-sm flex items-center justify-center font-bold">{inversions.first[2]}</span>
                  </span>
                </div>
                <div className="text-base">
                  <span className="font-semibold text-black w-14 inline-block">2<sup>nd</sup></span> 
                  <span className="flex items-center gap-1.5 inline-flex ml-3">
                    <span className="w-6 h-6 rounded-full bg-black text-white text-sm flex items-center justify-center font-bold">{inversions.second[0]}</span>
                    <span className="mx-1 text-gray">-</span>
                    <span className="w-6 h-6 rounded-full bg-flame text-white text-sm flex items-center justify-center font-bold">{inversions.second[1]}</span>
                    <span className="mx-1 text-gray">-</span>
                    <span className="w-6 h-6 rounded-full bg-sunset text-black text-sm flex items-center justify-center font-bold">{inversions.second[2]}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Focus Area */}
            <div>
              <div className="text-base text-gray font-medium mb-3">Focus Area:</div>
              <div className="text-lg text-black font-semibold">
                {formatStringGroup(exercise.stringGroup)}
              </div>
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

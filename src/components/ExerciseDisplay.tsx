import React from 'react';
import type { TriadExercise } from '../types';
import { getTriadNotes } from '../fretboard';
import { useAppStore } from '../store';
import RootSelectorWheel from './RootSelectorWheel';
import StringGroupSlider from './StringGroupSlider';
import { RootHistoryPane } from './RootHistoryPane';

interface ExerciseDisplayProps {
  exercise: TriadExercise;
  showAnswer: boolean;
}

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ exercise, showAnswer }) => {
  const { setExerciseRoot, animateToRoot, setExerciseStringGroup, animateToStringGroup, generateNewExercise } = useAppStore();
  
  const formatQuality = (quality: string) => {
    return quality.charAt(0).toUpperCase() + quality.slice(1);
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
    <div className="bg-white rounded-lg p-4 sm:p-8 shadow-lg w-full">
      <div className="text-center w-full">
        
        {/* Responsive Layout: Stack on mobile, horizontal on large screens */}
        <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center md:justify-center md:gap-12 lg:gap-16 gap-6 sm:gap-8 w-full">
          {/* Root Selector Wheel */}
          <div className="text-center flex-shrink-0">
            <RootSelectorWheel
              selectedRoot={exercise.root}
              onRootChange={setExerciseRoot}
              onRandomize={generateNewExercise}
              animateToRoot={animateToRoot}
              size={260}
            />
            <div className="text-lg sm:text-xl md:text-2xl font-semibold text-black mt-4">
              {formatQuality(exercise.quality)}
            </div>
          </div>

          {/* Inversions and Focus Area */}
          <div className="space-y-4 sm:space-y-6 w-full md:w-auto md:text-left text-center">
            {/* Inversions */}
            <div>
              <div className="text-sm sm:text-base text-gray font-medium mb-3">Inversions</div>
              <div className="space-y-2">
                <div className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <span className="font-semibold text-black w-full sm:w-12 md:w-14 text-center sm:text-left">Root</span> 
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 sm:ml-2 md:ml-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-flame text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.root[0]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sunset text-black text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.root[1]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.root[2]}</span>
                  </div>
                </div>
                <div className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <span className="font-semibold text-black w-full sm:w-12 md:w-14 text-center sm:text-left">1<sup>st</sup></span> 
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 sm:ml-2 md:ml-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sunset text-black text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.first[0]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.first[1]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-flame text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.first[2]}</span>
                  </div>
                </div>
                <div className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
                  <span className="font-semibold text-black w-full sm:w-12 md:w-14 text-center sm:text-left">2<sup>nd</sup></span> 
                  <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 sm:ml-2 md:ml-3">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-black text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.second[0]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-flame text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.second[1]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-sunset text-black text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.second[2]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* String Group Selector */}
            <div>
              <StringGroupSlider
                selectedStringGroup={exercise.stringGroup}
                onStringGroupChange={setExerciseStringGroup}
                animateToStringGroup={animateToStringGroup}
              />
            </div>

            {/* Session History integrated with exercise controls */}
            <div className="pt-2 border-t border-gray-200">
              <RootHistoryPane />
            </div>
          </div>
        </div>
        
        {!showAnswer && (
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-sunset rounded-lg">
            <p className="text-black text-sm sm:text-base">
              Find and play this triad on the fretboard, then reveal the answer to check your work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDisplay;

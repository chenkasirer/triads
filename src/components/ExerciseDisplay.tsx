import React, { useMemo } from 'react';
import type { TriadExercise } from '../types';
import { getTriadNotes } from '../fretboard';
import { useAppStore } from '../store';
import RootSelectorWheel from './RootSelectorWheel';
import StringGroupSlider from './StringGroupSlider';
import { RootHistoryPane } from './RootHistoryPane';
import QualitySelector from './QualitySelector';

interface ExerciseDisplayProps {
  exercise: TriadExercise;
}

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({ exercise }) => {
  const { setExerciseRoot, animateToRoot, setExerciseStringGroup, animateToStringGroup, setExerciseQuality, generateNewExercise } = useAppStore();

  const inversions = useMemo(() => {
    const triadNotes = getTriadNotes(exercise.root, exercise.quality);
    return {
      root: [triadNotes.root, triadNotes.third, triadNotes.fifth],
      first: [triadNotes.third, triadNotes.fifth, triadNotes.root],
      second: [triadNotes.fifth, triadNotes.root, triadNotes.third]
    };
  }, [exercise.root, exercise.quality]);

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
            <div className="mt-4">
              <QualitySelector
                selectedQuality={exercise.quality}
                onQualityChange={setExerciseQuality}
              />
            </div>
          </div>

          {/* Inversions and Focus Area */}
          <div className="space-y-4 sm:space-y-6 w-full md:w-80 lg:w-96 md:text-left text-center">
            {/* Inversions */}
            <div className="w-full">
              <div className="text-sm sm:text-base text-gray font-medium mb-3">Inversions</div>
              <div className="space-y-2 w-full">
                <div className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 w-full">
                  <span className="font-semibold text-black w-full sm:w-12 md:w-14 text-center sm:text-left flex-shrink-0">Root</span> 
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:pl-2 md:pl-3 border border-transparent">
                    <span className="w-10 h-10 rounded-full bg-flame text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.root[0]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-10 h-10 rounded-full bg-sunset text-black text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.root[1]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-10 h-10 rounded-full bg-black text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.root[2]}</span>
                  </div>
                </div>
                <div className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 w-full">
                  <span className="font-semibold text-black w-full sm:w-12 md:w-14 text-center sm:text-left flex-shrink-0">1<sup>st</sup></span> 
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:pl-2 md:pl-3 border border-transparent">
                    <span className="w-10 h-10 rounded-full bg-sunset text-black text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.first[0]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-10 h-10 rounded-full bg-black text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.first[1]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-10 h-10 rounded-full bg-flame text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.first[2]}</span>
                  </div>
                </div>
                <div className="text-sm sm:text-base flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 w-full">
                  <span className="font-semibold text-black w-full sm:w-12 md:w-14 text-center sm:text-left flex-shrink-0">2<sup>nd</sup></span> 
                  <div className="flex items-center justify-center gap-1 sm:gap-1.5 w-full sm:pl-2 md:pl-3 border border-transparent">
                    <span className="w-10 h-10 rounded-full bg-black text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.second[0]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-10 h-10 rounded-full bg-flame text-white text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.second[1]}</span>
                    <span className="mx-0.5 sm:mx-1 text-gray">-</span>
                    <span className="w-10 h-10 rounded-full bg-sunset text-black text-xs sm:text-sm flex items-center justify-center font-bold">{inversions.second[2]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* String Group Selector */}
            <div className="w-full">
              <StringGroupSlider
                selectedStringGroup={exercise.stringGroup}
                onStringGroupChange={setExerciseStringGroup}
                animateToStringGroup={animateToStringGroup}
              />
            </div>

            {/* Session History integrated with exercise controls */}
            <div className="pt-2 border-t border-gray-200 w-full">
              <RootHistoryPane />
            </div>
          </div>
        </div>       
      </div>
    </div>
  );
};

export default ExerciseDisplay;

import { useEffect } from 'react';
import { useAppStore } from './store';
import { getTriadPositions } from './fretboard';
import Fretboard from './components/Fretboard';
import ExerciseDisplay from './components/ExerciseDisplay';
import SettingsPanel from './components/SettingsPanel';
import { Shuffle, Eye, EyeOff, Music } from 'lucide-react';

function App() {
  const { 
    currentExercise, 
    showAnswer, 
    generateNewExercise, 
    toggleAnswer 
  } = useAppStore();

  // Generate first exercise on load
  useEffect(() => {
    if (!currentExercise) {
      generateNewExercise();
    }
  }, [currentExercise, generateNewExercise]);

  const fretboardPositions = currentExercise ? 
    getTriadPositions(
      currentExercise.root,
      currentExercise.quality,
      currentExercise.inversion,
      currentExercise.stringGroup
    ) : [];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
              <Music className="text-white dark:text-gray-900" size={20} />
            </div>
            <h1 className="text-xl font-medium text-gray-900 dark:text-white">
              Guitar Triad Trainer
            </h1>
          </div>
          <SettingsPanel />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {/* Exercise Display */}
          {currentExercise && (
            <ExerciseDisplay exercise={currentExercise} showAnswer={showAnswer} />
          )}

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <button
              onClick={generateNewExercise}
              className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <Shuffle size={18} />
              New Exercise
            </button>
            
            <button
              onClick={toggleAnswer}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                showAnswer 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
              }`}
            >
              {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
          </div>

          {/* Fretboard */}
          {showAnswer && currentExercise && (
            <div className="flex justify-center">
              <Fretboard positions={fretboardPositions} />
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {!currentExercise 
                ? 'Loading...'
                : !showAnswer
                  ? 'Try to find the triad on your guitar first, then reveal the answer to check!'
                  : 'Study the fretboard above, then generate a new exercise to continue practicing.'
              }
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Practice guitar triads across different roots, qualities, inversions, and string groups.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

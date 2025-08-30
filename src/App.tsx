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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Guitar Triad Trainer
            </h1>
          </div>
          <SettingsPanel />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Exercise Display */}
          {currentExercise && (
            <ExerciseDisplay exercise={currentExercise} showAnswer={showAnswer} />
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={generateNewExercise}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Shuffle size={20} />
              New Exercise
            </button>
            
            <button
              onClick={toggleAnswer}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                showAnswer 
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {showAnswer ? <EyeOff size={20} /> : <Eye size={20} />}
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
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
            <p className="text-blue-800 dark:text-blue-200">
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
      <footer className="mt-12 bg-white dark:bg-gray-800 border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
          <p>Practice guitar triads across different roots, qualities, inversions, and string groups.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

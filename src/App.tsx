import { useEffect } from 'react';
import { useAppStore } from './store';
import { getAllTriadPositions } from './fretboard';
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
    getAllTriadPositions(
      currentExercise.root,
      currentExercise.quality,
      currentExercise.stringGroup
    ) : [];

  return (
    <div className="min-h-screen bg-white transition-colors">
      {/* Header */}
      <header className="border-b border-gray">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-flame flex items-center justify-center">
              <Music className="text-lavender-blush" size={20} />
            </div>
            <h1 className="text-xl font-medium text-black">
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
              className="flex items-center gap-2 px-5 py-2.5 bg-flame text-lavender-blush rounded-md hover:bg-flame transition-colors text-sm font-medium"
            >
              <Shuffle size={18} />
              Random Root
            </button>
            
            <button
              onClick={toggleAnswer}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                showAnswer 
                  ? 'bg-gray text-lavender-blush'
                  : 'bg-black text-lavender-blush'
              }`}
            >
              {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
              {showAnswer ? 'Hide Fretboard' : 'Show Fretboard'}
            </button>
          </div>

          {/* Fretboard */}
          {showAnswer && currentExercise && (
            <div className="flex justify-center">
              <Fretboard positions={fretboardPositions} />
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center text-gray text-sm">
          <p>Practice guitar triads across different roots, qualities, inversions, and string groups.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

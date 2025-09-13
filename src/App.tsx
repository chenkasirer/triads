import { useEffect } from 'react';
import { useAppStore } from './store';
import { getAllTriadPositions } from './fretboard';
import Fretboard from './components/Fretboard';
import ExerciseDisplay from './components/ExerciseDisplay';
import SettingsPanel from './components/SettingsPanel';
import CookieConsent from './components/CookieConsent';
import { Eye, EyeOff } from 'lucide-react';
import logoSvg from './assets/triad-fretboard.svg';

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
    <div className="min-h-screen bg-gray-50 transition-colors flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden shadow-md">
              <img src={logoSvg} alt="Triad Trainer Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-black">
              Guitar Triad Trainer
            </h1>
          </div>
          <SettingsPanel />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1">
        <div className="space-y-6 sm:space-y-10 w-full">
          {/* Exercise Display */}
          {currentExercise && (
            <ExerciseDisplay exercise={currentExercise} showAnswer={showAnswer} />
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={toggleAnswer}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                showAnswer 
                  ? 'bg-gray text-lavender-blush'
                  : 'bg-black text-lavender-blush'
              }`}
            >
              {showAnswer ? <EyeOff size={18} /> : <Eye size={18} />}
              {showAnswer ? 'Hide Fretboard' : 'Show Fretboard'}
            </button>
          </div>

          {/* Fretboard with smooth animation */}
          <div 
            className={`transition-all duration-500 ease-in-out ${
              showAnswer ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}
            style={{ overflow: showAnswer ? 'visible' : 'hidden' }}
          >
            <div 
              className={`flex justify-center transform transition-all duration-500 ease-in-out ${
                showAnswer ? 'translate-y-0 scale-100' : '-translate-y-4 scale-95'
              }`}
            >
              {currentExercise && <Fretboard positions={fretboardPositions} />}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-sm mt-auto">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center text-gray text-sm">
          <div className="flex items-center justify-center gap-2">
            <a 
              href="https://github.com/chenkasirer/triads" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-black brightness-0 opacity-60 hover:opacity-100 transition-colors"
              >
              <span className="text-xs sm:text-sm">vibe coded by chenkasirer</span>
              <img 
                src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/github.svg" 
                alt="GitHub" 
                width="16" 
                height="16"
                className="filter brightness-0 opacity-60 hover:opacity-100 transition-opacity"
              />

            </a>
          </div>
        </div>
      </footer>

      {/* Cookie Consent */}
      <CookieConsent />
    </div>
  );
}

export default App;

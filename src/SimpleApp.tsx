import { useEffect } from 'react';
import { useAppStore } from './store';
import { getTriadPositions } from './fretboard';
import Fretboard from './components/SimpleFretboard';

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
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0'
      }}>
        <div className="container">
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            margin: 0,
            color: '#1f2937'
          }}>
            🎸 Guitar Triad Trainer
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container" style={{ paddingTop: '2rem' }}>
        {/* Exercise Display */}
        {currentExercise && (
          <div className="card" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
              Practice This Triad
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                backgroundColor: '#dbeafe', 
                padding: '1rem', 
                borderRadius: '0.5rem' 
              }}>
                <div style={{ color: '#2563eb', fontWeight: '600' }}>Root</div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>
                  {currentExercise.root}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#dcfce7', 
                padding: '1rem', 
                borderRadius: '0.5rem' 
              }}>
                <div style={{ color: '#16a34a', fontWeight: '600' }}>Quality</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#15803d' }}>
                  {formatQuality(currentExercise.quality)}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#f3e8ff', 
                padding: '1rem', 
                borderRadius: '0.5rem' 
              }}>
                <div style={{ color: '#9333ea', fontWeight: '600' }}>Inversion</div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {formatInversion(currentExercise.inversion)}
                </div>
              </div>
              
              <div style={{ 
                backgroundColor: '#fed7aa', 
                padding: '1rem', 
                borderRadius: '0.5rem' 
              }}>
                <div style={{ color: '#ea580c', fontWeight: '600' }}>Strings</div>
                <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {formatStringGroup(currentExercise.stringGroup)}
                </div>
              </div>
            </div>
            
            {!showAnswer && (
              <div style={{ 
                padding: '1rem', 
                backgroundColor: '#f3f4f6', 
                borderRadius: '0.5rem',
                color: '#6b7280'
              }}>
                Find and play this triad on the fretboard, then reveal the answer to check your work.
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <button
            onClick={generateNewExercise}
            className="btn btn-primary"
          >
            🎲 New Exercise
          </button>
          
          <button
            onClick={toggleAnswer}
            className={showAnswer ? "btn btn-danger" : "btn btn-success"}
          >
            {showAnswer ? '🙈 Hide Answer' : '👁️ Show Answer'}
          </button>
        </div>

        {/* Fretboard */}
        {showAnswer && currentExercise && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <Fretboard positions={fretboardPositions} />
          </div>
        )}

        {/* Instructions */}
        <div style={{
          backgroundColor: '#dbeafe',
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'center',
          color: '#1e40af'
        }}>
          {!currentExercise 
            ? 'Loading...'
            : !showAnswer
              ? 'Try to find the triad on your guitar first, then reveal the answer to check!'
              : 'Study the fretboard above, then generate a new exercise to continue practicing.'
          }
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '3rem',
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '2rem 0',
        textAlign: 'center',
        color: '#6b7280'
      }}>
        <div className="container">
          <p>Practice guitar triads across different roots, qualities, inversions, and string groups.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

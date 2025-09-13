import { create } from 'zustand';
import type { TriadExercise, ExerciseSettings, Note, StringGroup, TriadQuality } from './types';

interface AppState {
  settings: ExerciseSettings;
  currentExercise: TriadExercise | null;
  showAnswer: boolean;
  animateToRoot: Note | null;
  animateToStringGroup: StringGroup | null;
  sessionHistory: Note[];
  allowRepeatRoots: boolean;
  updateSettings: (settings: Partial<ExerciseSettings>) => void;
  generateNewExercise: () => void;
  setExerciseRoot: (root: Note) => void;
  setExerciseStringGroup: (stringGroup: StringGroup) => void;
  setExerciseQuality: (quality: TriadQuality) => void;
  addToHistory: (root: Note) => void;
  clearHistory: () => void;
  toggleAnswer: () => void;
}

const defaultSettings: ExerciseSettings = {
  roots: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
  qualities: ['major', 'minor'],
  inversions: ['root', 'first', 'second'],
  stringGroups: ['654', '543', '432', '321'],
};

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const useAppStore = create<AppState>((set, get) => ({
  settings: defaultSettings,
  currentExercise: null,
  showAnswer: true,
  animateToRoot: null,
  animateToStringGroup: null,
  sessionHistory: [],
  allowRepeatRoots: false,
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  
  generateNewExercise: () => {
    const { settings, sessionHistory, allowRepeatRoots } = get();
    
    // Get available roots based on repeat settings
    let availableRoots = settings.roots;
    if (!allowRepeatRoots && sessionHistory.length > 0) {
      availableRoots = settings.roots.filter(root => !sessionHistory.includes(root));
      // If all roots have been used, reset and use all roots again
      if (availableRoots.length === 0) {
        availableRoots = settings.roots;
        set({ sessionHistory: [] }); // Reset history when all roots are exhausted
      }
    }
    
    const newRoot = getRandomItem(availableRoots);
    const newStringGroup = getRandomItem(settings.stringGroups);
    const exercise: TriadExercise = {
      root: newRoot,
      quality: getRandomItem(settings.qualities),
      inversion: getRandomItem(settings.inversions),
      stringGroup: newStringGroup,
    };
    
    // Add to history and update exercise
    const { sessionHistory: currentHistory } = get();
    if (!currentHistory.includes(newRoot)) {
      set({ 
        currentExercise: exercise, 
        animateToRoot: newRoot,
        animateToStringGroup: newStringGroup,
        sessionHistory: [...currentHistory, newRoot]
      });
    } else {
      set({ 
        currentExercise: exercise, 
        animateToRoot: newRoot,
        animateToStringGroup: newStringGroup
      });
    }
    
    // Clear animation after a delay
    setTimeout(() => set({ animateToRoot: null, animateToStringGroup: null }), 100);
  },
  
  setExerciseRoot: (root) => {
    const { currentExercise, sessionHistory } = get();
    if (currentExercise) {
      set({ 
        currentExercise: { ...currentExercise, root },
        animateToRoot: null 
      });
      // Add to history if not already present
      if (!sessionHistory.includes(root)) {
        set({ sessionHistory: [...sessionHistory, root] });
      }
    }
  },
  
  setExerciseStringGroup: (stringGroup) => {
    const { currentExercise } = get();
    if (currentExercise) {
      set({ 
        currentExercise: { ...currentExercise, stringGroup },
        animateToStringGroup: null 
      });
    }
  },
  
  setExerciseQuality: (quality) => {
    const { currentExercise } = get();
    if (currentExercise) {
      set({ 
        currentExercise: { ...currentExercise, quality }
      });
    }
  },
  
  toggleAnswer: () => set((state) => ({ showAnswer: !state.showAnswer })),
  
  addToHistory: (root) => {
    const { sessionHistory } = get();
    if (!sessionHistory.includes(root)) {
      set({ sessionHistory: [...sessionHistory, root] });
    }
  },
  
  clearHistory: () => set({ sessionHistory: [] }),
}));

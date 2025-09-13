import { create } from 'zustand';
import type { TriadExercise, ExerciseSettings, Note } from './types';

interface AppState {
  settings: ExerciseSettings;
  currentExercise: TriadExercise | null;
  showAnswer: boolean;
  animateToRoot: Note | null;
  updateSettings: (settings: Partial<ExerciseSettings>) => void;
  generateNewExercise: () => void;
  setExerciseRoot: (root: Note) => void;
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
  showAnswer: false,
  animateToRoot: null,
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  
  generateNewExercise: () => {
    const { settings } = get();
    const newRoot = getRandomItem(settings.roots);
    const exercise: TriadExercise = {
      root: newRoot,
      quality: getRandomItem(settings.qualities),
      inversion: getRandomItem(settings.inversions),
      stringGroup: getRandomItem(settings.stringGroups),
    };
    set({ currentExercise: exercise, animateToRoot: newRoot });
    // Clear animation after a delay
    setTimeout(() => set({ animateToRoot: null }), 100);
  },
  
  setExerciseRoot: (root) => {
    const { currentExercise } = get();
    if (currentExercise) {
      set({ 
        currentExercise: { ...currentExercise, root },
        animateToRoot: null 
      });
    }
  },
  
  toggleAnswer: () => set((state) => ({ showAnswer: !state.showAnswer })),
}));

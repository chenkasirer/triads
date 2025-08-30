import { create } from 'zustand';
import type { TriadExercise, ExerciseSettings } from './types';

interface AppState {
  settings: ExerciseSettings;
  currentExercise: TriadExercise | null;
  showAnswer: boolean;
  updateSettings: (settings: Partial<ExerciseSettings>) => void;
  generateNewExercise: () => void;
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
  
  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
  
  generateNewExercise: () => {
    const { settings } = get();
    const exercise: TriadExercise = {
      root: getRandomItem(settings.roots),
      quality: getRandomItem(settings.qualities),
      inversion: getRandomItem(settings.inversions),
      stringGroup: getRandomItem(settings.stringGroups),
    };
    set({ currentExercise: exercise });
  },
  
  toggleAnswer: () => set((state) => ({ showAnswer: !state.showAnswer })),
}));

export type TriadQuality = 'major' | 'minor' | 'diminished';
export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B';
export type Inversion = 'root' | 'first' | 'second';
export type StringGroup = '654' | '543' | '432' | '321';

export interface TriadExercise {
  root: Note;
  quality: TriadQuality;
  inversion: Inversion;
  stringGroup: StringGroup;
}

export interface ExerciseSettings {
  roots: Note[];
  qualities: TriadQuality[];
  inversions: Inversion[];
  stringGroups: StringGroup[];
}

export interface TriadNotes {
  root: Note;
  third: Note;
  fifth: Note;
}

export interface FretPosition {
  string: number;
  fret: number;
  note: Note;
  role: 'root' | 'third' | 'fifth';
}

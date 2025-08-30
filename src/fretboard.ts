import type { Note, TriadQuality, Inversion, StringGroup, TriadNotes, FretPosition } from './types';

// Standard guitar tuning (6th string to 1st string)
const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

// Note intervals in semitones
const NOTE_MAP: { [key in Note]: number } = {
  'C': 0, 'C#': 1, 'D': 2, 'D#': 3, 'E': 4, 'F': 5,
  'F#': 6, 'G': 7, 'G#': 8, 'A': 9, 'A#': 10, 'B': 11
};

const NOTES: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function getNoteFromSemitone(semitone: number): Note {
  return NOTES[semitone % 12];
}

export function getTriadNotes(root: Note, quality: TriadQuality): TriadNotes {
  const rootSemitone = NOTE_MAP[root];
  let thirdInterval: number;
  let fifthInterval: number;

  switch (quality) {
    case 'major':
      thirdInterval = 4; // Major third
      fifthInterval = 7; // Perfect fifth
      break;
    case 'minor':
      thirdInterval = 3; // Minor third
      fifthInterval = 7; // Perfect fifth
      break;
    case 'diminished':
      thirdInterval = 3; // Minor third
      fifthInterval = 6; // Diminished fifth
      break;
  }

  return {
    root,
    third: getNoteFromSemitone(rootSemitone + thirdInterval),
    fifth: getNoteFromSemitone(rootSemitone + fifthInterval),
  };
}

export function getAllTriadPositions(
  root: Note,
  quality: TriadQuality,
  stringGroup: StringGroup
): FretPosition[] {
  const triadNotes = getTriadNotes(root, quality);
  const positions: FretPosition[] = [];
  
  // Get the string numbers for the string group
  const strings = stringGroup.split('').map(Number).reverse(); // Reverse to match guitar string order
  
  // Find all occurrences of triad notes across the specified strings within 12 frets
  strings.forEach(stringNum => {
    const stringRoot = STANDARD_TUNING[stringNum - 1];
    const stringRootSemitone = NOTE_MAP[stringRoot];
    
    // Check each fret position (0-12) for triad notes
    for (let fret = 0; fret <= 12; fret++) {
      const currentNoteSemitone = (stringRootSemitone + fret) % 12;
      const currentNote = getNoteFromSemitone(currentNoteSemitone);
      
      // Check if this note is part of the triad
      if (currentNote === triadNotes.root) {
        positions.push({
          string: stringNum,
          fret,
          note: currentNote,
          role: 'root',
        });
      } else if (currentNote === triadNotes.third) {
        positions.push({
          string: stringNum,
          fret,
          note: currentNote,
          role: 'third',
        });
      } else if (currentNote === triadNotes.fifth) {
        positions.push({
          string: stringNum,
          fret,
          note: currentNote,
          role: 'fifth',
        });
      }
    }
  });
  
  return positions;
}

export function getTriadPositions(
  root: Note,
  quality: TriadQuality,
  inversion: Inversion,
  stringGroup: StringGroup
): FretPosition[] {
  const triadNotes = getTriadNotes(root, quality);
  const positions: FretPosition[] = [];
  
  // Get the string numbers for the string group
  const strings = stringGroup.split('').map(Number).reverse(); // Reverse to match guitar string order
  
  // Simple triad positions (basic implementation)
  // This is a simplified version - in a full implementation you'd have
  // comprehensive triad fingerings for all inversions and string groups
  
  const noteOrder = getInversionOrder(triadNotes, inversion);
  
  strings.forEach((stringNum, index) => {
    if (index < noteOrder.length) {
      const targetNote = noteOrder[index].note;
      const stringRoot = STANDARD_TUNING[stringNum - 1];
      const stringRootSemitone = NOTE_MAP[stringRoot];
      const targetSemitone = NOTE_MAP[targetNote];
      
      // Find the closest fret position (within first 12 frets)
      let fret = (targetSemitone - stringRootSemitone + 12) % 12;
      if (fret > 12) fret -= 12;
      
      positions.push({
        string: stringNum,
        fret,
        note: targetNote,
        role: noteOrder[index].role,
      });
    }
  });
  
  return positions;
}

function getInversionOrder(triadNotes: TriadNotes, inversion: Inversion): Array<{ note: Note; role: 'root' | 'third' | 'fifth' }> {
  const base = [
    { note: triadNotes.root, role: 'root' as const },
    { note: triadNotes.third, role: 'third' as const },
    { note: triadNotes.fifth, role: 'fifth' as const },
  ];
  
  switch (inversion) {
    case 'root':
      return base;
    case 'first':
      return [base[1], base[2], base[0]]; // 3rd, 5th, root
    case 'second':
      return [base[2], base[0], base[1]]; // 5th, root, 3rd
  }
}

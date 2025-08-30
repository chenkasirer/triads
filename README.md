# Guitar Triad Trainer – Local App

A clean, **local-only** web app to practice guitar triads by randomizing roots, triad qualities, inversions, and string groups. Designed to be visually clear, responsive, and distraction-free — no accounts, no hosting.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start practicing!

---

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ExerciseDisplay.tsx    # Shows current triad exercise details
│   ├── Fretboard.tsx          # SVG fretboard with note positions
│   └── SettingsPanel.tsx      # Exercise configuration (roots, qualities, etc.)
├── App.tsx              # Main application component
├── fretboard.ts         # Guitar fretboard logic & triad calculations
├── index.css            # Global styles (Tailwind CSS)
├── main.tsx             # React app entry point
├── store.ts             # Zustand state management
├── types.ts             # TypeScript type definitions
└── vite-env.d.ts        # Vite environment types
```

---

## 🎯 Key Files Overview

### **`src/types.ts`**
Core TypeScript definitions for the application:
- `TriadQuality`: 'major' | 'minor' | 'diminished'
- `Note`: All 12 chromatic notes (C, C#, D, etc.)
- `Inversion`: 'root' | 'first' | 'second'
- `StringGroup`: '654' | '543' | '432' | '321'
- `TriadExercise`: Complete exercise configuration
- `FretPosition`: Fretboard position with note and role info

### **`src/store.ts`**
Zustand-based state management:
- Exercise settings (which roots, qualities, inversions to practice)
- Current exercise state
- Show/hide answer functionality
- Random exercise generation logic

### **`src/fretboard.ts`**
Guitar theory and fretboard calculations:
- `getTriadNotes()`: Calculates root, third, fifth for any triad
- `getTriadPositions()`: Maps triad notes to fretboard positions
- Standard guitar tuning and note mapping
- Inversion logic for different chord voicings

### **`src/components/Fretboard.tsx`**
Interactive SVG fretboard component:
- Renders 12-fret guitar neck
- Color-coded note positions (red=root, blue=third, green=fifth)
- Fret markers and string labels
- Responsive design with legend

### **`src/components/ExerciseDisplay.tsx`**
Exercise information display:
- Current triad details in colored cards
- Formatted display for root, quality, inversion, string group
- Instructions and practice guidance
- Responsive grid layout

---

## 🎸 Current Functionality

### **Exercise Builder**
- Choose which roots, triad types, inversions, and string groups to practice
- Configurable through settings panel (currently simplified)

### **Practice Mode**
- Generates randomized prompts (e.g., "C major, 1st inversion, strings 5-4-3")
- Show/hide fretboard answers
- Clean exercise flow with "New Exercise" button

### **Fretboard View**
- Clean SVG fretboard with highlighted triad notes
- Color-coded by chord tone role (root, third, fifth)
- Standard tuning visualization
- Responsive layout

---

## 🛠 Tech Stack

- **Vite + TypeScript** → Fast dev server, strong typing
- **React** → UI framework
- **Tailwind CSS v4** → Utility-first styling with `@tailwindcss/vite` plugin
- **Zustand** → Simple state management
- **Lucide React** → Modern icons
- **SVG** → Fretboard rendering, crisp and scalable

---

## 🔧 Configuration Files

- `vite.config.ts` → Vite configuration with React and Tailwind plugins
- `tsconfig.json` → TypeScript compiler configuration
- `package.json` → Dependencies and scripts
- `index.css` → Tailwind CSS import (`@import "tailwindcss"`)

---

## 🎵 Usage

1. **Generate Exercise**: Click "New Exercise" to get a random triad configuration
2. **Practice**: Try to find the triad on your guitar first
3. **Check Answer**: Click "Show Answer" to see the fretboard positions
4. **Repeat**: Generate new exercises to continue practicing

The trainer helps you internalize triads across the neck by drilling:
- All 12 roots (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
- 3 triad qualities (major, minor, diminished)
- 3 inversions (root position, 1st inversion, 2nd inversion)  
- 4 common string groups (6-5-4, 5-4-3, 4-3-2, 3-2-1)

---

## 🚧 Future Enhancements

- **Audio Playback**: Tone.js integration for note/chord sounds
- **Local Persistence**: Dexie.js for saving presets and progress
- **Settings Panel**: Full configuration interface
- **Progress Tracking**: Session statistics and spaced repetition
- **Advanced Fingerings**: More comprehensive triad positions
- **PWA Support**: Installable app capability
- **Tauri Integration**: Desktop app packaging

---

## 📝 Development Notes

- No PostCSS config needed (Tailwind v4 with Vite plugin handles everything)
- Uses `@import "tailwindcss"` syntax (not the old `@tailwind` directives)
- Dev server runs on `http://localhost:5173/` 
- Hot reload enabled for all components and styles

---

**This trainer is designed as a fast, lightweight practice companion — easy to start, flexible to configure, and enjoyable to use.** 🎸

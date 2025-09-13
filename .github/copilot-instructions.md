# Copilot Instructions for Triads Project

## Overview
This is a **Guitar Triad Trainer** web application built with React, TypeScript, and Vite. The app helps users practice identifying and playing guitar triads across different positions on the fretboard.

## Project Structure
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom color palette
- **State Management**: Zustand store
- **Components**: Modular React components for UI elements

## Feature Tracking System

### PROMPTS.md File
The `PROMPTS.md` file is the **central feature request and tracking document**. It contains:

1. **Feature Requests**: Numbered with format `F###` (e.g., F001, F002)
2. **Implementation Status**: Marked with emoji indicators
3. **Technical Notes**: Added after implementation

### Status Indicators
- **🚧 F### - Feature Name**: Not started / In progress
- **✅ F### - Feature Name (IMPLEMENTED)**: Successfully completed
- **❌ F### - Feature Name (REJECTED)**: Decided against implementation
- **⏸️ F### - Feature Name (PAUSED)**: On hold for technical/design reasons

### Implementation Process
When implementing features:

1. **Read PROMPTS.md** to understand the request
2. **Plan the implementation** considering existing architecture
3. **Implement the feature** with proper TypeScript typing
4. **Test thoroughly** to ensure functionality
5. **Update PROMPTS.md** with:
   - ✅ status indicator
   - `(IMPLEMENTED)` in the title
   - **Implementation Notes** section with technical details
   - Key files/components created or modified

### Example Entry Format
```markdown
# ✅ F001 - Root selector wheel (IMPLEMENTED)

[Original feature description...]

**Implementation Notes:**
- Created `RootSelectorWheel.tsx` component with interactive circular interface
- Supports mouse and touch drag interactions for smooth rotation
- Direct note clicking for immediate selection
- [Additional technical details...]
```

## Key Architecture Notes

### Components
- **App.tsx**: Main application layout and routing
- **ExerciseDisplay.tsx**: Shows current triad exercise
- **Fretboard.tsx**: Interactive fretboard visualization
- **SettingsPanel.tsx**: User preferences and exercise settings
- **RootSelectorWheel.tsx**: Interactive root note selector (F001)
- **StringGroupSlider.tsx**: Interactive string group selector (F002)

### State Management (store.ts)
- `currentExercise`: Current triad to practice
- `settings`: User preferences for exercise generation
- `showAnswer`: Toggle for fretboard visibility
- `animateToRoot`: For wheel animation effects
- `animateToStringGroup`: For slider animation effects

### Styling
- Custom CSS classes in `index.css` for color palette
- Tailwind for layout and responsive design
- Color scheme: flame (#cf5c36), lavender-blush (#eee5e9), gray (#7c7c7c), sunset (#efc88b)

## Development Guidelines

### Code Quality
- Use TypeScript strictly - no `any` types
- Follow React best practices with hooks
- Keep components modular and reusable
- Clean up unused code and comments

### Testing Approach
- Test in browser with dev server (`npm run dev`)
- Verify responsive design on different screen sizes
- Test both mouse and touch interactions
- Ensure no TypeScript compilation errors

### Future Copilot Instances
When working on this project:
1. **Always check PROMPTS.md first** to understand requested features
2. **Review existing implementations** to maintain consistency
3. **Update tracking status** when starting and completing work
4. **Document implementation details** for future reference
5. **Consider existing architecture** before making major changes

## Current Status
- **F001**: ✅ Root selector wheel - Fully implemented and functional
- **F002**: ✅ String group selector slider - Fully implemented and functional
- **Next Features**: Check PROMPTS.md for upcoming requests

---
*This file should be updated as the project evolves and new patterns emerge.*

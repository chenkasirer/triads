This is a list of feature I'd like to add. For copilot to read and implement.

# ✅ F004 - Quality selector (IMPLEMENTED)

Add an interactive quality selector that allows the user to choose between Major, minor, and diminished triads. The UI should be clean, dynamic, and modern - perhaps a segmented control style with smooth animations and symbols representing each quality (M for major, m for minor, ° for diminished). This should replace the static quality text display under the root wheel.

**Implementation Notes:**
- Created `QualitySelector.tsx` component with segmented control design
- Interactive selector with animated sliding background for smooth transitions
- Quality symbols: M (major), m (minor), ° (diminished)
- Smooth hover effects and click animations
- Added `setExerciseQuality` method to Zustand store for quality selection
- Integrated into ExerciseDisplay layout replacing static quality text
- Modern design with flame color scheme matching app aesthetic
- TypeScript interfaces for proper type safety and quality validation

# ✅ F003 - Root practice history pane (IMPLEMENTED)

Add some kind of ui element which holds, per the current session, the roots the user has gone through. this will let the use track their current exercise session. use this storage to make sure that per session, the same root does not recure when randomizing (maybe make this part configurable).
There should be a button to clear this history element and start over, this should also clear the storage tracking the history.

**Implementation Notes:**
- Created `RootHistoryPane.tsx` component displaying session history in a clean card layout
- Added `sessionHistory` array and `allowRepeatRoots` boolean to Zustand store
- Implemented `addToHistory()` and `clearHistory()` methods in store
- Modified `generateNewExercise()` to avoid duplicate roots when `allowRepeatRoots` is false
- Auto-resets history when all available roots have been practiced
- Updated `setExerciseRoot()` to track manual root selections in history
- Added configurable checkbox to allow/prevent repeat roots during randomization
- Integrated history pane as sidebar in ExerciseDisplay with responsive layout
- Visual indicators show practiced roots with circular badges and count
- Clear button resets session and "Allow repeat roots" toggle for user preference

# ✅ F002 - String group selector slider (IMPLEMENTED)

User should also be able to choose a string group where to show the triad notes.
Make is as a slider with 4 set positions, one for each of the string groups. 
Selection should be smooth and responsive, same as the root note wheel.
When randomizing a root note, a random string group will also be selected, reflected in the position of the slider.

**Implementation Notes:**
- Created `StringGroupSlider.tsx` component with horizontal slider interface
- 4 positions for string groups: 654, 543, 432, 321
- Smooth drag interaction with snap-to-position behavior
- Click on step markers or labels for direct selection
- Animated slider movement for random string group selection
- Visual highlighting of selected string group
- Integrated into ExerciseDisplay replacing the static text display


# ✅ F001 - Root selector wheel (IMPLEMENTED)

The root note in the exercise box should be at the 12 o'clock position of a selector wheel which shall have all 12 notes on.
Use selects a rood by rotating the wheel until the desired root is at the top.
spining the wheel should be smooth and responsive, the root selection changes live whenever a new note is at the 12 o'clock.
root note should be highlighted somehow, phisically bigger or by color.
Random root selection should work as before and should be animated as the wheel spinning to the random chosen root.

**Implementation Notes:**
- Created `RootSelectorWheel.tsx` component with interactive circular interface
- Supports mouse and touch drag interactions for smooth rotation
- Direct note clicking for immediate selection
- Animated spinning effect for random root selection
- Real-time root selection based on 12 o'clock position
- Proper visual highlighting of selected root note


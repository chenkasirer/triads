This is a list of feature I'd like to add. For copilot to read and implement.

# F002 - String group selector slider

User should also be able to choose a string group where to show the triad notes.
Make is as a slider with 4 set positions, one for each of the string groups. 
Selection should be smooth and responsive, same as the root note wheel.
When randomizing a root note, a random string group will also be selected, reflected in the position of the slider.


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


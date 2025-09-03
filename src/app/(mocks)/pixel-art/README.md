Requirements
- Canvas
    - A 15 x 15 grid of cells. Each cell is 20px x 20px.
    - Pixels alternate between white and gray.
- Modes
    - There are 2 modes available: "Draw" and "Erase"
    - Clicking on the individual tab item will activate the respective mode.
- Colorpicker
    - A color can be selected from the list of colors. Selected colors will have a black border to indicate the selected state.
- Drawing mode
    - Clicking on a cell with paint it with the currently-selected color.
    - Dragging on the canvas will fill the underlying cell with the selected color.
- Erasing mode
    - Clicking on a cell with remove any color from that cell.
    - Dragging on the canvas while this mode is selected will remove colors from that cell.
    
<!-- 
  Assumptions made re: requirements ->
  - Going to assume that based on these requirements, the MVP for app is to (1) display a white/gray canvas to draw on, (2) click-to-draw, (3) pick color, (4) mode toggler and (5) click-to-erase
  - Going to leave the drag-to-draw functionality for later if time permits
  (this would be the moment to check in with interviewer for priorities alignment)

  Clarifications I could have asked ->
  - default state for canvas is white/gray patterned grid correct?
  - default mode is drawing mode? let's assume yes
  - what is the default selected color? let's assume Black
  - selecting a new color should not affect previously colored in cells correct?
  - mobile responsive? touch interactions?
  - scope questions -> undo / redo functionality, reset or clear all functionality, color palette popup (accepts user input)
  - canvas state persistence - should canvas state persist across page refreshes or is it okay for drawings to be lost when the user navigates away or refreshes the page?
  
  Edge cases to consider:
  - rapid interaction: How should the app handle very fast clicking or dragging that
might cause performance issues? -> debounce

  High Level Architecture:
  - page.tsx
    - state management for color selection and mode selection will live here
  - components
    - Canvas -> props: gridWidth, gridHeight, mode, activeColor
      - state for Cell data lives here
    - Cell -> props: cellId, color
    - Toolbar
      - Color palette
      - Canvas mode toggle
  

  Test plan/cases:
  - Playwright could be used for end-to-end testing
  - what we want to test for:
    - the initial canvas state is a 15x15 grid of white/gray alternating pattern
    - mode switcher correctly works ie draws or erases
    - selecting a new color does not affect presently colored cells
-->


Colors:
White: #ffffff
Gray: #e9ecef
Black: #000
Red: #cc0001
Orange: #fb940b
Yellow: #ffff01
Green: #01cc00
Teal: #38d9a9
Blue: #228be6
Purple: #7950f2
Beige: #ff8787

<!-- 
Mock Interview Notes:
- do high level planning before jumping into code
- eg what my testing plan is, what components i would need, what state would live in which component
- explain why I'm doing things such as why a key is needed
- better AI prompting -> couldve asked for a more simplified output from the jump
- speak about core functionality, check in with interviewer  
-->


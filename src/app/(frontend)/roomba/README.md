Create a single-screen app that allows the user to move a “roomba” around a 10x10 grid.

Movement is restricted to two buttons: one to move forward, and one to turn right.

Your representation of the roomba on the grid must indicate the direction that the roomba is currently facing.

The roomba cannot pass through walls; if it hits a wall, it should automatically turn right instead of moving forward.


<!-- 
Developer Plan
  Core functionality 
    - robot class
      - move forward
      - turn right (90 degrees)
      - create map (10x10 grid)
        - take in input of wall coordinates (at the very miniumum, the grid edges are walls)
      - movement history -> track which cells have already been cleaned
      - rotate image using css
  User interactions
    - button to move forward
    - button to turn right
  
  State to track:
    - roomba position
    - grid state
    - roomba direction
  Advance scope:
    - drag/drop roomba to any valid cell
    - reset to start (0, 0)

Questions to ask:
- will roomba always start at top left (0, 0)? For this exercise, let's assume yes
- what is the stop condition? for this exercise, let's assume when all cells have been cleaned
- step by 1 or continue until it hits a wall? for this exercise, let's first assume that it steps by 1
- are diagonal movements allowed? for this exercise, assume no
-->
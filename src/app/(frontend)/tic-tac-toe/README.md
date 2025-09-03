# Tic-Tac-Toe

Create a single-screen app that contains a simple implementation of Tic-Tac-Toe. This is a two-player game, where players take turns marking the spaces in a three-by-three grid with "X" or "O". The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. 

### Layout should include:

* A "Tic-Tac-Toe" title at the top of the screen  
* A 3x3 grid, where each cell is tappable and can contain an X, an O, or nothing  
* Some informational text below the grid indicating whose turn it is, or, when the game ends, what the end state is ("Player X won" or "It's a draw").  
* A "Reset" button below the info text.

### Interaction rules:

* The user can tap any square that's not already occupied by an X or O.  
* When a square is filled, the game automatically toggles whose turn it is.  
* When a win state has been found, the board is disabled and the winner is declared in the info text.  
* If the board is filled and no win state has been found, the board is disabled and the tie is declared in the info text.  
* When the "Reset" button is tapped, the board is reset to an empty state. 

<!-- 
Developer Plan
React SPA - front end only challenge; most familiar with React framework

Core functionality:
- create empty board
- get current board state
- reset game
- make a move
  - stop game if move is a winning move (player wins)
  - stop game if board is full (draw)
  - toggle turn state
- get game result 
-->

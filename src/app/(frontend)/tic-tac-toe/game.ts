export class TicTacToeGame {
  private board: (string|null)[][];
  private currentPlayer: string;
  private boardSize: number;
  private winLength: number;
  private gameState: { state: 'playing' | 'won' | 'draw', winningPlayer?: string}

  constructor() {
    this.board = this.createEmptyBoard(3);
    this.currentPlayer = this.getRandomPlayer();
    this.boardSize = 3;
    this.winLength = 3;
    this.gameState = { state: 'playing' }
  }

  // creates empty board of given size
  private createEmptyBoard(boardSize: number) {
    return Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
  }

  getBoard() {
    return this.board.map(row => [...row])
  }

  // resets game to initial state
  reset() {
    this.board = this.createEmptyBoard(this.boardSize);
    this.currentPlayer = this.getRandomPlayer();
    this.gameState = { state: 'playing' }
  }

  // randomly chooses player to start
  private getRandomPlayer() {
    return Math.random() < 0.5 ? 'X' : 'O';
  }

  // updates turn to next player
  private updateTurn() {
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  // checks if position is within board bounds
  private isValidPosition(row: number, col: number) {
    return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
  }
  
  // player makes a move, return true if move is successful, else return false
  makeMove(row: number, col: number) {
    if (!this.isValidPosition(row, col) || this.board[row][col] !== null) {
      return false;
    }

    this.board[row][col] = this.currentPlayer;

    const isWinningMove = this.checkForWinAtTurn(row, col)
    if (isWinningMove) {
      this.gameState = { state: 'won', winningPlayer: this.currentPlayer }
      return false;
    }

    if (this.isBoardFull()) {
      this.gameState = { state: 'draw' }
      return false;
    }
    this.updateTurn();
    return true;
  }

  private checkForWinAtTurn(
    row: number, 
    col: number
  ) {
    // check for win
    const horizontalLine = this.checkLineFromPosition(row, col, 0, 1)
    if (horizontalLine) { return horizontalLine }

    const verticalLine = this.checkLineFromPosition(row, col, 1, 0)
    if (verticalLine) { return verticalLine }

    const diagonalLine = this.checkLineFromPosition(row, col, 1, 1)
    if (diagonalLine) { return diagonalLine }

    const antiDiagonalLine = this.checkLineFromPosition(row, col, 1, -1)
    if (antiDiagonalLine) { return antiDiagonalLine }
    
    return false
  }

  // checks if there is a win from a given position, returns true if win, false otherwise
  private checkLineFromPosition(
    startRow: number, 
    startCol: number,
    deltaRow: number,
    deltaCol: number
  ) {
    const startCell = this.board[startRow][startCol];
    if (startCell === null) { return false }
    let lineLength = 1; // include starting cell in line length

    // check forward direction
    for (let i = 1; i < this.winLength; i++) {
      const row = startRow + (i * deltaRow);
      const col = startCol + (i * deltaCol);

      // stop forward check if we are outside game grid bounds or line is broken
      if (!this.isValidPosition(row, col)) { break; }
      if (this.board[row][col] !== startCell) { break; } 

      lineLength++
    }

    // if we haven't reached win length, check backward direction
    if (lineLength < this.winLength) {
      for (let i = 1; i < this.winLength; i++) {
        const row = startRow - (i * deltaRow);
        const col = startCol - (i * deltaCol);

        // stop backward check if we are outside game grid bounds or line is broken
        if (!this.isValidPosition(row, col)) { break; }
        if (this.board[row][col] !== startCell) { break; } 

        lineLength++

        if (lineLength >= this.winLength) { break; }
      }
    }

    if (lineLength >= this.winLength) { return true }
    return false
  }

  // returns current player
  getCurrentPlayer() {
    return this.currentPlayer;
  }

  isGameOver(): boolean {
    return this.gameState.state !== 'playing'
  }

  private isBoardFull(): boolean {
    return this.board.flat().every(cell => cell !== null);
  }
}
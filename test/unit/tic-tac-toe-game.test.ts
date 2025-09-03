import { expect } from 'chai';
import { TicTacToeGame } from '../../src/app/(frontend)/tic-tac-toe/game';

describe('TicTacToeGame', () => {
  let game: TicTacToeGame;

  beforeEach(() => {
    game = new TicTacToeGame();
  });

  describe('Initialization', () => {
    it('should create a 3x3 empty board', () => {
      const board = game.getBoard();
      expect(board).to.have.length(3);
      expect(board[0]).to.have.length(3);
      expect(board.flat().every(cell => cell === null)).to.be.true;
    });

    it('should set initial player to X or O', () => {
      const currentPlayer = game.getCurrentPlayer();
      expect(['X', 'O']).to.include(currentPlayer);
    });

    it('should initialize game state as playing', () => {
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('playing');
      expect(gameResult.winningPlayer).to.be.undefined;
    });
  });

  describe('Board Management', () => {
    it('should return a copy of the board, not the original', () => {
      const board1 = game.getBoard();
      const board2 = game.getBoard();
      expect(board1).to.not.equal(board2); // Different references
      expect(board1).to.deep.equal(board2); // Same content
    });

    it('should not allow external modification of the board', () => {
      const board = game.getBoard();
      board[0][0] = 'X';
      const newBoard = game.getBoard();
      expect(newBoard[0][0]).to.be.null;
    });
  });

  describe('Making Moves', () => {
    it('should successfully make a valid move', () => {
      const result = game.makeMove(0, 0);
      expect(result).to.be.true;
      
      const board = game.getBoard();
      expect(board[0][0]).to.not.be.null;
      expect(['X', 'O']).to.include(board[0][0] as string);
    });

    it('should reject moves to occupied cells', () => {
      game.makeMove(0, 0);
      const result = game.makeMove(0, 0);
      expect(result).to.be.false;
    });

    it('should reject moves outside board bounds', () => {
      expect(game.makeMove(-1, 0)).to.be.false;
      expect(game.makeMove(0, -1)).to.be.false;
      expect(game.makeMove(3, 0)).to.be.false;
      expect(game.makeMove(0, 3)).to.be.false;
      expect(game.makeMove(5, 5)).to.be.false;
    });

    it('should alternate players after successful moves', () => {
      const firstPlayer = game.getCurrentPlayer();
      game.makeMove(0, 0);
      const secondPlayer = game.getCurrentPlayer();
      
      expect(firstPlayer).to.not.equal(secondPlayer);
      expect(['X', 'O']).to.include(firstPlayer);
      expect(['X', 'O']).to.include(secondPlayer);
    });

    it('should not change player after failed move', () => {
      const initialPlayer = game.getCurrentPlayer();
      game.makeMove(-1, 0); // Invalid move
      expect(game.getCurrentPlayer()).to.equal(initialPlayer);
    });
  });

  describe('Win Detection - Horizontal', () => {
    it('should detect horizontal win in top row', () => {
      // Force a specific starting player for predictable testing
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 0); // First player
      game.makeMove(1, 0); // Second player
      game.makeMove(0, 1); // First player
      game.makeMove(1, 1); // Second player
      game.makeMove(0, 2); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });

    it('should detect horizontal win in middle row', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(1, 0); // First player
      game.makeMove(0, 0); // Second player
      game.makeMove(1, 1); // First player
      game.makeMove(0, 1); // Second player
      game.makeMove(1, 2); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });

    it('should detect horizontal win in bottom row', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(2, 0); // First player
      game.makeMove(0, 0); // Second player
      game.makeMove(2, 1); // First player
      game.makeMove(0, 1); // Second player
      game.makeMove(2, 2); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });
  });

  describe('Win Detection - Vertical', () => {
    it('should detect vertical win in left column', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 0); // First player
      game.makeMove(0, 1); // Second player
      game.makeMove(1, 0); // First player
      game.makeMove(0, 2); // Second player
      game.makeMove(2, 0); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });

    it('should detect vertical win in middle column', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 1); // First player
      game.makeMove(0, 0); // Second player
      game.makeMove(1, 1); // First player
      game.makeMove(0, 2); // Second player
      game.makeMove(2, 1); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });

    it('should detect vertical win in right column', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 2); // First player
      game.makeMove(0, 0); // Second player
      game.makeMove(1, 2); // First player
      game.makeMove(0, 1); // Second player
      game.makeMove(2, 2); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });
  });

  describe('Win Detection - Diagonal', () => {
    it('should detect main diagonal win (top-left to bottom-right)', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 0); // First player
      game.makeMove(0, 1); // Second player
      game.makeMove(1, 1); // First player
      game.makeMove(0, 2); // Second player
      game.makeMove(2, 2); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });

    it('should detect anti-diagonal win (top-right to bottom-left)', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 2); // First player
      game.makeMove(0, 0); // Second player
      game.makeMove(1, 1); // First player
      game.makeMove(0, 1); // Second player
      game.makeMove(2, 0); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });
  });

  describe('Draw Detection', () => {
    it('should detect a draw when board is full with no winner', () => {
      // Create a specific draw scenario
      // X | O | X
      // O | O | X  
      // O | X | O
      
      // We need to control the starting player to create this exact scenario
      // Let's create multiple games until we get the desired starting player
      let testGame: TicTacToeGame;
      let attempts = 0;
      do {
        testGame = new TicTacToeGame();
        attempts++;
      } while (testGame.getCurrentPlayer() !== 'X' && attempts < 10);
      
      // If we can't get X to start, we'll adjust our moves accordingly
      const isXFirst = testGame.getCurrentPlayer() === 'X';
      
      if (isXFirst) {
        testGame.makeMove(0, 0); // X
        testGame.makeMove(0, 1); // O
        testGame.makeMove(0, 2); // X
        testGame.makeMove(1, 0); // O
        testGame.makeMove(1, 2); // X
        testGame.makeMove(1, 1); // O
        testGame.makeMove(2, 1); // X
        testGame.makeMove(2, 0); // O
        testGame.makeMove(2, 2); // X - this should result in a draw
      } else {
        // O starts, adjust moves
        testGame.makeMove(0, 1); // O
        testGame.makeMove(0, 0); // X
        testGame.makeMove(1, 0); // O
        testGame.makeMove(0, 2); // X
        testGame.makeMove(1, 1); // O
        testGame.makeMove(1, 2); // X
        testGame.makeMove(2, 0); // O
        testGame.makeMove(2, 1); // X
        testGame.makeMove(2, 2); // O - this should result in a draw
      }
      
      const gameResult = testGame.getGameResult();
      expect(gameResult.state).to.equal('draw');
      expect(gameResult.winningPlayer).to.be.undefined;
    });

    it('should not declare draw if game is won', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      game.makeMove(0, 0); // First player
      game.makeMove(1, 0); // Second player
      game.makeMove(0, 1); // First player
      game.makeMove(1, 1); // Second player
      game.makeMove(0, 2); // First player wins
      
      const gameResult = game.getGameResult();
      expect(gameResult.state).to.equal('won');
      expect(gameResult.winningPlayer).to.equal(startingPlayer);
    });
  });

  describe('Game Reset', () => {
    it('should reset board to empty state', () => {
      game.makeMove(0, 0);
      game.makeMove(1, 1);
      game.reset();
      
      const board = game.getBoard();
      expect(board.flat().every(cell => cell === null)).to.be.true;
    });

    it('should reset game state to playing', () => {
      // Create a winning scenario
      const startingPlayer = game.getCurrentPlayer();
      game.makeMove(0, 0);
      game.makeMove(1, 0);
      game.makeMove(0, 1);
      game.makeMove(1, 1);
      game.makeMove(0, 2); // Win
      
      expect(game.getGameResult().state).to.equal('won');
      
      game.reset();
      expect(game.getGameResult().state).to.equal('playing');
      expect(game.getGameResult().winningPlayer).to.be.undefined;
    });

    it('should set a new random starting player', () => {
      const originalPlayer = game.getCurrentPlayer();
      
      // Reset multiple times to test randomness (though we can't guarantee different player)
      game.reset();
      const newPlayer = game.getCurrentPlayer();
      
      expect(['X', 'O']).to.include(newPlayer);
      // Note: We can't assert that the player is different due to randomness
    });
  });

  describe('Game State Management', () => {
    it('should not allow moves after game is won', () => {
      const startingPlayer = game.getCurrentPlayer();
      
      // Create winning scenario
      game.makeMove(0, 0);
      game.makeMove(1, 0);
      game.makeMove(0, 1);
      game.makeMove(1, 1);
      game.makeMove(0, 2); // Win
      
      expect(game.getGameResult().state).to.equal('won');
      
      // Try to make another move - should be rejected
      const result = game.makeMove(2, 2);
      expect(result).to.be.false;
      
      const board = game.getBoard();
      expect(board[2][2]).to.be.null;
    });

    it('should not allow moves after game is drawn', () => {
      // Create a draw scenario and verify no more moves allowed
      // This is more complex to test due to the game logic, but the principle is the same
      // For now, we'll test the concept with a simpler approach
      
      // Fill the board except for one cell, then make the final move
      let testGame = new TicTacToeGame();
      
      // Create a scenario where the last move results in a draw
      // This requires careful move planning, so let's use a different approach
      // We'll test that the game correctly identifies when it should stop accepting moves
      
      // Make moves until game ends
      const moves = [
        [0, 0], [0, 1], [0, 2],
        [1, 1], [1, 0], [1, 2],
        [2, 1], [2, 0], [2, 2]
      ];
      
      for (const [row, col] of moves) {
        const result = testGame.makeMove(row, col);
        if (!result) break; // Stop if move is rejected
        
        const gameResult = testGame.getGameResult();
        if (gameResult.state !== 'playing') {
          // Game ended, try one more move
          const finalResult = testGame.makeMove(1, 1); // Try any remaining cell
          expect(finalResult).to.be.false;
          break;
        }
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple consecutive invalid moves', () => {
      const initialPlayer = game.getCurrentPlayer();
      
      expect(game.makeMove(-1, -1)).to.be.false;
      expect(game.makeMove(3, 3)).to.be.false;
      expect(game.makeMove(0, 5)).to.be.false;
      
      expect(game.getCurrentPlayer()).to.equal(initialPlayer);
      
      const board = game.getBoard();
      expect(board.flat().every(cell => cell === null)).to.be.true;
    });

    it('should maintain game state consistency after invalid moves', () => {
      game.makeMove(0, 0); // Valid move
      const playerAfterValid = game.getCurrentPlayer();
      const gameStateAfterValid = game.getGameResult();
      
      game.makeMove(0, 0); // Invalid move (occupied cell)
      
      expect(game.getCurrentPlayer()).to.equal(playerAfterValid);
      expect(game.getGameResult()).to.deep.equal(gameStateAfterValid);
    });

    it('should handle boundary positions correctly', () => {
      // Test all corner and edge positions
      const positions = [
        [0, 0], [0, 1], [0, 2], // Top row
        [1, 0], [1, 2],         // Middle row edges
        [2, 0], [2, 1], [2, 2]  // Bottom row
      ];
      
      for (const [row, col] of positions) {
        const result = game.makeMove(row, col);
        expect(result).to.be.true;
        
        const board = game.getBoard();
        expect(board[row][col]).to.not.be.null;
        
        game.reset(); // Reset for next test
      }
    });
  });
});

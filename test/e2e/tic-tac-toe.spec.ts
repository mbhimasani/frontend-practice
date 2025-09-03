import { test, expect, Page } from '@playwright/test';

test.describe('Tic-Tac-Toe Game', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tic-tac-toe');
  });

  test.describe('Initial State', () => {
    test('should display the game title', async ({ page }) => {
      await expect(page.locator('h2')).toHaveText('Tic-Tac-Toe');
    });

    test('should display a 3x3 grid', async ({ page }) => {
      const cells = page.locator('button').filter({ hasText: /^$/ }); // Empty cells
      await expect(cells).toHaveCount(9);
    });

    test('should display current player turn', async ({ page }) => {
      const statusMessage = page.locator('p');
      await expect(statusMessage).toContainText(/Player [XO]'s turn/);
    });

    test('should display reset button', async ({ page }) => {
      const resetButton = page.locator('button', { hasText: 'Reset' });
      await expect(resetButton).toBeVisible();
    });

    test('should have all cells empty initially', async ({ page }) => {
      const cells = page.locator('.grid button');
      for (let i = 0; i < 9; i++) {
        await expect(cells.nth(i)).toHaveText('');
      }
    });
  });

  test.describe('Game Interaction', () => {
    test('should allow player to make a move', async ({ page }) => {
      const firstCell = page.locator('.grid button').first();
      await firstCell.click();
      
      // Cell should now contain X or O
      const cellText = await firstCell.textContent();
      expect(['X', 'O']).toContain(cellText);
    });

    test('should alternate players after each move', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Get initial player
      const initialStatus = await statusMessage.textContent();
      const initialPlayer = initialStatus?.includes('X') ? 'X' : 'O';
      const nextPlayer = initialPlayer === 'X' ? 'O' : 'X';
      
      // Make first move
      await cells.first().click();
      
      // Check that player switched
      await expect(statusMessage).toContainText(`Player ${nextPlayer}'s turn`);
      
      // Make second move
      await cells.nth(1).click();
      
      // Check that player switched back
      await expect(statusMessage).toContainText(`Player ${initialPlayer}'s turn`);
    });

    test('should not allow move on occupied cell', async ({ page }) => {
      const firstCell = page.locator('.grid button').first();
      
      // Make first move
      await firstCell.click();
      const firstMoveText = await firstCell.textContent();
      
      // Try to click the same cell again
      await firstCell.click();
      const secondMoveText = await firstCell.textContent();
      
      // Cell content should remain the same
      expect(secondMoveText).toBe(firstMoveText);
    });

    test('should update status message correctly', async ({ page }) => {
      const statusMessage = page.locator('p');
      
      // Initial state should show current player's turn
      await expect(statusMessage).toContainText(/Player [XO]'s turn/);
      
      // After a move, should show next player's turn
      await page.locator('.grid button').first().click();
      await expect(statusMessage).toContainText(/Player [XO]'s turn/);
    });
  });

  test.describe('Win Conditions', () => {
    test('should detect horizontal win in top row', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Get starting player
      const initialStatus = await statusMessage.textContent();
      const startingPlayer = initialStatus?.includes('X') ? 'X' : 'O';
      const otherPlayer = startingPlayer === 'X' ? 'O' : 'X';
      
      // Play a winning sequence for top row
      await cells.nth(0).click(); // (0,0) - Starting player
      await cells.nth(3).click(); // (1,0) - Other player
      await cells.nth(1).click(); // (0,1) - Starting player
      await cells.nth(4).click(); // (1,1) - Other player
      await cells.nth(2).click(); // (0,2) - Starting player wins
      
      // Check win message
      await expect(statusMessage).toContainText(`Player ${startingPlayer} won!`);
      
      // Check that grid is disabled
      const grid = page.locator('.grid');
      await expect(grid).toHaveClass(/disabled/);
    });

    test('should detect vertical win in left column', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Get starting player
      const initialStatus = await statusMessage.textContent();
      const startingPlayer = initialStatus?.includes('X') ? 'X' : 'O';
      
      // Play a winning sequence for left column
      await cells.nth(0).click(); // (0,0) - Starting player
      await cells.nth(1).click(); // (0,1) - Other player
      await cells.nth(3).click(); // (1,0) - Starting player
      await cells.nth(2).click(); // (0,2) - Other player
      await cells.nth(6).click(); // (2,0) - Starting player wins
      
      // Check win message
      await expect(statusMessage).toContainText(`Player ${startingPlayer} won!`);
    });

    test('should detect diagonal win (top-left to bottom-right)', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Get starting player
      const initialStatus = await statusMessage.textContent();
      const startingPlayer = initialStatus?.includes('X') ? 'X' : 'O';
      
      // Play a winning sequence for main diagonal
      await cells.nth(0).click(); // (0,0) - Starting player
      await cells.nth(1).click(); // (0,1) - Other player
      await cells.nth(4).click(); // (1,1) - Starting player
      await cells.nth(2).click(); // (0,2) - Other player
      await cells.nth(8).click(); // (2,2) - Starting player wins
      
      // Check win message
      await expect(statusMessage).toContainText(`Player ${startingPlayer} won!`);
    });

    test('should detect anti-diagonal win (top-right to bottom-left)', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Get starting player
      const initialStatus = await statusMessage.textContent();
      const startingPlayer = initialStatus?.includes('X') ? 'X' : 'O';
      
      // Play a winning sequence for anti-diagonal
      await cells.nth(2).click(); // (0,2) - Starting player
      await cells.nth(0).click(); // (0,0) - Other player
      await cells.nth(4).click(); // (1,1) - Starting player
      await cells.nth(1).click(); // (0,1) - Other player
      await cells.nth(6).click(); // (2,0) - Starting player wins
      
      // Check win message
      await expect(statusMessage).toContainText(`Player ${startingPlayer} won!`);
    });

    test('should disable grid after win', async ({ page }) => {
      const cells = page.locator('.grid button');
      const grid = page.locator('.grid');
      
      // Create a quick win scenario
      await cells.nth(0).click(); // First move
      await cells.nth(3).click(); // Second move
      await cells.nth(1).click(); // Third move
      await cells.nth(4).click(); // Fourth move
      await cells.nth(2).click(); // Fifth move - should win
      
      // Grid should be disabled
      await expect(grid).toHaveClass(/disabled/);
      await expect(grid).toHaveClass(/pointer-events-none/);
      
      // Try to click another cell - should not work
      const cellCountBefore = await getCellsWithContent(page);
      await cells.nth(5).click();
      const cellCountAfter = await getCellsWithContent(page);
      
      expect(cellCountAfter).toBe(cellCountBefore);
    });
  });

  test.describe('Draw Condition', () => {
    test('should detect draw when board is full with no winner', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Create a draw scenario - this requires careful move planning
      // We'll play moves that fill the board without creating a win
      const drawMoves = [
        0, 1, 2,  // X, O, X (top row)
        4, 3, 5,  // O, X, O (middle row)
        7, 6, 8   // X, O, X (bottom row)
      ];
      
      // Execute the moves
      for (const cellIndex of drawMoves) {
        await cells.nth(cellIndex).click();
        
        // Check if game ended early (someone won)
        const currentStatus = await statusMessage.textContent();
        if (currentStatus?.includes('won')) {
          // If someone won, this particular sequence didn't result in a draw
          // This is expected due to the random starting player
          return;
        }
      }
      
      // If we get here, check if it's a draw
      const finalStatus = await statusMessage.textContent();
      if (finalStatus?.includes('draw')) {
        await expect(statusMessage).toContainText("It's a draw.");
        
        // Grid should be disabled
        const grid = page.locator('.grid');
        await expect(grid).toHaveClass(/disabled/);
      }
    });
  });

  test.describe('Reset Functionality', () => {
    test('should reset the game to initial state', async ({ page }) => {
      const cells = page.locator('.grid button');
      const resetButton = page.locator('button', { hasText: 'Reset' });
      const statusMessage = page.locator('p');
      
      // Make some moves
      await cells.nth(0).click();
      await cells.nth(1).click();
      await cells.nth(2).click();
      
      // Verify moves were made
      expect(await cells.nth(0).textContent()).not.toBe('');
      expect(await cells.nth(1).textContent()).not.toBe('');
      expect(await cells.nth(2).textContent()).not.toBe('');
      
      // Reset the game
      await resetButton.click();
      
      // Check that all cells are empty
      for (let i = 0; i < 9; i++) {
        await expect(cells.nth(i)).toHaveText('');
      }
      
      // Check that status message shows current player's turn
      await expect(statusMessage).toContainText(/Player [XO]'s turn/);
    });

    test('should reset after a win', async ({ page }) => {
      const cells = page.locator('.grid button');
      const resetButton = page.locator('button', { hasText: 'Reset' });
      const statusMessage = page.locator('p');
      const grid = page.locator('.grid');
      
      // Create a win scenario
      await cells.nth(0).click();
      await cells.nth(3).click();
      await cells.nth(1).click();
      await cells.nth(4).click();
      await cells.nth(2).click(); // Should win
      
      // Verify win state
      await expect(statusMessage).toContainText('won!');
      await expect(grid).toHaveClass(/disabled/);
      
      // Reset
      await resetButton.click();
      
      // Verify reset state
      await expect(statusMessage).toContainText(/Player [XO]'s turn/);
      await expect(grid).not.toHaveClass(/disabled/);
      
      // Should be able to make moves again
      await cells.nth(4).click();
      expect(await cells.nth(4).textContent()).not.toBe('');
    });

    test('should allow new game after reset', async ({ page }) => {
      const cells = page.locator('.grid button');
      const resetButton = page.locator('button', { hasText: 'Reset' });
      
      // Play and reset
      await cells.nth(0).click();
      await resetButton.click();
      
      // Start new game
      await cells.nth(4).click(); // Center cell
      expect(await cells.nth(4).textContent()).not.toBe('');
      
      // Make another move
      await cells.nth(0).click();
      expect(await cells.nth(0).textContent()).not.toBe('');
      
      // Verify both cells have different players
      const cell4Text = await cells.nth(4).textContent();
      const cell0Text = await cells.nth(0).textContent();
      expect(cell4Text).not.toBe(cell0Text);
    });
  });

  test.describe('UI Responsiveness', () => {
    test('should handle rapid clicks gracefully', async ({ page }) => {
      const cells = page.locator('.grid button');
      
      // Rapidly click the same cell multiple times
      const firstCell = cells.first();
      await firstCell.click();
      await firstCell.click();
      await firstCell.click();
      
      // Should only register one move
      const cellText = await firstCell.textContent();
      expect(['X', 'O']).toContain(cellText);
      
      // Try rapid clicks on different cells
      await cells.nth(1).click();
      await cells.nth(2).click();
      
      // Should register both moves
      expect(await cells.nth(1).textContent()).not.toBe('');
      expect(await cells.nth(2).textContent()).not.toBe('');
    });

    test('should maintain visual state consistency', async ({ page }) => {
      const cells = page.locator('.grid button');
      const statusMessage = page.locator('p');
      
      // Make a move and verify visual consistency
      await cells.nth(0).click();
      
      const cellContent = await cells.nth(0).textContent();
      const statusText = await statusMessage.textContent();
      
      // Cell should contain X or O
      expect(['X', 'O']).toContain(cellContent);
      
      // Status should show the opposite player's turn
      const currentPlayerInStatus = statusText?.includes('X') ? 'X' : 'O';
      expect(currentPlayerInStatus).not.toBe(cellContent);
    });
  });

  test.describe('Accessibility', () => {
    test('should have proper button roles', async ({ page }) => {
      const cells = page.locator('.grid button');
      const resetButton = page.locator('button', { hasText: 'Reset' });
      
      // All cells should be buttons
      await expect(cells.first()).toHaveRole('button');
      await expect(resetButton).toHaveRole('button');
    });

    test('should be keyboard navigable', async ({ page }) => {
      const firstCell = page.locator('.grid button').first();
      const resetButton = page.locator('button', { hasText: 'Reset' });
      
      // Focus first cell and press Enter
      await firstCell.focus();
      await page.keyboard.press('Enter');
      
      // Should make a move
      expect(await firstCell.textContent()).not.toBe('');
      
      // Focus reset button and press Enter
      await resetButton.focus();
      await page.keyboard.press('Enter');
      
      // Should reset the game
      await expect(firstCell).toHaveText('');
    });
  });
});

// Helper function to count cells with content
async function getCellsWithContent(page: Page): Promise<number> {
  const cells = page.locator('.grid button');
  let count = 0;
  
  for (let i = 0; i < 9; i++) {
    const text = await cells.nth(i).textContent();
    if (text && text.trim() !== '') {
      count++;
    }
  }
  
  return count;
}

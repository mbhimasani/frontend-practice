# Tic-Tac-Toe Testing Suite

This directory contains comprehensive tests for the Tic-Tac-Toe game implementation.

## Test Structure

```
test/
├── unit/                          # Unit tests using Mocha + Chai
│   └── tic-tac-toe-game.test.ts  # Tests for TicTacToeGame class
├── e2e/                           # End-to-end tests using Playwright
│   └── tic-tac-toe.spec.ts       # UI interaction tests
└── README.md                      # This file
```

## Running Tests

### Unit Tests (Mocha + Chai)

Tests the `TicTacToeGame` class logic in isolation:

```bash
# Run unit tests
npm run test:unit

# Or simply
npm test
```

**What it tests:**
- Game initialization
- Move validation
- Win detection (horizontal, vertical, diagonal)
- Draw detection
- Game state management
- Reset functionality
- Edge cases and error handling

### End-to-End Tests (Playwright)

Tests the complete user interface and user interactions:

```bash
# Run e2e tests (headless)
npm run test:e2e

# Run e2e tests with UI (interactive)
npm run test:e2e:ui

# Run e2e tests with browser visible
npm run test:e2e:headed
```

**What it tests:**
- UI rendering and layout
- User interactions (clicking cells)
- Game flow and state updates
- Win/draw detection in UI
- Reset functionality
- Accessibility features
- Keyboard navigation

### Run All Tests

```bash
# Run both unit and e2e tests
npm run test:all
```

## Test Coverage

### Unit Tests Cover:

1. **Initialization**
   - Board creation (3x3 grid)
   - Random player selection
   - Initial game state

2. **Move Validation**
   - Valid moves
   - Invalid moves (out of bounds, occupied cells)
   - Player alternation

3. **Win Detection**
   - Horizontal wins (all rows)
   - Vertical wins (all columns)
   - Diagonal wins (both diagonals)
   - Win state management

4. **Draw Detection**
   - Full board without winner
   - Game state after draw

5. **Game Management**
   - Reset functionality
   - State consistency
   - Edge cases

### End-to-End Tests Cover:

1. **Initial State**
   - Page rendering
   - Grid display
   - Status messages

2. **User Interactions**
   - Cell clicking
   - Move registration
   - Player alternation

3. **Game Flow**
   - Complete game scenarios
   - Win conditions
   - Draw scenarios
   - Reset functionality

4. **UI Behavior**
   - Grid disabling after game end
   - Status message updates
   - Visual feedback

5. **Accessibility**
   - Keyboard navigation
   - Button roles
   - Focus management

## Configuration Files

- `.mocharc.json` - Mocha configuration
- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration (shared)

## Prerequisites

Before running tests, ensure:

1. Dependencies are installed: `npm install`
2. For e2e tests, the development server should be running: `npm run dev`
   - Playwright will automatically start the dev server if not running

## Test Development Guidelines

### Unit Tests
- Use descriptive test names
- Test both positive and negative cases
- Mock external dependencies if needed
- Keep tests isolated and independent

### E2E Tests
- Test user workflows, not implementation details
- Use page object patterns for complex interactions
- Handle async operations properly
- Test across different browsers when needed

## Debugging Tests

### Unit Tests
```bash
# Run specific test file
npx mocha test/unit/tic-tac-toe-game.test.ts

# Run with debugging
npx mocha --inspect-brk test/unit/tic-tac-toe-game.test.ts
```

### E2E Tests
```bash
# Run specific test file
npx playwright test test/e2e/tic-tac-toe.spec.ts

# Run with debugging
npx playwright test --debug

# Generate test report
npx playwright show-report
```

## Continuous Integration

These tests are designed to run in CI environments. The configuration includes:
- Retry logic for flaky tests
- Multiple browser testing
- Headless execution
- Proper timeouts and error handling

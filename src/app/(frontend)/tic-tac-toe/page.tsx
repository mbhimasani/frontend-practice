'use client'

import { TicTacToeGame } from "./game"
import { useEffect, useState } from "react"

export default function TicTacToe() {
  const [game, setGame] = useState(() => new TicTacToeGame()) // lazy init - only runs once, game instance persisted
  const [gameState, setGameState] = useState({
    board: game.getBoard(),
    currentPlayer: game.getCurrentPlayer(),
    gameResult: game.getGameResult(),
  })

  const getStatusMessage = () => {
    const { state, winningPlayer } = gameState.gameResult;

    switch (state) {
      case 'won':
        return `Player ${winningPlayer} won!`
      case 'draw':
        return `It's a draw.`
      case 'playing':
        return `Player ${gameState.currentPlayer}'s turn`
      default:
        return ''
    }
  }

  return (
    <>
      <h2>Tic-Tac-Toe</h2>
      {/* Grid */}
      <div className={`grid grid-cols-3 border border-black w-fit ${gameState.gameResult.state !== 'playing' ? 'disabled pointer-events-none' : ''}`}>
        {gameState.board.map((row, rowIndex) => (
          row.map((cellValue, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className="flex"
            >
              {/* Cell */}
              <button
                onClick={() => {
                  const moveSuccessful = game.makeMove(rowIndex, colIndex)
                  if (moveSuccessful) {
                    setGameState({
                      board: game.getBoard(),
                      currentPlayer: game.getCurrentPlayer(),
                      gameResult: game.getGameResult()
                    })
                  }
                }}
                className="w-5 h-5 border border-black"
              >
                {cellValue}
              </button>
            </div>
          ))
        ))}
      </div>
      <p>{getStatusMessage()}</p>
      <button
        onClick={() => {
          game.reset()
          setGameState({
            board: game.getBoard(),
            currentPlayer: game.getCurrentPlayer(),
            gameResult: game.getGameResult()
          })
        }}
      >
        Reset
      </button>
    </>
  )
}
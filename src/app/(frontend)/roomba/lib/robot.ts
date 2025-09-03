export class RobotCleaner {
  private board: number[][]
  private robotDirection: string
  private robotRow: number
  private robotCol: number

  constructor() {
    this.board = this.createEmptyBoard(10)
    this.robotDirection = 'up'
    this.robotRow = 0
    this.robotCol = 0
  }

  getRobotPosition() {
    return { row: this.robotRow, col: this.robotCol }
  }

  makeMove(move: string) {
  }
  
  private moveForward() {
    if (this.robotDirection === 'up') {
      this.board[this.robotRow - 1][this.robotCol] = 1
    } else if (this.robotDirection === 'down') {
      this.board[this.robotRow + 1][this.robotCol] = 1
    } else if (this.robotDirection === 'left') {
      this.board[this.robotRow][this.robotCol - 1] = 1
    } else if (this.robotDirection === 'right') {
      this.board[this.robotRow][this.robotCol + 1] = 1
    }
  }
  
  private turnRight() {
    if (this.robotDirection === 'up') {
      this.robotDirection = 'right'
    } else if (this.robotDirection === 'down') {
      this.robotDirection = 'left'
    } else if (this.robotDirection === 'left') {
      this.robotDirection = 'up'
    } else if (this.robotDirection === 'right') {
      this.robotDirection = 'down'
    }
  }

  createEmptyBoard(size: number) {
    return Array.from({ length: size }, () => Array(size).fill(null))
  }

  getBoard() {
    return this.board
  }

  getRobotDirection() {
    return this.robotDirection
  }
}

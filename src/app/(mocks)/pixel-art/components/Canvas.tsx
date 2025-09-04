import { useState, useEffect } from "react"
import Cell from "./Cell"
import { Color, Mode } from "../types"

type CanvasProps = {
  gridWidth: number
  gridHeight: number
  activeMode: Mode
  activeColor: Color
}
type Cell = {
  id: number
  color: Color
}

export default function Canvas({ gridWidth, gridHeight, activeMode, activeColor }: CanvasProps) {
  const [grid, setGrid] = useState<Cell[]>([])

  useEffect(() => {
    setGrid(
      Array.from({ length: gridWidth * gridHeight }, (_, index) => (
        { 
          id: index, 
          color: (index % 2 === 1 ? 'gray' : 'white') as Color
        }
      )
    ))
  }, [gridWidth, gridHeight])
  
  return (
    <div className={`grid grid-cols-${gridWidth} grid-rows-${gridHeight} gap-0 w-fit h-fit`}>
      {grid.map((cell) => (
        <Cell 
          key={cell.id} 
          id={cell.id} 
          color={cell.color} 
          onClick={() => {
            setGrid(
              grid.map((c) => 
                (c.id === cell.id) ? { ...c, 
                  color: (activeMode === 'draw') ? 
                  activeColor : 
                  (c.id % 2 === 1) ? 'gray' : 'white' 
                } : c)
            )
          }}
        />
      ))}
    </div>
  )
}
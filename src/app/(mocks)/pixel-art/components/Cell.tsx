import React from "react"
import { Color, COLORS } from "../types"

type CellProps = {
  id: number
  color: Color
  onClick: () => void
}

export default function Cell({ id, color, onClick }: CellProps) {

  return (
    <div 
      className={`w-5 h-5`}
      style={{backgroundColor: COLORS[color]}}
      data-cell-id={id}
      onClick={onClick}
    >
    </div>
  )
}
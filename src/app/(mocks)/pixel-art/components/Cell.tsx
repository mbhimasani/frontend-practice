import React from "react"
import { Color } from "../types"

type CellProps = {
  id: number
  color: Color
  // onMouseDown: (cellId: number) => void
  // onMouseMove: (cellId: number) => void
}

export default function Cell({ id, color }: CellProps) {

  return (
    <div 
      className={`w-5 h-5 bg-[${color}]`}
      data-cell-id={id}
    >
    </div>
  )
}
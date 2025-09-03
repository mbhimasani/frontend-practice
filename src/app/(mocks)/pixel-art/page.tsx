'use client'

import { useState } from "react";
import Canvas from "./components/Canvas";
import ColorPicker from "./components/ColorPicker";
import { Color } from "./types/colors";



export default function App() {
  const [activeColor, setActiveColor] = useState<Color>('black');

  return (
    <div>
      <ColorPicker selectedColor={activeColor} onColorSelect={setActiveColor} />
    </div>
  );
}

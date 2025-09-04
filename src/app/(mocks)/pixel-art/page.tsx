'use client'

import { useState } from "react";
import ColorPicker from "./components/ColorPicker";
import { Color, Mode } from "./types";
import CanvasMode from "./components/CanvasMode";
import Canvas from "./components/Canvas";



export default function App() {
  const [activeColor, setActiveColor] = useState<Color>('black');
  const [activeMode, setActiveMode] = useState<Mode>('draw');

  return (
    <div>
      <Canvas gridWidth={15} gridHeight={15} activeMode={activeMode} activeColor={activeColor} />
      <div className="flex gap-2 items-center">
        <CanvasMode activeMode={activeMode} onModeChange={setActiveMode} />
        <ColorPicker selectedColor={activeColor} onColorSelect={setActiveColor} />  
      </div>
    </div>
  );
}
import { Mode, MODES } from "../types";

type CanvasModeProps = {
  activeMode: Mode;
  onModeChange: (mode: Mode) => void;
};

export default function CanvasMode({ activeMode, onModeChange }: CanvasModeProps) {
  return (
    <div className="flex">
      {Object.entries(MODES).map(([mode, label]) => (
        <div 
          key={mode} 
          onClick={() => onModeChange(mode as Mode)}
          className={`cursor-pointer p-2 ${mode === activeMode ? 'text-white bg-black' : 'text-black bg-white border border-black'}`}
        >
          {label}
        </div>
      ))}
    </div>
  )
}
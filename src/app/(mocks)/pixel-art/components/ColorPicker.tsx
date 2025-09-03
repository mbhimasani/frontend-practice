import { Color, COLORS } from "../types";

type ColorPickerProps = {
  selectedColor: Color;
  onColorSelect: (color: Color) => void;
};

export default function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="flex">
      {Object.entries(COLORS).map(([color, hex]) => (
        <div 
          key={color} 
          className={`w-5 h-5 ${color === 'white' ? 'border-2 border-gray-100' : ''} ${selectedColor === color ? 'border-2 border-black' : ''}`}
          style={{ backgroundColor: hex }}
          onClick={() => onColorSelect(color as Color)}
        />
      ))}
    </div>
  );
}
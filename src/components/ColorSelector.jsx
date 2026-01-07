import React from "react";

const colorMap = {
  "Blanco": "#ffffff",
  "Negro": "#000000",
  "Gris": "#6b7280",
  "Gris Claro": "#e5e7eb",
  "Azul": "#1e3a8a",
  "Azul Marino": "#1e3a8a",
  "Azul Oscuro": "#1e3a8a",
  "Azul Claro": "#60a5fa",
  "Rojo": "#dc2626",
  "Verde": "#16a34a",
  "Verde Oliva": "#7c2d12",
  "Verde Militar": "#16a34a",
  "Beige": "#d4a574",
  "Camel": "#d4a574",
  "Marrón": "#92400e",
  "Rosa": "#ec4899",
  "Amarillo": "#fbbf24",
  "Dorado": "#f59e0b",
  "Plateado": "#c0c0c0",
  "Burdeos": "#831843",
  "Intrecciato Negro": "#000000",
  "Intrecciato Marrón": "#92400e",
  "Leopardo": "#d97706",
  "Caqui": "#a16207",
};

export default function ColorSelector({ 
  colors = [], 
  selectedColor, 
  onColorSelect 
}) {
  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-3 uppercase">
        Colores Disponibles ({colors.length})
      </label>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color, idx) => (
          <button
            key={idx}
            onClick={() => onColorSelect(color)}
            className={`flex flex-col items-center gap-2 p-2 rounded-lg transition ${
              selectedColor === color
                ? "border-2 border-black bg-black/5"
                : "border-2 border-gray-300 hover:border-black"
            }`}
            title={color}
          >
            <div
              className="w-8 h-8 rounded-full border border-gray-400 shadow-sm"
              style={{
                backgroundColor: colorMap[color] || "#ccc",
              }}
            />
            <span className="text-xs text-gray-700 font-medium whitespace-nowrap">
              {color.length > 10 ? color.substring(0, 10) + "..." : color}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function ProductGallery({ images }) {
  // Usamos el primer elemento como predeterminado
  const [selected, setSelected] = useState(images[0] || "/placeholder.jpg"); 

  return (
    <div className="flex flex-row-reverse lg:flex-row gap-6">
      
      {/* 1. Imagen Principal (Derecha en desktop, Izquierda en móvil) */}
      <div className="relative flex-1">
        <img
          src={selected}
          alt="Zapatilla"
          className="w-full h-auto object-cover border border-gray-100"
          onError={(e) => e.target.src = "https://placehold.co/800x800/444/FFF?text=No+Image"}
        />
      </div>
      
      {/* 2. Miniaturas (Columna Izquierda en desktop) */}
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Vista ${i + 1}`}
            className={`w-20 h-20 object-cover cursor-pointer border-2 transition duration-200 ${
              // Estilo de selección: borde negro minimalista
              selected === img ? "border-black" : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => setSelected(img)}
            onError={(e) => e.target.src = "https://placehold.co/80x80/EEE/AAA?text=X"}
          />
        ))}
      </div>
      
    </div>
  );
}

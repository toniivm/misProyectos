import React, { useState } from "react";
import SafeImage from './SafeImage';

export default function ProductGallery({ images }) {
  // Usamos el primer elemento como predeterminado
  const [selected, setSelected] = useState(images[0] || "/placeholder.jpg"); 

  return (
    <div className="flex flex-row-reverse lg:flex-row gap-6">
      
      {/* 1. Imagen Principal (Derecha en desktop, Izquierda en móvil) */}
      <div className="relative flex-1">
        <SafeImage
          src={selected}
          alt="Producto"
          className="w-full h-auto object-cover border border-gray-100"
        />
      </div>
      
      {/* 2. Miniaturas (Columna Izquierda en desktop) */}
      <div className="flex flex-col gap-4">
        {images.map((img, i) => (
          <SafeImage
            key={i}
            src={img}
            alt={`Vista ${i + 1}`}
            className={`w-20 h-20 object-cover cursor-pointer border-2 transition duration-200 ${
              selected === img ? "border-black" : "border-transparent hover:border-gray-200"
            }`}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>
      
    </div>
  );
}

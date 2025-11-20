import React from 'react';

export default function SizeGuide() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Guía de Tallas</h1>
      <p className="text-gray-600 mb-4">Encuentra tu talla ideal con nuestras recomendaciones y medidas aproximadas.</p>
      <div className="space-y-8 text-sm text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">Camisetas / Sudaderas</h2>
          <table className="w-full text-left text-xs border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Talla</th>
                <th className="p-2">Pecho (cm)</th>
                <th className="p-2">Largo (cm)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['XS','84-88','64-66'],['S','88-94','66-69'],['M','94-100','69-72'],['L','100-106','72-75'],['XL','106-114','75-78'],['XXL','114-122','78-81']
              ].map(r => (
                <tr key={r[0]} className="border-t">
                  {r.map(c => <td key={c} className="p-2">{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Pantalones</h2>
          <p>Las medidas de cintura se basan en la talla numérica (ej: 32 ≈ 81-83cm). Para un fit relajado elige una talla superior.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Consejos</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Si dudas entre dos tallas, elige la mayor para estilos oversize.</li>
            <li>Evita lavar con agua caliente para conservar el ajuste.</li>
            <li>Las prendas prelavadas pueden encoger &lt; 2% adicional.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

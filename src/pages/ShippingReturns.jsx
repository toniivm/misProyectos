import React from 'react';

export default function ShippingReturns() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Envíos y Devoluciones</h1>
      <p className="text-gray-600 mb-4">Información clara sobre tiempos de envío, zonas disponibles y cómo gestionar devoluciones.</p>
      <div className="space-y-6 text-sm leading-relaxed text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-2">Tiempos de Envío</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Estándar: 3 - 5 días laborables (GRATIS pedidos &gt; 50€)</li>
            <li>Express: 24 - 48h (9,99 €)</li>
            <li>Urgente: Entrega en 24h antes de las 14:00 (19,99 €)</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Zonas</h2>
          <p>Actualmente enviamos a: España Peninsular, Baleares y Portugal. Próximamente: Canarias y resto UE.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Seguimiento</h2>
          <p>Una vez enviado tu pedido recibirás un correo con el número de seguimiento y enlace a la mensajería.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Devoluciones</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Plazo: 30 días desde la recepción.</li>
            <li>Estado: Producto sin usar y con etiquetas.</li>
            <li>Coste: Devoluciones gratuitas en España Peninsular.</li>
            <li>Proceso: Solicita la devolución desde tu perfil &gt; Pedidos.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Reembolsos</h2>
          <p>Procesamos reembolsos en 3-5 días tras recibir y validar el producto en almacén.</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-2">Ayuda</h2>
          <p>Si tienes dudas escríbenos a <a href="mailto:soporte@urbanstyle.dev" className="text-black underline">soporte@urbanstyle.dev</a>.</p>
        </section>
      </div>
    </div>
  );
}

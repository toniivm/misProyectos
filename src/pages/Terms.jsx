import React from 'react';
export default function Terms(){
 return <div className='max-w-3xl mx-auto px-6 py-12'>
  <h1 className='text-4xl font-bold mb-6'>Términos y Condiciones</h1>
  <div className='space-y-6 text-sm text-gray-700'>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Uso de la Plataforma</h2>
    <p>Debes usar el sitio de forma lícita y evitar abuso de cuentas, scraping masivo o intentos de explotación.</p>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Compras</h2>
    <p>Precios incluyen IVA salvo indicación. Confirmación de pedido enviada por email.</p>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Limitación de Responsabilidad</h2>
    <p>No nos hacemos responsables de interrupciones por fuerza mayor o fallos ajenos a nuestro control.</p>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Modificaciones</h2>
    <p>Podemos actualizar estos términos; se notificará en la página principal.</p>
   </section>
  </div>
 </div>;
}

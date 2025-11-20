import React from 'react';
export default function PrivacyPolicy(){
 return <div className='max-w-3xl mx-auto px-6 py-12'>
  <h1 className='text-4xl font-bold mb-6'>Política de Privacidad</h1>
  <p className='text-gray-600 mb-4'>Resumen simplificado de cómo tratamos datos.</p>
  <div className='space-y-6 text-sm text-gray-700'>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Datos Recogidos</h2>
    <ul className='list-disc pl-6 space-y-1'>
     <li>Email (registro / newsletter)</li>
     <li>Identificador de Firebase (UID)</li>
     <li>Métricas anónimas de rendimiento (Web Vitals)</li>
    </ul>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Uso</h2>
    <p>Autenticación, personalización de carrito, comunicación de ofertas y mejora de rendimiento.</p>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Conservación</h2>
    <p>Eliminamos cuenta y datos bajo petición en soporte@valtrex.dev.</p>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Tus Derechos</h2>
    <ul className='list-disc pl-6 space-y-1'>
     <li>Acceso y rectificación</li>
     <li>Portabilidad (exportación básica JSON)</li>
     <li>Supresión (derecho al olvido)</li>
    </ul>
   </section>
   <section>
    <h2 className='font-semibold text-lg mb-2'>Cookies</h2>
    <p>Solo esenciales actualmente; banner aparecerá si añadimos analíticas avanzadas.</p>
   </section>
  </div>
 </div>;
}

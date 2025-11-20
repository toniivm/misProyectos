import React, { useState } from 'react';

export default function Contact(){
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:'' });
  const [sent, setSent] = useState(false);
  return (
    <div className='max-w-3xl mx-auto px-6 py-12'>
      <h1 className='text-4xl font-bold mb-6'>Contacto</h1>
      {!sent ? (
        <form className='space-y-4' onSubmit={(e)=>{e.preventDefault(); setSent(true);}}>
          <div>
            <label className='block text-sm font-semibold mb-1'>Nombre</label>
            <input className='w-full border px-3 py-2 rounded' value={form.nombre} name='nombre' onChange={e=>setForm({...form,nombre:e.target.value.slice(0,60)})} required />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-1'>Email</label>
            <input type='email' className='w-full border px-3 py-2 rounded' value={form.email} name='email' onChange={e=>setForm({...form,email:e.target.value.slice(0,120)})} required />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-1'>Mensaje</label>
            <textarea className='w-full border px-3 py-2 rounded h-32' value={form.mensaje} name='mensaje' onChange={e=>setForm({...form,mensaje:e.target.value.slice(0,800)})} required />
          </div>
          <button className='bg-black text-white px-6 py-3 rounded font-semibold'>Enviar</button>
          <p className='text-xs text-gray-500'>Este formulario es una demo. No envía emails reales.</p>
        </form>
      ) : (
        <div className='bg-green-50 border border-green-200 p-6 rounded'>
          <h2 className='text-xl font-semibold mb-2'>¡Mensaje enviado!</h2>
          <p className='text-sm text-gray-600'>Respondemos habitualmente en &lt; 24h. Gracias por contactar.</p>
          <button className='mt-4 text-sm underline' onClick={()=>{setSent(false); setForm({nombre:'',email:'',mensaje:''});}}>Enviar otro</button>
        </div>
      )}
    </div>
  );
}

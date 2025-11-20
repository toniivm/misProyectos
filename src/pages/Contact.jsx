import React, { useState, useEffect } from 'react';

export default function Contact(){
  const [form, setForm] = useState({ nombre:'', email:'', asunto:'', tipo:'', mensaje:'' });
  const [sent, setSent] = useState(false);
  const [errors,setErrors] = useState({});

  useEffect(()=>{
    const draft = localStorage.getItem('contact_draft');
    if(draft){
      try { setForm(JSON.parse(draft)); } catch(_){}
    }
  },[]);

  const validate = () => {
    const e = {};
    if(form.nombre.trim().length < 2) e.nombre = 'Nombre demasiado corto';
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = 'Email inválido';
    if(form.asunto.trim().length < 3) e.asunto = 'Asunto requerido';
    if(!form.tipo) e.tipo = 'Selecciona un motivo';
    if(form.mensaje.trim().length < 10) e.mensaje = 'Mensaje demasiado corto';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = {...form, [name]: value.slice(0, name==='mensaje'?1000:120)};
    setForm(next);
    localStorage.setItem('contact_draft', JSON.stringify(next));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validate()) return;
    const stored = JSON.parse(localStorage.getItem('contact_messages')||'[]');
    stored.push({ ...form, id: Date.now(), date: new Date().toISOString()});
    localStorage.setItem('contact_messages', JSON.stringify(stored));
    localStorage.removeItem('contact_draft');
    setSent(true);
  };

  return (
    <div className='max-w-4xl mx-auto px-6 py-12'>
      <h1 className='text-5xl md:text-6xl font-extrabold mb-8 tracking-tight'>Contacto VALTREX</h1>
      <p className='text-gray-600 mb-8 max-w-2xl'>¿Dudas sobre tallas, envíos, devoluciones o colaboraciones? Completa el formulario y nuestro equipo te responderá normalmente en menos de 24 horas.</p>
      {!sent ? (
        <form className='space-y-6' onSubmit={handleSubmit} noValidate>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold mb-2'>Nombre *</label>
              <input className='w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black' value={form.nombre} name='nombre' onChange={handleChange} aria-invalid={!!errors.nombre} />
              {errors.nombre && <p className='text-xs text-red-600 mt-1'>{errors.nombre}</p>}
            </div>
            <div>
              <label className='block text-sm font-semibold mb-2'>Email *</label>
              <input type='email' className='w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black' value={form.email} name='email' onChange={handleChange} aria-invalid={!!errors.email} />
              {errors.email && <p className='text-xs text-red-600 mt-1'>{errors.email}</p>}
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-semibold mb-2'>Asunto *</label>
              <input className='w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black' value={form.asunto} name='asunto' onChange={handleChange} aria-invalid={!!errors.asunto} />
              {errors.asunto && <p className='text-xs text-red-600 mt-1'>{errors.asunto}</p>}
            </div>
            <div>
              <label className='block text-sm font-semibold mb-2'>Motivo *</label>
              <select name='tipo' value={form.tipo} onChange={handleChange} className='w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black' aria-invalid={!!errors.tipo}>
                <option value=''>Selecciona...</option>
                <option value='talla'>Consulta de tallas</option>
                <option value='envio'>Estado de envío</option>
                <option value='devolucion'>Devolución</option>
                <option value='colaboracion'>Colaboración</option>
                <option value='otro'>Otro</option>
              </select>
              {errors.tipo && <p className='text-xs text-red-600 mt-1'>{errors.tipo}</p>}
            </div>
          </div>
          <div>
            <label className='block text-sm font-semibold mb-2'>Mensaje *</label>
            <textarea className='w-full border border-gray-300 px-4 py-3 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-black' value={form.mensaje} name='mensaje' onChange={handleChange} aria-invalid={!!errors.mensaje} />
            {errors.mensaje && <p className='text-xs text-red-600 mt-1'>{errors.mensaje}</p>}
          </div>
          <div className='flex items-center justify-between flex-wrap gap-4'>
            <p className='text-xs text-gray-500'>Al enviar aceptas nuestra <a href='/privacidad' className='underline'>política de privacidad</a>.</p>
            <button className='bg-black text-white px-8 py-4 rounded-lg font-semibold tracking-wide hover:bg-gray-800 transition'>Enviar mensaje</button>
          </div>
        </form>
      ) : (
        <div className='bg-green-50 border border-green-200 p-8 rounded-xl'>
          <h2 className='text-2xl font-bold mb-2'>¡Mensaje enviado!</h2>
          <p className='text-sm text-gray-600 mb-4'>Tu referencia: <span className='font-mono'>{String(Date.now()).slice(-6)}</span>. Responderemos pronto.</p>
          <button className='mt-2 text-sm underline' onClick={()=>{setSent(false); setForm({nombre:'',email:'',asunto:'',tipo:'',mensaje:''});}}>Enviar otro</button>
        </div>
      )}
    </div>
  );
}

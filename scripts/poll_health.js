(async () => {
  const url = 'https://misproyectos-neyj.onrender.com/health';
  for (let i = 1; i <= 12; i++) {
    try {
      const res = await fetch(url, { method: 'GET' });
      const text = await res.text();
      console.log('OK', i);
      console.log(text);
      process.exit(0);
    } catch (e) {
      console.log('Attempt', i, 'failed:', e && e.message ? e.message : e);
      if (i < 12) await new Promise((r) => setTimeout(r, 4000));
    }
  }
  console.log('Health endpoint not available after retries');
  process.exit(2);
})();

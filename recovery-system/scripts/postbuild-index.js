/**
 * Post-build para el static export: Render no sirve /es/ (barra final) cuando
 * el export genera /es.html. Este script crea un index.html en la carpeta de
 * cada página (es/index.html, es/about/index.html, ...) para que TODA URL con
 * barra final final funcione. Idempotente y sin efectos sobre las URLs normales.
 */
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'out');

let count = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
      continue;
    }
    if (!entry.name.endsWith('.html')) continue;
    if (entry.name === 'index.html' || entry.name === '404.html') continue;

    const stem = p.slice(0, -5); // quitar ".html"
    const dest = path.join(stem, 'index.html');
    if (fs.existsSync(dest)) continue;

    fs.mkdirSync(stem, { recursive: true });
    fs.copyFileSync(p, dest);
    count++;
  }
}

if (fs.existsSync(OUT)) {
  walk(OUT);
  console.log(`postbuild-index: ${count} páginas con soporte de barra final`);
} else {
  console.log('postbuild-index: no hay carpeta out/, nada que hacer');
}

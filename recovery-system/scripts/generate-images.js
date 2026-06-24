#!/usr/bin/env node

/**
 * Generador de imágenes Noctip con Bing Image Creator (GRATIS)
 * 
 * Uso: node scripts/generate-images.js
 * 
 * Abre Bing Image Creator y copia los prompts al portapapeles.
 * Solo tienes pegar y dar a "Create".
 */

const { exec } = require('child_process');
const platform = process.platform;

const PRODUCTS = [
  {
    name: 'Noctip Halo (Anti-ronquidos)',
    files: [
      {
        type: 'HERO',
        filename: 'halo-hero.jpg',
        prompt: 'Product photography of a transparent blue anti-snoring mouthpiece on a dark matte black surface, dramatic side lighting with soft blue accent light, shallow depth of field, premium wellness product aesthetic, minimalist, no text, no overlays, studio quality, 4K'
      },
      {
        type: 'LIFESTYLE',
        filename: 'halo-lifestyle.jpg',
        prompt: 'A couple sleeping peacefully in a modern minimalist bedroom, soft morning light through curtains, warm tones, the woman is smiling in her sleep, peaceful atmosphere, premium lifestyle photography, 4K, no text'
      },
      {
        type: 'DETALLE',
        filename: 'halo-detail.jpg',
        prompt: 'Close-up macro photography of a transparent blue anti-snoring mouthpiece showing the dual-layer adjustment mechanism and silicone texture, dramatic lighting on dark background, shallow depth of field, premium product photography, 4K'
      }
    ]
  },
  {
    name: 'Noctip Wave (Corrector Postural)',
    files: [
      {
        type: 'HERO',
        filename: 'wave-hero.jpg',
        prompt: 'Product photography of a black Y-shaped posture corrector brace laid flat on dark matte black surface, dramatic overhead lighting, premium wellness product aesthetic, minimalist, no text, studio quality, 4K'
      },
      {
        type: 'LIFESTYLE',
        filename: 'wave-lifestyle.jpg',
        prompt: 'A professional person sitting at a clean modern desk with good posture, wearing a black posture corrector under a white shirt barely visible, natural light from window, home office setting, premium lifestyle photography, 4K, no text'
      },
      {
        type: 'DETALLE',
        filename: 'wave-detail.jpg',
        prompt: 'Close-up of the Y-shaped back support of a posture corrector, showing the ergonomic design and breathable mesh material, dark background, dramatic lighting, premium product photography, 4K'
      }
    ]
  },
  {
    name: 'Noctip Rest (Banda de Sueño)',
    files: [
      {
        type: 'HERO',
        filename: 'rest-hero.jpg',
        prompt: 'Product photography of a sleek black sleep headband with ultra-thin speakers on dark matte black surface, dramatic side lighting, premium wellness product aesthetic, minimalist, no text, studio quality, 4K'
      },
      {
        type: 'LIFESTYLE',
        filename: 'rest-lifestyle.jpg',
        prompt: 'A person lying in bed wearing a sleek black sleep headband, soft ambient lighting, peaceful expression, modern bedroom, premium lifestyle photography, 4K, no text'
      },
      {
        type: 'DETALLE',
        filename: 'rest-detail.jpg',
        prompt: 'Close-up of the ultra-thin speaker inside a sleep headband, showing how thin and flexible it is, dramatic lighting on dark background, premium product photography, 4K'
      }
    ]
  },
  {
    name: 'Noctip Relief (Masajeador Cervical)',
    files: [
      {
        type: 'HERO',
        filename: 'relief-hero.jpg',
        prompt: 'Product photography of a white U-shaped cervical massager on dark matte black surface, dramatic lighting with soft glow on electrode pads, premium wellness product aesthetic, minimalist, no text, studio quality, 4K'
      },
      {
        type: 'LIFESTYLE',
        filename: 'relief-lifestyle.jpg',
        prompt: 'A person using a U-shaped cervical massager while working at a laptop, modern home office, natural light, relaxed expression, premium lifestyle photography, 4K, no text'
      },
      {
        type: 'DETALLE',
        filename: 'relief-detail.jpg',
        prompt: 'Close-up of the electrode pads on a cervical massager, showing the metallic surface and ergonomic curve, dramatic lighting on dark background, premium product photography, 4K'
      }
    ]
  },
  {
    name: 'Noctip Calm (Masajeador por Pulsos)',
    files: [
      {
        type: 'HERO',
        filename: 'calm-hero.jpg',
        prompt: 'Product photography of a compact white cervical pulse massager on dark matte black surface, dramatic lighting, premium wellness product aesthetic, minimalist, no text, studio quality, 4K'
      },
      {
        type: 'LIFESTYLE',
        filename: 'calm-lifestyle.jpg',
        prompt: 'A person wearing a compact cervical massager while reading on a couch, warm ambient lighting, cozy modern interior, premium lifestyle photography, 4K, no text'
      },
      {
        type: 'DETALLE',
        filename: 'calm-detail.jpg',
        prompt: 'Close-up of the floating electrode plates on a pulse massager, showing the auto-adapting design, dramatic lighting on dark background, premium product photography, 4K'
      }
    ]
  }
];

function copyToClipboard(text) {
  if (platform === 'win32') {
    exec(`echo ${text.replace(/"/g, '\\"')} | clip`);
  } else if (platform === 'darwin') {
    exec(`echo "${text.replace(/"/g, '\\"')}" | pbcopy`);
  } else {
    exec(`echo "${text.replace(/"/g, '\\"')}" | xclip -selection clipboard`);
  }
}

function openUrl(url) {
  if (platform === 'win32') {
    exec(`start ${url}`);
  } else if (platform === 'darwin') {
    exec(`open ${url}`);
  } else {
    exec(`xdg-open ${url}`);
  }
}

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║  GENERADOR DE IMÁGENES NOCTIP — Bing Image Creator     ║');
console.log('║  GRATIS con DALL-E 3                                   ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

console.log('📋 INSTRUCCIONES:\n');
console.log('1. Se abrirá Bing Image Creator en tu navegador');
console.log('2. El prompt se copiará al portapapeles automáticamente');
console.log('3. Pégalo en Bing y haz clic en "Create"');
console.log('4. Descarga la imagen que más te guste');
console.log('5. Guarda en: recovery-system/public/images/\n');

console.log('─'.repeat(60));

let currentIndex = 0;

function showNext() {
  if (currentIndex >= PRODUCTS.length) {
    console.log('\n✅ ¡TODOS LOS PROMPTS COMPLETADOS!\n');
    console.log('📁 Guarda las imágenes en: recovery-system/public/images/');
    console.log('🔄 Reemplaza las imágenes antiguas con los nuevos nombres');
    console.log('📁 Nuevos nombres: halo-*.jpg, wave-*.jpg, rest-*.jpg, relief-*.jpg, calm-*.jpg\n');
    return;
  }

  const product = PRODUCTS[currentIndex];
  console.log(`\n🖼️  [${currentIndex + 1}/${PRODUCTS.length}] ${product.name}\n`);

  product.files.forEach((file, idx) => {
    console.log(`  ${idx + 1}. ${file.type} → ${file.filename}`);
  });

  console.log('\n📝 PROMPTS PARA COPIAR:\n');

  product.files.forEach((file, idx) => {
    console.log(`  --- ${file.type} ---`);
    console.log(`  Archivo: ${file.filename}`);
    console.log(`  Prompt: ${file.prompt}\n`);
  });

  // Copy first prompt to clipboard
  const firstPrompt = product.files[0].prompt;
  copyToClipboard(firstPrompt);
  console.log(`  📋 Primer prompt copiado al portapapeles: "${product.files[0].type}"`);

  // Open Bing Image Creator
  openUrl('https://www.bing.com/images/create');
  console.log('  🌐 Abriendo Bing Image Creator...\n');

  console.log('─'.repeat(60));
  console.log('Presiona ENTER para el siguiente producto...');
  
  process.stdin.once('data', () => {
    currentIndex++;
    showNext();
  });
}

// Start
showNext();

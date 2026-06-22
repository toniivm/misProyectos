#!/usr/bin/env node

/**
 * Script para generar imágenes de productos Noctip con DALL-E 3
 * 
 * Requiere: npm install openai
 * Uso: node scripts/generate-images.js
 * 
 * Configura OPENAI_API_KEY en tu .env antes de ejecutar.
 */

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'generated');

const PRODUCTS = [
  {
    slug: 'sleepband-pro',
    name: 'Noctip Halo',
    hero: {
      prompt: 'Product photography of a transparent blue anti-snoring mouthpiece on a dark matte surface (#0c1016), dramatic side lighting with soft blue accent light, shallow depth of field, premium wellness product aesthetic, minimalist, no text, no overlays, studio quality, 4K, product photography, clean background',
      size: '1792x1024',
    },
    lifestyle: {
      prompt: 'A couple sleeping peacefully in a modern minimalist bedroom, soft morning light through curtains, warm tones, the woman is smiling in her sleep, peaceful atmosphere, premium lifestyle photography, 4K, no text, no product visible, wellness brand aesthetic',
      size: '1792x1024',
    },
    detail: {
      prompt: 'Close-up macro photography of a transparent blue anti-snoring mouthpiece showing the dual-layer adjustment mechanism and silicone texture, dramatic lighting on dark background, shallow depth of field, premium product photography, 4K, no text',
      size: '1792x1024',
    },
  },
  {
    slug: 'white-noise-pro',
    name: 'Noctip Wave',
    hero: {
      prompt: 'Product photography of a black Y-shaped posture corrector brace laid flat on dark matte surface (#0c1016), dramatic overhead lighting, premium wellness product aesthetic, minimalist, no text, no overlays, studio quality, 4K, product photography',
      size: '1792x1024',
    },
    lifestyle: {
      prompt: 'A professional person sitting at a clean modern desk with good posture, wearing a black posture corrector under a white shirt barely visible, natural light from window, home office setting, premium lifestyle photography, 4K, no text, wellness brand aesthetic',
      size: '1792x1024',
    },
    detail: {
      prompt: 'Close-up of the Y-shaped back support of a posture corrector, showing the ergonomic design and breathable mesh material, dark background, dramatic lighting, premium product photography, 4K, no text',
      size: '1792x1024',
    },
  },
  {
    slug: 'sleep-headband',
    name: 'Noctip Rest',
    hero: {
      prompt: 'Product photography of a sleek black sleep headband with ultra-thin speakers on dark matte surface (#0c1016), dramatic side lighting, premium wellness product aesthetic, minimalist, no text, no overlays, studio quality, 4K, product photography',
      size: '1792x1024',
    },
    lifestyle: {
      prompt: 'A person lying in bed wearing a sleek black sleep headband, soft ambient lighting, peaceful expression, modern bedroom, premium lifestyle photography, 4K, no text, wellness brand aesthetic',
      size: '1792x1024',
    },
    detail: {
      prompt: 'Close-up of the ultra-thin speaker inside a sleep headband, showing how thin and flexible it is, dramatic lighting on dark background, premium product photography, 4K, no text',
      size: '1792x1024',
    },
  },
  {
    slug: 'neck-massager',
    name: 'Noctip Relief',
    hero: {
      prompt: 'Product photography of a white U-shaped cervical massager on dark matte surface (#0c1016), dramatic lighting with soft glow on electrode pads, premium wellness product aesthetic, minimalist, no text, studio quality, 4K, product photography',
      size: '1792x1024',
    },
    lifestyle: {
      prompt: 'A person using a U-shaped cervical massager while working at a laptop, modern home office, natural light, relaxed expression, premium lifestyle photography, 4K, no text, wellness brand aesthetic',
      size: '1792x1024',
    },
    detail: {
      prompt: 'Close-up of the electrode pads on a cervical massager, showing the metallic surface and ergonomic curve, dramatic lighting on dark background, premium product photography, 4K, no text',
      size: '1792x1024',
    },
  },
  {
    slug: 'weighted-mask-pro',
    name: 'Noctip Calm',
    hero: {
      prompt: 'Product photography of a compact white cervical pulse massager on dark matte surface (#0c1016), dramatic lighting, premium wellness product aesthetic, minimalist, no text, studio quality, 4K, product photography',
      size: '1792x1024',
    },
    lifestyle: {
      prompt: 'A person wearing a compact cervical massager while reading on a couch, warm ambient lighting, cozy modern interior, premium lifestyle photography, 4K, no text, wellness brand aesthetic',
      size: '1792x1024',
    },
    detail: {
      prompt: 'Close-up of the floating electrode plates on a pulse massager, showing the auto-adapting design, dramatic lighting on dark background, premium product photography, 4K, no text',
      size: '1792x1024',
    },
  },
];

async function generateImage(prompt, size, outputPath) {
  console.log(`  Generating: ${path.basename(outputPath)}...`);
  
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: size,
      quality: 'hd',
      response_format: 'url',
    });

    const imageUrl = response.data[0].url;
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    
    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`  ✓ Saved: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('=== Noctip Image Generator ===\n');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY not set in environment');
    console.log('Set it with: export OPENAI_API_KEY=your-key-here');
    process.exit(1);
  }

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let totalGenerated = 0;
  let totalErrors = 0;

  for (const product of PRODUCTS) {
    console.log(`\n${product.name} (${product.slug}):`);
    
    const types = ['hero', 'lifestyle', 'detail'];
    
    for (const type of types) {
      const filename = `${product.slug}-${type}.png`;
      const outputPath = path.join(OUTPUT_DIR, filename);
      
      // Skip if already exists
      if (fs.existsSync(outputPath)) {
        console.log(`  ⊘ Skipping ${filename} (already exists)`);
        continue;
      }
      
      const success = await generateImage(
        product[type].prompt,
        product[type].size,
        outputPath
      );
      
      if (success) totalGenerated++;
      else totalErrors++;
      
      // Rate limit: wait 10 seconds between requests
      await new Promise(r => setTimeout(r, 10000));
    }
  }

  console.log(`\n=== Complete ===`);
  console.log(`Generated: ${totalGenerated} images`);
  console.log(`Errors: ${totalErrors}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  
  if (totalGenerated > 0) {
    console.log('\nNext steps:');
    console.log('1. Review generated images in public/images/generated/');
    console.log('2. Copy the best ones to public/images/ replacing old ones');
    console.log('3. Update catalog.ts image paths if needed');
  }
}

main().catch(console.error);

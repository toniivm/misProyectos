#!/usr/bin/env node
/**
 * Noctip Auto Video Publisher — 100% automatizado 0€
 * Genera vídeo IA (Higgsfield/Novoads free) + publica en TikTok/Reels/Shorts vía Buffer/MultiUpload
 * Uso: node scripts/autopublish/autoVideoPublisher.js --product=halo --dry-run
 * Cron: GitHub Actions daily 19:00 ES
 * Node 20+ — CommonJS compatible (sin "type": "module")
 */

// dotenv opcional — no rompe si no está instalado
try { require('dotenv').config(); } catch {}

const fs = require('fs');
const path = require('path');

const PROMPTS = {
  halo: {
    prompt: 'Woman 52 Spanish bedroom night, tired on sofa → relieved in bed holding white Halo case, photorealistic, warm light, product close-up 12s',
    script: '¿Tu pareja te echa por roncar al sofá? Yo dormía fatal, él roncaba, dolor garganta mañana. Noctip Halo: micro-ajuste 10mm, silicona médica, 1 noche y volví a la cama. Pack 2+1 gratis hoy.',
    caption: '¿Te echa por roncar? 1 noche con Halo y volvió a la cama 😴 Pack 2+1 gratis + envío gratis ⏰ #ronquidos #dormir #pareja #noctip noctip.com/es/products/halo',
    title: 'Pareja vuelve a dormir junta con Halo — 1 noche',
  },
  rest: {
    prompt: 'Woman 38 side-sleeping dark bedroom wearing grey headband 45g, serene, phone on nightstand podcast',
    script: '¿Odias dormir con auriculares clavados? 45g que desaparecen, me duermo en 12min sin despertar a mi pareja. Lavable, 10h batería.',
    caption: '45g que desaparecen 😴 Me duermo en 12min sin molestarle 🎧 #sueño #insomnio #banda #noctip noctip.com/es/products/sleep-headband',
    title: '45g que desaparecen — Rest',
  },
  wave: {
    prompt: 'Man 48 office hunched vs straight split, white shirt, before hunched after straight, invisible straps',
    script: '¿Camisa torcida a las 4pm? 8h encorvado, pareces 5 años mayor. Back: Y invisible bajo ropa, XS-XL, 15min/día.',
    caption: '¿Camisa torcida a las 4? 15min/día y pareces gym 💪 #postura #espalda #oficina #noctip noctip.com/es/products/wave',
    title: 'Camisetero invisible — Back',
  },
  'neck-massager': {
    prompt: 'Worker 42 sofa holding white cervical massager on neck, office to home, relieved',
    script: '¿Nuca piedra a las 7pm? 15min calor shiatsu en tu sofá, sin fisio. Ahorra 35h/año.',
    caption: '¿Nuca piedra 19h? 15min y suelta 😌 #cuello #masaje #oficina #noctip noctip.com/es/products/neck-massager',
    title: 'Mini-fisio en tu sofá — Cervical',
  },
};

const ROTATION = ['halo','rest','wave','neck-massager','halo','rest','wave','neck-massager','halo','rest','wave','neck-massager'];
function getTodayProduct() {
  const day = new Date().getDate();
  return ROTATION[day % ROTATION.length];
}

async function generateWithHiggsfield(product) {
  const key = process.env.HIGGSFIELD_API_KEY;
  if (!key) {
    console.log(`[MOCK] Higgsfield sin API_KEY — simulo generación para ${product} (no gasto créditos)`);
    return { videoUrl: `https://mock.higgsfield.ai/${product}-mock.mp4`, mock: true };
  }
  const res = await fetch('https://api.higgsfield.ai/v1/generate', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: PROMPTS[product].prompt,
      script: PROMPTS[product].script,
      aspect: '9:16',
      model: 'seedance-fast',
      duration: 25,
    }),
  });
  if (!res.ok) throw new Error(`Higgsfield ${res.status} ${await res.text()}`);
  const data = await res.json();
  return { videoUrl: data.video_url || data.url, mock: false };
}

async function publishViaBuffer(videoUrl, caption, title) {
  const token = process.env.BUFFER_ACCESS_TOKEN;
  if (!token) {
    console.log(`[MOCK] Buffer sin token — simulo publish: ${title} → ${videoUrl}`);
    console.log(`Caption: ${caption}`);
    return { mock: true, urls: ['https://mock.buffer/ig','https://mock.buffer/tiktok'] };
  }
  const channels = (process.env.BUFFER_CHANNELS || '').split(',').filter(Boolean);
  if (!channels.length) {
    console.warn('[WARN] BUFFER_CHANNELS vacío — configura "ig_id,tiktok_id,yt_id" en env');
    return { mock: true, warn: 'no channels' };
  }
  const results = [];
  for (const channel of channels) {
    const r = await fetch('https://api.bufferapp.com/1/updates/create.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_token: token,
        profile_ids: [channel],
        text: caption,
        media: { video: videoUrl },
        shorten: false,
        now: true,
      }),
    });
    const j = await r.json().catch(()=>({ error: 'json parse' }));
    results.push({ channel, ok: r.ok, data: j });
    if (!r.ok) console.error(`Buffer ${channel} error:`, j);
  }
  return { mock: false, results };
}

async function publishViaMultiUpload(videoUrl, caption, title) {
  const key = process.env.MULTI_UPLOAD_API_KEY;
  if (!key) return publishViaBuffer(videoUrl, caption, title);
  const res = await fetch('https://api.multi-upload-tool.com/v1/schedule', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      videoUrl,
      caption,
      title,
      platforms: ['tiktok','youtube','instagram'],
      schedule: 'now',
    }),
  });
  if (!res.ok) throw new Error(`MultiUpload ${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes('--dry-run');
  const productArg = args.find(a=>a.startsWith('--product='))?.split('=')[1];
  const valid = Object.keys(PROMPTS);
  let product = productArg || getTodayProduct();
  if (!valid.includes(product)) {
    console.warn(`[WARN] producto "${product}" no existe, uso halo. Válidos: ${valid.join(', ')}`);
    product = 'halo';
  }
  const { prompt, caption, title } = PROMPTS[product];

  console.log(`\n🎬 Noctip Auto Publisher — ${new Date().toISOString()}`);
  console.log(`Producto: ${product} — ${title}`);
  console.log(`Prompt: ${prompt}`);
  console.log(`Modo: ${dry ? 'DRY-RUN (no publico)' : 'LIVE'}`);

  const gen = await generateWithHiggsfield(product);
  console.log(`Video: ${gen.videoUrl} ${gen.mock ? '(mock)' : ''}`);
  if (dry) { console.log('✓ Dry run OK — no publico, log no escrito'); return; }

  let pub;
  try { pub = await publishViaMultiUpload(gen.videoUrl, caption, title); }
  catch (e) {
    console.warn('MultiUpload falló, fallback Buffer:', e.message);
    pub = await publishViaBuffer(gen.videoUrl, caption, title);
  }
  console.log('Publish result:', JSON.stringify(pub,null,2));

  const logPath = path.join(process.cwd(), 'docs', 'autopublish-log.json');
  try {
    const log = fs.existsSync(logPath) ? JSON.parse(fs.readFileSync(logPath,'utf8')) : [];
    log.push({ date: new Date().toISOString(), product, title, videoUrl: gen.videoUrl, publish: pub });
    fs.writeFileSync(logPath, JSON.stringify(log.slice(-100),null,2));
    console.log(`✅ Log guardado ${logPath} (${log.length} entradas)`);
  } catch (e) {
    console.warn('No se pudo escribir log:', e.message);
  }
}

main().catch(e=>{ console.error('❌ Error:', e.message); console.error(e.stack); process.exit(1); });

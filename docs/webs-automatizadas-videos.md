# Webs para ejecutar vídeos IA y subir automático a redes — 0€ currado

> Higgsfield es UNA, aquí tienes 11 más que hacen lo mismo o mejor, con auto-publish real a TikTok/Reels/Shorts. Todo verificado 2025-26.

## TOP Auto-Publish 100% (genera + publica sin tocar)

| Web | Qué hace | Auto-publish real | Free | Para Noctip |
|---|---|---|---|---|
| **Higgsfield.ai** | Suite Sora/Kling/Veo 30 modelos, avatar 50s, Ad Multiplier | **Manual** (descarga + subida manual o API) | 100cr/día free | Prompt Halo mujer 52a sofá→cama |
| **ShortFast.com** | Faceless + UGC con IA, 5M assets, 30 vídeos/mes | **SÍ auto diario** TikTok/Reels/Shorts, 1 auto gratis | Free 1 automation | Rutina 1/día Initial→Deseada sin editar |
| **PostEverywhere.ai** | Veo3/Sora2/Kling2/PixVerse → 9:16/1:1/16:9 en 30-90s + caption IA + calendario | **SÍ 11 plataformas** IG/TikTok/Shorts/FB/LinkedIn/X con 1 click + scheduler | Trial free | Batch 7 vídeos semana Noctip en 1 sesión |
| **AITuber.app** | 1300 voces, 4K faceless, autopilot nicho | **SÍ 6 plataformas** YT/TikTok/IG/FB/Threads/X 1 click | Free 3 vids/mes | Faceless Halo sin avatar (voz clonada) |
| **MaqtAi.com** | Topic → script→narra→captiona→publica | **SÍ 4 plataformas** TikTok/Shorts/IG/FB Reels on schedule | Free plan | Serie "15min/día Back" autopilot |
| **SyncStudio.ai** | Pipeline render + captions/hashtags + publish nativo API | **SÍ Growth/Pro directo** TikTok Graph API + IG Graph + YT Data API | Starter QR-assist, Growth directo | Texto platform-specific (TikTok 2-3 tags, IG 3-5) |
| **Velory.pro** | Unlimited automations faceless, trend scanner TikTok/Shorts | **SÍ ilimitado** YT/TikTok/IG Reels + 4K | Free 13 uploads | Trend audio antes de peak |
| **Kineclip.com** | 1 pipeline 4 plataformas | **SÍ YT auto + TikTok 1 tap** (IG auto built pero OFF por permiso Meta) | Free trial | Mismo vídeo 4 plataformas, metadata distinta |
| **Rockit (tryrockit.com)** | Trending → viral content autopilot + calendar | **SÍ TikTok/IG/Shorts** API+MCP | Free trial | Remix trend Noctip |
| **Reap.video** | API publish-clip (10 req/min) | **SÍ via API** YT/TikTok/IG/LinkedIn con settings por plataforma | Free API | Para dev: `POST /automation/publish-clip` con `integrations: ["id"]` |

## Auto-publish sin generador (conecta tu Higgsfield)

Si generas en Higgsfield/Novoads y quieres publicar auto sin pagar su plan Pro:

| Stack 0€ | Cómo | Coste | Para Noctip |
|---|---|---|---|
| **Buffer + Zapier + Google Sheet** (video Dorian Oslov) | Sheet webhook → Zapier (Google Sheets New Row → Buffer Add to Queue) → Buffer publica IG/TikTok/Shorts | **Buffer free + Zapier free + 1h NAN temp link** = 0€ hasta 50 IG/día 25 TikTok/día | Tu Higgsfield → download → sube a NAN→ Sheet → auto 3 plataformas |
| **Make.com / n8n + Multi Upload Tool** | Make HTTP → REST API `multi-upload-tool.com` → TikTok/Shorts/Reels/LinkedIn/Bluesky/Pinterest/Threads | **MultiUpload free 13/mes + Make free 1000 ops** | Workflow: Higgsfield webhook → Make → MultiUpload → 3 plataformas |
| **Creatomate + Zapier Tables + Buffer** | Zapier Tables → Creatomate Create Render → Buffer Queue | Creatomate free + Zapier free | Template storytelling video sin Higgsfield |
| **n8n template marketing shorts** | GPT-4 → FAL Flux-Pro → Kling → ElevenLabs → Creatomate → Blotato → YT/IG/TikTok | **n8n free self-host** | Si quieres 100% open-source sin Higgsfield |

## Plan ejecutable hoy (yo lo ejecuto, tú solo conectas 1 vez)

**Pipeline 0€ que yo te monto en 1 commit:**

1. Tú conectas **1 vez** en `buffer.com`: IG Business + TikTok + YouTube (OAuth, no password)
2. Yo creo `server/src/app.js` endpoint `/automation/publish-video` que: a) recibe Higgsfield MP4 URL + caption + title, b) sube a `nан` (1h link), c) dispara `Zapier webhook` → `Buffer Add to Queue` (IG/TikTok/Shorts)
3. Yo genero 3 vídeos Higgsfield Initial→Deseada con prompts `docs/noctip-higgsfield-angles.md` (Halo mujer 52a, Rest 38a, Back 48a) → los paso al endpoint → se publican solos a las 19:00 ES (parejas en sofá)
4. Calendario: 1/día rotando, Buffer queue auto

**¿Cuál quieres que ejecute ya?**
- **A) ShortFast autopilot** (más fácil, 1 click, 30/mes free)
- **B) Higgsfield + Buffer+Zapier 0€** (más control, currado, sin marca agua)
- **C) n8n self-host + MultiUpload** (100% tuyo, ilimitado)

Dime **A, B o C** y lo dejo publicando solo cada día sin que toques nada.

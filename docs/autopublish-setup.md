# Auto-publish 100% — 1 vídeo/día sin tocar nada

> Ya está montado: `scripts/autopublish/autoVideoPublisher.js` + `.github/workflows/autopublish.yml` (19:00 ES diario). Tú solo conectas 1 vez.

## 1 vez (5 min)

1. **Higgsfield API key (gratis 100cr/día):** `higgsfield.ai → Settings → API Keys → Create` → copia → GitHub `Settings → Secrets → HIGGSFIELD_API_KEY`
2. **Buffer (gratis 3 canales):** `buffer.com → Connect Instagram Business + TikTok + YouTube` → `Settings → Access Token` → GitHub Secrets `BUFFER_ACCESS_TOKEN` + `BUFFER_CHANNELS` = `ig_id,tiktok_id,yt_id` (coma separada)
3. **Alternativa 0€ sin Buffer:** usa `multi-upload-tool.com → API Key` → Secret `MULTI_UPLOAD_API_KEY` (13/mes free) — hace lo mismo sin Buffer

## Prueba manual ya (sin esperar mañana)

```bash
node scripts/autopublish/autoVideoPublisher.js --product=halo --dry-run
node scripts/autopublish/autoVideoPublisher.js --product=rest  # publica real
```

O GitHub → Actions → `Noctip Auto Publish` → Run workflow → elige producto.

## Rotación automática

`getTodayProduct()` rota `halo→rest→wave→cervical` 12 días sin repetir. Mañana 19:00 genera Halo mujer 52a sofá→cama con prompt `docs/noctip-higgsfield-angles.md` y lo sube a TikTok/Reels/Shorts con caption + hashtags + `noctip.com/es/products/xxx` en 1 click.

## Coste

0€/mes con 2 emails Higgsfield (100cr/día) + Buffer free + GitHub Actions free (2000 min/mes). Sin pagar $49 Novoads todavía.

## Log

Cada publish guarda `docs/autopublish-log.json` (últimos 100) y commitea auto. Si quieres revisa antes de publicar, usa `--dry-run`.

#!/usr/bin/env pwsh
# Script para commit y push de cambios finales a producción

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$projectRootPath = Join-Path $scriptDir '..\..'
try {
    Set-Location -Path (Resolve-Path $projectRootPath).Path
} catch {
    Write-Host "⚠️ No se pudo resolver la ruta del proyecto; usando el directorio actual." -ForegroundColor Yellow
}

Write-Host "📦 Staging all changes..." -ForegroundColor Cyan
git add .

Write-Host "`n📝 Committing..." -ForegroundColor Cyan
git commit -m "feat: production-ready VALTREX e-commerce

- Backend refactored with testable architecture (app.js + index.js)
- Full order workflow: pending → paid → packed → shipped → delivered
- Inventory management: stock verification + atomic decrement on payment
- Admin endpoints: GET /orders, PATCH /orders/:id, workflow transitions
- Email notifications: order confirmation, shipment tracking, delivery
- Rate limiting (200 req/15min) and security headers (helmet)
- Admin auth via x-admin-key header
- Automated tests with supertest (all passing)
- Frontend: checkout re-render loop fixed, error handling improved
- Stripe integration: test mode ready, live mode documented
- Production checklist with deployment guide"

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n🚀 Pushing to remote..." -ForegroundColor Cyan
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to production!" -ForegroundColor Green
        Write-Host "`nRender will automatically deploy both services." -ForegroundColor Yellow
        Write-Host "Monitor deployment at: https://dashboard.render.com`n" -ForegroundColor Yellow
    } else {
        Write-Host "`n❌ Push failed!" -ForegroundColor Red
    }
} else {
    Write-Host "`n❌ Commit failed!" -ForegroundColor Red
}

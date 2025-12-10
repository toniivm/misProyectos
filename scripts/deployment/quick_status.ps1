#!/usr/bin/env pwsh
# Quick Backend Status Check

$backend = "https://valtrex-backend.onrender.com"
$frontend = "https://valtre.onrender.com"

Write-Host "`n🔍 Quick Status Check`n" -ForegroundColor Cyan

# Backend
Write-Host "Backend ($backend):" -NoNewline
try {
    $r = Invoke-RestMethod -Uri "$backend/health" -ErrorAction Stop
    Write-Host " ✅ OK" -ForegroundColor Green
    Write-Host "  Response: $($r | ConvertTo-Json -Compress)"
} catch {
    $code = $_.Exception.Response.StatusCode.value__
    Write-Host " ❌ FAILED ($code)" -ForegroundColor Red
    if ($code -eq 404) {
        Write-Host "  Tip: Backend may still be deploying. Wait 2-3 minutes." -ForegroundColor Yellow
    }
}

# Frontend
Write-Host "`nFrontend ($frontend):" -NoNewline
try {
    $r = Invoke-WebRequest -Uri $frontend -ErrorAction Stop
    $status = $r.StatusCode
    Write-Host " OK (Status $status)" -ForegroundColor Green
} catch {
    Write-Host " FAILED" -ForegroundColor Red
}

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. If backend shows 404, wait for Render deployment (2-5 min)"
Write-Host "2. Check Render dashboard: https://dashboard.render.com"
Write-Host "3. View logs: Dashboard > valtrex-backend > Logs"
Write-Host "4. After deployment completes, run this script again"
Write-Host ""

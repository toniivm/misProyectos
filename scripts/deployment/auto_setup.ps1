# AUTOMATIC RENDER DEPLOYMENT MONITOR
# Script para monitorear el despliegue automático después de borrar/recrear servicios

param(
    [int]$MaxWaitMinutes = 15,
    [int]$CheckIntervalSeconds = 10
)

$backendUrl = "https://valtrex-backend.onrender.com/health"
$frontendUrl = "https://valtre.onrender.com"
$maxAttempts = [math]::Ceiling(($MaxWaitMinutes * 60) / $CheckIntervalSeconds)
$attempt = 0

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   RENDER AUTOMATIC DEPLOYMENT MONITOR - SETUP WIZARD      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Cyan

Write-Host "PASOS QUE DEBES HACER EN RENDER DASHBOARD:" -ForegroundColor Yellow
Write-Host "1. Ve a https://dashboard.render.com/" -ForegroundColor White
Write-Host "2. Busca el servicio 'valtre-backend' o similar" -ForegroundColor White
Write-Host "3. Settings → Delete Service (escribe el nombre y confirma)" -ForegroundColor White
Write-Host "4. Espera 30 segundos" -ForegroundColor White
Write-Host "5. Ve a https://dashboard.render.com/" -ForegroundColor White
Write-Host "6. Click '+New' → 'Web Service'" -ForegroundColor White
Write-Host "7. Conecta tu repositorio 'misProyectos'" -ForegroundColor White
Write-Host "8. Render detectará render.yaml automáticamente" -ForegroundColor White
Write-Host "9. Confirma los servicios" -ForegroundColor White
Write-Host "`nDespués de confirmar en Render, presiona ENTER para empezar el monitoreo..." -ForegroundColor Green
Read-Host "Presiona ENTER cuando hayas confirmado en Render"

Write-Host "`nMonitoreando despliegue..." -ForegroundColor Cyan
Write-Host "Backend: $backendUrl" -ForegroundColor Gray
Write-Host "Frontend: $frontendUrl`n" -ForegroundColor Gray

$backendOnline = $false
$frontendOnline = $false
$startTime = Get-Date

while ($attempt -lt $maxAttempts) {
    $attempt++
    $elapsedSeconds = ($attempt * $CheckIntervalSeconds)
    $minutes = [math]::Floor($elapsedSeconds / 60)
    $seconds = $elapsedSeconds % 60
    $timestamp = Get-Date -Format "HH:mm:ss"
    
    Write-Host "[$timestamp] Intento $attempt/$maxAttempts (${minutes}m ${seconds}s)" -ForegroundColor Cyan -NoNewline
    
    # Test backend
    try {
        $response = Invoke-RestMethod -Uri $backendUrl -Method GET -TimeoutSec 5
        if (-not $backendOnline) {
            Write-Host " ✅ Backend ONLINE!" -ForegroundColor Green
            $backendOnline = $true
        } else {
            Write-Host " ✅ Backend: OK" -ForegroundColor Green
        }
    } catch {
        Write-Host " ⏳ Backend offline..." -ForegroundColor Yellow
    }
    
    # Test frontend
    try {
        $response = Invoke-WebRequest -Uri $frontendUrl -Method GET -TimeoutSec 5 -UseBasicParsing
        if (-not $frontendOnline) {
            Write-Host " ✅ Frontend ONLINE!" -ForegroundColor Green
            $frontendOnline = $true
        } else {
            Write-Host " ✅ Frontend: OK" -ForegroundColor Green
        }
    } catch {
        Write-Host " ⏳ Frontend offline..." -ForegroundColor Yellow
    }
    
    # Si ambos están online, terminar
    if ($backendOnline -and $frontendOnline) {
        Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Green
        Write-Host "║                  🎉 ¡DESPLIEGUE EXITOSO! 🎉               ║" -ForegroundColor Green
        Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Green
        
        Write-Host "✅ Backend en:  https://valtrex-backend.onrender.com" -ForegroundColor Green
        Write-Host "✅ Frontend en: https://valtre.onrender.com`n" -ForegroundColor Green
        
        Write-Host "PRÓXIMOS PASOS:" -ForegroundColor Yellow
        Write-Host "1. Abre https://valtre.onrender.com en tu navegador" -ForegroundColor White
        Write-Host "2. Intenta login" -ForegroundColor White
        Write-Host "3. Añade un producto al carrito" -ForegroundColor White
        Write-Host "4. Intenta checkout (debería conectar con el backend)" -ForegroundColor White
        Write-Host "`nSi todo funciona, ¡tu tienda está lista para producción!`n" -ForegroundColor Green
        
        exit 0
    }
    
    if ($attempt -lt $maxAttempts) {
        Start-Sleep -Seconds $CheckIntervalSeconds
    }
}

Write-Host "`n╔════════════════════════════════════════════════════════════╗" -ForegroundColor Red
Write-Host "║          ⚠️  TIMEOUT - DESPLIEGUE NO COMPLETADO ⚠️         ║" -ForegroundColor Red
Write-Host "╚════════════════════════════════════════════════════════════╝`n" -ForegroundColor Red

Write-Host "ESTADO FINAL:" -ForegroundColor Yellow
Write-Host "Backend: $(if($backendOnline){'✅ ONLINE'}else{'❌ OFFLINE'})" -ForegroundColor $(if($backendOnline){'Green'}else{'Red'})
Write-Host "Frontend: $(if($frontendOnline){'✅ ONLINE'}else{'❌ OFFLINE'})" -ForegroundColor $(if($frontendOnline){'Green'}else{'Red'})

Write-Host "`nSOLUCIONES:" -ForegroundColor Yellow
Write-Host "1. Revisa los logs en Render Dashboard" -ForegroundColor White
Write-Host "2. Verifica que render.yaml está en el root del repositorio" -ForegroundColor White
Write-Host "3. Asegúrate de que el repositorio está conectado correctamente" -ForegroundColor White
Write-Host "4. Los servicios podrían estar construyéndose (tarda más en la primera vez)" -ForegroundColor White

exit 1

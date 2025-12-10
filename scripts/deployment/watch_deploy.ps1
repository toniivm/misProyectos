# Monitor simple de despliegue de Valtrex Backend

param(
    [int]$MaxAttempts = 40,
    [int]$IntervalSeconds = 10
)

$backendUrl = "https://valtrex-backend.onrender.com/health"
$attempt = 0

Write-Host "`n=== VALTREX BACKEND DEPLOYMENT MONITOR ===" -ForegroundColor Cyan
Write-Host "Commit: e847e69 - Docker build fix" -ForegroundColor Gray
Write-Host "Started: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
Write-Host "Max wait time: $($MaxAttempts * $IntervalSeconds / 60) minutes`n" -ForegroundColor Gray

while ($attempt -lt $MaxAttempts) {
    $attempt++
    $timestamp = Get-Date -Format 'HH:mm:ss'
    
    Write-Host "[$timestamp] Attempt $attempt/$MaxAttempts" -ForegroundColor Cyan -NoNewline
    
    try {
        $response = Invoke-RestMethod -Uri $backendUrl -Method GET -TimeoutSec 5
        
        Write-Host " - SUCCESS!" -ForegroundColor Green
        Write-Host "`nBackend is ONLINE!" -ForegroundColor Green
        Write-Host "Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
        Write-Host "`nBackend URL: https://valtrex-backend.onrender.com" -ForegroundColor White
        Write-Host "Frontend URL: https://valtre.onrender.com`n" -ForegroundColor White
        exit 0
        
    } catch {
        $statusCode = "N/A"
        if ($_.Exception.Response) {
            $statusCode = $_.Exception.Response.StatusCode.value__
        }
        
        Write-Host " - Offline (HTTP $statusCode)" -ForegroundColor Yellow
        
        $elapsedMin = [math]::Floor(($attempt * $IntervalSeconds) / 60)
        
        if ($elapsedMin -lt 2) {
            Write-Host "  Status: Render queuing build..." -ForegroundColor Gray
        } elseif ($elapsedMin -lt 5) {
            Write-Host "  Status: Building Docker image..." -ForegroundColor Gray
        } else {
            Write-Host "  Status: Deploying or starting container..." -ForegroundColor Gray
        }
    }
    
    if ($attempt -lt $MaxAttempts) {
        Start-Sleep -Seconds $IntervalSeconds
    }
}

Write-Host "`nTimeout reached after $($MaxAttempts * $IntervalSeconds / 60) minutes" -ForegroundColor Red
Write-Host "Check Render Dashboard: https://dashboard.render.com/" -ForegroundColor Yellow
exit 1

#!/usr/bin/env pwsh
# Monitor backend deployment status

$backend = "https://valtrex-backend.onrender.com/health"
$maxAttempts = 30
$interval = 10

Write-Host "`n🚀 Monitoring Backend Deployment`n" -ForegroundColor Cyan
Write-Host "Backend URL: $backend"
Write-Host "Checking every $interval seconds (max $maxAttempts attempts)`n"

for ($i = 1; $i -le $maxAttempts; $i++) {
    Write-Host "[$i/$maxAttempts] Checking..." -NoNewline
    
    try {
        $response = Invoke-RestMethod -Uri $backend -ErrorAction Stop
        Write-Host " ✅ SUCCESS!" -ForegroundColor Green
        Write-Host "`nBackend Response:" -ForegroundColor Cyan
        $response | ConvertTo-Json
        Write-Host "`n🎉 Backend is now live and ready!" -ForegroundColor Green
        Write-Host "Frontend: https://valtre.onrender.com"
        Write-Host "Backend API: https://valtrex-backend.onrender.com"
        exit 0
    } catch {
        $code = $_.Exception.Response.StatusCode.value__
        Write-Host " ❌ HTTP $code" -ForegroundColor Red
        
        if ($i -lt $maxAttempts) {
            Write-Host "  Waiting $interval seconds..." -ForegroundColor Gray
            Start-Sleep -Seconds $interval
        }
    }
}

Write-Host "`n⏱️  Timeout reached after $($maxAttempts * $interval) seconds" -ForegroundColor Yellow
Write-Host "`n💡 Tips:" -ForegroundColor Cyan
Write-Host "1. Check Render dashboard: https://dashboard.render.com"
Write-Host "2. View backend logs: Dashboard > valtrex-backend > Logs"
Write-Host "3. Verify environment variables are set"
Write-Host "4. Try running this script again if deployment is still ongoing"
exit 1

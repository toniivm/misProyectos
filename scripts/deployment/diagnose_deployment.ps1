# Diagnóstico completo del despliegue de Valtrex

Write-Host "`n=== VALTREX DEPLOYMENT DIAGNOSTICS ===" -ForegroundColor Cyan
Write-Host "Fecha: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n" -ForegroundColor Gray

# 1. Estado del repositorio local
Write-Host "1. REPOSITORY STATUS" -ForegroundColor Yellow
Write-Host "-------------------" -ForegroundColor Gray
git status --short
$lastCommit = git log -1 --oneline
Write-Host "Last commit: $lastCommit" -ForegroundColor Gray
$branch = git branch --show-current
Write-Host "Current branch: $branch" -ForegroundColor Gray

# 2. Verificar archivos críticos
Write-Host "`n2. CRITICAL FILES CHECK" -ForegroundColor Yellow
Write-Host "----------------------" -ForegroundColor Gray

$criticalFiles = @(
    "render.yaml",
    "server/Dockerfile",
    "server/src/index.js",
    "server/src/app.js",
    "server/package.json"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "[OK] $file" -ForegroundColor Green
    } else {
        Write-Host "[MISSING] $file" -ForegroundColor Red
    }
}

# 3. Verificar configuración de render.yaml
Write-Host "`n3. RENDER.YAML CONFIGURATION" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Gray
$renderConfig = Get-Content render.yaml -Raw
if ($renderConfig -match 'rootDirectory: server') {
    Write-Host "[OK] rootDirectory: server configured" -ForegroundColor Green
} else {
    Write-Host "[ERROR] rootDirectory not properly configured" -ForegroundColor Red
}

if ($renderConfig -match 'healthCheckPath: /health') {
    Write-Host "[OK] healthCheckPath: /health configured" -ForegroundColor Green
} else {
    Write-Host "[WARNING] healthCheckPath not configured" -ForegroundColor Yellow
}

# 4. Test de conectividad del backend
Write-Host "`n4. BACKEND CONNECTIVITY TEST" -ForegroundColor Yellow
Write-Host "----------------------------" -ForegroundColor Gray
$backendUrl = "https://valtrex-backend.onrender.com"

try {
    $response = Invoke-WebRequest -Uri "$backendUrl/health" -Method GET -TimeoutSec 10 -UseBasicParsing
    Write-Host "[OK] Backend is ONLINE" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Gray
    Write-Host "Response: $($response.Content)" -ForegroundColor Gray
} catch {
    Write-Host "[ERROR] Backend is OFFLINE" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Gray
    
    # Intentar obtener más información del error
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "HTTP Status: $statusCode" -ForegroundColor Gray
        
        if ($statusCode -eq 404) {
            Write-Host "`nPOSSIBLE CAUSES:" -ForegroundColor Yellow
            Write-Host "- Backend service not deployed" -ForegroundColor Gray
            Write-Host "- Docker build failed" -ForegroundColor Gray
            Write-Host "- Routes not properly mounted" -ForegroundColor Gray
            Write-Host "- Service suspended in Render" -ForegroundColor Gray
        }
    }
}

# 5. Test de conectividad del frontend
Write-Host "`n5. FRONTEND CONNECTIVITY TEST" -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Gray
$frontendUrl = "https://valtre.onrender.com"

try {
    $response = Invoke-WebRequest -Uri $frontendUrl -Method GET -TimeoutSec 10 -UseBasicParsing
    Write-Host "[OK] Frontend is ONLINE" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Gray
} catch {
    Write-Host "[ERROR] Frontend is OFFLINE" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Gray
}

# 6. Verificar estructura de directorios del servidor
Write-Host "`n6. SERVER DIRECTORY STRUCTURE" -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Gray
$serverDirs = @("server/src", "server/tests", "server/node_modules")
foreach ($dir in $serverDirs) {
    if (Test-Path $dir) {
        $itemCount = (Get-ChildItem $dir -ErrorAction SilentlyContinue).Count
        Write-Host "[OK] $dir ($itemCount items)" -ForegroundColor Green
    } else {
        Write-Host "[MISSING] $dir" -ForegroundColor Red
    }
}

# 7. Verificar dependencias del backend
Write-Host "`n7. BACKEND DEPENDENCIES CHECK" -ForegroundColor Yellow
Write-Host "-----------------------------" -ForegroundColor Gray
if (Test-Path "server/package.json") {
    $packageJson = Get-Content "server/package.json" -Raw | ConvertFrom-Json
    $dependencies = $packageJson.dependencies.PSObject.Properties.Name
    Write-Host "Dependencies found: $($dependencies.Count)" -ForegroundColor Gray
    Write-Host "Key dependencies:" -ForegroundColor Gray
    @("express", "stripe", "firebase-admin", "@sendgrid/mail", "dotenv") | ForEach-Object {
        if ($dependencies -contains $_) {
            Write-Host "  [OK] $_" -ForegroundColor Green
        } else {
            Write-Host "  [MISSING] $_" -ForegroundColor Red
        }
    }
}

# 8. Resumen y recomendaciones
Write-Host "`n8. RECOMMENDATIONS" -ForegroundColor Yellow
Write-Host "------------------" -ForegroundColor Gray

Write-Host "`nTO FIX DEPLOYMENT ISSUES:" -ForegroundColor Cyan
Write-Host "1. Check Render Dashboard for 'valtrex-backend' service" -ForegroundColor White
Write-Host "   URL: https://dashboard.render.com/" -ForegroundColor Gray
Write-Host "`n2. Verify Environment Variables are set:" -ForegroundColor White
Write-Host "   - STRIPE_SECRET_KEY" -ForegroundColor Gray
Write-Host "   - FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY" -ForegroundColor Gray
Write-Host "   - SENDGRID_API_KEY, SENDER_EMAIL" -ForegroundColor Gray
Write-Host "   - ADMIN_API_KEY" -ForegroundColor Gray
Write-Host "`n3. Check deployment logs in Render for build errors" -ForegroundColor White
Write-Host "`n4. If service is suspended, click 'Resume' in Render Dashboard" -ForegroundColor White
Write-Host "`n5. Trigger manual deploy from Render Dashboard if needed" -ForegroundColor White

Write-Host "`n=== END OF DIAGNOSTICS ===`n" -ForegroundColor Cyan

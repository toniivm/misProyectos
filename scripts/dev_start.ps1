<#
DEV START SCRIPT - VALTREX
Uso rápido:
  powershell -ExecutionPolicy Bypass -File .\scripts\dev_start.ps1
Opciones:
  -SkipExternal    Usa mocks (sin Stripe/Firebase/SendGrid) para tests rápidos.
  -FrontendOnly    Arranca solo frontend.
  -BackendOnly     Arranca solo backend.
  -Port 3000       Cambia puerto frontend (por defecto 3000).
  -StripePublicKey pk_test_xxx  Establece clave pública Stripe (test por defecto).
#>
param(
  [switch]$SkipExternal,
  [switch]$FrontendOnly,
  [switch]$BackendOnly,
  [int]$Port = 3000,
  [string]$StripePublicKey = "pk_test_xxx"
)

$root = Split-Path -Parent $PSCommandPath | Split-Path -Parent
Write-Host "[VALTREX] Root: $root" -ForegroundColor Cyan

function Start-Backend {
  Write-Host "[VALTREX] Iniciando backend..." -ForegroundColor Yellow
  Push-Location "$root\server"
  if (!(Test-Path package.json)) { Write-Host "No existe server/package.json" -ForegroundColor Red; Pop-Location; return }
  if (!(Test-Path node_modules)) { Write-Host "Instalando dependencias backend..." -ForegroundColor DarkYellow; npm install }
  if ($SkipExternal) { $env:SKIP_EXTERNAL = "1"; Write-Host "Usando mocks externos (SKIP_EXTERNAL=1)" -ForegroundColor Magenta } else { $env:SKIP_EXTERNAL = "" }
  if (-not $env:ADMIN_API_KEY) { $env:ADMIN_API_KEY = "dev_admin_key" }
  $backendCmd = "node src/index.js"
  Start-Job -Name VALTREX_BACKEND -ScriptBlock { param($cmd,$path) Set-Location $path; Invoke-Expression $cmd } -ArgumentList $backendCmd, (Get-Location).Path | Out-Null
  Pop-Location
}

function Start-Frontend {
  Write-Host "[VALTREX] Iniciando frontend..." -ForegroundColor Yellow
  Push-Location $root
  if (!(Test-Path package.json)) { Write-Host "No existe package.json front" -ForegroundColor Red; Pop-Location; return }
  if (!(Test-Path node_modules)) { Write-Host "Instalando dependencias frontend..." -ForegroundColor DarkYellow; npm install }
  $env:REACT_APP_API_BASE = "http://localhost:8080"
  $env:REACT_APP_STRIPE_PUBLIC_KEY = $StripePublicKey
  $env:PORT = $Port
  $frontendCmd = "npm start"
  Start-Job -Name VALTREX_FRONTEND -ScriptBlock { param($cmd,$path) Set-Location $path; Invoke-Expression $cmd } -ArgumentList $frontendCmd, (Get-Location).Path | Out-Null
  Pop-Location
}

if ($FrontendOnly -and $BackendOnly) { Write-Host "No puedes usar -FrontendOnly y -BackendOnly juntos" -ForegroundColor Red; exit 1 }

if (-not $BackendOnly) { Start-Frontend }
if (-not $FrontendOnly) { Start-Backend }

Write-Host "\n[VALTREX] Jobs activos:" -ForegroundColor Cyan
Get-Job | Where-Object { $_.Name -like 'VALTREX_*' } | Format-Table Name, State, HasMoreData -AutoSize

Write-Host "\n[VALTREX] Ver logs backend:" -ForegroundColor Cyan
Write-Host "Receive-Job VALTREX_BACKEND -Keep" -ForegroundColor Gray
Write-Host "[VALTREX] Ver logs frontend:" -ForegroundColor Cyan
Write-Host "Receive-Job VALTREX_FRONTEND -Keep" -ForegroundColor Gray

Write-Host "\n[VALTREX] Para detener:" -ForegroundColor Cyan
Write-Host "Stop-Job VALTREX_BACKEND; Stop-Job VALTREX_FRONTEND" -ForegroundColor Gray
Write-Host "Remove-Job VALTREX_BACKEND; Remove-Job VALTREX_FRONTEND" -ForegroundColor Gray

Write-Host "\n[VALTREX] Abre: http://localhost:$Port" -ForegroundColor Green
Write-Host "[VALTREX] Backend health: http://localhost:8080/health" -ForegroundColor Green

if ($SkipExternal) { Write-Host "[VALTREX] Modo prueba sin servicios externos habilitado." -ForegroundColor Magenta }

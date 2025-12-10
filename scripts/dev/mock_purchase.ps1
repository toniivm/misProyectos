<#
Simulacion de flujo de compra (modo mock opcional si backend arrancado con SKIP_EXTERNAL=1)
Requisitos:
  - Backend corriendo en http://localhost:8080
  - Variable $adminApiKey (para endpoints protegidos opcionales)
Uso:
  powershell -ExecutionPolicy Bypass -File .\scripts\mock_purchase.ps1 -Email test@demo.local -Currency eur
#>
param(
  [string]$Email = 'tester@example.com',
  [string]$Currency = 'eur',
  [switch]$AdminFlow
)

$base = 'http://localhost:8080'
Write-Host "[PURCHASE] Iniciando simulación contra $base" -ForegroundColor Cyan

function CallJsonPost($url,$body,$headers){
  try {
    $json = $body | ConvertTo-Json -Depth 5
    $resp = Invoke-RestMethod -Method Post -Uri $url -Body $json -ContentType 'application/json' -Headers $headers -TimeoutSec 30
    return $resp
  } catch {
    Write-Host "[ERROR] POST $url -> $_" -ForegroundColor Red
    throw
  }
}

# 1. Health
$health = Invoke-RestMethod -Method Get -Uri "$base/health"
Write-Host "[HEALTH] ok=$($health.ok) skipExternal=$($health.test)" -ForegroundColor Green

# 2. Crear intent
$items = @(
  @{ id = 'demo-shoe-1'; qty = 1 },
  @{ id = 'demo-shoe-2'; qty = 2 }
)
$shipping = @{ country = 'ES'; method = 'standard' }
$headers = @{ 'Idempotency-Key' = [guid]::NewGuid().ToString() }
$intent = CallJsonPost "$base/payments/create-intent" @{ items = $items; currency = $Currency; email = $Email; shipping = $shipping } $headers
Write-Host "[INTENT] orderId=$($intent.orderId) clientSecret=$($intent.clientSecret.Substring(0,12))..." -ForegroundColor Yellow

if ($AdminFlow) {
  if (-not $env:ADMIN_API_KEY) { Write-Host '[ADMIN] Falta ADMIN_API_KEY en entorno' -ForegroundColor Red; exit 1 }
  $adminHeaders = @{ 'x-api-key' = $env:ADMIN_API_KEY }
  # 3. Listar pedidos
  $orders = Invoke-RestMethod -Method Get -Uri "$base/orders" -Headers $adminHeaders
  Write-Host "[ORDERS] total=$($orders.orders.Count)" -ForegroundColor Magenta
  # 4. Workflow pack/ship/deliver
  Invoke-RestMethod -Method Post -Uri "$base/orders/$($intent.orderId)/pack" -Headers $adminHeaders | Out-Null
  Write-Host "[WORKFLOW] Packed" -ForegroundColor Magenta
  Invoke-RestMethod -Method Post -Uri "$base/orders/$($intent.orderId)/ship" -Headers $adminHeaders -Body (@{ trackingNumber = 'TRACK123'; carrier = 'DHL' } | ConvertTo-Json) -ContentType 'application/json' | Out-Null
  Write-Host "[WORKFLOW] Shipped" -ForegroundColor Magenta
  Invoke-RestMethod -Method Post -Uri "$base/orders/$($intent.orderId)/deliver" -Headers $adminHeaders | Out-Null
  Write-Host "[WORKFLOW] Delivered" -ForegroundColor Magenta
}

Write-Host "[PURCHASE] Simulación completada" -ForegroundColor Green

# Seeds Firestore product stock using backend admin endpoint.
# Requires ADMIN_API_KEY environment variable.

param(
    [string]$ApiBase = "https://valtre-backend.onrender.com",
    [int]$DefaultStock = 25
)

if (-not $env:ADMIN_API_KEY) {
    Write-Error "ADMIN_API_KEY no está definido en el entorno.";
    exit 1;
}

$body = @{ defaultStock = $DefaultStock } | ConvertTo-Json
$headers = @{ "x-admin-key" = $env:ADMIN_API_KEY; "Content-Type" = "application/json" }

try {
    Write-Host "Seeding productos en $ApiBase ..."
    $resp = Invoke-RestMethod -Method Post -Uri "$ApiBase/admin/seed-products" -Headers $headers -Body $body
    Write-Host "Listo" ($resp | ConvertTo-Json -Depth 5)
} catch {
    Write-Error "Error al sembrar stock: $_"
    exit 1;
}

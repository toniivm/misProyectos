Set-StrictMode -Version Latest
$repo = "d:\Escritorio\tiendaPrueba\misProyectos"
Push-Location $repo
Write-Host "Staging server files..."
$files = @(
  "server/package.json",
  "server/.env.example",
  "server/README.md",
  "server/src/index.js"
)
foreach ($f in $files) { if (Test-Path $f) { git add $f; Write-Host "Added $f" } else { Write-Host "Missing $f" -ForegroundColor Yellow } }
Write-Host "Staging render.yaml & checkout page"
if (Test-Path "render.yaml") { git add render.yaml }
if (Test-Path "src/pages/CheckoutPage.jsx") { git add src/pages/CheckoutPage.jsx }
Write-Host "Committing..."
git commit -m "feat(backend): add server (Stripe/Firestore/SendGrid) + checkout integration" | Write-Host
Write-Host "Pushing..."
git push origin main | Write-Host
Pop-Location

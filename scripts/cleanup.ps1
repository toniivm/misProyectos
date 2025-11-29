Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

$repo = "d:\Escritorio\tiendaPrueba\misProyectos"
Push-Location $repo

Write-Host "=== Cleaning unused files ===" -ForegroundColor Cyan

# Delete duplicate folder
if (Test-Path "tienda-zapatillas") {
    Remove-Item -Recurse -Force "tienda-zapatillas"
    Write-Host "Deleted: tienda-zapatillas/" -ForegroundColor Green
}

# Delete backup and unused pages
$filesToDelete = @(
    "src\pages\HomePage.backup.jsx",
    "src\pages\Terms.jsx",
    "src\pages\Contact.jsx",
    "src\pages\ShippingReturns.jsx",
    "src\pages\SizeGuide.jsx",
    "src\data\products.backup.js",
    "products.js",
    "COMMIT_MSG.txt",
    "deploy.ps1",
    "commit_push.log",
    "ACTIVAR_STRIPE_5_PASOS.md",
    "CHANGELOG.md",
    "CHECKOUT_IMPLEMENTATION_GUIDE.md",
    "OPTIMIZACIONES.md",
    "PROBAR_STRIPE.md",
    "RESUMEN_MEJORAS_CHECKOUT.md",
    "STRIPE_INTEGRATION_GUIDE.md"
)

foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item -Force $file
        Write-Host "Deleted: $file" -ForegroundColor Green
    }
}

# Delete unused components
$unusedComponents = @(
    "src\components\CookieConsent.jsx",
    "src\components\NewsletterSignup.jsx",
    "src\components\FeaturedSection.jsx"
)

foreach ($comp in $unusedComponents) {
    if (Test-Path $comp) {
        Remove-Item -Force $comp
        Write-Host "Deleted: $comp" -ForegroundColor Yellow
    }
}

# Delete unused entry points
if (Test-Path "src\main.jsx") {
    Remove-Item -Force "src\main.jsx"
    Write-Host "Deleted: src\main.jsx (using index.js)" -ForegroundColor Yellow
}

if (Test-Path "src\App.css") {
    Remove-Item -Force "src\App.css"
    Write-Host "Deleted: src\App.css (unused)" -ForegroundColor Yellow
}

# Service worker files (not needed for basic deployment)
if (Test-Path "src\service-worker.js") {
    Remove-Item -Force "src\service-worker.js"
    Write-Host "Deleted: src\service-worker.js" -ForegroundColor Yellow
}

if (Test-Path "src\serviceWorkerRegistration.js") {
    Remove-Item -Force "src\serviceWorkerRegistration.js"
    Write-Host "Deleted: src\serviceWorkerRegistration.js" -ForegroundColor Yellow
}

if (Test-Path "src\utils\performance.js") {
    Remove-Item -Force "src\utils\performance.js"
    Write-Host "Deleted: src\utils\performance.js" -ForegroundColor Yellow
}

Write-Host "`n=== Cleanup complete ===" -ForegroundColor Cyan

Pop-Location

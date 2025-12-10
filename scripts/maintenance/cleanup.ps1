param(
    [switch]$Execute,
    [switch]$IncludeNodeModules
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..' '..')
Push-Location $repoRoot

$targets = @(
    @{ Path = 'tienda-zapatillas'; Description = 'Duplicated frontend copy'; Type = 'Dir' },
    @{ Path = 'build'; Description = 'CRA build output'; Type = 'Dir' },
    @{ Path = 'commit_push.log'; Description = 'Old git automation log'; Type = 'File' },
    @{ Path = 'firebase-debug.log'; Description = 'Firebase debug log'; Type = 'File' },
    @{ Path = 'valtre-73c7b-firebase-adminsdk-fbsvc-8c78dac1b8.json'; Description = 'Firebase admin credential (should stay out of repo)'; Type = 'File' }
)

if ($IncludeNodeModules) {
    $targets += @{ Path = 'node_modules'; Description = 'Local dependencies cache'; Type = 'Dir' }
}

$found = @()
foreach ($item in $targets) {
    if (Test-Path $item.Path) {
        $found += $item
    }
}

if ($found.Count -eq 0) {
    Write-Host "Nothing to clean." -ForegroundColor Green
    Pop-Location
    return
}

Write-Host "=== Cleanup Report ===" -ForegroundColor Cyan
foreach ($item in $found) {
    Write-Host "- $($item.Path) -> $($item.Description)" -ForegroundColor Yellow
}

if (-not $Execute) {
    Write-Host "Dry run. Use -Execute to delete." -ForegroundColor Yellow
    Pop-Location
    return
}

foreach ($item in $found) {
    try {
        $path = $item.Path
        if ($item.Type -eq 'Dir') {
            Remove-Item -Recurse -Force $path
        } else {
            Remove-Item -Force $path
        }
        Write-Host "Removed: $path" -ForegroundColor Green
    } catch {
        Write-Host "Failed to remove $($item.Path): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Cleanup finished." -ForegroundColor Cyan
Pop-Location

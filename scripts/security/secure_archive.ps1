<#
Creates an AES-256 encrypted 7z archive of the current repo (or a target folder).
Requires 7-Zip installed (7z.exe). If not found, it shows install hints.
Usage examples:
  powershell -ExecutionPolicy Bypass -File .\scripts\secure_archive.ps1
  powershell -ExecutionPolicy Bypass -File .\scripts\secure_archive.ps1 -Target "D:\Escritorio\tiendaPrueba\misProyectos" -OutDir "D:\Backups"
#>
param(
  [string]$Target = (Resolve-Path "$PSScriptRoot\..\").Path,
  [string]$OutDir = (Join-Path $env:USERPROFILE "Desktop"),
  [switch]$Timestamp
)

$sevenZip = "C:\\Program Files\\7-Zip\\7z.exe"
if (-not (Test-Path $sevenZip)) {
  $sevenZip = (Get-Command 7z -ErrorAction SilentlyContinue).Source
}
if (-not $sevenZip) {
  Write-Warning "7-Zip (7z.exe) not found. Install from https://www.7-zip.org/ or via Chocolatey: choco install 7zip"
  exit 1
}

$baseName = Split-Path $Target -Leaf
$stamp = if ($Timestamp) { "_" + (Get-Date -Format "yyyyMMdd_HHmmss") } else { "" }
$outFile = Join-Path $OutDir ("${baseName}${stamp}.7z")

$password = Read-Host -AsSecureString "Set archive password"
# Convert to plain text only for passing to 7z (note: appears in process args briefly)
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$Plain = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($BSTR)
try {
  & "$sevenZip" a -t7z -mhe=on -m0=lzma2 -mx=9 -p"$Plain" -- "%outFile%" "$Target" | Out-Host
  Write-Host "Encrypted archive created:" $outFile -ForegroundColor Green
} finally {
  if ($BSTR) { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($BSTR) }
}

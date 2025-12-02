<#
Encrypts a folder with Windows EFS (per-user encryption). Files become unreadable to other users.
Back up the EFS certificate after encrypting.
Usage:
  powershell -ExecutionPolicy Bypass -File .\scripts\encrypt_folder_efs.ps1 -Path "D:\Sensitive"
#>
param(
  [Parameter(Mandatory=$true)][string]$Path,
  [string]$ExportPfxPath
)

if (-not (Test-Path $Path)) { Write-Error "Path not found: $Path"; exit 1 }
Write-Host "Encrypting folder with EFS:" $Path -ForegroundColor Cyan
cipher /E /S:"$Path" | Out-Host

if ($ExportPfxPath) {
  Write-Host "Exporting EFS certificate to:" $ExportPfxPath -ForegroundColor Yellow
  $store = New-Object System.Security.Cryptography.X509Certificates.X509Store("My","CurrentUser")
  $store.Open([System.Security.Cryptography.X509Certificates.OpenFlags]::ReadOnly)
  $efsCert = $store.Certificates | Where-Object { $_.EnhancedKeyUsageList.Oid.Value -contains "1.3.6.1.4.1.311.10.3.4" } | Select-Object -First 1
  if (-not $efsCert) { Write-Warning "EFS cert not found. Try logging off/on and re-run export."; exit 0 }
  $pwd = Read-Host -AsSecureString "Set export password"
  $bytes = $efsCert.Export([System.Security.Cryptography.X509Certificates.X509ContentType]::Pfx, $pwd)
  [IO.File]::WriteAllBytes($ExportPfxPath, $bytes)
  Write-Host "EFS certificate exported. Store it securely." -ForegroundColor Green
  $store.Close()
}

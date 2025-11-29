Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

$repo = "d:\Escritorio\tiendaPrueba\misProyectos"
$log = Join-Path $repo "commit_push.log"
$exitLog = Join-Path $repo ".git\commit_push_exitcodes.txt"

Push-Location $repo

"=== git status (before) ===" | Tee-Object -FilePath $log -Append
(git status 2>&1) | Tee-Object -FilePath $log -Append

"=== git add -A ===" | Tee-Object -FilePath $log -Append
(git add -A 2>&1) | Tee-Object -FilePath $log -Append

"=== git status (after add) ===" | Tee-Object -FilePath $log -Append
(git status -s -b 2>&1) | Tee-Object -FilePath $log -Append

"=== git commit ===" | Tee-Object -FilePath $log -Append
(git commit -m "Merge updates: Stripe, Wishlist, Sneakers, Admin, Performance" 2>&1) | Tee-Object -FilePath $log -Append
$commitExit = $LASTEXITCODE

"=== git log -1 --oneline ===" | Tee-Object -FilePath $log -Append
(git log -1 --oneline 2>&1) | Tee-Object -FilePath $log -Append

"=== git push origin main ===" | Tee-Object -FilePath $log -Append
(git push origin main 2>&1) | Tee-Object -FilePath $log -Append
$pushExit = $LASTEXITCODE

("commitExit={0}; pushExit={1}" -f $commitExit, $pushExit) | Out-File -FilePath $exitLog -Encoding utf8

Pop-Location

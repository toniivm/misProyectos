$body = @{
  items = @(@{
    id = "1"
    qty = 1
    price = 189.99
    name = "Nike AF1"
  })
  currency = "eur"
  email = "test@example.com"
  shipping = @{
    name = "Test User"
    address = @{
      line1 = "Main St 1"
      city = "Madrid"
      postal_code = "28001"
      country = "ES"
    }
  }
} | ConvertTo-Json -Depth 10

try {
  $resp = Invoke-RestMethod -Method POST `
    -Uri https://misproyectos-neyj.onrender.com/payments/create-intent `
    -ContentType "application/json" `
    -Body $body `
    -ErrorAction Stop
  
  Write-Host "Success!"
  Write-Host ($resp | ConvertTo-Json)
} catch {
  Write-Host "Failed"
  Write-Host $_.Exception.Message
}


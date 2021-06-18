# --------------------
# Lite copy - Alibaba CRM
# (c) Kingcean Tuan, 2014.
#
# File  copy.ps1
# Description  The utilities to copy source to target for deployment.
# Owner  Kingcean Tuan <kingcean@live.com>
# --------------------  */

# Business Logic

$rootPath = "."

Function CopyFolder([string[]]$folders)
{
    foreach ($folder in $folders)
    {
        $sourceDir = "$rootPath\src" + $folder
        if (-not (Test-Path $sourceDir)) {
            continue
        }

        $targetDir = "$rootPath\build" + $folder
        if (-not (Test-Path $targetDir)) {
            New-Item $targetDir -Type directory
        }

        $sourceFiles = $sourceDir + "*"
        Copy-Item $sourceFiles $targetDir -Recurse -Force
    }

    Write-Host "Client scripts: Files copied."
}

# Exec

CopyFolder ("\scripts\", "\content\", "\css\", "\images\", "\icons\", "\content\", "\config\", "\generated\")

# SIG # Begin signature block
# MIIFrwYJKoZIhvcNAQcCoIIFoDCCBZwCAQExCzAJBgUrDgMCGgUAMGkGCisGAQQB
# gjcCAQSgWzBZMDQGCisGAQQBgjcCAR4wJgIDAQAABBAfzDtgWUsITrck0sYpfvNR
# AgEAAgEAAgEAAgEAAgEAMCEwCQYFKw4DAhoFAAQUmlDegYHQ+wqdYW+KyNnKdqgf
# d3SgggM/MIIDOzCCAiegAwIBAgIQDS+bT70PDZ5CwkvBATsgpDAJBgUrDgMCHQUA
# MCUxIzAhBgNVBAMTGktpbmcgU2lnbmF0dXJlIGZvciBBbGliYWJhMB4XDTE1MDEz
# MDA4MzMyNFoXDTM5MTIzMTIzNTk1OVowJTEjMCEGA1UEAxMaS2luZyBTaWduYXR1
# cmUgZm9yIEFsaWJhYmEwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCK
# D4QzS8PrpH4AlJZIAIa73F3NMs03/m3WLDpSavrqio7QumAC9kAmGeZRUBfn3ma5
# dfcKIeUPob5WBoEHfzO3Syi6bV7O17wjDsjJboeOFECi+9ZAcXgpqbVrH9RdrKJ3
# l/oxnfhx9OGBnhBx19BRpAnYmZk6VMb1SDTkdzqCLy/BEVCEG9WtuZJTie4DPRAa
# bsZJHn28FjlhmSHWZJDPrG34TClQLi4c0Zjemq8GfSTd2io1Pcee4CXTcp7dLrxn
# tkm83KZa8o5I2wCFgUII9Zl0IFYpLyk4XSgVdNa2Rtli+tCffvZlFqkspPiY7Ldn
# J52lHkfUB+G9rHcS0jBlAgMBAAGjbzBtMBMGA1UdJQQMMAoGCCsGAQUFBwMDMFYG
# A1UdAQRPME2AEJM+gAZfL8L7LTdmtOo5f3+hJzAlMSMwIQYDVQQDExpLaW5nIFNp
# Z25hdHVyZSBmb3IgQWxpYmFiYYIQDS+bT70PDZ5CwkvBATsgpDAJBgUrDgMCHQUA
# A4IBAQAzcawvuGar2si+7fJPWU1JTQZF8jhbviZWvYkRdFPthuU7mZ/Fux4pgPiU
# oi6aF5wgtjXZ+NzXG/QBNzGIYvXpL9vSQlUM2dL+2j+Dz80FyU/BjuXmdB0fNBqH
# op27TGezwdmGAyi0mIVp4WKxkje3c+KtulQxwvvm8YvAlZl/sLv7YacIf2ccHZvs
# nb4M4g/KU5cestkA5maJBTW/Pr7dtTXUDkb3k13yj4ljZWb3yDXBzgmibz3pP9x0
# Lh8N6LIDU5V1Q00mX+f1SYjpGU2GqkpuZdtj0eDBafzo6LIQMgjMk4tiafOAt3eb
# cbCGiuzktYRoTwf+cTwR5o1HPzFgMYIB2jCCAdYCAQEwOTAlMSMwIQYDVQQDExpL
# aW5nIFNpZ25hdHVyZSBmb3IgQWxpYmFiYQIQDS+bT70PDZ5CwkvBATsgpDAJBgUr
# DgMCGgUAoHgwGAYKKwYBBAGCNwIBDDEKMAigAoAAoQKAADAZBgkqhkiG9w0BCQMx
# DAYKKwYBBAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGCNwIBFTAjBgkq
# hkiG9w0BCQQxFgQUXlCQAmn1Tmbo9QEh4vzVXDfBVowwDQYJKoZIhvcNAQEBBQAE
# ggEAfrPuUib82EL5XKyRmP99kdrj7xUsZKve+vRcNw/OkihPwMdj2PZuLEKJhHFp
# Wdj2FaNEo688jITHmgxvJwxqFXxaV6v9ty+NXx43N4l6u1ZPQwpmeItc86ECdZGO
# 4e574CMynJAmt4/V+m1BunNKTVitpjWM+1R3W5kIoAPWCceN4uLqhQd+qdACf067
# pjnzgo3c2t8mbNOPY0wGo0Fg6WBl/wNTbzWIkyiAxbZcpEM/2FcDV9lkm++Lftg2
# rUn9M/fGMjrg2tLr8xN6TFrbiqfZFE+R42wD5JGSBWVo4Iw1B6o4FWS3Ro49fuc+
# eZEoogpc0aZ2Y3h9H1U6ErbI5A==
# SIG # End signature block

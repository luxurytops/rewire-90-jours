param(
  [ValidateRange(1024, 65535)]
  [int]$Port = 8000
)

$ErrorActionPreference = "Stop"
$SiteRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$Listener = [Net.Sockets.TcpListener]::new([Net.IPAddress]::Loopback, $Port)

function Get-ContentType([string]$Path) {
  switch ([IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8" }
    ".css" { "text/css; charset=utf-8" }
    ".js" { "text/javascript; charset=utf-8" }
    ".json" { "application/json; charset=utf-8" }
    ".webmanifest" { "application/manifest+json; charset=utf-8" }
    ".png" { "image/png" }
    ".webp" { "image/webp" }
    default { "application/octet-stream" }
  }
}

function Send-Response {
  param(
    [Net.Sockets.NetworkStream]$Stream,
    [string]$Status,
    [string]$ContentType,
    [byte[]]$Body,
    [bool]$SendBody = $true
  )

  $Headers = [Text.Encoding]::ASCII.GetBytes(
    "HTTP/1.1 $Status`r`n" +
    "Content-Type: $ContentType`r`n" +
    "Content-Length: $($Body.Length)`r`n" +
    "Cache-Control: no-cache`r`n" +
    "X-Content-Type-Options: nosniff`r`n" +
    "Connection: close`r`n`r`n"
  )

  $Stream.Write($Headers, 0, $Headers.Length)
  if ($SendBody -and $Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
  $Stream.Flush()
}

$Listener.Start()
Write-Host "REWIRE PWA disponible sur http://localhost:$Port/"
Write-Host "Appuyez sur Ctrl+C pour arrêter le serveur."

try {
  while ($true) {
    $Client = $Listener.AcceptTcpClient()

    try {
      $Stream = $Client.GetStream()
      $Reader = [IO.StreamReader]::new(
        $Stream,
        [Text.Encoding]::ASCII,
        $false,
        1024,
        $true
      )

      $RequestLine = $Reader.ReadLine()
      while (($HeaderLine = $Reader.ReadLine()) -ne "") {
        if ($null -eq $HeaderLine) { break }
      }

      $RequestParts = $RequestLine -split " "
      $Method = $RequestParts[0]
      $RequestTarget = $RequestParts[1]

      if ($Method -notin @("GET", "HEAD")) {
        $Body = [Text.Encoding]::UTF8.GetBytes("Méthode non autorisée")
        Send-Response $Stream "405 Method Not Allowed" "text/plain; charset=utf-8" $Body
        continue
      }

      $UrlPath = ($RequestTarget -split "\?", 2)[0]
      $RelativePath = [Uri]::UnescapeDataString($UrlPath).TrimStart("/")
      $RelativePath = $RelativePath.Replace("/", [IO.Path]::DirectorySeparatorChar)
      $Candidate = [IO.Path]::GetFullPath((Join-Path $SiteRoot $RelativePath))
      $InsideRoot = $Candidate -eq $SiteRoot -or $Candidate.StartsWith(
        $SiteRoot + [IO.Path]::DirectorySeparatorChar,
        [StringComparison]::OrdinalIgnoreCase
      )

      if (-not $InsideRoot) {
        $Body = [Text.Encoding]::UTF8.GetBytes("Accès interdit")
        Send-Response $Stream "403 Forbidden" "text/plain; charset=utf-8" $Body ($Method -eq "GET")
        continue
      }

      if (Test-Path -LiteralPath $Candidate -PathType Container) {
        $Candidate = Join-Path $Candidate "index.html"
      }

      if (-not (Test-Path -LiteralPath $Candidate -PathType Leaf)) {
        $Body = [Text.Encoding]::UTF8.GetBytes("Ressource introuvable")
        Send-Response $Stream "404 Not Found" "text/plain; charset=utf-8" $Body ($Method -eq "GET")
        continue
      }

      $Body = [IO.File]::ReadAllBytes($Candidate)
      Send-Response $Stream "200 OK" (Get-ContentType $Candidate) $Body ($Method -eq "GET")
      Write-Host "$Method $UrlPath -> 200"
    }
    catch {
      Write-Warning $_.Exception.Message
    }
    finally {
      $Client.Close()
    }
  }
}
finally {
  $Listener.Stop()
}

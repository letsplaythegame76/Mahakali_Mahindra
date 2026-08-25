$html = Get-Content .\index.html -Raw
New-Item -ItemType Directory -Force -Path .\src\config, .\src\app, .\src\styles | Out-Null

$styleMatches = [regex]::Matches($html, '<style>([\s\S]*?)</style>')
$css = ($styleMatches | ForEach-Object { $_.Groups[1].Value }) -join "`r`n"
Set-Content .\src\styles\app.css $css -Encoding utf8

$firebase = [regex]::Match($html, '<script type="module">([\s\S]*?)</script>').Groups[1].Value
Set-Content .\src\config\firebase.js $firebase -Encoding utf8

$scripts = [regex]::Matches($html, '<script>([\s\S]*?)</script>')
$crm = $scripts[$scripts.Count - 1].Groups[1].Value
Set-Content .\src\app\ShowroomDeskCRM.js $crm -Encoding utf8
Set-Content .\src\app\bootstrap.js "import './ShowroomDeskCRM.js';" -Encoding utf8

$html = [regex]::Replace($html, '<style>[\s\S]*?</style>', '')
$html = [regex]::Replace($html, '<script type="module">[\s\S]*?</script>', '<script type="module" src="./src/config/firebase.js"></script>')
$html = [regex]::Replace($html, '<script>[\s\S]*?</script>', '')
$html = $html.Replace('</head>', "    <link rel=`"stylesheet`" href=`"./src/styles/app.css`">`r`n</head>")
$html = $html.Replace('</body>', "    <script type=`"module`" src=`"./src/app/bootstrap.js`"></script>`r`n</body>")
Set-Content .\index.html $html -Encoding utf8
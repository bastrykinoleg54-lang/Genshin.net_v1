$ErrorActionPreference = 'Stop'

$siteRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$reportDirectory = Join-Path $siteRoot 'Журналы сервера'
$port = 4173
$prefix = "http://127.0.0.1:$port/"
$sessionTimestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$sessionId = $sessionTimestamp
$reportPath = Join-Path $reportDirectory "сеанс-$sessionId.md"
$sequence = 1
while (Test-Path -LiteralPath $reportPath) {
    $sessionId = "$sessionTimestamp-$sequence"
    $reportPath = Join-Path $reportDirectory "сеанс-$sessionId.md"
    $sequence++
}
$startedAt = Get-Date
$script:eventCount = 0
$script:visitedPages = [System.Collections.Generic.List[string]]::new()
$script:stopRequested = $false
$script:serverStarted = $false

New-Item -ItemType Directory -Path $reportDirectory -Force | Out-Null
$header = @(
    '# Отчёт о работе локального сайта',
    '',
    "- Сеанс: ``$sessionId``",
    "- Адрес: ``http://localhost:$port/``",
    "- Запущен: $($startedAt.ToString('yyyy-MM-dd HH:mm:ss zzz'))",
    '- Журнал действий не сохраняет пароли, содержимое полей, адреса электронной почты или поисковые запросы.',
    '- Авторизация сайта демонстрационная: отметка об успехе означает только локальную запись в браузере.',
    '',
    '## События',
    '',
    '| Время | Тип | Страница / подробности |',
    '|---|---|---|'
)
[IO.File]::WriteAllLines($reportPath, $header, [Text.UTF8Encoding]::new($false))

function Add-ReportRow {
    param([string]$EventType, [string]$Page, [string]$Details)

    $time = (Get-Date).ToString('yyyy-MM-dd HH:mm:ss zzz')
    $safePage = $Page.Replace('|', '\|')
    $safeDetails = $Details.Replace('|', '\|').Replace("`r", ' ').Replace("`n", ' ')
    $row = "| $time | $EventType | ``$safePage`` — $safeDetails |"
    [IO.File]::AppendAllText($reportPath, $row + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
    $script:eventCount++
}

function Get-SafeDetails {
    param($Payload)

    $details = $Payload.details
    switch ([string]$Payload.type) {
        'click' {
            $target = [string]$details.target
            if ($target -eq 'signup') { return 'Выбрана вкладка регистрации' }
            if ($target -eq 'login') { return 'Выбрана вкладка входа' }
            if ($target -match '@|password|парол' -or $target.Length -gt 100) { return 'Нажат элемент управления' }
            return "Нажат элемент: $target"
        }
        'filter_change' {
            $category = [string]$details.category
            if ($category -notin @('Все', 'Дизайн', 'Контент', 'Разработка', 'Продвижение')) { return 'Изменён фильтр каталога' }
            return "Выбран фильтр каталога: $category"
        }
        'search_change' {
            $length = 0
            if ([int]::TryParse([string]$details.length, [ref]$length)) { return "Изменён поисковый запрос (символов: $length; текст не записывается)" }
            return 'Изменён поисковый запрос (текст не записывается)'
        }
        'auth_open' {
            if ([string]$details.purchase -eq 'true') { return 'Открыто окно авторизации перед покупкой' }
            return 'Открыто окно авторизации'
        }
        'auth_mode' {
            if ([string]$details.mode -eq 'signup') { return 'Выбран режим регистрации' }
            return 'Выбран режим входа'
        }
        'auth_submit' {
            if ([string]$details.mode -eq 'signup') { return 'Отправлена форма регистрации (вводимые данные не записываются)' }
            return 'Отправлена форма входа (вводимые данные не записываются)'
        }
        'auth_validation_failed' {
            if ([string]$details.reason -eq 'invalid_email') { return 'Форма не принята: некорректный адрес электронной почты (значение не записывается)' }
            if ([string]$details.reason -eq 'missing_or_invalid_field') { return 'Форма не принята встроенной проверкой полей (значения не записываются)' }
            return 'Форма не принята: пароль короче минимальной длины (сам пароль не записывается)'
        }
        'auth_demo_success' {
            if ([string]$details.mode -eq 'signup') { return 'Регистрация принята демо-интерфейсом и сохранена локально в браузере; серверной учётной записи нет' }
            return 'Вход принят демо-интерфейсом и сохранён локально в браузере; серверной проверки нет'
        }
        'auth_logout' { return 'Локальная сессия пользователя завершена' }
        'page_exit' { return 'Страница закрыта или выполнен переход' }
        default { return 'Зафиксировано действие интерфейса' }
    }
}

$listener = [Net.HttpListener]::new()
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
    $script:serverStarted = $true
    Add-ReportRow -EventType 'СЕРВЕР' -Page '/' -Details 'Сервер запущен; для завершения нажмите Ctrl+C в этом окне'
    Write-Host "Сайт запущен: http://localhost:$port/"
    Write-Host "Отчёт этого цикла: $reportPath"
    Write-Host 'Для остановки сервера нажмите Ctrl+C в этом окне.'

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        try {
            if ($request.HttpMethod -eq 'POST' -and $request.Url.AbsolutePath -eq '/__stop') {
                Add-ReportRow -EventType 'СЕРВЕР' -Page '/' -Details 'Получена команда остановки сервера'
                $response.StatusCode = 200
                $script:stopRequested = $true
            } elseif ($request.HttpMethod -eq 'POST' -and $request.Url.AbsolutePath -eq '/__log') {
                if ($request.ContentLength64 -gt 8192) {
                    $response.StatusCode = 413
                } else {
                    $reader = [IO.StreamReader]::new($request.InputStream, [Text.Encoding]::UTF8)
                    try { $body = $reader.ReadToEnd() } finally { $reader.Dispose() }
                    $payload = $body | ConvertFrom-Json
                    $allowedTypes = @('click', 'filter_change', 'search_change', 'auth_open', 'auth_mode', 'auth_submit', 'auth_validation_failed', 'auth_demo_success', 'auth_logout', 'page_exit')
                    $page = [string]$payload.page
                    if ($payload.type -notin $allowedTypes -or $page -notmatch '^/[A-Za-z0-9._/-]*$') {
                        $response.StatusCode = 400
                    } else {
                        $details = Get-SafeDetails -Payload $payload
                        Add-ReportRow -EventType ([string]$payload.type) -Page $page -Details $details
                        $response.StatusCode = 204
                    }
                }
            } elseif ($request.HttpMethod -eq 'GET') {
                $relativePath = [Uri]::UnescapeDataString($request.Url.AbsolutePath.TrimStart('/'))
                if ([string]::IsNullOrWhiteSpace($relativePath)) { $relativePath = 'index.html' }
                $filePath = [IO.Path]::GetFullPath([IO.Path]::Combine($siteRoot, $relativePath))
                $rootPrefix = $siteRoot.TrimEnd([IO.Path]::DirectorySeparatorChar) + [IO.Path]::DirectorySeparatorChar
                if (-not $filePath.StartsWith($rootPrefix, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
                    $response.StatusCode = 404
                    $bytes = [Text.Encoding]::UTF8.GetBytes('Not Found')
                    $response.ContentType = 'text/plain; charset=utf-8'
                    if ($request.Url.AbsolutePath -match '\.html?$') {
                        Add-ReportRow -EventType 'HTTP 404' -Page $request.Url.AbsolutePath -Details 'Страница не найдена'
                    }
                } else {
                    $bytes = [IO.File]::ReadAllBytes($filePath)
                    $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
                    $contentTypes = @{
                        '.html' = 'text/html; charset=utf-8'
                        '.css' = 'text/css; charset=utf-8'
                        '.js' = 'text/javascript; charset=utf-8'
                        '.json' = 'application/json; charset=utf-8'
                        '.svg' = 'image/svg+xml'
                        '.png' = 'image/png'
                        '.jpg' = 'image/jpeg'
                        '.jpeg' = 'image/jpeg'
                        '.webp' = 'image/webp'
                        '.ico' = 'image/x-icon'
                        '.woff2' = 'font/woff2'
                    }
                    if ($contentTypes.ContainsKey($extension)) {
                        $response.ContentType = $contentTypes[$extension]
                    } else {
                        $response.ContentType = 'application/octet-stream'
                    }
                    $response.StatusCode = 200
                    if ($extension -eq '.html') {
                        $page = '/' + [Uri]::EscapeUriString($relativePath)
                        Add-ReportRow -EventType 'Страница' -Page $page -Details 'Страница успешно загружена'
                        if (-not $script:visitedPages.Contains($page)) { $script:visitedPages.Add($page) }
                    }
                }
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 405
            }
        } catch {
            $response.StatusCode = 400
            Add-ReportRow -EventType 'ОШИБКА' -Page $request.Url.AbsolutePath -Details 'Не удалось обработать запрос'
            Write-Warning "Не удалось обработать запрос: $($_.Exception.Message)"
        } finally {
            $response.Close()
        }
        if ($script:stopRequested) { break }
    }
} finally {
    if ($listener.IsListening) { $listener.Stop() }
    $listener.Close()
    $endedAt = Get-Date
    if ($script:serverStarted) {
        $duration = New-TimeSpan -Start $startedAt -End $endedAt
        $summary = @(
            '',
            '## Итог цикла',
            '',
            "- Остановлен: $($endedAt.ToString('yyyy-MM-dd HH:mm:ss zzz'))",
            "- Длительность: $($duration.ToString('hh\:mm\:ss'))",
            "- Записано событий: $script:eventCount",
            "- Посещённые страницы: $(if ($script:visitedPages.Count) { $script:visitedPages -join ', ' } else { 'нет' })"
        )
    } else {
        $summary = @('', '## Итог запуска', '', '- Сервер не запустился; см. сообщение об ошибке в PowerShell.')
    }
    [IO.File]::AppendAllText($reportPath, ($summary -join [Environment]::NewLine) + [Environment]::NewLine, [Text.UTF8Encoding]::new($false))
    if ($script:serverStarted) { Write-Host "Сервер остановлен. Отчёт сохранён: $reportPath" }
}

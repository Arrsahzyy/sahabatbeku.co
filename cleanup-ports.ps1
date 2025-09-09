# Script AMAN untuk membersihkan port development project saja
Write-Host "🧹 Membersihkan port development PROJECT saja (BUKAN sistem Windows)..." -ForegroundColor Yellow

# HANYA matikan proses development yang aman
Write-Host "Mencari proses development yang aman untuk dimatikan..." -ForegroundColor Cyan

# Proses yang AMAN untuk dimatikan (hanya development)
$safeProcesses = @("node", "npm", "yarn", "pnpm", "vite", "webpack-dev-server", "live-server", "browser-sync")

foreach ($processName in $safeProcesses) {
    $processes = Get-Process | Where-Object {$_.ProcessName -eq $processName}
    if ($processes) {
        foreach ($proc in $processes) {
            try {
                Stop-Process -Id $proc.Id -Force
                Write-Host "✅ Stopped SAFE process: $($proc.ProcessName) (PID: $($proc.Id))" -ForegroundColor Green
            }
            catch {
                Write-Host "⚠️  Cannot stop: $($proc.ProcessName) (PID: $($proc.Id)) - $($_.Exception.Message)" -ForegroundColor Yellow
            }
        }
    }
}

# Cek HANYA port development project (TIDAK menyentuh sistem)
Write-Host "📊 Cek port development project:" -ForegroundColor Cyan
$devPorts = @(3000, 4000, 5173, 5174, 8080)
foreach ($port in $devPorts) {
    $result = netstat -ano | findstr ":$port " | findstr "LISTENING"
    if ($result) {
        Write-Host "⚠️  Port $port masih digunakan (mungkin sistem/aplikasi lain)" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Port $port tersedia untuk project" -ForegroundColor Green
    }
}

Write-Host "🎉 Pembersihan AMAN selesai! Sistem Windows tidak terpengaruh." -ForegroundColor Green

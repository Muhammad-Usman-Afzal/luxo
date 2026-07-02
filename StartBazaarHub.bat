@echo off
title BazaarHub — Full Stack Dev Server
color 0B

echo ============================================
echo        BazaarHub — Starting Servers
echo ============================================
echo.

:: Kill any existing processes on ports 5173 and 5050
echo [*] Cleaning up old processes...
npx kill-port 5173 5050 >nul 2>&1

:: Start frontend (Vite with HMR) + backend (dotnet watch) together
echo.
echo [1/2] Starting Frontend  (Vite HMR)    → http://localhost:5173
echo [2/2] Starting Backend   (dotnet watch) → http://localhost:5050
echo.
echo Hot Reload ACTIVE — changes reflect automatically!
echo Press Ctrl+C to stop both servers.
echo ============================================
echo.

npx concurrently -n FRONTEND,BACKEND -c cyan,green "npm run dev" "dotnet watch run --project BazaarHub.Backend/BazaarHub.Backend.csproj"

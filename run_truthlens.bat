@echo off
echo ============================================================
echo   TRUTHLENS AI - Your Digital Privacy Guardian
echo ============================================================
echo Starting Python FastAPI Forensics Backend on port 8000...
start "TruthLens Backend" cmd /k "py -m uvicorn backend.main:app --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo Starting Next.js Cyber Frontend on port 3000...
start "TruthLens Frontend" cmd /k "set PATH=%LOCALAPPDATA%\Programs\nodejs;%%PATH%% && npm run start"

timeout /t 3 /nobreak >nul

echo Opening TruthLens AI in browser...
start http://localhost:3000

echo System running! Keep this window or the background windows open.
pause

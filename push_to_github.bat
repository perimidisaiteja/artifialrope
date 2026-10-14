@echo off
echo ============================================================
echo   TRUTHLENS AI - Push to GitHub Repository
echo   Target: https://github.com/perimidisaiteja/artifialrope.git
echo ============================================================
set PATH=%LOCALAPPDATA%\Programs\git\cmd;%PATH%

echo.
echo Checking Git Status...
git status

echo.
echo Pushing commits to branch 'main'...
echo Note: If prompted, enter your GitHub Username and Personal Access Token (PAT).
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Code successfully pushed to https://github.com/perimidisaiteja/artifialrope.git!
) else (
    echo.
    echo [NOTICE] Push requires GitHub authentication.
    echo If using password, GitHub requires a Personal Access Token (PAT) instead of your regular password.
    echo Create a token at: https://github.com/settings/tokens
)

pause

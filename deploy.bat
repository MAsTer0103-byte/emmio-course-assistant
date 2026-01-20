@echo off
REM Script di deploy automatico per Vercel (Windows)
REM Uso: deploy.bat [production|preview]

SET ENV=%1
IF "%ENV%"=="" SET ENV=preview

echo.
echo ================================
echo   Deploy Metodo Rosa AI
echo ================================
echo.

REM Verifica Vercel CLI
where vercel >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [!] Vercel CLI non trovato
    echo [+] Installazione in corso...
    call npm i -g vercel
)

REM Login
echo [+] Login a Vercel...
call vercel login

REM Deploy
IF "%ENV%"=="production" (
    echo [+] Deploy PRODUCTION in corso...
    call vercel --prod
) ELSE (
    echo [+] Deploy PREVIEW in corso...
    call vercel
)

echo.
echo [OK] Deploy completato!
echo.
pause

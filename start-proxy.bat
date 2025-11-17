@echo off
echo.
echo ========================================
echo  Iniciando Claude API Proxy Server...
echo ========================================
echo.
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERRO: Node.js nao esta instalado!
    echo.
    echo Por favor, instale o Node.js de: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js encontrado!
echo.
echo Iniciando servidor na porta 3001...
echo.
echo IMPORTANTE: Mantenha esta janela aberta enquanto usar o chatbot!
echo Para parar o servidor, pressione Ctrl+C
echo.

node claude-proxy-server.js

pause

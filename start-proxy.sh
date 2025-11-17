#!/bin/bash

echo ""
echo "========================================"
echo "  Iniciando Claude API Proxy Server..."
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERRO: Node.js não está instalado!"
    echo ""
    echo "Por favor, instale o Node.js de: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""
echo "🚀 Iniciando servidor na porta 3001..."
echo ""
echo "⚠️  IMPORTANTE: Mantenha esta janela aberta enquanto usar o chatbot!"
echo "    Para parar o servidor, pressione Ctrl+C"
echo ""

# Make sure the script is executable
chmod +x claude-proxy-server.js 2>/dev/null

# Start the server
node claude-proxy-server.js

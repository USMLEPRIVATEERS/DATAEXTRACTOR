#!/usr/bin/env node

/**
 * Claude API Proxy Server
 *
 * Este servidor resolve o problema de CORS ao fazer chamadas para a API da Anthropic.
 * Ele atua como um proxy entre o navegador e a API da Anthropic.
 *
 * Como usar:
 * 1. Instale o Node.js se ainda não tiver: https://nodejs.org/
 * 2. Execute: node claude-proxy-server.js
 * 3. O servidor irá rodar em http://localhost:3001
 * 4. Abra seu aplicativo normalmente
 */

const http = require('http');
const https = require('https');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // Configurar CORS para aceitar requisições do navegador
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, anthropic-version');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Aceitar apenas POST requests para /v1/messages
  if (req.method === 'POST' && req.url === '/v1/messages') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const requestData = JSON.parse(body);
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: { message: 'API key is required' } }));
          return;
        }

        // Preparar requisição para a API da Anthropic
        const options = {
          hostname: 'api.anthropic.com',
          port: 443,
          path: '/v1/messages',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': req.headers['anthropic-version'] || '2023-06-01',
            'Content-Length': Buffer.byteLength(body)
          }
        };

        // Fazer a requisição para a API da Anthropic
        const anthropicReq = https.request(options, (anthropicRes) => {
          let responseData = '';

          anthropicRes.on('data', chunk => {
            responseData += chunk;
          });

          anthropicRes.on('end', () => {
            res.writeHead(anthropicRes.statusCode, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            });
            res.end(responseData);
          });
        });

        anthropicReq.on('error', (error) => {
          console.error('Error calling Anthropic API:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: { message: 'Failed to connect to Anthropic API: ' + error.message }
          }));
        });

        anthropicReq.write(body);
        anthropicReq.end();

      } catch (error) {
        console.error('Error parsing request:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: { message: 'Invalid request body' } }));
      }
    });

  } else {
    // Rota não encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: 'Not found' } }));
  }
});

server.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                                                           ║');
  console.log('║        🚀 Claude API Proxy Server is running!            ║');
  console.log('║                                                           ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║  Server URL: http://localhost:${PORT}                        ║`);
  console.log('║                                                           ║');
  console.log('║  Status: ✅ Ready to accept connections                   ║');
  console.log('║                                                           ║');
  console.log('║  Press Ctrl+C to stop the server                         ║');
  console.log('╚═══════════════════════════════════════════════════════════╝');
  console.log('');
  console.log('📝 Now you can use the chatbot in your app!');
  console.log('');
});

// Tratamento de erros
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Error: Port ${PORT} is already in use.`);
    console.error('   Try closing other applications or change the PORT in this file.');
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Tratamento de encerramento gracioso
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down server...');
  server.close(() => {
    console.log('✅ Server stopped successfully.');
    process.exit(0);
  });
});

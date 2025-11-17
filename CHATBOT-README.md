# 🤖 Claude AI Chatbot - Guia de Uso

Este chatbot permite adicionar dados automaticamente ao seu projeto usando inteligência artificial!

## 🚀 Como Usar (Passo a Passo)

### 1️⃣ Pré-requisitos

- **Node.js** instalado no seu computador
  - Baixe em: https://nodejs.org/
  - Versão recomendada: 18 ou superior
  - Para verificar se já tem: abra o terminal e digite `node --version`

### 2️⃣ Iniciar o Servidor Proxy

O servidor proxy é necessário para evitar problemas de CORS ao chamar a API da Anthropic.

#### No Windows:
1. Abra o **Prompt de Comando** ou **PowerShell**
2. Navegue até a pasta do projeto:
   ```bash
   cd C:\caminho\para\DATAEXTRACTOR
   ```
3. Execute o servidor:
   ```bash
   node claude-proxy-server.js
   ```

#### No Mac/Linux:
1. Abra o **Terminal**
2. Navegue até a pasta do projeto:
   ```bash
   cd /caminho/para/DATAEXTRACTOR
   ```
3. Execute o servidor:
   ```bash
   node claude-proxy-server.js
   ```

**Você verá algo assim:**
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🚀 Claude API Proxy Server is running!            ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║  Server URL: http://localhost:3001                        ║
║                                                           ║
║  Status: ✅ Ready to accept connections                   ║
║                                                           ║
║  Press Ctrl+C to stop the server                         ║
╚═══════════════════════════════════════════════════════════╝
```

**⚠️ IMPORTANTE:** Mantenha esta janela do terminal aberta enquanto usar o chatbot!

### 3️⃣ Obter sua API Key da Anthropic

1. Acesse: https://console.anthropic.com/login
2. Faça login ou crie uma conta
3. Vá em **API Keys** no menu
4. Clique em **Create Key**
5. Copie a chave (formato: `sk-ant-api03-...`)

### 4️⃣ Configurar a API Key no App

1. Abra o arquivo `index.html` no navegador
2. Clique no **botão roxo** no canto inferior direito (ícone de chat)
3. Clique no **ícone de engrenagem** (⚙️) no cabeçalho do chat
4. Cole sua API key
5. Clique em **Salvar**

### 5️⃣ Usar o Chatbot

Agora você pode colar qualquer texto com dados de estudos no chat!

**Exemplo de texto que você pode colar:**

```
Estudo: Smith2020
População: 100 participantes
Idade média: 45.5 anos (DP: 5.2)
Grupo intervenção: 50 pacientes, 10 eventos
Grupo controle: 50 pacientes, 15 eventos
Outcome: Mortalidade
```

O Claude vai:
- ✅ Identificar o estudo
- ✅ Extrair as variáveis
- ✅ Organizar no formato correto
- ✅ Adicionar ao seu projeto automaticamente

## 🛠️ Solução de Problemas

### ❌ Erro: "Failed to fetch"

**Causa:** O servidor proxy não está rodando.

**Solução:**
1. Abra um terminal
2. Execute: `node claude-proxy-server.js`
3. Aguarde a mensagem "Server is running"
4. Tente novamente no chat

### ❌ Erro: "API key is required" ou "Invalid API key"

**Causa:** API key não configurada ou incorreta.

**Solução:**
1. Verifique se você configurou a API key no chatbot
2. Confirme que a chave começa com `sk-ant-`
3. Gere uma nova chave se necessário

### ❌ Erro: "Port 3001 is already in use"

**Causa:** Já existe um servidor rodando na porta 3001.

**Solução 1:** Feche o outro processo usando a porta
**Solução 2:** Edite `claude-proxy-server.js` e mude a linha:
```javascript
const PORT = 3001;  // Mude para 3002, 3003, etc.
```

Depois, atualize também no `index.html` a linha:
```javascript
const apiUrl = 'http://localhost:3001/v1/messages';
```

### ❌ O chatbot não aparece

**Solução:**
1. Recarregue a página (F5)
2. Limpe o cache do navegador
3. Tente em modo anônimo/privado

## 💡 Dicas

1. **Mantenha o servidor rodando:** Não feche o terminal onde o servidor está rodando
2. **Cole dados estruturados:** Quanto mais organizado o texto, melhor a extração
3. **Revise os dados:** Sempre confira os dados adicionados antes de exportar
4. **Use projetos separados:** Crie projetos diferentes para diferentes tipos de estudo

## 📊 Tipos de Dados Suportados

O chatbot consegue extrair:

- ✅ **Variáveis dicotômicas** (eventos/total)
- ✅ **Variáveis contínuas** (média/desvio padrão)
- ✅ **Variáveis de texto** (descrições)
- ✅ **População** (tamanho da amostra)
- ✅ **Dados de intervenção vs comparação**
- ✅ **Dados de network meta-analysis**

## 🔒 Segurança

- Sua API key fica armazenada **apenas no seu navegador** (localStorage)
- O servidor proxy roda **localmente na sua máquina**
- Nenhum dado é enviado para outros servidores além da API da Anthropic
- Você pode remover a API key a qualquer momento no chatbot (⚙️ → Remover API key)

## 📝 Recursos Adicionais

- **Documentação da API da Anthropic:** https://docs.anthropic.com/
- **Console da Anthropic:** https://console.anthropic.com/
- **Preços da API:** https://www.anthropic.com/pricing

## ❓ Precisa de Ajuda?

Se encontrar problemas:
1. Verifique se o Node.js está instalado: `node --version`
2. Verifique se o servidor está rodando
3. Verifique a API key
4. Abra o console do navegador (F12) para ver erros
5. Reporte issues no GitHub do projeto

---

**Desenvolvido por:** Marcos Antônio Dias Vilela
**ORCID:** 0000-0001-9303-504X

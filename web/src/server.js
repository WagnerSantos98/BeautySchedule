// server.js (ou o nome do seu arquivo principal do servidor)
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

// Configurar CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Restante da configuração do servidor
app.get('/', (req, res) => {
  res.send('Seu servidor está rodando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  // Outras configurações e rotas podem ser adicionadas aqui
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8081;

app.use(bodyParser.json()); // Para analisar o corpo das requisições com JSON

app.get('/', (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/dados', (req, res) => {
  const dados = req.body;
  res.send(`Dados recebidos: ${JSON.stringify(dados)}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
const port = 3003;
const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const allowCors = require('./cors');

// bodyParser.urlencoded = fica responsável por fazer a interpretação dos dados que em apartir da submissão de um formulario
// use = toda requisição que chegar vai ser passada por esse middleware
server.use(bodyParser.urlencoded({ extended: true })); // fazer parse dos dados
server.use(bodyParser.json()); // faz o parse para json
server.use(allowCors); // permite cross origin request, permito que eu faça a requisição de um dominio diferente da minha api

//listando a porta em que ira rodar o server
server.listen(port, () => console.log(`Backend is running on port ${port}.`));

server.use((req, res, next) => {
  next();
});

module.exports = server;
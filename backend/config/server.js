const port = 3003;
const bodyParser = require('body-parser');
const express = require('express');

const server = express();

// bodyParser.urlencoded = fica responsável por fazer a interpretação dos dados que em apartir da submissão de um formulario
// use = toda requisição que chegar vai ser passada por esse middleware
server.use(bodyParser.urlencoded({ extended: true })); // fazer parse dos dados
server.use(bodyParser.json()); // faz o parse para json

//listando a porta em que ira rodar o server
server.listen(port, () => console.log(`Backend is running on port ${port}.`));

server.use((req, res, next) => {
  //res.send('Funcionou');
  next();
});

module.exports = server;
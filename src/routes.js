const express = require('express');
const documents = require('./controllers/documents')

const routes = express();

// Cadastrar Documento
routes.post('/documents', documents.registerDocument);


module.exports = routes;
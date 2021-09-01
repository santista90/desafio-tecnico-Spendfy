const express = require('express');
const documents = require('./controllers/documents')

const routes = express();

// Cadastrar Documento
routes.post('/documents', documents.registerDocument);
// Listar Documentos
routes.get('/documents', documents.documentsList);


module.exports = routes;
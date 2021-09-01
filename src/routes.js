const express = require('express');
const documents = require('./controllers/documents')
const weekday = require('./controllers/weekday')

const routes = express();

// Cadastrar Documento
routes.post('/documents', documents.registerDocument);
// Listar Documentos
routes.get('/documents', documents.documentsList);
// Excluir Documento
routes.delete('/documents/:id', documents.deleteDocuments);
// Obter Documento
routes.get('/documents/:id', documents.getDocument);

// Dia da Semana
routes.get('/weekday-after', weekday.amountOfDays);




module.exports = routes;
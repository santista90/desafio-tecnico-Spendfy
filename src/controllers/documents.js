const knex = require('../config');

const registerDocument = async (req, res) => {
    const { kbsize, name, content } = req.body;

    const dateNow = new Date().toLocaleDateString();

    try {

        const documentExist = await knex('documents').where({ name }).first();

        if (documentExist) {
            return res.status(400).json("Já existe um documento com este nome");
        }

        const document = await knex('documents').insert({ kbsize, name, content, 'createdat': dateNow }).returning('*');

        if (document.length === 0) {
            return res.status(400).json("Não foi possível cadastrar o documento.");
        }

        return res.status(200).json('Documento foi cadastrado com sucesso.');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const documentsList = async (req, res) => {
    try {

        const documentsList = await knex('documents');

        return res.status(200).json(documentsList);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deleteDocuments = async (req, res) => {
    const { id } = req.params;

    try {

        const documentExist = await knex('documents').where({ id }).first();

        if (!documentExist) {
            return res.status(400).json('Documento não encontrado');
        }

        const deletedDocument = await knex('documents').where({ id }).del();

        if(!deletedDocument) {
            return res.status(400).json('Não foi possível excluir o documento.')
        }

        return res.status(200).json('Documento excluído com sucesso');

    } catch (error) {
        return res.status(400).json(error.message);
    }
}



module.exports = {
    registerDocument,
    documentsList,
    deleteDocuments,
}
const knex = require('../config');

const registerDocument = async (req, res) => {
    const { name, content } = req.body;

    const buffer = content;
    let buff = new Buffer.from('buffer');
    let base64content = buff.toString('base64');

    const kbSize = (content.length * 1024);

    const dateNow = new Date().toLocaleDateString();

    try {

        const documentExist = await knex('documents').where({ name }).first();

        if (documentExist) {
            return res.status(400).json("Já existe um documento com este nome");
        }

        const document = await knex('documents').insert({ 'kbsize': kbSize, name, 'content': base64content, 'createdat': dateNow }).returning('*');

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

const getDocument = async (req, res) => {
    const { id } = req.params;

    try {

        const documentExist = await knex('documents').where({ id }).first();

        if (!documentExist) {
            return res.status(400).json("Documento não encontrado");
        }

        return res.status(200).json(documentExist);

    } catch (error) {
        return res.status(400).json(error.message);
    }
}




module.exports = {
    registerDocument,
    documentsList,
    deleteDocuments,
}
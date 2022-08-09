const { body } = require('express-validator');
const KnowledgeModel = require('../models/KnowledgeModel');
const { Sequelize } = require("../config/database");
const Operator = Sequelize.Op; // pare incluir nas consultas SQL os operadores


const knowledgeDataValidate = (method) => {
    switch (method) {
        case 'create': return [
            body('title').notEmpty().withMessage('Título obrigatório').custom(title => {
                return KnowledgeModel.findOne({ where: { title: title } }).then((Knowledge) => {
                    if (Knowledge) {
                        return Promise.reject('Esse título já existe')
                    }
                })
            }),
            body('description').notEmpty().withMessage('Descrição obrigatória'),
        ];
        case 'update': return [
            body('title').custom((title, { req }) => {

                return KnowledgeModel.findAll({
                    raw:true,
                    where: {
                        // Operator.ne => diferente de... ou seja. para permitir a atualização do registro sem dizer que o título já existe
                        id: { [Operator.ne]: req.params.id }, 
                        title: title
                    }
                }).then((Knowledge) => {
                    if (Knowledge.length > 0) {
                        return Promise.reject('Esse título já existe')
                    }
                })
            }),
            body('description').notEmpty().withMessage('Descrição obrigatória'),
        ]
    }
}

module.exports = { knowledgeDataValidate };

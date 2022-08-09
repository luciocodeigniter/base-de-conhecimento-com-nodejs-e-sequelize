const { request, response } = require("express");
const KnowledgeModel = require('../models/KnowledgeModel');
const { validationResult } = require('express-validator');



module.exports = {

    // lista todos os conhecimentos
    async index(request, response) {

        const knowledgeCollection = await KnowledgeModel.findAll({ raw: true }); // raw : true  é para termos um array com os dados

        // temos um sucesso na requisição?
        if (request.session.success) {
            //Mostramos a mensagem e tornamos o 'success' como false
            request.session.success = false;
            return response.render('knowledge/index', { knowledgeCollection: knowledgeCollection, messageSuccess: true });
        }

        return response.render('knowledge/index', { knowledgeCollection: knowledgeCollection });
    },

    // renderiza do formulário para cadastro
    async new(request, response) {

        // essa é a rota que renderiza o form de criação.
        // portanto, precisamos verificar na sessão se exitem erros de validação.
        if (request.session.errors) {

            const errors = request.session.errors;
            request.session.errors = null;

            return response.render('knowledge/new', { oldInput: request.session.oldInput, errors: errors });
        }

        // temos um sucesso na requisição?
        if (request.session.success) {
            //Mostramos a mensagem e tornamos o 'success' como false
            request.session.success = false;
            request.session.oldInput = null;
            return response.render('knowledge/new', { messageSuccess: true });
        }

        return response.render('knowledge/new');
    },

    // cadastra o conhecimento
    async create(request, response) {

        try {

            // Encontra os erros de validação nesta solicitação e os envolve em um objeto com funções úteis
            const errors = validationResult(request);

            // preservaremos no formulário, o que foi anteriormente enviado no request.
            // dessa forma evitamos o desgaste em nova digitação
            const oldInput = { title, description } = request.body;

            if (!errors.isEmpty()) {

                request.session.errors = errors.array();
                request.session.success = false;
                request.session.oldInput = oldInput;

                return response.redirect('back');
            }

            await KnowledgeModel.create({
                title: title,
                description: description
            });


            request.session.success = true;
            request.session.oldInput = null;
            return response.redirect('/knowledge');

        } catch (error) {

            console.log(error);

        }

    },

    // renderiza o formulário para edição
    async edit(request, response) {

        const { id } = request.params;

        const knowledge = await KnowledgeModel.findByPk(id, { raw: true });

        // essa é a rota que renderiza o form de criação.
        // portanto, precisamos verificar na sessão se exitem erros de validação.
        if (request.session.errors) {

            const errors = request.session.errors;
            request.session.errors = null;

            return response.render('knowledge/edit', { oldInput: request.session.oldInput, knowledge: knowledge, errors: errors });
        }

        if (knowledge === null) {

            return response.redirect('/knowledge');
        }

        return response.render('knowledge/edit', { knowledge: knowledge });
    },


    // atualiza o conhecimento na base de dados
    async update(request, response) {

        try {

            // Encontra os erros de validação nesta solicitação e os envolve em um objeto com funções úteis
            const errors = validationResult(request);

            // preservaremos no formulário, o que foi anteriormente enviado no request.
            // dessa forma evitamos o desgaste em nova digitação
            const oldInput = { title, description } = request.body;

            if (!errors.isEmpty()) {

                request.session.errors = errors.array();
                request.session.success = false;
                request.session.oldInput = oldInput;

                return response.redirect('back');
            }

            const { id } = request.params;

            const knowledge = await KnowledgeModel.findByPk(id, { raw: true });

            if (knowledge === null) {

                return response.redirect('/knowledge');
            }

            KnowledgeModel.update(
                {
                    title: title,
                    description: description,
                },
                {
                    where: {
                        id: id
                    }
                }
            );


            request.session.success = true;
            request.session.oldInput = null;
            return response.redirect('/knowledge');

        } catch (error) {

            console.log(error);

        }
    },

    // remove da base dados o conhecimento
    async delete(request, response) {

        try {

            const { id } = request.params;

            const knowledge = await KnowledgeModel.findByPk(id, { raw: true });

            if (knowledge === null) {

                return response.redirect('/knowledge');
            }

            KnowledgeModel.destroy({
                where: {
                    id: id
                }
            });

            request.session.success = true;
            request.session.oldInput = null;
            return response.redirect('/knowledge');

        } catch (error) {

            console.log(error);
        }

    }

}


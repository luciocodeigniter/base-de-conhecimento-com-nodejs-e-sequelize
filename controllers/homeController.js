const { request, response } = require("express");
const knowledgeModel = require('../models/KnowledgeModel');


module.exports = {

    async index (request, response) {

        const countKnowledge = await knowledgeModel.count();
    
        return response.render('home/index', {countKnowledge:countKnowledge});
    }

}



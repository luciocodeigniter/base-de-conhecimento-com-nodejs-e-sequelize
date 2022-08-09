const db = require('../config/database');

// definição da tabela
const KnowledgeModel = db.sequelizeAuth.define('knowledge', {
    
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },

    title: {

        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    description: {
        type: db.Sequelize.TEXT,
        allowNull: false,
    }
});

// cria a tabela se não existir
KnowledgeModel.sync();

// export
module.exports = KnowledgeModel;
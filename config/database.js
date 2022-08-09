const Sequelize = require('sequelize');
require('dotenv').config()

// instanciando objeto Sequelize de conexão com o banco
const sequelizeAuth = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT, // qual é o tipo de banco
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true, // cria e popula as colunas de createdAt e updatedAt automaticamente
    },
    logging: true, // para exibir logs no terminal
});


//Teste de conexão
// sequelizeAuth.authenticate().then( () => {

//     console.log('Conectado no banco de dados!');

// }).catch((error)=>{

//     // erro
//     console.log('Falha na conexão com o banco: ' + error);

// });


module.exports = {Sequelize, sequelizeAuth}
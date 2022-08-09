// dependências
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const routes = require('./config/routes');
const db = require('./config/database');
const session = require('express-session'); // para armazenar valores na sessão (FLASHDATA, ETC)
const methodOverride = require('method-override'); // para os verbos HTTP


// instância do express
const app = express();

// Configuração do template engine
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
})); app.set('view engine', 'hbs'); // fim configuração handlebars


// Middlewares
app.use(express.static('public')); // arquivos estáticos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'minha-chave-secreta-bla-blá', // uma chave qualquer
    resave: false, // para não ficar salvando 
    saveUninitialized: true,
}));
// override with POST having ?_method=DELETE or PUT
app.use(methodOverride('_method'));

// rotas
app.use(routes);

/**
 * Se consegui conectar no banco, então inicio o servidor
 */
db.sequelizeAuth.authenticate().then( () => {

    console.log('Conectado no banco de dados!');
    app.listen(port, () => {
        console.log(`Servidor rodando em http://localhost:${port}`);
    });

}).catch((error)=>{

    // erro
    console.log('Falha na conexão com o banco: ' + error);

});

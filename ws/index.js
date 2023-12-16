const express = require('express');
const app = express();
const morgan = require('morgan');
require('./database');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Variáveis
app.set('port', 8000);

//Rotas
app.use('/salao', require('./src/routes/salao.routes'));

app.listen(app.get('port'), () => {
console.log(`Ws escutando na porta ${app.get('port')}`);
});
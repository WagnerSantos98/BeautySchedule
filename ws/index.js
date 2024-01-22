const express = require('express');
const morgan = require('morgan');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const cors = require('cors');
require('./database');

// Criar a instância do Express
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(busboy());
app.use(busboyBodyParser());
app.use(cors());  // Configurar o CORS para permitir solicitações de qualquer origem

// Variáveis
app.set('port', 8000);

// Rotas
app.use('/salao', require('./src/routes/salao.routes'));
app.use('/servico', require('./src/routes/servico.routes'));
app.use('/horario', require('./src/routes/horario.routes'));
app.use('/colaborador', require('./src/routes/colaborador.routes'));
app.use('/cliente', require('./src/routes/cliente.routes'));
app.use('/agendamento', require('./src/routes/agendamento.routes'));
app.use('/usuario', require('./src/routes/usuario.routes'));

// Lidar com erros de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Iniciar o servidor
app.listen(app.get('port'), () => {
  console.log(`Ws escutando na porta ${app.get('port')}`);
});

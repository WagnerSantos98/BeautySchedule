const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Colaborador
const colaborador = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório.']
    },
    telefone: String,
    email:{
        type: String,
        required: [true, 'E-mail é obrigatório.']
    },
    senha: {
        type: String,
        default: null
    },
    foto: String,
    dataNascimento: {
        type: String, //YYYY-MM-DD
    },
    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },
    dataCadastro:{
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Colaborador', colaborador);
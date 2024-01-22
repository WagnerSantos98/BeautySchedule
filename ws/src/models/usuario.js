const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Colaborador
const usuario = new Schema({
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
    nivelAcesso: {
        type: String,
        required: true,
        enum: ['A', 'P'],
        default: 'P'
    },
    dataCadastro:{
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Usuario', usuario);
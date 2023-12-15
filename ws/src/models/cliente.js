const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Cliente
const cliente = new Schema({
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
    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },
    dataNascimento: {
        type: String, //YYYY-MM-DD
        required: true
    },
    documento:{
        tipo:   {
            type: String,
            enum: ['individual', 'corporation']
        },
        numero: String
    },
    endereco:{
        cidade: String,
        uf: String,
        cep: String,
        numero: String,
        pais: String,
    },
    dataCadastro:{
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Cliente', cliente);
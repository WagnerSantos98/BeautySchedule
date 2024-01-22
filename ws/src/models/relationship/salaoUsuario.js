const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Relacionamento Salão/Colaborador
const salaoUsuario = new Schema({
    salaoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    usuarioId:{
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['A', 'I', 'E'],
        default: 'A'
    },
    nivelAcesso: {
        type: String,
        required: true,
        enum: ['A', 'P'],
        default: 'P'
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model('SalaoUsuario', salaoUsuario);
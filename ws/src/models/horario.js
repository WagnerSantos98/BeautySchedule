const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Horatio
const horario = new Schema({
    salaoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    especialiodades: [{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    }],
    colaboradores: [{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    }],
    dias: {
        type: [Number]
    },
    inicio: Date,
    fim: Date,
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model('Horario', horario);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Horatio
const horario = new Schema({
    salaoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    especialidades:[{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    }],
    colaboradores:[{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    }],
    dias:{
        type: [Number]
    },
    inicio:{
        type: Date
    },
    fim:{
        type: Date
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model('Horario', horario);
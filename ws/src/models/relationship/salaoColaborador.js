const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Relacionamento Salão/Colaborador
const salaoColaborador = new Schema({
    salaoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    colaboradorId:[{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    }],
    status: {
        type: String,
        required: true,
        enum: ['A', 'I'],
        default: 'A'
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model('SalaoColaborador', salaoColaborador);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Horatio
const horario = new Schema({
    salaoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    especialiodades: String,
    colaboradores: String,
    dias: Number,
    inicio: Date,
    fim: Date,
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model('Horario', horario);
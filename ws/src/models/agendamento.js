const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação de tabela Agendamento
const agendamento = new Schema({
    salaoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    clienteId:{
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    servicoId:{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    },
    colaboradorId:{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    },
    data:{
        type: Date,
        required: true
    },
    comissao:{
        type: Number,
        required: false
    },
    valor:{
        type: Number,
        required: false
    },
    transactionId:{
        type: String,
    },
    dataCadastro: {
        type: Date,
        default: Date.now(),
    },
});


module.exports = mongoose.model('Agendamento', agendamento);
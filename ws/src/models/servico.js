const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Criação da tabela Salao
const servico = new Schema({
    salaoID:{ //Relacionamento com model Salao
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
    },
    titulo: String,
    preco: Number,
    duracaio: Number, // Duração em minutos
    comissao: Number, //% de comissão sobre o preço
    recorrencia: Number, // Perído de rafação do serviço em dias
    descricao: String,
    status:{
        type: String,
        required: true,
        enum: ['A', 'I', 'E'],
        default: 'A'
    },
    dataCadastro:{
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Servico', servico);
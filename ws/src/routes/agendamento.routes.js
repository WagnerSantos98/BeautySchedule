const express = require('express');
const router = express.Router();

const Cliente = require('../models/cliente');
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Colaborador = require('../models/colaborador');
const Agendamento = require('../models/agendamento');

router.post('/', async (req, res) => {
    try {
        const { clienteId, salaoId, servicoId, colaboradorId, data, valor } = req.body;

        // Recuperar cliente
        const cliente = await Cliente.findById(clienteId).select('nome');

        // Recuperar salão
        const salao = await Salao.findById(salaoId).select('nome');

        // Recuprar serviço
        const servico = await Servico.findById(servicoId).select('preco titulo comissao');

        // Recuperar colaborador
        const colaborador = await Colaborador.findById(colaboradorId).select('nome');

        // Criar agendamento
        const agendamento = await new Agendamento({
            clienteId,
            salaoId,
            servicoId,
            colaboradorId,
            data,
            valor,
            cliente,
            salao,
            servico,
            colaborador
        }).save();

        res.json({ error: false, agendamento });
    } catch (err) {
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;

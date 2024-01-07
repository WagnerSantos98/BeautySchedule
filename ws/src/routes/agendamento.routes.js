const express = require('express');
const router = express.Router();
const moment = require('moment');

const Cliente = require('../models/cliente');
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Colaborador = require('../models/colaborador');
const Agendamento = require('../models/agendamento');
const Horario = require('../models/horario');
const util = require('../util');

//Inserção de agendamento
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

//Filtro de data dentro de um período determinado
router.post('/filter', async (req, res) => {
    try{
        const { periodo, salaoId } = req.body;
        const agendamentos = await Agendamento.find({
            salaoId,
            data:{
                $gte: moment(periodo.inicio).startOf('day'),
                $lte: moment(periodo.final).endOf('day'),
            }
        })
        .populate([
            { path: 'servicoId', select: 'titulo duracao'},
            { path: 'colaboradorId', select: 'nome'},
            { path: 'clienteId', select: 'nome'}
        ]);

        res.json({ error: false, agendamentos});

    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

//Rota de verificação de serviço disponível no dia e horário
router.post('/dias-disponiveis', async (req, res) => {
    try{
        const { data, salaoId, servicoId } = req.body;
        const horario = await Horario.find({ salaoId });
        const servico = await Servico.findById(servicoId).select('duracao');

        let agenda = [];
        let lastDay = moment(data);

        //Duração do serviço
        const servicoMinutos = util.hourToMinutes(moment(servico.duracao).format('HH:mm'));

        const servicoSlots = util.sliceMinutes(
            servico.duracao, //1:30
            moment(servico.duracao).add(servicoMinutos, 'minutes'), // 3:00 
            util.SLOT_DURATION
        ).length;

        //Verificação de dias (Procure nos próximos 365 dias até a agenda conter 7 dias disponíveis)
        for(let i = 0; i <= 365 && agenda.length <= 7; i++){
            const espacosValidos = horarios.filter(hotario => {
                //Verificacar o dia da semana
                const diaSemanaDisponivel = h.dias.includes(moment(lastDay).day()); // 0 - 6 (Dom - Sáb)

                //Verificar especialidade disponível
                const servicoDisponivel = h.especialidades.includes(servicoId);

                return diaSemanaDisponivel && servicoDisponivel;
            });

            if(espacosValidos.length > 0){
                agenda.push(lastDay);
            }

            lastDay = moment(lastDay).add(1, 'day');
        }

        res.json({ error: false, servicoMinutos, minutos: moment(servico.duracao).format('HH:mm'), servicoSlots });

    }catch(err){
        res.json({ error: true, message: err.message });
    }
});



module.exports = router;

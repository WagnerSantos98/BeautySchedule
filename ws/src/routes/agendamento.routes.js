const express = require('express');
const router = express.Router();
const moment = require('moment');
const _ = require('loadsh');

const Cliente = require('../models/cliente');
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const Colaborador = require('../models/colaborador');
const Agendamento = require('../models/agendamento');
const Horario = require('../models/horario');
const util = require('../util');
const agendamento = require('../models/agendamento');
const horario = require('../models/horario');

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
        const horarios = await Horario.find({ salaoId });
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
            const espacosValidos = horarios.filter((horario) => {
                //Verificacar o dia da semana
                const diaSemanaDisponivel = horario.dias.includes(moment(lastDay).day()); // 0 - 6 (Dom - Sáb)

                //Verificar especialidade disponível
                const servicoDisponivel = horario.especialidades.includes(servicoId);

                return diaSemanaDisponivel && servicoDisponivel;
            });

            /*
            Todos os colaboradores disponiveis no dia e seus horário
            [
                {
                    "2023-12-25":{ Dia
                        "12334":[ Colaborador
                            '12:00', Horários
                            '13:00'
                        ]
                    }
                }
            ]
            */  

            if(espacosValidos.length > 0){

                let todosHorariosDia = {};

                for(let espaco of espacosValidos){
                    for(let colaboradorId of espaco.colaboradores){
                        if(!todosHorariosDia[colaboradorId]){
                            todosHorariosDia[colaboradorId] = [];
                        }
                        //Pegar todos os horários do espaço e jogar dentro do colaborador
                        todosHorariosDia[colaboradorId] = [
                            ...todosHorariosDia[colaboradorId],
                            ...util.sliceMinutes(
                                util.mergeDateTime(lastDay, espaco.inicio),
                                util.mergeDateTime(lastDay, espaco.fim),
                                util.SLOT_DURATION
                            )
                        ];
                    }
                }

                //Ocupação de cada especialista no dia
                for(let colaboradorId of Object.keys(todosHorariosDia)){
                    //Recuperar agendamentos
                    const agendamentos = await Agendamento.find({
                        colaboradorId,
                        data: {
                            $gte: moment(lastDay).startOf('day'),
                            $lte: moment(lastDay).endOf('day'),
                        }
                    })
                    .select('data servicoId -_id')
                    .populate('servicoId', 'duracao');

                    //Recuperar horários agendados
                    let horariosOcupados = agendamentos.map((agendamento) => ({
                        inicio: moment(agendamento.data),
                        final: moment(agendamento.data).add(util.hourToMinutes(moment(agendamento.servicoId.duracao).format('HH:mm'), 'minutes'))
                    }));

                    //Recuperar todos os slots entre os agendamentos
                    horariosOcupados = horariosOcupados.map((horario) => util.sliceMinutes(horario.inicio, horario.final, util.SLOT_DURATION)).flat();

                    //Removendo todo os horarios/ slot ocupados
                    let horariosLivres = util.splitByValue(todosHorariosDia[colaboradorId].map((horarioLivre) => {
                        return horariosOcupados.includes(horarioLivre) ? '-' : horarioLivre;
                    }), '-').filter(space => space.length > 0);

                    //Verificando se existe espaço suficiente no slot
                    horariosLivres = horariosLivres.filter((horarios) => horarios.length >= servicoSlots);

                    //Verificando se os horários dentro do slot tem a continuidade necessária
                    horariosLivres = horariosLivres.map((slot) => slot.filter((horario, index) => slot.length - index >= servicoSlots)).flat();

                    horariosLivres = _.chunk(horariosLivres, 2);

                    todosHorariosDia[colaboradorId] = horariosLivres;

                }

                agenda.push({[lastDay.format('YYYY-MM-DD')]: todosHorariosDia});
            }

            lastDay = lastDay.add(1, 'day');
        }

        res.json({ error: false, agenda});

    }catch(err){
        res.json({ error: true, message: err.message });
    }
});



module.exports = router;

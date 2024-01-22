const express = require('express');
const router = express.Router();
const Salao = require('../models/salao');
const Servico = require('../models/servico');
const turf = require('@turf/turf');
const horario = require('../models/horario');
const util = require('../util');

router.post('/', async (req, res) => {
    try{
        const salao = await new Salao(req.body).save();
        res.json({ salao });
    }catch(err){
        res.json({error: true, message: err.message});
    }
});

//Retornar informações
router.get('/servicos/:salaoId', async (req, res) =>{
    try{
        const { salaoId } = req.params;
        const servicos = await Servico.find({
            salaoId,
            status: 'A',
        }).select('_id titulo');

        /*Retorno em array [{ label: 'Servico', value: '1234' }] */
        res.json({
            servicos: servicos.map((s) => ({ label: s.titulo, value:s._id })),
        });
    }catch(err){
        res.json({error: true, message: err.message});
    }
});

router.get('/:id' ,async (req, res) =>{
    try{
        const salao = await Salao.findById(req.params.id).select('capa nome endereco.cidade geo.coordinates telefone');

        //Distância
        const distance = turf.distance(
            turf.point(salao.geo.coordinates),
            turf.point([-22.95822, -46.54301])
        );
        
        //Aberto
        const horarios = await horario.find({
            salaoId: req.params.id,
        }).select('dias inicio fim');

        const isOpened = util.isOpened(horarios);

            res.json({ error: false, salao: { ...salao._doc, distance, isOpened}});
    }catch(err){
        res.json({ error: true, message: err.message});
    }
});

module.exports = router;
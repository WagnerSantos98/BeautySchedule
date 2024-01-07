const express = require('express');
const router = express.Router();
const Colaborador = require('../models/colaborador');
const SalaoColaborador = require('../models/relationship/salaoColaborador');
const ColaboradorServico = require('../models/relationship/colaboradorServico');

//Inserção de colaborador
router.post('/', async (req, res) => {
    try{

        const { colaborador, salaoId } = req.body;
        let newColaborador = null;

        //Verificar se o colaborador existe
        const existentColaborador = await Colaborador.findOne({
            $or: [
                { email: colaborador.email },
                { telefone: colaborador.telefone },
            ]
            
        });

        //Se não existir o colaborador
        if(!existentColaborador){
            newColaborador = await Colaborador({
                ...colaborador,
            }).save();
        }

        //Relacionamento Colaborador/Salão
        const colaboradorId = existentColaborador ? existentColaborador._id : newColaborador._id;

        //Verificar se existe o relacionamento com salão
        const existentRelatioship = await SalaoColaborador.findOne({
            salaoId,
            colaboradorId,
            status: { $ne: 'E' },
        });

        //Se não está vinvulado
        if(!existentRelatioship){
            await new SalaoColaborador({
                salaoId,
                colaboradorId,
                status: colaborador.vinculo,
            }).save();
        }

        //Se já existir um vinculo colaborador/salão
        if(existentColaborador){
            const existentRelatioship = await SalaoColaborador.findOneAndUpdate({
                salaoId,
                colaboradorId,
            }, 
            { status: colaborador.vinculo }
            );
        }
        
        //Relação com as especialidades
        await ColaboradorServico.insertMany(
            colaborador.especialidades.map(servicoId => ({
                servicoId,
                colaboradorId,
            }))
        )

        if(existentColaborador && existentRelatioship){
            res.json({ error: true, message: 'Colaborador já cadastrado'});
        }else{
            res.json({ error: false });
        }
 
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

//Atualização de colaborador
router.put('/:colaboradorId', async (req, res) => {
    try{
        const { vinculo, vinculoId, especialidades } = req.body;
        const { colaboradorId } = req.params;

        //Vinculo
        await SalaoColaborador.findByIdAndUpdate(vinculoId, { status: vinculo });

        //Especialidades
        await ColaboradorServico.deleteMany({
            colaboradorId,
        });

        await ColaboradorServico.insertMany(
            especialidades.map(servicoId => ({
                servicoId,
                colaboradorId,
            }))
        );

        res.json({ error: false });
        
    }catch(err){
        res.json({ error: true, message: err.message })
    }
});

//Exclusão de colaborador
router.delete('/vinculo/:id', async (req, res) => {
    try{
        await SalaoColaborador.findByIdAndUpdate(req.params.id, { status: 'E' });
        res.json({ error: false });
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;
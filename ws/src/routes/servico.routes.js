const express = require('express');
const router = express.Router();
const aws = require('../services/aws');
const Arquivo = require('../models/arquivo');
const Servico = require('../models/servico');
const busboyBodyParser = require('busboy-body-parser');

router.use(busboyBodyParser());

//Rota de inserção - INSERT (POST)
router.post('/', async (req, res) => {
    
        try {
            const { salaoId, servico } = req.body;
            let errors = [];
            let arquivos = [];

            if(req.files && Object.keys(req.files).length > 0){
                for(let key of Object.keys(req.files)){
                    const file = req.files[key];

                    const nameParts = file.name.split('.'); // [123123123, jpg]
                    const fileName = `${new Date().getTime()}.${
                        nameParts[nameParts.length - 1]}`;

                    const path = `servicos/${salaoId}/${fileName}`;

                    const response = await aws.uploadToS3(file, path);

                    if(response.error){
                        errors.push({ error: true, message: response.message})
                    }else{
                        arquivos.push(path);
                    }
                }
            }

            if(errors.length > 0){
                res.json(errors[0]);
                return false;
            }

            //Criar Serviço
            let jsonServico = JSON.parse(servico);
            const servicoCadastrado = await Servico(jsonServico).save();

            //Criar Arquivo
            arquivos = arquivos.map((arquivo) => ({
                referenciaId: servicoCadastrado._id,
                model: 'Servico',
                caminho: arquivo,
            }));

            await Arquivo.insertMany(arquivos);

            res.json({ servico: servicoCadastrado, arquivos });
        }catch (err) {
            res.json({error: true, message: err.message});
        }
});

//Rota de atualização - UPDATE (PUT)
router.put('/:id', async (req, res) => {
    
    try {
        const { salaoId, servico } = req.body;
        let errors = [];
        let arquivos = [];

        if(req.files && Object.keys(req.files).length > 0){
            for(let key of Object.keys(req.files)){
                const file = req.files[key];

                const nameParts = file.name.split('.'); // [123123123, jpg]
                const fileName = `${new Date().getTime()}.${
                    nameParts[nameParts.length - 1]}`;

                const path = `servicos/${salaoId}/${fileName}`;

                const response = await aws.uploadToS3(file, path);

                if(response.error){
                    errors.push({ error: true, message: response.message})
                }else{
                    arquivos.push(path);
                }
            }
        }

        if(errors.length > 0){
            res.json(errors[0]);
            return false;
        }

        //Criar Serviço
        const jsonServico = JSON.parse(servico);
        await Servico.findByIdAndUpdate(req.params.id, jsonServico);

        //Criar Arquivo
        arquivos = arquivos.map((arquivo) => ({
            referenciaId: req.params.id,
            model: 'Servico',
            caminho: arquivo,
        }));

        await Arquivo.insertMany(arquivos);

        res.json({ error: false });
    }catch (err) {
        res.json({error: true, message: err.message});
    }
});

//Rota de retorno de informmação
router.get('/salao/:salaoId', async (req, res) => {
    try{
        let servicosSalao = [];
        const servicos = await Servico.find({
            salaoId: req.params.salaoId,
            status: { $ne: 'E' },
        });
        for(let servico of servicos){
            const arquivos = await Arquivo.find({
                model: 'Servico',
                referenciaId: servico._id
            });
            servicosSalao.push({ ... servico._doc, arquivos });
        }
        res.json({
            servicos: servicosSalao,
        });
    }catch(err){
        res.json({ error: true, message: err.message});
    }
});

//Rota de exclusão - DELETE (DELETE)
router.post('/delete-arquivo', async (req, res) => {
    try{
        const { key } = req.body;

        //Excluir AWS
        await aws.deleteFileS3(key);

        await Arquivo.findOneAndDelete({
            caminho: key,
        });
        res.json({error: false});
    }catch (err) {
        res.json({error: true, message: err.message});
    }
});

//Rota de exclusão - Mudança de Status
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        await Servico.findByIdAndUpdate(id, {status: 'E'});
        res.json({error: false});
    }catch (err) {
        res.json({error: true, message: err.message});
    }
});



module.exports = router;
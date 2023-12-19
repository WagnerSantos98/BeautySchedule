const express = require('express');
const router = express.Router();
const aws = require('../services/aws');
const Arquivo = require('../models/arquivo');
const Servico = require('../models/servico');
const busboyBodyParser = require('busboy-body-parser');

router.use(busboyBodyParser());

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
    




module.exports = router;
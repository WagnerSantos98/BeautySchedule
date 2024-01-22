const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const SalaoUsuario = require('../models/relationship/salaoUsuario');

//Método de inserção de usuário
router.post('/', async (req, res) => {
    try{

        const { usuario, salaoId } = req.body;
        let newUsuario = null;

        //Verificar se o usuário existe
        const existentUsuario = await Usuario.findOne({
            $or: [
                { email: usuario.email },
                { telefone: usuario.telefone },
            ]
            
        });

        //Se não existir o usuário
        if(!existentUsuario){
            newUsuario = await Usuario({
                ...usuario,
            }).save();
        }

        //Relacionamento usuário/Salão
        const usuarioId = existentUsuario ? existentUsuario._id : newUsuario._id;

        //Verificar se existe o relacionamento com salão
        const existentRelatioship = await SalaoUsuario.findOne({
            salaoId,
            usuarioId,
            status: { $ne: 'E' },
        });

        //Se não está vinvulado
        if(!existentRelatioship){
            await new SalaoUsuario({
                salaoId,
                usuarioId,
            }).save();
        }

        //Se já existir um vinculo usuário/salão
        if(existentUsuario){
            await SalaoUsuario.findOneAndUpdate({
                salaoId,
                usuarioId,
            }, 
            { status: 'A' }
            );
        }
        

        if(existentUsuario && existentRelatioship){
            res.json({ error: true, message: 'Usuario já cadastrado'});
        }else{
            res.json({ error: false });
        }
 
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

//Rota de filtro
router.post('/filter', async (req, res) => {
    try{
        const usuarios = await Usuario.find(req.body.filters);
        res.json({ error: false, usuarios});
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

router.delete('/vinculo/:id', async (req, res) => {
    try{
        await SalaoUsuario.findByIdAndUpdate(req.params.id, { status: 'E' });
        res.json({ error: false });
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

router.get('/salao/:salaoId', async (req, res) => {
    try{
        const { salaoId } = req.params;

        //Recuperar vinculos
        const usuarios = await SalaoUsuario.find({
            salaoId,
            status: { $ne: 'E' }
        })
        .populate('usuarioId')
        .select('usuarioId dataCadastro');

        res.json({
            error: false,
            usuarios: usuarios.map((vinculo) => ({
                ...vinculo.usuarioId._doc,
                vinculoId: vinculo._id,
                dataCadastro: vinculo.dataCadastro
            })),
        });

    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;
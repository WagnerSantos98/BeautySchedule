const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const Salao = require('../models/salao');
const SalaoCliente = require('../models/relationship/salaoCliente');

//Método de inserção de cliente
router.post('/', async (req, res) => {
    try{

        const { cliente, salaoId } = req.body;
        let newCliente = null;

        //Verificar se o cliente existe
        const existentCliente = await Cliente.findOne({
            $or: [
                { email: cliente.email },
                { telefone: cliente.telefone },
            ]
            
        });

        //Se não existir o cliente
        if(!existentCliente){
            newCliente = await Cliente({
                ...cliente,
            }).save();
        }

        //Relacionamento cliente/Salão
        const clienteId = existentCliente ? existentCliente._id : newCliente._id;

        //Verificar se existe o relacionamento com salão
        const existentRelatioship = await SalaoCliente.findOne({
            salaoId,
            clienteId,
            status: { $ne: 'E' },
        });

        //Se não está vinvulado
        if(!existentRelatioship){
            await new SalaoCliente({
                salaoId,
                clienteId,
            }).save();
        }

        //Se já existir um vinculo cliente/salão
        if(existentCliente){
            await SalaoCliente.findOneAndUpdate({
                salaoId,
                clienteId,
            }, 
            { status: 'A' }
            );
        }
        

        if(existentCliente && existentRelatioship){
            res.json({ error: true, message: 'Cliente já cadastrado'});
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
        const clientes = await Cliente.find(req.body.filters);
        res.json({ error: false, clientes});
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

router.delete('/vinculo/:id', async (req, res) => {
    try{
        await SalaoCliente.findByIdAndUpdate(req.params.id, { status: 'E' });
        res.json({ error: false });
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

router.get('/salao/:salaoId', async (req, res) => {
    try{
        const { salaoId } = req.params;

        //Recuperar vinculos
        const clientes = await SalaoCliente.find({
            salaoId,
            status: { $ne: 'E' }
        })
        .populate('clienteId')
        .select('clienteId dataCadastro');

        res.json({
            error: false,
            clientes: clientes.map((vinculo) => ({
                ...vinculo.clienteId._doc,
                vinculoId: vinculo._id,
                dataCadastro: vinculo.dataCadastro
            })),
        });

    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

module.exports = router;
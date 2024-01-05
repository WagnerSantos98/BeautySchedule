const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const Salao = require('../models/salao');
const Agendamento = require('../models/agendamento');

//Método de inserção de cliente
router.post('/', async (req, res) => {
    try{
        const cliente = await new Cliente(req.body).save();
        res.json({ cliente });
    }catch(err){
        res.json({error: true, message: err.message});
    }
});

module.exports = router;
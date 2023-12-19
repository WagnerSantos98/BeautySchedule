const express = require('express');
const router = express.Router();
const Colaborador = require('../models/colaborador');

//Rota de inserção - INSERT (POST)
router.post('/', async(req, res) => {
    try{
        
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});


module.exports = router;
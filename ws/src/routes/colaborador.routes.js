const express = require('express');
const router = express.Router();
const Colaborador = require('../models/colaborador');

router.post('/', async (req, res) => {
    try{
        const colaborador = await new Colaborador(req.body).save();
        res.json({ colaborador });
    }catch(err){
        res.json({error: true, message: err.message});
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { Cliente } = require('../database/models');

/* GET users listing. */
router.get('/', async function(req, res) {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (erro) {
    res.status(400).json({ message: erro.message });
  }
});

/* POST criar cliente listing. */
router.post('/', async function(req, res) {

  try {
    const { nome, email, senha }= req.body;
    const novoCliente = { nome, email, senha };
    const jaExiste = await Cliente.findOne({ where: { email }});

    if(jaExiste){
      res.json({ message: 'E-mail já cadastrado!' });
    } else {
      await Cliente.create(novoCliente);
      res.status(201).json({ message: 'Cliente cadastrado com sucesso!'});
    }
  } catch(erro){
    res.status(400).json({ message: erro.message });
  }
  

  

  
})

module.exports = router;

const express = require('express');
const router = express.Router();
const { Loja } = require('../database/models')

/* GET lojas listing. */
router.get('/', async function(req, res) {
  try {
    const lojas = await Loja.findAll();
    res.status(200).json(lojas)
  } catch (erro) {
    res.json({ message: erro.message })
  }
});

module.exports = router;
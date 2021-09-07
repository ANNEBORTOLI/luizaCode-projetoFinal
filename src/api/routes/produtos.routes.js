const express = require('express');
const router = express.Router();
const { Produto } = require('../../database/models')

/* GET produtos listing. */
router.get('/', async function(req, res) {
  try {
    const produtos = await Produto.findAll({
      attributes: {
        exclude: [ "createdAt", "updatedAt" ]
      }
    });
    res.status(200).json(produtos)
  } catch (erro) {
    res.json({ message: erro.message })
  }
});

module.exports = router;

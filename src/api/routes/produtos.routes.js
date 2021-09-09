const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/produtos.controler')
// const auth = require('../middlewares/authToken');

/* GET produtos listing. */
router.get('/', ProdutoController.lista);

module.exports = router;

const express = require('express');
const router = express.Router();
const LojaController = require('../controllers/lojas.controller')

/* GET lojas listing. */
router.get('/', LojaController.lista);

module.exports = router;
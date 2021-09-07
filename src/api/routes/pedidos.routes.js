const express = require('express');
const router = express.Router();
const PedidosController = require('../controllers/pedidos.controller');


/* PUT Cliente retira produto em loja status='retirada'*/
router.put('/retirada', PedidosController.retiraPedido);

module.exports = router;
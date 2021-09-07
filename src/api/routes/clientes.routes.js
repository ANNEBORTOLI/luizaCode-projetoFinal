const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clientes.controller');


/* POST cadastra um novo cliente. */
router.post('/', ClienteController.cadastra); 

/* ROTAS PARA CARRINHO DE COMPRAS */
/* POST adiciona um produto no carrinho do cliente */
router.post('/:id/carrinho', ClienteController.criaOuAdiciona);
/* DELETE remove um produto do carrinho do cliente */
router.delete('/:id/carrinho', ClienteController.remove);
/* PUT Finaliza a compra do cliente status='realizada'*/
router.put('/:id/carrinho', ClienteController.finalizaCompra);
/* GET lista de todos os pedidos do cliente com seus produtos */
router.get('/:id/pedidos', ClienteController.listaPedidos);

/* TODO - POST Login um novo cliente. */



/* GET lista de todos os clientes cadastrados */
router.get('/', ClienteController.lista); 

module.exports = router;
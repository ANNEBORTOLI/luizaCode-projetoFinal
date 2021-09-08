const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clientes.controller');
const { validadorDeCadastro } = require('../middlewares/validadorDeCadastro')

/* POST cadastra um novo cliente. */
router.post('/', validadorDeCadastro, ClienteController.cadastra);

/* TODO - POST Login um novo cliente. */


/* ROTAS PARA CARRINHO DE COMPRAS */
/* POST adiciona um produto no carrinho do cliente */
router.post('/:id/carrinho', ClienteController.criaOuAdiciona);
/* DELETE remove um produto do carrinho do cliente */
router.delete('/:id/carrinho', ClienteController.remove);
/* PUT Finaliza a compra do cliente status='realizada'*/
router.put('/:id/carrinho', ClienteController.finalizaCompra);
/* GET lista de todos os pedidos do cliente com seus produtos */
router.get('/:id/pedidos', ClienteController.listaPedidos);

/* GET mostra produtos no carrinho do cliente */
router.get('/:id/carrinho', ClienteController.listaCarrinho); 

/* APAGAR DEPOIS - GET lista de todos os clientes cadastrados */
router.get('/', ClienteController.lista); 

module.exports = router;
const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clientes.controller');
const {validadorDeCadastro} = require('../middlewares/validadorDeCadastro');
const {validadorDeLogin} = require('../middlewares/validadorDeLogin');
const auth = require('../middlewares/authToken');

/* POST cadastra um novo cliente. */
router.post('/', validadorDeCadastro, ClienteController.cadastra); 
/*POST Login Cliente*/
router.post('/login', validadorDeLogin, ClienteController.login);

/* ROTAS PARA CARRINHO DE COMPRAS */
/* POST adiciona um produto no carrinho do cliente */
router.post('/:id/carrinho', auth, ClienteController.criaOuAdiciona);
/* DELETE remove um produto do carrinho do cliente */
router.delete('/:id/carrinho', auth, ClienteController.remove);
/* PUT Finaliza a compra do cliente status='realizada'*/
router.put('/:id/carrinho', auth, ClienteController.finalizaCompra);
/* GET lista de todos os pedidos do cliente com seus produtos */
router.get('/:id/pedidos', auth,  ClienteController.listaPedidos);
/* GET lista produtos no carrinho */
router.get('/:id/carrinho', auth, ClienteController.listaCarrinho); 

/* TODO - POST Login um novo cliente. */



/* GET lista de todos os clientes cadastrados */
router.get('/', ClienteController.lista); 

module.exports = router;
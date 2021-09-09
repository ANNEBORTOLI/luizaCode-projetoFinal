const express = require("express");
const router = express.Router();
const ClienteController = require("../controllers/clientes.controller");
const { validadorDeCadastro } = require("../middlewares/validadorDeCadastro");
const { validadorDeLogin } = require("../middlewares/validadorDeLogin");
const auth = require("../middlewares/authToken");

/* POST cadastra um novo cliente. */
router.post("/", validadorDeCadastro, ClienteController.cadastra);
/* POST Login cliente. */
router.post("/login", validadorDeLogin, ClienteController.login);

/* ROTAS PARA CARRINHO DE COMPRAS */
/* POST adiciona um produto no carrinho do cliente */
router.post("/carrinho", auth, ClienteController.criaOuAdiciona);
/* DELETE remove um produto do carrinho do cliente */
router.delete("/carrinho", auth, ClienteController.remove);
/* PUT Finaliza a compra do cliente status='realizada'*/
router.put("/carrinho", auth, ClienteController.finalizaCompra);
/* GET lista produtos no carrinho do cliente */
router.get("/carrinho", auth, ClienteController.listaCarrinho);
/* GET lista de todos os pedidos do cliente com seus produtos */
router.get("/pedidos", auth, ClienteController.listaPedidos);

/* TODO - GET lista de todos os clientes cadastrados */
router.get("/", ClienteController.lista);

module.exports = router;

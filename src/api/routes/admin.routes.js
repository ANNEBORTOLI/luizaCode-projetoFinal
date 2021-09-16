const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/admin.controller");
const auth = require("../middlewares/authToken");

/* PUT Cliente retira produto em loja status='retirada'*/
router.put("/pedidos/retirada", auth, AdminController.retiraPedido);
/* GET lista de todos os clientes cadastrados */
router.get("/clientes", auth, AdminController.listaClientes);
/* GET lista histórico de compras do cliente */
router.get("/historico", auth, AdminController.pedidosCliente);

module.exports = router;

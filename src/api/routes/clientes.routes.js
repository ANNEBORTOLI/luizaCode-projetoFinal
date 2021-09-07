const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clientes.controller');

const { Cliente } = require('../../database/models');
const { Pedido } = require('../../database/models');
const { PedidoProduto } = require('../../database/models');
const { Loja } = require('../../database/models');
const { Produto } = require('../../database/models');

// importa o middleware de validacao De Registo

/* GET lista de clientes */
router.get('/', ClienteController.lista); 
/* POST cria um novo cliente. */
router.post('/', ClienteController.cadastra); 

/* ROTAS PARA CARRINHO DE COMPRAS */
/* POST adiciona um produto no carrinho do cliente */
router.post('/:id/carrinho', ClienteController.criaOuAdiciona);
/* POST remove um produto do carrinho do cliente */
router.delete('/:id/carrinho', ClienteController.remove);
/* Finaliza a compra do cliente */
router.put('/:id/carrinho', ClienteController.finalizaCompra);
/* GET lista de todos os pedidos do cliente */
router.get('/:id/pedidos', ClienteController.listaPedidos);


router.get('/teste', async function(req, res) {
  const anne = await Cliente.findByPk(1);
  const loja = await Loja.findByPk(3);
  const produto = await Produto.findByPk(3);

  // Criar cliente
  /*await Cliente.create({
    nome: "Sansa of House of Lannister",
    email: "sansa@email.com",
    senha: "8888"
  });*/

  // Criar pedido
  /*await Pedido.create({
    status: 'carrinho',
    id_cliente: anne.id,
    id_loja: loja.id
  });*/

  // Adicionar produto ao pedido
  /*await PedidoProduto.create({
    id_pedido: 5,
    id_produto: produto.id
  });*/

  // Consultar cliente e seus pedidos
  /*const result = await Cliente.findOne({
    attributes: {
      exclude: [ "senha", "createdAt", "updatedAt" ]
    },
    where: {
      id: anne.id
    },
    include: {
      model: Pedido,
      attributes: {
        exclude: [ "createdAt", "updatedAt" ]
      }
    }
  });*/

  // Consultar todos os pedidos e seus produtos.
  const result = await Pedido.findAll({
    attributes: {
      exclude: [ "createdAt", "updatedAt" ]
    },

    include: {
      model: Produto,
      through: {
        attributes: []
      },
      attributes: {
        exclude: [ "createdAt", "updatedAt" ]
      }
    }
  });

  // Remover pedidos sem cliente
  /*await Pedido.destroy({
    where: {
      id_cliente: null
    }
  });*/

  res.json(result);
});


module.exports = router;

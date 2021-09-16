const { Cliente, Pedido, Produto } = require("../../database/models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const JWTSecret = "mulheresincriveisdoluizacode";

class Service {
  async fazCadastro({ nome, email, senha }) {
    const [cliente, cadastrado] = await Cliente.findOrCreate({
      where: { email: email },
      defaults: {
        nome,
        senha,
      },
    });

    return cadastrado;
  }

  async addProduto(idCliente, produto) {
    // Acha um Pedido com status='carrinho' OU cria um novo pedido
    const [carrinho, criado] = await Pedido.findOrCreate({
      where: {
        id_cliente: idCliente,
        status: "carrinho",
      },
    });
    // se não tinha carrinho e ele foi criado
    if (criado) {
      await carrinho.addProduto(produto);
      return true;
    } else {
      // Verifica se tem outros produtos do mesmo tipo
      const produtosCarrinho = await carrinho.getProdutos({
        where: { tipo: produto.tipo },
      });

      if (produtosCarrinho.length == 0) {
        await carrinho.addProduto(produto);
        return true;
      } else {
        return false;
      }
    }
  }

  async delProduto(idCliente, produto) {
    const carrinho = await Pedido.findOne({
      where: {
        id_cliente: idCliente,
        status: "carrinho",
      },
    });
    await carrinho.removeProduto(produto);
    return true;
  }

  async listaCarrinho(idCliente) {
    const carrinho = await Pedido.findAll({
      where: {
        id_cliente: idCliente,
        status: "carrinho",
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Produto,
        through: {
          attributes: [],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    return carrinho;
  }

  async compraRealizada(idCliente) {
    const idLoja = Math.floor(Math.random() * 6 + 1);

    const carrinho = await Pedido.findOne({
      where: {
        id_cliente: idCliente,
        status: "carrinho",
      },
    });

    if (!carrinho) {
      return;
    } else {
      carrinho.id_loja = idLoja;
      carrinho.status = "realizada";
      await carrinho.save();
      return carrinho;
    }
  }

  async listaPedidos(idCliente) {
    const pedidosDoCliente = await Pedido.findAll({
      where: {
        id_cliente: idCliente,
        status: {
          [Op.ne]: "carrinho",
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: Produto,
        through: {
          attributes: [],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });
    return pedidosDoCliente;
  }

  async achaCliente({ email }) {
    const cliente = await Cliente.findOne({
      where: {
        email: email,
      },
    });
    return cliente;
  }
}

const ClienteService = new Service();
module.exports = ClienteService;

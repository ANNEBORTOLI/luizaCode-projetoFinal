const { Pedido, Cliente, Produto } = require("../../database/models");

class Service {
  async acheUm(pedidoId) {
    const pedido = await Pedido.findByPk(pedidoId);
    return pedido;
  }

  async retira(pedido) {
    pedido.status = "retirado";
    await pedido.save();
    return pedido;
  }

  async listaClientes() {
    const clientes = await Cliente.findAll();
    return clientes;
  }

  async listaPedidosDoCliente(idCliente) {
    console.log(idCliente);
    const pedidos = await Pedido.findAll({
      where: {
        id_cliente: idCliente,
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

    return pedidos;
  }
}

const AdminService = new Service();
module.exports = AdminService;
